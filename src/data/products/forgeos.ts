export default {
  slug: 'forgeos',
  name: 'ForgeOS',
  tagline: 'The governance OS for agentic software teams',
  type: 'Platform',
  status: 'launched',
  license: 'Commercial',
  accentColor: '#3B82F6',

  href: '/products/forgeos/',

  ctaType: 'login' as const,
  loginUrl: 'https://forgeos.synctek.io/',
  dashboardUrl: 'https://forgeos.synctek.io',
  support: {
    email: 'support@synctek.io',
    github: 'SyncTek-LLC/forgeos',
    docs: '/docs/',
  },

  distribution: {
    dashboard: 'https://forgeos.synctek.io',
    api: 'https://forgeos-api.synctek.io',
    mcp: 'https://mcp.synctek.io/mcp',
    npm: '@synctek/forgeos',
  },

  fti: {
    shieldBadgeUrl: 'https://forgeos-api.synctek.io/v1/badge/npm/synctek/forgeos/shield',
    flatBadgeUrl: 'https://forgeos-api.synctek.io/v1/badge/npm/synctek/forgeos/flat',
    trustProfileUrl: '/products/forgeos/fti/',
    apiScoreUrl: 'https://forgeos-api.synctek.io/v1/trust/npm/synctek/forgeos',
    compositeScore: 82.0,
    scores: {
      security: 97.0,
      maintainability: 78.4,
      documentation: 91.4,
      community_health: 43.1,
      supply_chain: 80.0,
      improvement_velocity: 50.0,
      governance: 87.0,
      operational: 92.0,
    },
  },

  pricing: [
    { tier: 'Free', price: '$0', description: '1,000 API requests/month, 20 req/min — get started with ForgeOS governance' },
    { tier: 'Pro', price: '$49/mo', description: '50,000 API requests/month, 100 req/min, 10 AI reviews/min — full enforcement suite' },
    {
      tier: 'Team',
      price: '$29/seat/mo',
      description: '3-seat minimum. 200,000 API requests/month. Shared projects, role-based access.',
      cta: 'Start free trial',
      ctaUrl: 'https://forgeos.synctek.io/register?plan=team',
    },
    { tier: 'Enterprise', price: 'Custom', description: 'Unlimited requests, dedicated tenant, SLA, DPA, security questionnaire' },
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
      description: '18 command groups, 49 subcommands. Run gate checks, query SharedMind, manage projects, and inspect the trust ledger directly from your terminal.',
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
    'ForgeOS is the governance OS for teams running agentic software pipelines. It is not an AI — it is the persistent enforcement, memory, and trust layer that sits between your AI agents and your infrastructure.\n\nEvery commit, every deploy, every inter-agent delegation passes through a configurable gate. Gates require artifacts — architecture approvals, QA sign-offs, security reviews — before the next phase unlocks. No artifact, no execution.\n\nThe audit ledger is Ed25519-signed and hash-chained. Every action is attributed, ordered, and tamper-evident. When something goes wrong, you trace it in seconds, not hours.\n\nSharedMind is the institutional memory layer — patterns, anti-patterns, and lessons persist across sessions and are surfaced automatically to any agent that connects. Your AI agents get smarter every cycle, without manual curation.\n\nShips as an MCP server (21 tools), a CLI (forge — 18 command groups, 49 subcommands), and a REST API (135+ endpoints). Works with any MCP-compatible agent: Claude, GPT, Gemini, or local models. Connect via MCP with your ForgeOS API key — your AI model keys stay with you. Raw source code stays local — ForgeOS analyzes project metadata (file structure, languages, dependencies) but never uploads file contents.',

  tradeoffs: [
    'Commercial hosted service — the CLI is MIT-licensed, but the ForgeOS API requires a paid subscription.',
    'Requires integrating gate checks into your agent workflow.',
    'MCP server requires a running ForgeOS instance (cloud-hosted).',
    'Full enforcement mode blocks non-compliant actions — intentional, but plan for it.',
    'Cloud-connected — governance operations require network access to the ForgeOS API. No offline mode.',
    'Rate limits apply per plan tier — higher tiers unlock more API throughput for larger teams.',
  ],
} as const;
