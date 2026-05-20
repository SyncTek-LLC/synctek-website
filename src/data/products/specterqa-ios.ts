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
      title: 'Record Once, Replay Free',
      description: 'AI records test sessions using Claude vision. Deterministic engine replays in CI — zero API cost on reruns.',
      icon: 'workflow',
    },
    {
      title: 'Agent-Native (19 MCP Tools)',
      description: 'Full testing surface exposed as MCP tools. Claude Code, Claude Desktop, or any MCP-compatible orchestrator can drive iOS tests in plain English.',
      icon: 'plug',
    },
    {
      title: 'Maestro Compatible',
      description: 'Existing Maestro YAML files work natively. tapOn, inputText, assertVisible — all understood. Zero migration cost.',
      icon: 'code',
    },
    {
      title: 'Parallel CI — 10x Faster',
      description: 'Shared runner reuse and clone isolation. Run 10 replays in the time XCUITest runs 1. `--parallel N` flag.',
      icon: 'workflow',
    },
    {
      title: '90% Tap Accuracy',
      description: 'Set-of-Mark (SoM) prompting annotates the simulator screenshot before Claude taps. No coordinate guessing, no brittle selectors.',
      icon: 'eye',
    },
    {
      title: 'BYOK — Full Data Control',
      description: 'Bring your own Anthropic API key. SyncTek never sees it. Your test data never leaves your machine. 97% gross margin for us, full control for you.',
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
    'SpecterQA iOS is an AI-native iOS simulator testing tool built around one insight: use AI to record, use a deterministic engine to replay.\n\nYou pay for AI tokens exactly once. Claude drives your iOS simulator using vision and Set-of-Mark prompting — tapping elements accurately, filling forms, navigating flows — and saves every action as a deterministic YAML replay file. Every subsequent CI run executes that replay file without ever calling Claude. No AI tokens. No API cost. The same result, every time.\n\nThe MCP server exposes 19 tools, making SpecterQA natively callable from Claude Code, Claude Desktop, or any MCP-compatible orchestrator. It is also A2A discoverable via `.well-known/agent.json`. Your AI agent can boot a simulator, record a smoke test, and queue it for CI — all in a single session.\n\nMaestro users get a zero-cost migration path: existing YAML files work natively. `tapOn`, `inputText`, `assertVisible`, `assertNotVisible`, and `waitFor` are all understood without changes. Mix Maestro shorthand and SpecterQA native syntax in the same file.\n\nBYOK means your Anthropic API key stays with you. SyncTek never proxies it, stores it, or sees your test data. Your app binary, simulator state, and recordings stay on your machine.',

  costs: [
    { type: 'Initial record (smoke, ~5 taps)', range: '$0.05 - $0.15' },
    { type: 'Initial record (full journey, ~20 taps)', range: '$0.20 - $0.60' },
    { type: 'CI replay (any size)', range: '$0.00' },
  ],

  tradeoffs: [
    'macOS + Xcode 15+ required — iOS Simulator is macOS-only. No Linux CI without a macOS runner.',
    'BYOK required — you must supply your own Anthropic API key for the record phase. Replay is free.',
    'Elastic License 2.0 — free for internal use; commercial redistribution or competing service use is restricted.',
    'Record phase requires network access to the Anthropic API. Replay is fully offline.',
    'Parallel CI (Pro tier and above) — Trial and Indie tiers run replays sequentially.',
    'Simulator-only — physical device testing is not currently supported.',
  ],
} as const;
