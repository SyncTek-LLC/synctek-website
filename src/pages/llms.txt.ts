import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# SyncTek LLC — Products for AI Agents and Developers

SyncTek builds developer tools for the agentic era. Current products: ForgeOS (governance OS for AI agents) and SpecterQA iOS (AI-native iOS simulator testing).

---

# ForgeOS by SyncTek

> ForgeOS is a governance engine for AI agents. It enforces constitutional rules, gate-based change pipelines, Ed25519-signed audit trails, and circuit breakers so AI agents can ship code safely without human babysitting.

## What is ForgeOS?

ForgeOS sits between your AI agent and your codebase. Every change goes through a pipeline of gates — intent, design, implementation, verification, hardening, release — with required evidence and reviews at each stage. The engine computes a risk score for every changeset and determines which gates, reviewer roles, and evidence types are required.

The MCP server exposes 21 governance tools any MCP-compatible agent (Claude, GPT-4, Gemini, local models) can call natively. No custom SDK required.

## Quick links

- Quickstart guide: https://synctek.io/docs/quickstart/
- Authentication reference: https://synctek.io/docs/auth/
- MCP server setup: https://synctek.io/docs/mcp/
- REST API reference: https://synctek.io/docs/api/
- Full docs as plain text: https://synctek.io/llms-full.txt
- Structured endpoint index: https://synctek.io/docs.json

## Engine API

- Base URL: https://forgeos-api.synctek.io

## MCP server

Install: npm install -g @synctek/forgeos
NPX: npx -y @synctek/forgeos@latest
HTTP/SSE endpoint: https://mcp.synctek.io/mcp

## Auth

All API requests require either:
- X-ForgeOS-API-Key: fos_your_key header
- forge_session cookie (set by POST /auth/login)

Authentication and registration endpoints are public. All other endpoints require authentication.

---

# SpecterQA iOS by SyncTek

> SpecterQA iOS is an AI-native iOS simulator testing tool. Record test sessions once with Claude, replay them free forever in CI. 19 MCP tools for agent-driven iOS QA.

## What is SpecterQA iOS?

SpecterQA iOS records test sessions using Claude's vision capabilities and Set-of-Mark prompting — achieving 90% tap accuracy on iOS simulator elements without brittle selectors or coordinate guessing. Once recorded, sessions are saved as deterministic YAML replay files. Every CI run executes the replay engine, which never calls the Anthropic API. You pay for AI tokens once; replay is free.

The MCP server exposes 19 tools making SpecterQA natively callable from Claude Code, Claude Desktop, or any MCP-compatible orchestrator. It is A2A discoverable via .well-known/agent.json.

## Install

pip install 'specterqa-ios[mcp]'

Requires: macOS + Xcode 15+, Python 3.10+, ANTHROPIC_API_KEY (record phase only)

## MCP server config

Add to .claude/mcp.json or claude_desktop_config.json:
{
  "mcpServers": {
    "specterqa-ios": {
      "command": "specterqa-ios-mcp",
      "env": { "ANTHROPIC_API_KEY": "sk-ant-..." }
    }
  }
}

## CLI usage

specterqa-ios setup                              # verify Xcode + simulators
specterqa-ios init                               # scaffold .specterqa/ project
specterqa-ios run --product myapp --journey smoke  # record (AI-driven, costs tokens once)
specterqa-ios replay .specterqa/replays/smoke.yaml # replay (free, deterministic)
specterqa-ios ci .specterqa/replays/             # replay all in CI
specterqa-ios ci --parallel 4                    # parallel CI (~10x faster)

## Pricing

Trial: Free — 1 simulator, 3 runs/session
Indie: $29/mo — 2 simulators, unlimited runs
Pro: $99/mo — 4 simulators, unlimited runs, parallel CI
Team: $299/mo — 10 simulators, parallel CI, priority support
Enterprise: Custom — unlimited simulators, SLA

BYOK required. Replay is always free regardless of tier.

## Key facts

- 90% tap accuracy via Set-of-Mark prompting
- Maestro YAML compatible (tapOn, inputText, assertVisible, assertNotVisible, waitFor)
- 19 MCP tools: boot_simulator, install_app, record_session, replay_session, run_ci, run_smoke, list_devices, capture_screenshot, run_accessibility_audit, detect_crash, inspect_network, and more
- A2A agent card: https://github.com/SyncTek-LLC/specterqa-ios/blob/main/.well-known/agent.json
- License: Elastic License 2.0
- Version: 11.3.0
- Homepage: https://synctek.io/products/specterqa-ios
- GitHub: https://github.com/SyncTek-LLC/specterqa-ios
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
