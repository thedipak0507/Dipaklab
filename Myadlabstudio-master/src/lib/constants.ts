export type Plan = {
  id: string;
  name: string;
  price: string;
  priceSubtitle?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  comingSoon?: boolean;
  cta: string;
  maxDuration: number;
};

export const pricingPlans: Plan[] = [
  {
    id: "launcher",
    name: "🚀 Launcher",
    price: "₹9,999",
    description: "Perfect for getting your first high-quality ad out there.",
    features: [
      "1 ad (15–30 sec)",
      "1 AI voice (any Indian language)",
      "Cinematic sound + visual design",
      "Full HD (1080p) quality",
      "1 Revision",
      "Delivery in 6–7 days",
    ],
    cta: "Choose Plan",
    maxDuration: 30,
  },
  {
    id: "growth",
    name: "📈 Growth",
    price: "₹24,999",
    description: "For growing brands that need more flexibility and quality.",
    features: [
      "1 ad (15–45 sec)",
      "Cinematic sound + visual design",
      "3 AI voice pro language dubs",
      "2 Revisions",
      "2K Quality",
      "Delivery in 4–5 days",
    ],
    cta: "Choose Plan",
    highlighted: true,
    maxDuration: 45,
  },
  {
    id: "momentum",
    name: "🔥 Momentum",
    price: "₹49,999",
    description: "The complete package for brands aiming for high impact.",
    features: [
      "1 ad (up to 60 sec)",
      "Cinematic storytelling & transitions",
      "Up to 5 language versions",
      "Cinematic sound + visual design",
      "3 Revisions",
      "Upto 4K Quality",
      "Delivery in 3–5 days",
    ],
    cta: "Choose Plan",
    maxDuration: 60,
  },
  {
    id: "enterprise",
    name: "🏢 Enterprise Scale",
    price: "₹99,999",
    priceSubtitle: "/month",
    description: "Subscription-based scale for continuous content needs.",
    features: [
      "4+ ads/month (multi-lingual)",
      "Strategy + custom targeting",
      "Analytics + A/B ad variants",
      "Premium avatars/AI influencers",
      "Unlimited minor tweaks",
    ],
    cta: "Contact Sales",
    maxDuration: 90,
  },
  {
    id: "celebrity",
    name: "🌟 Celebrity Pack",
    price: "₹1,49,999+",
    description: "Leverage AI-generated celebrities for ultimate reach.",
    features: [
      "Choose from AI-generated celeb/influencer list",
      "Full rights with brand safety + legal compliance",
      "1 Premium ad (30–60 sec)",
      "Licensing or Commission-based usage",
      "4K + multilingual support",
    ],
    cta: "Coming Soon",
    comingSoon: true,
    maxDuration: 60,
  },
];


export type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const addOns: AddOn[] = [
  { id: "static-ads", name: "Static Ads (Post, Banner)", price: 999, description: "Professionally designed static ads for your campaigns." },
  { id: "extra-revisions", name: "Extra Revisions", price: 1499, description: "Get an additional round of revisions for your ad." },
  { id: "extra-language-dub", name: "Extra Language Dub (per ad)", price: 1499, description: "Add another language to your ad's reach." },
  { id: "priority-delivery", name: "Priority Delivery (48 hrs)", price: 2999, description: "Receive your ad in just 48 hours." },
  { id: "long-format-ad", name: "Long-format Ad (60–90 sec)", price: 4999, description: "Extend your ad's duration for deeper storytelling." },
];
