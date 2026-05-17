export const PLANS = [
  {
    name: "Starter",
    price: "Rs. 0",
    period: "/ forever",
    desc: "Perfect for small shops starting their digital journey.",
    features: [
      { text: "Up to 500 Products", included: true },
      { text: "2 Staff Accounts", included: true },
      { text: "Basic POS Terminal", included: true },
      { text: "GRN Management", included: true },
      { text: "Email Support", included: true },
      { text: "Customer Credit (Naya Potha)", included: false },
      { text: "Full Analytics Dashboard", included: false },
    ],
    buttonText: "Get Started Free",
    link: "https://nexia-core.vercel.app/register",
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
      { text: "Full Analytics Dashboard", included: true },
      { text: "Customer Credit (Naya Potha)", included: true },
      { text: "Supplier Management", included: true },
      { text: "Priority Support", included: true },
      { text: "Multi-branch ready", included: true },
    ],
    buttonText: "Start 14-Day Free Trial",
    link: "https://nexia-core.vercel.app/register",
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
      { text: "Custom Integrations", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "SLA Guarantee (99.9%)", included: true },
      { text: "On-site Onboarding", included: true },
      { text: "Custom Features", included: true },
    ],
    buttonText: "Contact Sales",
    link: "#contact",
    popular: false
  }
];