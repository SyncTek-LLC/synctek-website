export default {
  slug: 'forgeos',
  name: 'ForgeOS',
  tagline: 'The governance OS for agentic software teams',
  type: 'Platform',
  status: 'launched',
  license: 'Commercial',
  accentColor: '#FF8255',

  href: '/products/forgeos/',

  ctaType: 'login' as const,
  loginUrl: 'https://forgeos.synctek.io/login',
  dashboardUrl: 'https://forgeos.synctek.io',
  support: {
    email: 'support@synctek.io',
    github: 'SyncTek-LLC/forgeos',
    docs: '/docs/forgeos/',
  },

  distribution: {
    dashboard: 'https://forgeos.synctek.io',
    api: 'https://forgeos-api.synctek.io',
    mcp: 'https://mcp.synctek.io',
    npm: '@synctek/forgeos-mcp',
  },

  pricing: [
    { tier: 'Pro', price: '$49/mo', description: 'Single operator, full enforcement suite' },
    { tier: 'Team', price: '$149/mo', description: 'Up to 10 agents, shared audit ledger' },
    { tier: 'Enterprise', price: '$2,000/mo', description: 'Unlimited agents, SLA, custom domains' },
  ],

  features: [
    {
      title: 'Enforcement gates',
      description: 'Every commit, deploy, and delegation passes through configurable governance gates before execution.',
      icon: 'shield',
    },
    {
      title: 'Ed25519-signed audit ledger',
      description: 'Hash-chained, cryptographically signed event trail. Every action is attributable and tamper-evident.',
      icon: 'code',
    },
    {
      title: 'MCP server (12 tools)',
      description: 'Drop ForgeOS into Claude Desktop, Cursor, or any MCP-compatible agent in minutes.',
      icon: 'plug',
    },
    {
      title: 'Agent-to-agent signals',
      description: 'Priority-tiered inter-agent communication with SLA tracking and auto-escalation to human operators.',
      icon: 'workflow',
    },
    {
      title: 'Circuit breakers',
      description: 'Autonomous execution safety: consecutive failure detection halts runaway agents before damage spreads.',
      icon: 'eye',
    },
    {
      title: 'Stripe billing built in',
      description: 'Per-seat and usage-based billing enforced at the gate layer. No payment gate, no deployment.',
      icon: 'user',
    },
  ],

  overview:
    'ForgeOS is the operating system layer for teams running agentic software pipelines. It sits between your agents and your infrastructure, enforcing governance gates before every consequential action.\n\nEvery commit, every deploy, every inter-agent delegation passes through a configurable gate. Gates require artifacts — architecture approvals, QA sign-offs, security reviews — before the next phase unlocks. No artifact, no execution.\n\nThe audit ledger is Ed25519-signed and hash-chained. Every action is attributed, ordered, and tamper-evident. When something goes wrong, you trace it in seconds, not hours.\n\nShips as an MCP server (12 tools), a REST API, and a CLI. Your agents connect once and inherit full governance. Your human operators get a dashboard, Telegram alerts, and a signal queue.',

  tradeoffs: [
    'Commercial license — not free. Governance infrastructure has real costs.',
    'Requires integrating gate checks into your agent workflow.',
    'MCP server requires a running ForgeOS instance (cloud or self-hosted).',
    'Full enforcement mode blocks non-compliant actions — intentional, but plan for it.',
  ],
} as const;
