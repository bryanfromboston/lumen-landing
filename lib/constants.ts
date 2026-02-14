export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    bandwidth: '100 Mbps',
    hourlyRate: 0.47,
    popular: false,
    features: [
      '5-minute activation',
      'Basic DDoS protection',
      '99.99% SLA',
      'Self-service portal',
      'API access',
    ],
    cta: 'Get Started',
    description: 'Perfect for small offices and remote sites'
  },
  {
    id: 'professional',
    name: 'Professional',
    bandwidth: '1 Gbps',
    hourlyRate: 1.06,
    popular: true,
    features: [
      'Everything in Starter',
      'Priority support',
      'Advanced monitoring',
      'Dedicated account manager',
      'Custom SLA options',
    ],
    cta: 'Get Started',
    description: 'Ideal for growing teams and cloud workloads'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    bandwidth: '10 Gbps',
    hourlyRate: 3.93,
    popular: false,
    features: [
      'Everything in Professional',
      '24/7 premium support',
      'Custom integration',
      'Dedicated infrastructure',
      'Volume discounts available',
    ],
    cta: 'Contact Sales',
    description: 'Built for data centers and high-volume transfers'
  },
];

export const FEATURES = [
  {
    id: 'activation',
    title: 'Lightning Fast Activation',
    description: 'Live in ~5 minutes',
    icon: 'clock' as const,
  },
  {
    id: 'bandwidth',
    title: 'Flexible Bandwidth',
    description: '100 Mbps to 100 Gbps on demand',
    icon: 'gauge' as const,
  },
  {
    id: 'sla',
    title: '99.99% SLA',
    description: 'Enterprise-grade reliability',
    icon: 'shield' as const,
  },
  {
    id: 'locations',
    title: '10M+ Locations',
    description: 'Nationwide U.S. availability',
    icon: 'map' as const,
  },
  {
    id: 'pricing',
    title: 'Consumption Pricing',
    description: 'Pay only for hours used',
    icon: 'dollar-sign' as const,
  },
  {
    id: 'commitments',
    title: 'No Commitments',
    description: 'No contracts or credit checks',
    icon: 'x' as const,
  },
];

export const SECURITY_FEATURES = [
  {
    id: 'ddos',
    title: 'DDoS Essentials',
    description: 'Layer 3/4 protection included',
    icon: 'shield-check' as const,
    included: true,
  },
  {
    id: 'defender',
    title: 'Lumen Defender',
    description: 'Advanced threat mitigation add-on',
    icon: 'lock' as const,
    included: false,
  },
];

export const DISCOUNT_CODE = 'FLEX20';
export const DISCOUNT_PERCENTAGE = 20;
