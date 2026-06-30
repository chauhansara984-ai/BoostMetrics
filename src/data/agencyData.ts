import { Service, PainPoint, SwotItem } from '../types';

export const SERVICES: Service[] = [
  {
    id: 'seo',
    name: 'Search Engine Optimization (SEO)',
    category: 'SEO',
    description: 'Increase organic visibility, crawlability, and rankings. Build structured authority to capture ready-to-buy search traffic and scale your lead pipeline long-term.',
    priceEstimate: 1500,
    benefits: [
      'Top page rankings for high-intent queries',
      'Continuous compound organic traffic growth',
      'High-quality inbound lead generation'
    ],
    features: [
      'In-Depth Technical SEO Audits',
      'On-Page & Schema Markup Optimization',
      'Premium Content Writing & Editorial Distribution',
      'High-Authority Whitehat Backlink Acquisition'
    ]
  },
  {
    id: 'ppc',
    name: 'Pay-Per-Click Advertising (PPC)',
    category: 'PPC',
    description: 'Instant customer acquisition via targeted Google Ads, Bing Ads, and social networks. Designed for direct conversions with negative keyword gating and budget pacing.',
    priceEstimate: 1200,
    benefits: [
      'Immediate top-of-search presence',
      'Highly targeted, purchase-intent audience',
      'Fully predictable, scalable lead cost (CPA)'
    ],
    features: [
      'Multi-Platform Campaign Architecture',
      'High-Converting Landing Page Designs',
      'A/B Split-Testing for Ad Copy & Creatives',
      'Advanced Bid Optimization & Keyword Gating'
    ]
  },
  {
    id: 'social',
    name: 'Social Media Marketing',
    category: 'Social Media',
    description: 'Build organic brand community and high-performance social advertising funnels on LinkedIn, Instagram, Facebook, and video platforms.',
    priceEstimate: 950,
    benefits: [
      'Amplified brand resonance & loyalty',
      'Engaged, click-through customer communities',
      'Cost-effective awareness & remarketing'
    ],
    features: [
      'Bespoke Content Calendars & Graphic Assets',
      'Paid Social Prospecting & Dynamic Retargeting',
      'Influencer Coordination & Partnerships',
      'Active Community Moderation & Outreach'
    ]
  },
  {
    id: 'content',
    name: 'Content Marketing',
    category: 'Content',
    description: 'Establish ultimate industry authority with deeply researched blog posts, whitepapers, guides, and infographics that capture and nurture leads.',
    priceEstimate: 800,
    benefits: [
      'Establishes unassailable brand authority',
      'Nurtures cold prospects into loyal advocates',
      'Assists search rankings with rich semantic depth'
    ],
    features: [
      'Editorial Keyword & Topic Research Mapping',
      'SEO-Optimized Blog Posts & Long-form Guides',
      'Lead Magnets (E-books, Whitepapers, Templates)',
      'Multi-Channel Content Syndication Strategy'
    ]
  },
  {
    id: 'webdev',
    name: 'Website Design & Development',
    category: 'Development',
    description: 'Custom, blazing-fast, and responsive websites optimized for user experience and pixel-perfect conversion tracking. Built to turn casual clicks into revenue.',
    priceEstimate: 3000,
    benefits: [
      'Flawless user experience across all devices',
      'Under 1.5-second load times for lower bounce rates',
      'Customized call-to-actions that drive conversions'
    ],
    features: [
      'Custom React/Vite/Tailwind Layout Architectures',
      'Core Web Vitals Speed & Performance Optimization',
      'Robust SEO-Ready Internal Navigation Schema',
      'Comprehensive Analytics & Pixel Integration'
    ]
  },
  {
    id: 'email',
    name: 'Email Marketing & Automation',
    category: 'Content',
    description: 'Nurture leads, boost customer lifetime value (LTV), and recover abandoned carts with hyper-personalized transactional and promotional email campaigns.',
    priceEstimate: 600,
    benefits: [
      'Direct, high-yield channel to active contacts',
      'Drastically increases repeat customer rates',
      'Automated marketing loops requiring zero daily effort'
    ],
    features: [
      'Drip Campaign Architecture & List Segmentation',
      'Dynamic Cart Abandonment & Welcome Flow Scripts',
      'Custom responsive newsletter templates',
      'A/B Testing on subject lines & visual layouts'
    ]
  },
  {
    id: 'cro',
    name: 'Conversion Rate Optimization (CRO)',
    category: 'Strategy',
    description: 'Systematically identify and remove purchasing friction points to extract maximum revenue from your existing website traffic.',
    priceEstimate: 1100,
    benefits: [
      'Multiplies conversion values without increasing ad spend',
      'Provides rich data on actual user navigation behaviors',
      'Maximizes return on investment for all traffic sources'
    ],
    features: [
      'Visual Heatmaps & Live Session Recording Analysis',
      'Landing Page Structural & UI/UX Audit Checks',
      'Rigorous Dynamic A/B Split-Testing Campaigns',
      'Checkout Flow Friction Elimination'
    ]
  },
  {
    id: 'ai_marketing',
    name: 'AI-Powered Marketing Solutions',
    category: 'Strategy',
    description: 'Leverage machine learning, natural language processing, predictive models, and custom agent integrations to automate content scaling and optimize ads.',
    priceEstimate: 1400,
    benefits: [
      'Exponentially faster content generation pipelines',
      'Predictive ad budget pacing to avoid budget waste',
      'Hyper-personalized, real-time user experiences'
    ],
    features: [
      'Custom AI Content Draft Generation Engines',
      'Predictive Lead Scoring & Audience Clustering',
      'Intelligent Client Chatbot System Deployment',
      'Advanced Automated Reporting Workflows'
    ]
  }
];

