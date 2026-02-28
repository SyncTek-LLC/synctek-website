export default {
  slug: 'specterqa',
  name: 'SpecterQA',
  tagline: 'AI personas test your web app in real browsers -- no scripts needed',
  type: 'CLI Tool + MCP Server',
  status: 'launched',
  version: '0.3.0',
  license: 'MIT',
  license_url: 'https://github.com/SyncTek-LLC/specterqa/blob/main/LICENSE',
  accentColor: '#BC8CFF',

  href: '/products/specterqa/',

  ctaType: 'install' as const,
  installCommand: 'pip install specterqa',
  support: {
    email: 'support@synctek.io',
    github: 'SyncTek-LLC/specterqa',
    docs: 'https://github.com/SyncTek-LLC/specterqa#readme',
  },

  distribution: {
    pypi: 'specterqa',
    github: 'SyncTek-LLC/specterqa',
    mcp_registry: 'io.github.SyncTekLLC/specterqa',
  },

  badges: [
    { type: 'pypi_version', package: 'specterqa' },
    { type: 'github_stars', repo: 'SyncTek-LLC/specterqa' },
    { type: 'license', value: 'MIT' },
    { type: 'ci_status', repo: 'SyncTek-LLC/specterqa' },
  ],

  features: [
    {
      title: 'Vision-based navigation',
      description: 'AI sees the UI like a human -- no CSS selectors, no XPath, no DOM traversal.',
      icon: 'eye',
    },
    {
      title: 'YAML persona definitions',
      description: 'Define test personas with role, technical comfort, patience, and goals.',
      icon: 'user',
    },
    {
      title: 'Built-in cost control',
      description: 'Per-run budget caps, daily limits, monthly limits. Model routing for cost efficiency.',
      icon: 'shield',
    },
    {
      title: 'CI/CD ready',
      description: 'JUnit XML output drops into any pipeline. GitHub Actions example included.',
      icon: 'workflow',
    },
    {
      title: 'MCP server',
      description: 'Use from Claude Desktop, Cursor, or any MCP-compatible agent platform.',
      icon: 'plug',
    },
    {
      title: 'MIT licensed',
      description: 'Fully open source. Use it, fork it, contribute to it.',
      icon: 'code',
    },
  ],

  quickstart: [
    { command: 'pip install specterqa', description: 'Install from PyPI' },
    { command: 'specterqa install', description: 'Download Playwright browsers' },
    { command: 'specterqa init', description: 'Scaffold sample config' },
    { command: 'export ANTHROPIC_API_KEY=sk-ant-...', description: 'Set your API key' },
    { command: 'specterqa run -p demo', description: 'Run the demo journey' },
  ],

  pricing: null,

  overview:
    'SpecterQA is a behavioral testing CLI where AI personas navigate your web app in a real browser, finding bugs and UX issues without a single test script.\n\nInstead of writing brittle selectors and step-by-step test scripts, you define personas in YAML -- their role, technical comfort, goals, frustrations -- and journeys (sequences of goals). SpecterQA launches a real browser, takes screenshots, sends them to Claude\'s vision models, and the AI decides what to click, type, or scroll. Like a real user would.\n\nThe loop is straightforward: Screenshot, AI decides, Playwright executes, repeat. Tests break when the UX actually breaks -- not when your markup changes.',

  costs: [
    { type: '3-step smoke test', range: '$0.30 - $0.60' },
    { type: '5-step standard journey', range: '$0.50 - $1.50' },
    { type: '10-step complex journey', range: '$1.00 - $3.00' },
  ],

  tradeoffs: [
    'Every run costs money — initial assessment and complex actions require the Anthropic API. Budget accordingly.',
    'Primarily Claude-powered — GPT-4V and Gemini are not supported. Experimental Ollama (llava:13b) support exists for simple navigation but is not the default.',
    'Playwright-only — no support for Selenium, Puppeteer, or other browser automation backends.',
    'Vision models can misinterpret UI elements.',
    'Alpha software (v0.3.0). The API may change.',
    'Supplements unit/integration tests, doesn\'t replace them.',
  ],
} as const;
