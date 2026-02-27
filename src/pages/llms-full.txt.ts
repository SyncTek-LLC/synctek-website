import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# ForgeOS Documentation — Full Reference

Base URL: https://forgeos-api.synctek.io
MCP server: https://mcp.forgeos.synctek.io/sse
Interactive API docs: https://forgeos-api.synctek.io/docs
OpenAPI spec: https://forgeos-api.synctek.io/openapi.json

---

## Overview

ForgeOS is a governance engine for AI agents. It enforces constitutional rules, gate-based change pipelines, Ed25519-signed audit trails, and circuit breakers so AI agents can ship code safely without human babysitting.

ForgeOS exposes 13 governance tools over the Model Context Protocol (MCP). Any MCP-compatible agent — Claude, GPT-4, Gemini, local models — can call gate-check, submit reviews, and query institutional knowledge without custom integration.

Every change goes through a pipeline of gates:

1. intent — what are we doing and why
2. design — architecture and approach approved
3. implementation — code written and ready for review
4. verification — tests, scans, and evidence collected
5. hardening — performance and reliability confirmed
6. release — final sign-off, ready to ship

The engine computes a risk score for every changeset and determines which gates, reviewer roles, and evidence types are required automatically.

---

## Quick Start

### 1. Register an account

POST https://forgeos-api.synctek.io/auth/register
Content-Type: application/json

{"email": "you@company.com", "password": "your-secure-password"}

Response 201:
{"user_id": "usr_a1b2c3d4", "email": "you@company.com", "role": "user", "created_at": "2026-02-25T10:00:00Z"}

### 2. Log in and get a session

POST https://forgeos-api.synctek.io/auth/login
Content-Type: application/json

{"email": "you@company.com", "password": "your-secure-password"}

Sets forge_session HttpOnly cookie. Use X-ForgeOS-API-Key header for programmatic access.

### 3. Create a project

POST https://forgeos-api.synctek.io/api/projects
X-ForgeOS-API-Key: fos_your_key

{"name": "my-app", "description": "My application under ForgeOS governance", "platform": "web"}

Note the id in the response (e.g., proj_a1b2c3d4).

### 4. Install the MCP server

npm install -g @synctek/forgeos-mcp

Or use npx for zero-install:

npx -y @synctek/forgeos-mcp@latest

### 5. Configure your editor

Cursor — .cursor/mcp.json:

{
  "mcpServers": {
    "forgeos": {
      "command": "npx",
      "args": ["-y", "@synctek/forgeos-mcp@latest"],
      "env": {
        "FORGEOS_ENGINE_URL": "https://forgeos-api.synctek.io",
        "FORGEOS_API_KEY": "fos_your_api_key_here"
      }
    }
  }
}

Claude Code — ~/.claude/settings.json:

{
  "mcpServers": {
    "forgeos": {
      "command": "npx",
      "args": ["-y", "@synctek/forgeos-mcp@latest"],
      "env": {
        "FORGEOS_ENGINE_URL": "https://forgeos-api.synctek.io",
        "FORGEOS_API_KEY": "fos_your_api_key_here"
      }
    }
  }
}

VS Code (Copilot) — settings.json:

{
  "mcp": {
    "servers": {
      "forgeos": {
        "command": "npx",
        "args": ["-y", "@synctek/forgeos-mcp@latest"],
        "env": {
          "FORGEOS_ENGINE_URL": "https://forgeos-api.synctek.io",
          "FORGEOS_API_KEY": "fos_your_api_key_here"
        }
      }
    }
  }
}

HTTP/SSE transport (hosted agents, cloud workflows):
Endpoint: https://mcp.forgeos.synctek.io/sse
Header: X-ForgeOS-API-Key: fos_your_api_key_here

### 6. Run your first governance command

Ask your AI agent: "Initialize ForgeOS for my project."

The agent calls forge_init with your project ID. Returns project state, active initiatives, governance rules, and workflow runbook.

Then: "Create an initiative for adding user authentication."

The agent calls forge_create_initiative. Every change from here goes through gates — propose a changeset, submit evidence, get reviews, promote gates before code ships.

---

## Authentication

ForgeOS supports two authentication methods.

### Session cookies

Used by the dashboard and browser-based workflows.
1. Call POST /auth/login with email and password
2. Response sets forge_session HttpOnly cookie
3. A forge_csrf cookie is also set for CSRF protection on state-changing requests
4. Sessions expire after configured TTL. Call POST /auth/logout to invalidate early.