export const PAIN_POINTS: PainPoint[] = [
  {
    challenge: 'Low Website Traffic',
    solution: 'Comprehensive SEO Optimization & High-Intent Paid Traffic Campaigns.',
    serviceId: 'seo',
    impact: 'Multiplies keyword visibility and drives relevant inbound prospects.',
    difficulty: 'High'
  },
  {
    challenge: 'Poor Search Rankings',
    solution: 'Technical Code Audits, Semantic Content Enhancements, and Schema Markups.',
    serviceId: 'seo',
    impact: 'Pushes business listings to high-authority first-page search positions.',
    difficulty: 'Medium'
  },
  {
    challenge: 'Low Lead Generation',
    solution: 'Conversion-Focused Landing Pages, Target PPC Ad Spends, and Gated Asset Magnets.',
    serviceId: 'ppc',
    impact: 'Populates sales pipelines with structured, pre-qualified inquiries.',
    difficulty: 'High'
  },
  {
    challenge: 'Weak Social Media Presence',
    solution: 'Branded Content Schedules, Dynamic Video Reels, and Proactive Outreach Programs.',
    serviceId: 'social',
    impact: 'Fosters trust, elevates brand prestige, and expands social reach.',
    difficulty: 'Medium'
  },
  {
    challenge: 'Poor Conversion Rates',
    solution: 'CRO Heatmap Studies, Frictionless Checkout Flows, and A/B Call-to-Action Experiments.',
    serviceId: 'cro',
    impact: 'Converts cold browsers into recurring, high-value purchasers.',
    difficulty: 'High'
  },
  {
    challenge: 'Lack of Marketing Expertise',
    solution: 'Full-Service Marketing Retainer Packages and Dedicated Growth Strategists.',
    serviceId: 'seo',
    impact: 'Replaces operational guesswork with proven, data-driven frameworks.',
    difficulty: 'Medium'
  },
  {
    challenge: 'Difficulty Tracking Results',
    solution: 'Integrated Analytics Portals, Custom Tag Managers, and Live Attribution Reports.',
    serviceId: 'webdev',
    impact: 'Provides absolute visibility into every dollar of advertising return.',
    difficulty: 'Low'
  }
];

