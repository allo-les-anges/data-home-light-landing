export interface Plan { name:string; price:number; users:number; tagline:string; features:string[]; highlighted:boolean }
export interface OptionalModule {name:string; monthlyEur:number; unit:'month'|'language/month'}
export const commercial = {currency:'EUR',deliveryHours:24,trialDays:15,trialFullAccess:true,setupEur:125,xmlPerFeedMonthlyEur:50,xmlIncludedInPlans:false,websiteLanguagesIncluded:6,templates:{included:6,premium:16}} as const;
export const plans: Plan[] = [
  {
    name: "Essential",
    price: 49,
    users: 1,
    tagline: "A complete professional online presence.",
    features: [
      "Real-estate agency website",
      "Blog with SEO tools",
      "Standard templates & custom domain",
      `Up to ${commercial.websiteLanguagesIncluded} languages`,
      "Manual Property Manager",
      "Sales & rentals catalogue",
      "Mini CRM leads",
      "Contact form & WhatsApp",
      "Essential analytics",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: 99,
    users: 5,
    tagline: "Full operating stack for growing agencies.",
    features: [
      "Everything in Essential",
      "Advanced Property Manager",
      "Landing pages",
      "AI chatbot & AI SEO",
      "Social Hub",
      "Advanced analytics",
      "Hero video",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: 149,
    users: 10,
    tagline: "Advanced capabilities for established agencies.",
    features: [
      "Everything in Pro",
      "Unlimited landing pages",
      "Newsletter",
      "Extended chatbot quota",
      "Custom pages",
      "Immersive tours",
      "Cadastre & compliance passport",
      "Priority support",
    ],
    highlighted: false,
  },
]

export const optionalModules: OptionalModule[] = [
  {
    "name": "AI Chatbot",
    "monthlyEur": 39,
    "unit": "month"
  },
  {
    "name": "Landing Pages",
    "monthlyEur": 39,
    "unit": "month"
  },
  {
    "name": "AI SEO",
    "monthlyEur": 29,
    "unit": "month"
  },
  {
    "name": "Custom Pages",
    "monthlyEur": 29,
    "unit": "month"
  },
  {
    "name": "Immersive Tours",
    "monthlyEur": 29,
    "unit": "month"
  },
  {
    "name": "Cadastre & Compliance",
    "monthlyEur": 29,
    "unit": "month"
  },
  {
    "name": "Property Management",
    "monthlyEur": 29,
    "unit": "month"
  },
  {
    "name": "Social Hub",
    "monthlyEur": 19,
    "unit": "month"
  },
  {
    "name": "AI Translation",
    "monthlyEur": 19,
    "unit": "month"
  },
  {
    "name": "Advanced Analytics",
    "monthlyEur": 19,
    "unit": "month"
  },
  {
    "name": "Newsletter",
    "monthlyEur": 9,
    "unit": "month"
  },
  {
    "name": "Hero Video",
    "monthlyEur": 9,
    "unit": "month"
  },
  {
    "name": "WhatsApp",
    "monthlyEur": 9,
    "unit": "month"
  },
  {
    "name": "Additional Language",
    "monthlyEur": 2,
    "unit": "language/month"
  }
];
