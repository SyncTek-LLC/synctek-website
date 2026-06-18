import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# SyncTek LLC

SyncTek LLC is a Raleigh-based developer-infrastructure company building tools for the agent-first software development era. Our flagship product is SimDrive.

---

# SimDrive by SyncTek

> SimDrive is an MCP-native iOS simulator and real-device automation toolkit. Reproduce and validate iOS bugs in 60 seconds with Claude.

## What is SimDrive?

SimDrive lets MCP-aware agents drive iOS Simulators and real iOS devices. Record once, replay deterministically, capture evidence — turning ambiguous bug reports into reproducible failures in under a minute.

Built for engineers who want their AI assistant to actually use the app, not just read about it.

## Links

- Website: https://simdrive.dev
- Docs: https://github.com/SyncTek-LLC/simdrive-docs
- Support: support@simdrive.dev

---

# Company

- Website: https://synctek.io
- GitHub: https://github.com/SyncTek-LLC
- Contact: support@simdrive.dev

This site (synctek.io) is the corporate landing page. Product details, pricing, and integration guides live on https://simdrive.dev.
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