export const SWOT_ITEMS: SwotItem[] = [
  {
    type: 'strength',
    title: 'Scalable Service Model',
    description: 'Flexible packages suited for startups up to established mid-market enterprises.',
    actionableStrategy: 'Standardize operational playbooks to quickly onboard new clients without quality degradation.'
  },
  {
    type: 'strength',
    title: 'Recurring Revenue Streams',
    description: 'Predictable billing loops via long-term monthly agency retainer packages.',
    actionableStrategy: 'Bundle SEO, PPC, and CRO under a cohesive multi-service discount to maximize Client Lifetime Value.'
  },
  {
    type: 'strength',
    title: 'Data-Driven USP',
    description: 'Transparent real-time metrics that remove agency ambiguity and show direct attribution.',
    actionableStrategy: 'Provide clients with customized automated reporting portals to visually prove campaign value.'
  },
  {
    type: 'weakness',
    title: 'Competitive Market',
    description: 'Massive volume of standard digital marketing agencies competing for the same business keywords.',
    actionableStrategy: 'Hyper-specialize in performance marketing and AI innovation to differentiate from generic agencies.'
  },
  {
    type: 'weakness',
    title: 'Platform Dependencies',
    description: 'Vulnerability to sudden algorithm changes across major platforms like Google Search and Facebook Ads.',
    actionableStrategy: 'Diversify traffic acquisitions across search, social, paid channels, and direct email pipelines.'
  },
  {
    type: 'weakness',
    title: 'Client Retention Risks',
    description: 'Businesses frequently pause marketing budgets during economic contractions or seasonal shifts.',
    actionableStrategy: 'Tie retainers directly to lead outcomes and establish robust, high-friction switching costs.'
  },
  {
    type: 'opportunity',
    title: 'AI Marketing Capabilities',
    description: 'Using cutting-edge language models to create, translate, scale, and analyze advertising copy at near-zero marginal cost.',
    actionableStrategy: 'Introduce proprietary "BoostAI Content Scaling" options inside service tiers to scale output volume.'
  },
  {
    type: 'opportunity',
    title: 'E-commerce Expansion',
    description: 'Explosive online consumer spending and direct-to-consumer store growth requiring expert scaling.',
    actionableStrategy: 'Develop specialized CRO + Paid Search packages custom-built for e-commerce platforms like Shopify.'
  },
  {
    type: 'opportunity',
    title: 'Local SEO Dominance',
    description: 'Local physical businesses are increasingly aware of search value, looking for near-me foot traffic.',
    actionableStrategy: 'Offer low-barrier-to-entry Google Business Profile audits to rapidly close local service leads.'
  },
  {
    type: 'threat',
    title: 'Ad Bidding Inflation',
    description: 'Rising cost-per-click values across standard networks squeeze small-business profit margins.',
    actionableStrategy: 'Pioneer organic search and hyper-efficient email automation to maintain a lower Customer Acquisition Cost.'
  },
  {
    type: 'threat',
    title: 'Rapid Tech Evolution',
    description: 'Extremely fast shifts in privacy guidelines (iOS tracking blocks, cookieless web) and generative search trends.',
    actionableStrategy: 'Maintain a dedicated team on emerging tracking integrations (first-party data APIs, server-side tagging).'
  }
];

export const ROADMAP_GOALS = [
  {
    year: 'Year 1',
    timeline: '2026',
    title: 'Market Penetration & Foundation',
    status: 'In Progress',
    achievements: [
      { text: 'Launch the primary BoostMetrics website & conversion portals', completed: true },
      { text: 'Acquire and onboard the first 25 recurring digital marketing clients', completed: false },
      { text: 'Build a premium portfolio of verified CRO & SEO case studies', completed: false },
      { text: 'Establish strong brand presence across LinkedIn and regional networks', completed: true }
    ],
    description: 'Lay down robust lead funnels, client portal templates, and baseline agency collateral.'
  },
  {
    year: 'Year 2',
    timeline: '2027',
    title: 'Scaling Revenue & Team',
    status: 'Planned',
    achievements: [
      { text: 'Scale monthly recurring revenue (MRR) to achieve target growth thresholds', completed: false },
      { text: 'Expand service offerings with advanced AI-driven dynamic optimizations', completed: false },
      { text: 'Recruit and train specialized regional PPC, SEO, and developer leads', completed: false },
      { text: 'Increase search and industry authority through masterclass content', completed: false }
    ],
    description: 'Expand standard operations, automate recurring reporting, and structure core operational squads.'
  },
  {
    year: 'Year 3',
    timeline: '2028',
    title: 'Industry Dominance & Tool Launch',
    status: 'Planned',
    achievements: [
      { text: 'Establish BoostMetrics as a globally recognized performance brand', completed: false },
      { text: 'Expand client acquisitions into premium international European/Asian zones', completed: false },
      { text: 'Launch a proprietary suite of in-house SaaS tracking and reporting utilities', completed: false },
      { text: 'Maintain high customer retention rates through superb custom dashboard support', completed: false }
    ],
    description: 'Transition from a pure service agency into a high-leverage hybrid service + software enterprise.'
  }
];
