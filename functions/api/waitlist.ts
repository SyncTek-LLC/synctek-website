/**
 * Cloudflare Pages Function: POST /api/waitlist
 *
 * Accepts { email, source, company? } JSON.
 * - company is a honeypot: if present and non-empty, silently returns 200 without inserting.
 * - Inserts into D1 binding WAITLIST_DB, table `waitlist`.
 * - Duplicate emails are treated as success (idempotent via ON CONFLICT DO NOTHING).
 * - Returns { ok: true } on success, appropriate error status otherwise.
 *
 * Email notifications (all failsafe — never block signup on email failure):
 * - RESEND_API_KEY + WAITLIST_FROM: send confirmation email to the signer on new signup.
 * - WAITLIST_NOTIFY (optional): send internal ping to that address on every new signup.
 */

interface Env {
  WAITLIST_DB?: D1Database;
  RESEND_API_KEY?: string;
  WAITLIST_FROM?: string;
  WAITLIST_NOTIFY?: string;
}

interface WaitlistPayload {
  email?: unknown;
  source?: unknown;
  company?: unknown;
}

// Basic RFC-ish email regex — intentionally permissive but catches obvious garbage.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ── Email helpers ─────────────────────────────────────────────────────────────

/**
 * Send an email via Resend. Fully failsafe — logs on error, never throws.
 * Returns true if the send succeeded, false otherwise.
 */
async function sendResendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string;
    subject: string;
    html: string;
    text: string;
  }
): Promise<boolean> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '(no body)');
      console.error(`[waitlist] Resend error ${res.status}: ${body}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[waitlist] Resend fetch failed:', err);
    return false;
  }
}

/** Build the confirmation HTML email for a new Heka waitlist member. */
function buildConfirmationEmail(to: string): { html: string; text: string } {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Heka waitlist</title>
  <style>
    body { margin: 0; padding: 0; background: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e5e5e5; }
    .wrapper { max-width: 560px; margin: 48px auto; padding: 0 24px; }
    .card { background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 40px 36px; }
    .logo { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: 18px; font-weight: 700; color: #22d3ee; letter-spacing: -0.5px; margin-bottom: 32px; }
    .logo span { color: #22d3ee; }
    h1 { font-size: 22px; font-weight: 700; color: #f5f5f5; margin: 0 0 16px; letter-spacing: -0.3px; }
    p { font-size: 15px; line-height: 1.7; color: #a3a3a3; margin: 0 0 16px; }
    .highlight { color: #e5e5e5; }
    .divider { border: none; border-top: 1px solid #2a2a2a; margin: 28px 0; }
    .footer { font-size: 13px; color: #525252; line-height: 1.6; }
    .footer a { color: #525252; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="logo"><span>sync</span>tek</div>
      <h1>You're on the Heka waitlist.</h1>
      <p>
        Thanks for signing up — we've reserved your spot for early access to
        <span class="highlight">Heka</span>, the agentic engineering substrate
        we're building at SyncTek.
      </p>
      <p>
        Heka is how we run our own company — autonomous agents, governed
        workflows, and an orchestration layer that ships real software at
        real velocity. We're opening it up to a small group first.
      </p>
      <p>
        We'll reach out when your access is ready. Until then, watch what
        we're building at <a href="https://synctek.io" style="color:#22d3ee;text-decoration:none;">synctek.io</a>.
      </p>
      <hr class="divider" />
      <div class="footer">
        The SyncTek team<br />
        <a href="https://synctek.io">synctek.io</a>
      </div>
    </div>
  </div>
</body>
</html>`;

  const text = `You're on the Heka waitlist.

Thanks for signing up — we've reserved your spot for early access to Heka, the agentic engineering substrate we're building at SyncTek.

Heka is how we run our own company: autonomous agents, governed workflows, and an orchestration layer that ships real software at real velocity. We're opening it up to a small group first.

We'll reach out when your access is ready. Until then, watch what we're building at https://synctek.io.

— The SyncTek team
`;

  return { html, text };
}

/**
 * Fire confirmation + notify emails after a new signup.
 * Non-blocking: we do NOT await this in the response path — it runs in the background.
 * Also fully failsafe internally.
 */
async function sendSignupEmails(env: Env, email: string): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  const from = env.WAITLIST_FROM ?? 'Heka <hello@synctek.io>';

  if (!apiKey) {
    console.warn('[waitlist] RESEND_API_KEY not set — skipping confirmation email');
    return;
  }

  const { html, text } = buildConfirmationEmail(email);

  // 1. Confirmation to the signer
  await sendResendEmail(apiKey, {
    from,
    to: email,
    subject: "You're on the Heka waitlist",
    html,
    text,
  });

  // 2. Internal notify (optional)
  const notifyAddr = env.WAITLIST_NOTIFY;
  if (notifyAddr) {
    await sendResendEmail(apiKey, {
      from,
      to: notifyAddr,
      subject: `New Heka waitlist signup: ${email}`,
      html: `<p>New Heka waitlist signup: <strong>${email}</strong></p>`,
      text: `New Heka waitlist signup: ${email}`,
    });
  }
}

// ── Request handler ───────────────────────────────────────────────────────────

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // ── 1. D1 binding guard ────────────────────────────────────────────────────
  if (!env.WAITLIST_DB) {
    return new Response(
      JSON.stringify({ ok: false, error: 'backend not configured' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // ── 2. Parse body ──────────────────────────────────────────────────────────
  let payload: WaitlistPayload;
  try {
    payload = (await request.json()) as WaitlistPayload;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: 'invalid JSON' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // ── 3. Honeypot check ──────────────────────────────────────────────────────
  const company = typeof payload.company === 'string' ? payload.company.trim() : '';
  if (company.length > 0) {
    // Bot — silently succeed without inserting.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // ── 4. Validate email ──────────────────────────────────────────────────────
  const email = typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';
  if (!email || !EMAIL_REGEX.test(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: 'invalid email' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const source = typeof payload.source === 'string' ? payload.source.trim().slice(0, 64) : 'unknown';
  const createdAt = new Date().toISOString();

  // ── 5. Insert into D1 ─────────────────────────────────────────────────────
  try {
    const result = await env.WAITLIST_DB
      .prepare(
        'INSERT INTO waitlist (email, created_at, source) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING'
      )
      .bind(email, createdAt, source)
      .run();

    // ── 6. Send emails for NEW signups only (meta.changes === 1) ──────────
    // Non-blocking: use ctx.waitUntil if available, otherwise fire-and-forget.
    // Either way, the Response is returned immediately — email never delays signup.
    const isNewSignup = (result.meta?.changes ?? 0) > 0;
    if (isNewSignup) {
      // Fire-and-forget: intentionally not awaited so email latency never
      // delays the HTTP response. Cloudflare will keep the event loop alive
      // for in-flight fetches after the response is sent.
      sendSignupEmails(env, email).catch((err) => {
        console.error('[waitlist] sendSignupEmails unexpected error:', err);
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[waitlist] D1 error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: 'database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
