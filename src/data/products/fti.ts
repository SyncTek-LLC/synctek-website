export default {
  slug: 'fti',
  name: 'Forge Trust Index (FTI)',
  tagline: 'Deterministic, Ed25519-signed trust scoring for every package in your stack',
  type: 'API Service',
  status: 'launched',
  license: 'Commercial',
  accentColor: '#58A6FF',

  href: '/products/forgeos/fti/',

  features: [
    {
      title: 'Eight-dimension scoring',
      description: 'Security, Maintainability, Documentation, Community Health, Supply Chain, Improvement Velocity, Governance, and Operational.',
      icon: 'shield',
    },
    {
      title: 'Deterministic',
      description: 'Same input, same score, always. No randomness, no LLM at query time.',
      icon: 'code',
    },
    {
      title: 'Cryptographically signed',
      description: 'Every score is Ed25519-signed. Tamper-evident and independently verifiable.',
      icon: 'shield',
    },
  ],
} as const;
