export const PLANS = [
  {
    name: "Free",
    price: "Rs. 0",
    period: "/ forever",
    desc: "Get started with the essentials. No credit card required.",
    features: [
      { text: "Up to 500 Products", included: true },
      { text: "2 Staff Accounts", included: true },
      { text: "Basic POS & GRN", included: true },
      { text: "Community Support", included: true },
      { text: "Customer Credit (Naya Potha)", included: false },
      { text: "Offline POS (PWA)", included: false },
      { text: "Smart Expiry Alerts", included: false },
      { text: "Full Analytics Dashboard", included: false },
    ],
    buttonText: "Get Started Free",
    link: "https://app.nexiacore.shop/register",
    popular: false
  },
  {
    name: "Pro",
    badge: "Most Popular",
    price: "Rs. 2,999",
    period: "/ month",
    desc: "Everything you need to scale your retail business.",
    features: [
      { text: "Up to 5,000 Products", included: true },
      { text: "10 Staff Accounts", included: true },
      { text: "Basic POS & GRN", included: true },
      { text: "Priority Support", included: true },
      { text: "Customer Credit (Naya Potha)", included: true },
      { text: "Offline POS (PWA)", included: true },
      { text: "Smart Expiry Alerts", included: true },
      { text: "Full Analytics Dashboard", included: true },
    ],
    buttonText: "Start 14-Day Free Trial",
    link: "https://app.nexiacore.shop/register",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    desc: "For supermarket chains and large-scale operations.",
    features: [
      { text: "Unlimited Products", included: true },
      { text: "Unlimited Staff", included: true },
      { text: "Multi-tenant (Isolated Branches)", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "Customer Credit (Naya Potha)", included: true },
      { text: "Offline POS (PWA)", included: true },
      { text: "Smart Expiry Alerts", included: true },
      { text: "Custom Integrations & SLA", included: true },
    ],
    buttonText: "Contact Sales",
    link: "#contact",
    popular: false
  }
];