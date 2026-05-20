import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# SyncTek LLC — Full Reference for AI Agents

SyncTek LLC is a Raleigh-based developer-infrastructure company. Our flagship product is SimDrive, an MCP-native iOS automation toolkit.

For SimDrive's full documentation, integration guides, MCP tool reference, and pricing, see:

- https://simdrive.dev
- https://docs.simdrive.dev

For company inquiries: hello@synctek.io
For SimDrive support: support@simdrive.dev
GitHub: https://github.com/SyncTek-LLC

This synctek.io site is the corporate landing page only. Authoritative product information lives on simdrive.dev.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