### API keys

Recommended for MCP servers, CI/CD pipelines, and programmatic access.

Key format: fos_ prefix (e.g., fos_a1b2c3d4e5f6...)
Header: X-ForgeOS-API-Key: fos_your_key_here

Security rules:
- Keys are shown once at creation time. Store them immediately.
- Maximum 10 keys per user. Delete unused keys before creating new ones.
- Keys are stored as SHA-256 hashes. ForgeOS cannot recover a lost key.
- Never commit keys to version control. Use environment variables.

### Agent registration

POST https://forgeos-api.synctek.io/auth/register-agent
Content-Type: application/json

{"agent_name": "my-ci-agent", "owner_email": "you@company.com"}

Returns an API key scoped to the agent identity.

### Auth check order

1. Exempt paths (/health, /auth/login, /auth/register, /auth/register-agent) — no auth required
2. Session cookie — validated server-side
3. API key (X-ForgeOS-API-Key header) — SHA-256 hash lookup
4. No auth — returns 401 Unauthorized

### Rate limits

Tier | Requests/month | Requests/minute | AI review limit
Free | 1,000 | 20 | None
Pro ($49/mo) | 50,000 | 100 | 10/min
Team ($149/mo) | 200,000 | 200 | 20/min
Enterprise | Custom | Custom | Custom

429 Too Many Requests includes Retry-After header. Use exponential backoff. Maximum 3 retries.

### Error codes

401 — Invalid or missing API key / session. Check FORGEOS_API_KEY or re-authenticate.
402 — AI spend cap exceeded. Upgrade plan or wait for monthly reset.
403 — Insufficient scope or access denied. Check plan tier and project ownership.
409 — Conflict (e.g., email already registered).
422 — Validation error (e.g., password too short).
429 — Rate limit exceeded. Backoff per Retry-After header.

---

## REST API Reference

Base URL: https://forgeos-api.synctek.io

All endpoints require authentication unless noted. Include one of:
- Session cookie: forge_session (set by POST /auth/login)
- API key header: X-ForgeOS-API-Key: fos_your_key_here

Responses are JSON. Errors: {"detail": "error message"}

---

### Auth

#### POST /auth/register
Create a new user account. No auth required.

Request body:
- email (string, required) — Email address
- password (string, required) — 12-128 characters

Response 201:
{"user_id": "usr_a1b2c3d4", "email": "dev@company.com", "role": "user", "created_at": "2026-02-25T10:00:00Z"}

Errors: 409 email exists, 422 validation failed.

#### POST /auth/login
Authenticate and create a session. Sets forge_session and forge_csrf cookies. No auth required.

Request body:
- email (string, required)
- password (string, required)

Response 200:
{"user_id": "usr_a1b2c3d4", "email": "dev@company.com", "role": "user"}

Errors: 401 invalid credentials (identical error for wrong password and unknown email — no enumeration).

#### POST /auth/logout
Invalidate the current session and clear cookies.
Response 204: No content.
Errors: 401 no valid session.

#### GET /auth/me
Get the current authenticated user's info.
Response 200:
{"user_id": "usr_a1b2c3d4", "email": "dev@company.com", "role": "user", "created_at": "2026-02-25T10:00:00Z"}

#### POST /auth/register-agent
Register an autonomous agent identity. No auth required. Returns an API key scoped to the agent.

Request body:
- agent_name (string, required)
- owner_email (string, required)

---

### Projects

CRUD operations for projects. All endpoints require auth.

#### POST /api/projects
Create a new project. Optionally import an existing codebase with source_directory.

Request body:
- name (string, required) — Project name
- description (string, required) — Project description
- platform (string, required) — Platform: web, mobile, api
- constraints (object, optional) — Project constraints
- source_directory (string, optional) — Path to existing codebase (triggers auto-scan)

Response 201: Full project object with generated id (e.g., proj_a1b2c3d4).

#### GET /api/projects
List all projects (lightweight summaries). Filtered by the requesting user's organization.

Response 200:
[{"id": "proj_a1b2c3d4", "name": "my-app", "platform": "web", "status": "created", "created_at": "2026-02-25T10:00:00Z"}]

#### GET /api/projects/{project_id}
Retrieve a single project by ID.
Response 200: Full project object.
Errors: 403 access denied, 404 not found.

#### DELETE /api/projects/{project_id}
Delete a project. The governance ledger is preserved for audit trail.
Response 204: No content.

---

### Initiatives

Track units of work within a project.

