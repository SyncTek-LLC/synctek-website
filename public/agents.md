# ForgeOS Agent Integration Guide

This document is written for AI agents (Claude, GPT-4, Gemini, Cursor, etc.) integrating
ForgeOS governance into their workflows.

## Domain Concepts

- **Initiative:** A discrete unit of work with a defined scope, owner, and gate pathway.
  Create one per feature, bug fix, or infrastructure change.
- **Gate:** An approval checkpoint. Each initiative passes through gates (intent → design →
  implementation → verification → hardening → release). Code cannot be written before the
  appropriate gate is approved.
- **Changeset:** A proposed set of changes for an initiative. The engine computes a risk
  score and determines required gates, roles, and evidence.
- **Delegation:** An assignment from one agent to another. Tracked, time-bound, auditable.
- **Shared Mind:** Federated institutional knowledge — patterns, anti-patterns, and lessons
  shared across all agents on a team.
- **Audit Trail:** Hash-chained ledger of all events. Tamper-evident. Required for EU AI Act.

## Available MCP Tools

| Tool | Description | Required Scope |
|------|-------------|----------------|
| `forge_init` | Initialize a governance session — returns project state, rules, runbook | read |
| `forge_create_project` | Create a new ForgeOS project. Projects are the top-level container for initiatives, changesets, and governance workflows. | write |
| `forge_create_initiative` | Create a new initiative to track work | write |
| `forge_propose_changeset` | Propose a changeset — auto-computes risk and gate pipeline | write |
| `forge_get_profile` | Fetch a reviewer persona profile for subagent injection | read |
| `forge_submit_evidence` | Submit evidence (tests, scans) for a changeset | write |
| `forge_submit_review` | Submit a complete review with findings and verdict | write |
| `forge_check_gates` | Get gate pipeline status for a changeset | read |
| `forge_promote_gate` | Promote a gate to passed (requirements must be met) | write |
| `forge_release_check` | Check if a changeset is ready to release | read |
| `forge_query_mind` | Search Shared Mind for institutional knowledge | read |
| `forge_observe` | Record an observation to the Shared Mind | write |
| `forge_get_workflow` | Get current workflow state for an initiative | read |
| `forge_quickstart` | Create a sandbox project and run a complete governance cycle in seconds — for first-time setup and testing | none |
| `forge_discover` | Analyze your repository and get a recommended governance configuration based on your tech stack | read |
| `forge_get_context` | Get comprehensive context for a changeset including Shared Mind patterns, quality warnings, past regressions, and lessons | read |
| `forge_get_presets` | List available governance presets (Startup, Enterprise, Regulated, Mobile Release QA) | read |
| `forge_configure_project_gates` | Configure the governance gate template for a project using a preset or custom template | write |
| `forge_recommend_gates` | Get a gate recommendation for a changeset based on risk analysis | read |
| `forge_scorecard` | Check your ForgeOS setup completeness and onboarding progress | read |
| `forge_workflow_template` | Get copy-paste workflow templates for common scenarios (bugfix, feature, hotfix, release candidate) | read |

## Integration Patterns

### Pattern 1: Governance for a coding agent

```
1. forge_init(project_id)                           → session context
2. forge_create_initiative(project_id, title, ...)   → initiative created
3. forge_propose_changeset(project_id, ...)          → risk score, gate pipeline
4. forge_submit_evidence(project_id, cs_id, ...)     → evidence attached
5. forge_get_profile(role="security")                → reviewer system_prompt
6. forge_submit_review(project_id, cs_id, ...)       → review recorded
7. forge_check_gates(project_id, cs_id)              → gate status
8. forge_promote_gate(project_id, cs_id, gate_id)    → gate advanced
9. forge_release_check(project_id, cs_id)            → ready to ship
```

### Pattern 2: Compliance audit trail

```
1. forge_check_gates(project_id, cs_id)  → gate pipeline with timestamps
2. forge_query_mind(context="compliance") → institutional compliance patterns
```

### Pattern 3: Knowledge-first development

```
1. forge_query_mind(context="auth middleware")  → known patterns and anti-patterns
2. [apply knowledge to avoid known pitfalls]
3. forge_observe(domain="auth", type="lesson", content="...") → record new lessons
```

## Authentication

All API calls require the `X-ForgeOS-API-Key` header with a `fos_`-prefixed key.

**MCP stdio:** Set the `FORGEOS_API_KEY` environment variable.

**MCP HTTP/SSE:** Include `X-ForgeOS-API-Key: fos_your_key_here` header.

**REST API:** Include `X-ForgeOS-API-Key: fos_your_key_here` header on every request.

Obtain a key at https://synctek.io/docs/auth/.

## Rate Limits

| Tier | Requests/month | Requests/minute | Burst |
|------|---------------|-----------------|-------|
| Free | 1,000 | 20 | 40 for 10s |
| Pro | 50,000 | 100 | 200 for 10s |
| Team | 200,000 | 200 | 400 for 10s |
| Enterprise | Custom | Custom | Custom |

On 429, respect the `Retry-After` header. Exponential backoff from that value. Max 3 retries before surfacing to a human operator.

## Error Codes

| Code | Meaning | Recovery |
|------|---------|----------|
| 401 | Invalid API key | Check FORGEOS_API_KEY |
| 402 | AI spend cap exceeded | Upgrade plan or wait for monthly reset |
| 403 | Insufficient scope | Upgrade plan or request write scope |
| 409 | Conflict (e.g., gate not ready) | Check gate requirements, submit artifacts |
| 429 | Rate limit exceeded | Back off, retry after Retry-After header |

## SpecterQA

SpecterQA is SyncTek's AI-powered QA testing product. It generates and runs test suites
programmatically, designed to integrate with agent-driven development pipelines.

- Product page: https://synctek.io/products/specterqa/
- Pairs with ForgeOS: SpecterQA can be wired as the QA gate approver in a ForgeOS workflow.
  Use `forge_submit_review(role="qa_test")` after SpecterQA completes a test run.

## Additional Resources

- [Full Documentation](https://synctek.io/docs/): Quickstart, MCP setup, API reference
- [MCP Server Metadata](https://synctek.io/.well-known/mcp.json): Transport options, tool list
- [A2A Agent Card](https://synctek.io/.well-known/agent.json): Google A2A discovery
- [Pricing](https://synctek.io/products/forgeos/pricing/): Per-API-call pricing
- [Quickstart](https://synctek.io/docs/quickstart/): First governance command in 3 minutes
