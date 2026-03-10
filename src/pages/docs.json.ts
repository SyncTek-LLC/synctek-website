import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const spec = {
    name: 'ForgeOS',
    description:
      'A governance engine for AI agents. Enforces constitutional rules, gate-based change pipelines, Ed25519-signed audit trails, and circuit breakers so AI agents can ship code safely.',
    version: '2.1.2',
    base_url: 'https://forgeos-api.synctek.io',
    mcp_sse_url: 'https://mcp.synctek.io/mcp',
    mcp_package: '@synctek/forgeos',
    full_docs_text: 'https://synctek.io/llms-full.txt',
    auth: {
      methods: [
        {
          type: 'api_key',
          header: 'X-ForgeOS-API-Key',
          prefix: 'fos_',
          description: 'Recommended for MCP servers, CI/CD, and programmatic access',
        },
        {
          type: 'session_cookie',
          cookie_name: 'forge_session',
          description: 'Set by POST /auth/login. For browser-based access.',
        },
      ],
      auth_note: 'Public endpoints: login, registration. All other endpoints require API key or session.',
    },
    rate_limits: [
      { tier: 'free', requests_per_month: 1000, requests_per_minute: 20, ai_review_limit: null },
      { tier: 'pro', price_usd_per_month: 49, requests_per_month: 50000, requests_per_minute: 100, ai_review_limit: '10/min' },
      { tier: 'team', price_usd_per_seat_per_month: 29, minimum_seats: 3, requests_per_month: 200000, requests_per_minute: 100, ai_review_limit: '10/min' },
      { tier: 'enterprise', requests_per_month: 'custom', requests_per_minute: 'custom', ai_review_limit: 'custom' },
    ],
    categories: [
      {
        name: 'Auth',
        description: 'Authentication, registration, and session management',
        endpoints: [
          { method: 'POST', path: '/auth/register', description: 'Create a new user account', auth_required: false },
          { method: 'POST', path: '/auth/login', description: 'Authenticate and create a session. Sets forge_session and forge_csrf cookies.', auth_required: false },
          { method: 'POST', path: '/auth/logout', description: 'Invalidate the current session and clear cookies', auth_required: true },
          { method: 'GET', path: '/auth/me', description: 'Get the current authenticated user info', auth_required: true },
          { method: 'POST', path: '/auth/register-agent', description: 'Register an autonomous agent identity. Returns API key scoped to the agent.', auth_required: false },
        ],
      },
      {
        name: 'Projects',
        description: 'CRUD operations for projects',
        endpoints: [
          { method: 'POST', path: '/api/projects', description: 'Create a new project. Optionally import existing codebase with source_directory.', auth_required: true },
          { method: 'GET', path: '/api/projects', description: 'List all projects (lightweight summaries)', auth_required: true },
          { method: 'GET', path: '/api/projects/{project_id}', description: 'Retrieve a single project by ID', auth_required: true },
          { method: 'DELETE', path: '/api/projects/{project_id}', description: 'Delete a project. Governance ledger preserved for audit.', auth_required: true },
        ],
      },
      {
        name: 'Initiatives',
        description: 'Track units of work within a project',
        endpoints: [
          { method: 'POST', path: '/projects/{project_id}/initiatives', description: 'Create a new initiative', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/initiatives', description: 'List all initiatives. Filter by status: active, completed, abandoned.', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/initiatives/{init_id}', description: 'Retrieve a single initiative', auth_required: true },
          { method: 'PATCH', path: '/projects/{project_id}/initiatives/{init_id}', description: 'Update initiative status or priority', auth_required: true },
        ],
      },
      {
        name: 'Changesets',
        description: 'Propose and track code changes with auto-computed risk profiles',
        endpoints: [
          { method: 'POST', path: '/projects/{project_id}/changesets', description: 'Propose a new changeset. Auto-computes risk score and creates gate pipeline.', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/changesets', description: 'List all changesets. Optional status filter.', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/changesets/{cs_id}', description: 'Retrieve a changeset with risk profile and gate pipeline', auth_required: true },
          { method: 'PATCH', path: '/projects/{project_id}/changesets/{cs_id}', description: "Update a changeset's status", auth_required: true },
        ],
      },
      {
        name: 'Evidence',
        description: 'Attach artifacts (test results, scans, etc.) to changesets to satisfy gate requirements',
        endpoints: [
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/evidence', description: 'Attach evidence to a changeset. Types: unit_test, coverage, lint, security_scan, benchmark, migration_plan, ux_snapshot, a11y_audit, ai_review.', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/changesets/{cs_id}/evidence', description: 'List all evidence for a changeset', auth_required: true },
        ],
      },
      {
        name: 'Reviews',
        description: 'Request and submit quality reviews on changesets. Reviews gate progression.',
        endpoints: [
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/reviews', description: 'Request a human review. Roles: architect, qa_test, security, performance, reliability, accessibility, docs_release.', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/reviews/ai', description: 'Request an AI-powered review using Claude. Auto-satisfies gate role requirement if approved.', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/reviews/complete', description: 'Combined create and submit review in one call. Designed for MCP convenience.', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/changesets/{cs_id}/reviews', description: 'List all reviews for a changeset', auth_required: true },
          { method: 'PATCH', path: '/projects/{project_id}/changesets/{cs_id}/reviews/{rev_id}', description: 'Submit a decision on an existing review', auth_required: true },
        ],
      },
      {
        name: 'Gates',
        description: 'Inspect and advance the governance gate pipeline for changesets',
        gate_ids: ['intent', 'design', 'implementation', 'verification', 'hardening', 'release'],
        endpoints: [
          { method: 'GET', path: '/projects/{project_id}/changesets/{cs_id}/gates', description: 'Get the full gate pipeline with requirements, completion status, and current active gate', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/promote', description: 'Promote a gate to passed. All required evidence and role reviews must be satisfied.', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/reject', description: 'Reject a gate with a reason', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/changesets/{cs_id}/gates/{gate_id}/skip', description: 'Skip a gate with a waiver. Only for low-risk changesets (risk score <= 50).', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/changesets/{cs_id}/release-check', description: 'Check if a changeset is ready for release. Returns can_release and blockers.', auth_required: true },
        ],
      },
      {
        name: 'Billing',
        description: 'Subscription management, trials, and AI spend monitoring',
        endpoints: [
          { method: 'POST', path: '/api/billing/trial/start', description: 'Start a 14-day free Pro trial. Available to free-plan users who have not previously trialed.', auth_required: true },
          { method: 'GET', path: '/api/billing/status', description: 'Get current plan and subscription state', auth_required: true },
          { method: 'POST', path: '/api/billing/checkout', description: 'Create a Stripe Checkout session for plan upgrade. Returns checkout_url.', auth_required: true },
          { method: 'POST', path: '/api/billing/portal', description: 'Create a Stripe Customer Portal session for subscription management', auth_required: true },
          { method: 'GET', path: '/api/billing/spend', description: 'Get current month AI spend summary (spend_usd, cap_usd, pct, period)', auth_required: true },
          { method: 'GET', path: '/api/billing/spend/history', description: 'Get daily AI spend breakdown. Query param: days (default 30, max 90).', auth_required: true },
        ],
      },
      {
        name: 'Shared Mind',
        description: 'Federated institutional knowledge - patterns, anti-patterns, and lessons shared across the team',
        endpoints: [
          { method: 'POST', path: '/api/shared-mind/{team_id}/observe', description: 'Record an observation. Types: pattern, anti-pattern, fix-recipe, architecture-decision, lesson.', auth_required: true },
          { method: 'GET', path: '/api/shared-mind/{team_id}/query', description: 'Query relevant knowledge for a context. Params: context (required), domain (optional).', auth_required: true },
          { method: 'POST', path: '/api/shared-mind/{team_id}/consolidate', description: 'Trigger consolidation of raw observations into structured knowledge nodes', auth_required: true },
          { method: 'GET', path: '/api/shared-mind/{team_id}/stats', description: "Get aggregate statistics for a team's Shared Mind", auth_required: true },
          { method: 'GET', path: '/api/shared-mind/{team_id}/domains', description: 'List all knowledge domains', auth_required: true },
          { method: 'GET', path: '/api/shared-mind/{team_id}/domain/{domain}', description: 'Get consolidated knowledge for a specific domain. Returns patterns, anti-patterns, fix recipes, architecture decisions.', auth_required: true },
        ],
      },
      {
        name: 'Sessions',
        description: 'Developer work sessions linking tasks to initiatives',
        endpoints: [
          { method: 'POST', path: '/projects/{project_id}/sessions', description: 'Start a new work session', auth_required: true },
          { method: 'GET', path: '/projects/{project_id}/sessions/{session_id}', description: 'Get session details', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/sessions/{session_id}/end', description: 'End a session', auth_required: true },
          { method: 'POST', path: '/projects/{project_id}/sessions/{session_id}/tasks', description: 'Add a task to a session', auth_required: true },
        ],
      },
      {
        name: 'Workflow',
        description: 'Initiative workflow state and next-step guidance',
        endpoints: [
          { method: 'GET', path: '/workflow/{initiative_id}', description: 'Get current workflow state. Returns current step, next actions, blockers, and progress percentage.', auth_required: true },
        ],
      },
      {
        name: 'FTI - Trust Scoring API',
        description: 'ForgeOS Trust Index scoring endpoints. Bundled with ForgeOS plans (Free: 5 scores/day; Pro/Team/Enterprise: unlimited). Standalone metered access available without a ForgeOS subscription.',
        auth_note: 'ForgeOS subscribers: use X-ForgeOS-API-Key. Standalone metered access: use X-FTI-API-Key. GET /v1/methodology is public, no auth required.',
        endpoints: [
          { method: 'POST', path: '/v1/score', description: 'Score a package or agent across all 8 FTI dimensions (security, maintainability, documentation, community_health, supply_chain, improvement_velocity, governance, operational). Returns signed Ed25519 score 0–100 with tier classification. Metered: $0.003/call for standalone API users.', auth_required: true },
          { method: 'POST', path: '/v1/recommend', description: 'Get trust-based recommendations for a package given your context (compliance, prototype, production). Returns ranked alternatives if the package scores below threshold. Metered: $0.005/call for standalone API users.', auth_required: true },
          { method: 'POST', path: '/v1/compare', description: 'Compare two or more packages side-by-side across all 8 FTI dimensions. Returns dimension-by-dimension breakdown and contextual recommendation. Metered: $0.008/call for standalone API users.', auth_required: true },
          { method: 'GET', path: '/v1/methodology', description: 'Retrieve FTI dimension definitions, scoring weights, tier thresholds, and algorithm version. Machine-readable. Free and public - no API key required.', auth_required: false },
        ],
        fti_pricing: {
          bundled_with_forgeos: true,
          standalone_metered: true,
          rates: [
            { endpoint: 'POST /v1/score', price_usd_per_call: 0.003 },
            { endpoint: 'POST /v1/recommend', price_usd_per_call: 0.005 },
            { endpoint: 'POST /v1/compare', price_usd_per_call: 0.008 },
            { endpoint: 'GET /v1/methodology', price_usd_per_call: 0, public: true },
          ],
          volume_discount_threshold: 100000,
        },
      },
    ],
    mcp_tools: [
      { name: 'forge_init', category: 'session', description: 'Initialize a ForgeOS governance session. Returns project state, active work, governance rules, and workflow runbook.' },
      { name: 'forge_create_project', category: 'session', description: 'Create a new ForgeOS project.' },
      { name: 'forge_create_initiative', category: 'initiative_management', description: 'Create a new initiative to track a piece of work.' },
      { name: 'forge_get_workflow', category: 'initiative_management', description: 'Get the current workflow state for an initiative.' },
      { name: 'forge_propose_changeset', category: 'changeset_lifecycle', description: 'Propose a changeset. Engine computes risk score and determines required gates, roles, and evidence.' },
      { name: 'forge_submit_evidence', category: 'changeset_lifecycle', description: 'Submit evidence (test results, scan outputs, etc.) for a changeset.' },
      { name: 'forge_get_profile', category: 'review', description: 'Fetch a reviewer persona profile for local subagent injection, enriched with Shared Mind patterns.' },
      { name: 'forge_submit_review', category: 'review', description: 'Submit a complete review with findings and verdict in one call.' },
      { name: 'forge_check_gates', category: 'gates', description: 'Get the gate pipeline status for a changeset.' },
      { name: 'forge_promote_gate', category: 'gates', description: 'Promote a gate to passed. Advances the pipeline to the next gate.' },
      { name: 'forge_release_check', category: 'gates', description: 'Check if a changeset is ready to release.' },
      { name: 'forge_query_mind', category: 'shared_mind', description: 'Search the Shared Mind for institutional knowledge.' },
      { name: 'forge_observe', category: 'shared_mind', description: 'Record an observation to the Shared Mind.' },
      { name: 'forge_quickstart', category: 'setup_discovery', description: 'Create a sandbox project and run a complete governance cycle in seconds. Perfect for first-time setup and testing. Takes no parameters.' },
      { name: 'forge_discover', category: 'setup_discovery', description: 'Analyze your repository and get a recommended governance configuration based on your tech stack. Returns recommended preset, template, evidence mapping, and CI hints.' },
      { name: 'forge_get_context', category: 'setup_discovery', description: 'Get comprehensive context for a changeset including Shared Mind patterns, quality warnings, past regressions, and relevant lessons.' },
      { name: 'forge_get_presets', category: 'setup_discovery', description: 'List available governance presets (Startup, Enterprise, Regulated, Mobile Release QA). Takes no parameters.' },
      { name: 'forge_configure_project_gates', category: 'setup_discovery', description: 'Configure the governance gate template for a project using a preset or custom template.' },
      { name: 'forge_recommend_gates', category: 'setup_discovery', description: 'Get a gate recommendation for a changeset based on risk analysis. Returns risk analysis, recommended gates, minimum gates, and rationale.' },
      { name: 'forge_scorecard', category: 'setup_discovery', description: 'Check your ForgeOS setup completeness. Shows which onboarding steps are done and what to do next. Takes no parameters.' },
      { name: 'forge_workflow_template', category: 'setup_discovery', description: 'Get copy-paste workflow templates for common scenarios (bugfix, feature, hotfix, release candidate).' },
    ],
  };

  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