#### POST /projects/{project_id}/initiatives
Create a new initiative.

Request body:
- title (string, required) — Initiative title
- description (string, required) — What this initiative accomplishes
- priority (string, optional) — low, medium, high, or critical (default: medium)

Response 201: Full initiative object with generated id (e.g., init_a1b2c3d4).

#### GET /projects/{project_id}/initiatives
List all initiatives for a project.
Query params: status (optional) — filter by active, completed, or abandoned.
Response 200: Array of initiative summaries.

#### GET /projects/{project_id}/initiatives/{init_id}
Retrieve a single initiative.

#### PATCH /projects/{project_id}/initiatives/{init_id}
Update an initiative's status or priority.

Request body:
- status (string, optional) — active, completed, or abandoned
- priority (string, optional) — low, medium, high, or critical

---

### Changesets

Propose and track code changes with auto-computed risk profiles.

#### POST /projects/{project_id}/changesets
Propose a new changeset. Automatically computes risk score and creates a gate pipeline.

Request body:
- initiative_id (string, required) — Parent initiative
- description (string, required) — What changed and why
- files_changed (string[], required) — File paths that changed
- modules_affected (string[], required) — Module/area names affected
- branch (string, optional) — Git branch name

Response 201: Changeset with embedded risk_profile (score, required gates, roles, evidence).

#### GET /projects/{project_id}/changesets
List all changesets for a project. Optional status filter.

#### GET /projects/{project_id}/changesets/{cs_id}
Retrieve a changeset with its risk profile and gate pipeline.

#### PATCH /projects/{project_id}/changesets/{cs_id}
Update a changeset's status.

---

### Evidence

Attach artifacts (test results, scans, etc.) to changesets to satisfy gate requirements.

#### POST /projects/{project_id}/changesets/{cs_id}/evidence
Attach evidence to a changeset. Auto-populates gate evidence requirements.

Request body:
- type (string, required) — unit_test, coverage, lint, security_scan, benchmark, migration_plan, ux_snapshot, a11y_audit, or ai_review
- summary (string, required) — Summary of the evidence
- file_refs (string[], optional) — File references

Response 201: Evidence object.

#### GET /projects/{project_id}/changesets/{cs_id}/evidence
List all evidence for a changeset.

---

### Reviews

Request and submit quality reviews on changesets. Reviews gate progression.

#### POST /projects/{project_id}/changesets/{cs_id}/reviews
Request a human review for a changeset.

Request body:
- role (string, required) — architect, qa_test, security, performance, reliability, accessibility, or docs_release

#### POST /projects/{project_id}/changesets/{cs_id}/reviews/ai
Request an AI-powered review. Uses Claude to analyze the changeset against the role's quality criteria. If approved, auto-satisfies the gate role requirement.

Request body: role (string, required)
Errors: 402 AI spend cap exceeded, 503 AI service unavailable.

#### POST /projects/{project_id}/changesets/{cs_id}/reviews/complete
Combined create and submit review in one call. Designed for MCP convenience.

Request body:
- role (string, required) — Review role
- status (string, required) — approved, blocked, or pending
- notes (string, required) — Review summary (minimum 20 chars for approvals)
- findings (object[], required) — Structured findings
- reviewer_id (string, optional) — Reviewer identifier
- reviewer_type (string, optional) — human or ai_agent
- evidence_refs (string[], optional) — Evidence IDs referenced

Anti-gaming: All changesets require at least one approval from a reviewer different from the changeset creator.

#### GET /projects/{project_id}/changesets/{cs_id}/reviews
List all reviews for a changeset.

#### PATCH /projects/{project_id}/changesets/{cs_id}/reviews/{rev_id}
Submit a decision on an existing review.

---

### Gates

Inspect and advance the governance gate pipeline for changesets.

#### GET /projects/{project_id}/changesets/{cs_id}/gates
Get the full gate pipeline. Shows all gates, requirements, completion status, and current active gate.

Response 200:
{
  "changeset_id": "cs_def",
  "current_gate": "design",
  "gates": [
    {"id": "intent", "status": "passed", "promoted_by": "local_agent", "promoted_at": "2026-02-25T10:05:00Z"},
    {"id": "design", "status": "pending", "required_evidence": ["ai_review"], "required_roles": ["architect"], "satisfied_evidence": [], "satisfied_roles": []}
  ]
}

#### POST /projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/promote
Promote a gate to passed. All required evidence and role reviews must be satisfied.

Gate IDs: intent, design, implementation, verification, hardening, release

