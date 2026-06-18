/**
 * Cloudflare Pages Function: POST /api/waitlist
 *
 * Accepts { email, source, company? } JSON.
 * - company is a honeypot: if present and non-empty, silently returns 200 without inserting.
 * - Inserts into D1 binding WAITLIST_DB, table `waitlist`.
 * - Duplicate emails are treated as success (idempotent via ON CONFLICT DO NOTHING).
 * - Returns { ok: true } on success, appropriate error status otherwise.
 */

interface Env {
  WAITLIST_DB?: D1Database;
}

interface WaitlistPayload {
  email?: unknown;
  source?: unknown;
  company?: unknown;
}

// Basic RFC-ish email regex — intentionally permissive but catches obvious garbage.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
    await env.WAITLIST_DB
      .prepare(
        'INSERT INTO waitlist (email, created_at, source) VALUES (?, ?, ?) ON CONFLICT(email) DO NOTHING'
      )
      .bind(email, createdAt, source)
      .run();

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
