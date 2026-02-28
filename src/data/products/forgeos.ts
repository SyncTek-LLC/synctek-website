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
    docs: '/docs/',
  },

  distribution: {
    dashboard: 'https://forgeos.synctek.io',
    api: 'https://forgeos-api.synctek.io',
    mcp: 'https://mcp.synctek.io',
    npm: '@synctek/forgeos',
  },

  pricing: [
    { tier: 'Pro', price: '$49/mo', description: 'Single operator, full enforcement suite' },
    { tier: 'Enterprise', price: '$2,000/mo', description: 'Unlimited operators, dedicated tenant, SLA, DPA, security questionnaire' },
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
      title: 'MCP server (21 tools)',
      description: 'Drop ForgeOS into Claude Desktop, Cursor, or any MCP-compatible agent. Works with Claude, GPT, Gemini, and local models.',
      icon: 'plug',
    },
    {
      title: 'forge CLI',
      description: '18 command groups, 44 subcommands. Run gate checks, query SharedMind, manage projects, and inspect the trust ledger directly from your terminal.',
      icon: 'code',
    },
    {
      title: 'SharedMind',
      description: 'Institutional memory that persists across sessions. Patterns, anti-patterns, and lessons are stored and surfaced automatically — your AI agents learn from past work.',
      icon: 'workflow',
    },
    {
      title: 'Federation',
      description: 'Protocol-based interfaces let multiple teams and products share governance infrastructure. Improvements propagate across all layers.',
      icon: 'shield',
    },
    {
      title: 'Stripe billing built in',
      description: 'Subscription billing with AI spend caps, enforced at the API layer. No payment, no access.',
      icon: 'user',
    },
  ],

  overview:
    'ForgeOS is the governance OS for teams running agentic software pipelines. It is not an AI — it is the persistent enforcement, memory, and trust layer that sits between your AI agents and your infrastructure.\n\nEvery commit, every deploy, every inter-agent delegation passes through a configurable gate. Gates require artifacts — architecture approvals, QA sign-offs, security reviews — before the next phase unlocks. No artifact, no execution.\n\nThe audit ledger is Ed25519-signed and hash-chained. Every action is attributed, ordered, and tamper-evident. When something goes wrong, you trace it in seconds, not hours.\n\nSharedMind is the institutional memory layer — patterns, anti-patterns, and lessons persist across sessions and are surfaced automatically to any agent that connects. Your AI agents get smarter every cycle, without manual curation.\n\nShips as an MCP server (21 tools), a CLI (forge — 18 command groups, 44 subcommands), and a REST API. Works with any MCP-compatible agent: Claude, GPT, Gemini, or local models. Connect via MCP with your ForgeOS API key — your AI model keys stay with you. Raw source code stays local — ForgeOS analyzes project metadata (file structure, languages, dependencies) but never uploads file contents.',

  tradeoffs: [
    'Commercial hosted service — the CLI is MIT-licensed, but the ForgeOS API requires a paid subscription.',
    'Requires integrating gate checks into your agent workflow.',
    'MCP server requires a running ForgeOS instance (cloud-hosted).',
    'Full enforcement mode blocks non-compliant actions — intentional, but plan for it.',
    'Cloud-connected — governance operations require network access to the ForgeOS API. No offline mode.',
    'Rate limits apply per plan tier — higher tiers unlock more API throughput for larger teams.',
  ],
} as const;