Request body (optional):
- promoted_by (string) — Who is promoting (default: local)

Errors: 400 requirements not met.

#### POST /projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/reject
Reject a gate with a reason.

Request body:
- reason (string) — Rejection reason
- rejected_by (string) — Who is rejecting

#### POST /projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/skip
Skip a gate with a waiver. Only allowed for low-risk changesets (risk score 50 or below).

#### GET /projects/{project_id}/changesets/{cs_id}/release-check
Check if a changeset is ready for release.

Response 200:
{"can_release": true, "blockers": []}

---

### Billing

Subscription management, trials, and AI spend monitoring.

#### POST /api/billing/trial/start
Start a 14-day free Pro trial. Available to free-plan users who have not previously trialed.

Response 200:
{"plan": "pro", "plan_status": "trialing", "plan_expires_at": "2026-03-11T10:00:00Z"}

#### GET /api/billing/status
Get current plan and subscription state.

#### POST /api/billing/checkout
Create a Stripe Checkout session for plan upgrade. Returns checkout_url for browser redirect.

Request body:
- plan_id (string, required) — pro or enterprise

#### POST /api/billing/portal
Create a Stripe Customer Portal session for subscription management.

#### GET /api/billing/spend
Get current month AI spend summary.

Response 200:
{"org_id": "org_abc", "spend_usd": 12.34, "cap_usd": 50.00, "pct": 24.68, "period": "2026-02", "reset_at": "2026-03-01T00:00:00Z"}

#### GET /api/billing/spend/history
Get daily AI spend breakdown.
Query params: days (default 30, max 90)

---

### Shared Mind

Federated institutional knowledge — patterns, anti-patterns, and lessons shared across the team.

#### POST /api/shared-mind/{team_id}/observe
Record an observation.

Request body:
- domain (string, required) — Knowledge domain
- observation_type (string, required) — pattern, anti-pattern, fix-recipe, architecture-decision, or lesson
- content (string, required) — What was observed
- confidence (number, optional) — 0.0-1.0 (default: 0.8)
- tags (string[], optional) — Tags

#### GET /api/shared-mind/{team_id}/query
Query relevant knowledge for a context.

Query params:
- context (string, required) — Free-text context (keywords extracted automatically)
- domain (string, optional) — Domain filter

#### POST /api/shared-mind/{team_id}/consolidate
Trigger consolidation of raw observations into structured knowledge nodes.

#### GET /api/shared-mind/{team_id}/stats
Get aggregate statistics for a team's Shared Mind.

#### GET /api/shared-mind/{team_id}/domains
List all knowledge domains.

#### GET /api/shared-mind/{team_id}/domain/{domain}
Get consolidated knowledge for a specific domain. Returns patterns, anti-patterns, fix recipes, and architecture decisions.

---

### Sessions

Developer work sessions linking tasks to initiatives.

#### POST /projects/{project_id}/sessions
Start a new work session.

#### GET /projects/{project_id}/sessions/{session_id}
Get session details.

#### POST /projects/{project_id}/sessions/{session_id}/end
End a session.

#### POST /projects/{project_id}/sessions/{session_id}/tasks
Add a task to a session.

---

### Workflow

#### GET /workflow/{initiative_id}
Get current workflow state for an initiative. Returns current step, next actions, blockers, and progress percentage.

---

## MCP Server — 13 Governance Tools

Install: npm install -g @synctek/forgeos-mcp
NPX: npx -y @synctek/forgeos-mcp@latest
HTTP/SSE endpoint: https://mcp.forgeos.synctek.io/sse

### Session tools

#### forge_init
Initialize a ForgeOS governance session. Returns project state, active work, governance rules, and workflow runbook. Call this on every session start.

Parameters:
- project_id (string, required) — Project ID to initialize
- developer_id (string, optional) — Developer identifier (default: local)

#### forge_create_project
Create a new ForgeOS project. Projects are the top-level container for initiatives, changesets, and governance workflows.

Parameters:
- name (string, required) — Project name
- description (string, optional) — Project description
- platform (string, optional) — Target platform: web, mobile, api, cli, desktop, or other

### Initiative management

#### forge_create_initiative
Create a new initiative to track a piece of work. Returns the initiative with a generated ID.

Parameters:
- project_id (string, required) — Project ID
- title (string, required) — Initiative title
- description (string, required) — What this initiative accomplishes
- priority (string, optional) — low, medium, high, or critical

