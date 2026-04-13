export default {
  slug: 'specterqa-ios',
  name: 'SpecterQA iOS',
  tagline: 'The only iOS tester your agent can call.',
  type: 'CLI Tool + MCP Server',
  status: 'launched',
  version: '11.3.0',
  license: 'Elastic-2.0',
  license_url: 'https://github.com/SyncTek-LLC/specterqa-ios/blob/main/LICENSE',
  accentColor: '#BC8CFF',

  href: '/products/specterqa-ios/',

  ctaType: 'install' as const,
  installCommand: "pip install 'specterqa-ios[mcp]'",
  support: {
    email: 'support@synctek.io',
    github: 'SyncTek-LLC/specterqa-ios',
    docs: 'https://github.com/SyncTek-LLC/specterqa-ios#readme',
  },

  distribution: {
    pypi: 'specterqa-ios',
    github: 'SyncTek-LLC/specterqa-ios',
    mcp_entry: 'specterqa-ios-mcp',
    agent_card: 'https://github.com/SyncTek-LLC/specterqa-ios/blob/main/.well-known/agent.json',
  },

  badges: [
    { type: 'github_stars', repo: 'SyncTek-LLC/specterqa-ios' },
    { type: 'license', value: 'Elastic-2.0' },
    { type: 'ci_status', repo: 'SyncTek-LLC/specterqa-ios' },
  ],

  features: [
    {
      title: 'Record Once, Replay Free Forever',
      description: 'Claude records your test with vision AI. Every subsequent CI run replays it deterministically — no API calls, no cost, no surprises.',
      icon: 'workflow',
    },
    {
      title: 'Your Agent Can Run iOS Tests',
      description: '19 MCP tools give Claude Code, Claude Desktop, and any MCP-compatible orchestrator direct control over iOS simulator testing — no glue code required.',
      icon: 'plug',
    },
    {
      title: 'Drop In, Not Rip Out',
      description: 'Already on Maestro? Your existing YAML files run on day one. tapOn, inputText, assertVisible — all understood. Ship faster, not differently.',
      icon: 'code',
    },
    {
      title: '10x CI Throughput',
      description: 'Parallel replay with shared runner reuse cuts your test wall-time from hours to minutes. Run an entire suite in the time XCUITest runs one test.',
      icon: 'workflow',
    },
    {
      title: 'Taps That Actually Land',
      description: 'Set-of-Mark prompting labels every tappable element before Claude acts. No brittle coordinate guessing — just reliable, accurate interactions every time.',
      icon: 'eye',
    },
    {
      title: 'Zero Vendor Lock-In',
      description: 'Your Anthropic API key stays yours. Your test data never leaves your machine. No dependency on SyncTek infrastructure to ship your product.',
      icon: 'shield',
    },
  ],

  quickstart: [
    { command: "pip install 'specterqa-ios[mcp]'", description: 'Install CLI + MCP server' },
    { command: 'specterqa-ios setup', description: 'Verify Xcode + simulators' },
    { command: 'specterqa-ios init', description: 'Scaffold .specterqa/ project files' },
    { command: 'export ANTHROPIC_API_KEY=sk-ant-...', description: 'Set your API key (record phase only)' },
    { command: 'specterqa-ios run --product myapp --journey smoke', description: 'Record a test with Claude' },
    { command: 'specterqa-ios ci .specterqa/replays/', description: 'Replay all tests in CI (free)' },
  ],

  pricing: [
    {
      tier: 'Trial',
      price: 'Free',
      description: '1 simulator, 3 runs/session. No credit card required. Get started immediately.',
    },
    {
      tier: 'Indie',
      price: '$29/mo',
      description: '2 simulators, unlimited runs. Solo developers and side projects.',
      cta: 'Start free trial',
      ctaUrl: 'https://synctek.io/products/specterqa-ios#pricing',
    },
    {
      tier: 'Pro',
      price: '$99/mo',
      description: '4 simulators, unlimited runs, parallel CI. The workhorse tier.',
      cta: 'Start free trial',
      ctaUrl: 'https://synctek.io/products/specterqa-ios#pricing',
    },
    {
      tier: 'Team',
      price: '$299/mo',
      description: '10 simulators, parallel CI, priority support. Built for mobile teams.',
      cta: 'Start free trial',
      ctaUrl: 'https://synctek.io/products/specterqa-ios#pricing',
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      description: 'Unlimited simulators, SLA, dedicated support, custom contracts.',
      cta: 'Contact sales',
      ctaUrl: 'mailto:sales@synctek.io',
    },
  ],

  overview:
    'SpecterQA iOS is the AI-native iOS testing tool built around one powerful insight: use AI to record, use a deterministic engine to replay.\n\nYou pay for AI tokens exactly once. Claude drives your iOS simulator using vision and Set-of-Mark prompting — tapping elements accurately, filling forms, navigating complete user flows — and saves every action as a deterministic YAML replay file. Every subsequent CI run executes that replay without ever calling Claude. No tokens burned. No latency. The same result, guaranteed, every time.\n\nThe MCP server exposes 19 tools, making SpecterQA natively callable from Claude Code, Claude Desktop, or any MCP-compatible orchestrator. It is A2A discoverable via `.well-known/agent.json`. Your AI agent can boot a simulator, record a smoke test, and queue it for CI — all in a single session, without human intervention.\n\nAlready on Maestro? Your existing YAML files run on day one. `tapOn`, `inputText`, `assertVisible`, `assertNotVisible`, and `waitFor` are all understood without changes. Mix Maestro shorthand and SpecterQA native syntax in the same file — migrate at your own pace, or not at all.\n\nYour Anthropic API key stays with you. SyncTek never proxies it, stores it, or touches your test data. Your app binary, simulator state, and recordings remain entirely on your machine.',

  costs: [
    { type: 'Initial record (smoke, ~5 taps)', range: '$0.05 - $0.15' },
    { type: 'Initial record (full journey, ~20 taps)', range: '$0.20 - $0.60' },
    { type: 'CI replay (any size)', range: '$0.00' },
  ],

  tradeoffs: [],
} as const;
