import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# ForgeOS by SyncTek

> ForgeOS is a governance engine for AI agents. It enforces constitutional rules, gate-based change pipelines, Ed25519-signed audit trails, and circuit breakers so AI agents can ship code safely without human babysitting.

## What is ForgeOS?

ForgeOS sits between your AI agent and your codebase. Every change goes through a pipeline of gates — intent, design, implementation, verification, hardening, release — with required evidence and reviews at each stage. The engine computes a risk score for every changeset and determines which gates, reviewer roles, and evidence types are required.

The MCP server exposes 13 governance tools any MCP-compatible agent (Claude, GPT-4, Gemini, local models) can call natively. No custom SDK required.

## Quick links

- Quickstart guide: https://synctek.io/docs/quickstart/
- Authentication reference: https://synctek.io/docs/auth/
- MCP server setup: https://synctek.io/docs/mcp/
- REST API reference: https://synctek.io/docs/api/
- Full docs as plain text: https://synctek.io/llms-full.txt
- Structured endpoint index: https://synctek.io/docs.json

## Engine API

- Interactive docs: https://forgeos-api.synctek.io/docs
- OpenAPI spec: https://forgeos-api.synctek.io/openapi.json
- Base URL: https://forgeos-api.synctek.io

## MCP server

Install: npm install -g @synctek/forgeos
NPX: npx -y @synctek/forgeos@latest
HTTP/SSE endpoint: https://mcp.forgeos.synctek.io/sse

## Auth

All API requests require either:
- X-ForgeOS-API-Key: fos_your_key header
- forge_session cookie (set by POST /auth/login)

No-auth endpoints: /health, /auth/login, /auth/register, /auth/register-agent
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