#### forge_get_workflow
Get the current workflow state for an initiative. Shows which step the developer is on, what is needed next, and overall progress.

Parameters:
- initiative_id (string, required) — Initiative ID

### Changeset lifecycle

#### forge_propose_changeset
Propose a changeset for an initiative. The engine computes a risk score and determines required gates, roles, and evidence. Returns the changeset with its risk profile and gate pipeline.

Parameters:
- project_id (string, required) — Project ID
- initiative_id (string, required) — Initiative this changeset belongs to
- description (string, required) — What changed and why
- files_changed (string[], required) — File paths that changed
- modules_affected (string[], required) — Module/area names affected
- branch (string, optional) — Git branch name

#### forge_submit_evidence
Submit evidence (test results, scan outputs, etc.) for a changeset. Auto-populates gate evidence requirements.

Parameters:
- project_id (string, required) — Project ID
- changeset_id (string, required) — Changeset ID
- type (string, required) — unit_test, coverage, lint, security_scan, benchmark, migration_plan, ux_snapshot, a11y_audit, or ai_review
- summary (string, required) — Summary of the evidence
- file_refs (string[], optional) — File references

### Review tools

#### forge_get_profile
Fetch a reviewer persona profile for local subagent injection. If project context is provided, the profile is enriched with Shared Mind patterns. Use the returned system_prompt as the subagent's instructions.

Parameters:
- role (string, required) — architect, qa_test, security, performance, reliability, accessibility, or docs_release
- project_id (string, optional) — Project ID for contextualization
- team_id (string, optional) — Team ID for Shared Mind context (default: default)
- modules_affected (string[], optional) — Modules to focus on
- files_changed (string[], optional) — Files to focus on

#### forge_submit_review
Submit a complete review with findings and verdict. Creates and finalizes the review in one call.

Parameters:
- project_id (string, required) — Project ID
- changeset_id (string, required) — Changeset ID
- role (string, required) — Review role (e.g., security, architect)
- status (string, required) — approved, blocked, or pending
- notes (string, required) — Review summary
- findings (object[], required) — Structured findings, each with: category, severity (pass/warning/concern/fail), observation, and optional recommendation

### Gate tools

#### forge_check_gates
Get the gate pipeline status for a changeset. Shows which gates are passed, pending, or failed, and what is needed to advance.

Parameters:
- project_id (string, required) — Project ID
- changeset_id (string, required) — Changeset ID

#### forge_promote_gate
Promote a gate to passed status. Requirements (evidence and roles) must be met. Advances the pipeline to the next gate.

Parameters:
- project_id (string, required) — Project ID
- changeset_id (string, required) — Changeset ID
- gate_id (string, required) — intent, design, implementation, verification, hardening, or release
- promoted_by (string, optional) — Who is promoting (default: local_agent)

#### forge_release_check
Check if a changeset is ready to release. Returns can_release status and any remaining blockers.

Parameters:
- project_id (string, required) — Project ID
- changeset_id (string, required) — Changeset ID

### Shared Mind tools

#### forge_query_mind
Search the Shared Mind for institutional knowledge. Returns patterns, anti-patterns, and lessons relevant to the context.

Parameters:
- context (string, required) — Search context (keywords, module names, etc.)
- team_id (string, optional) — Team ID (default: default)
- domain (string, optional) — Specific domain to search

#### forge_observe
Record an observation to the Shared Mind. Use when you discover patterns, anti-patterns, or lessons during development.

Parameters:
- domain (string, required) — Knowledge domain (e.g., module name, technology)
- observation_type (string, required) — pattern, anti-pattern, fix-recipe, architecture-decision, or lesson
- content (string, required) — What was observed
- team_id (string, optional) — Team ID (default: default)
- confidence (number, optional) — Confidence 0.0-1.0 (default: 0.8)
- tags (string[], optional) — Tags for categorization

### Typical MCP workflow

1. forge_init(project_id)                        -> session context
2. forge_create_initiative(project_id, title, …)  -> initiative created
3. forge_propose_changeset(project_id, …)         -> risk score, gate pipeline
4. forge_submit_evidence(project_id, cs_id, …)    -> evidence attached
5. forge_get_profile(role="security")             -> reviewer prompt
6. forge_submit_review(project_id, cs_id, …)      -> review recorded
7. forge_check_gates(project_id, cs_id)           -> gate status
8. forge_promote_gate(project_id, cs_id, gate_id) -> gate advanced
9. forge_release_check(project_id, cs_id)         -> ready to ship
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
