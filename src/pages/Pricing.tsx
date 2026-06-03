import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, Zap, Crown, Building } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: 0,
    description: 'Perfect for occasional use',
    features: [
      '5 PDF operations per day',
      '10 MB file size limit',
      'Basic PDF tools',
      'Community support',
      'Ads supported'
    ],
    cta: 'Get Started Free',
    popular: false
  },
  {
    name: 'Premium',
    icon: Crown,
    price: 9.99,
    description: 'For professionals and power users',
    features: [
      'Unlimited PDF operations',
      '100 MB file size limit',
      'All PDF & image tools',
      'Batch processing',
      'No ads',
      'Priority support',
      'Cloud storage (5 GB)',
      'Custom watermarks'
    ],
    cta: 'Start Premium',
    popular: true
  },
  {
    name: 'Team',
    icon: Building,
    price: 29.99,
    description: 'For teams and businesses',
    features: [
      'Everything in Premium',
      'Up to 10 team members',
      'Real-time collaboration',
      'Document approval workflows',
      'Team analytics dashboard',
      'API access',
      'Advanced security (SOC 2)',
      'Dedicated account manager'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { user } = useAuthStore();

  const getPrice = (price: number) => {
    if (price === 0) return 'Free';
    if (billingCycle === 'yearly') {
      return `$${(price * 10).toFixed(2)}`;
    }
    return `$${price}`;
  };

  const handlePayment = async (plan: string) => {
    if (!user) {
      window.location.href = '/auth?register=true';
      return;
    }

    // PayPal integration
    const paypalEmail = 'mrhamduofficial@gmail.com';
    const amounts: Record<string, number> = {
      Premium: billingCycle === 'yearly' ? 99.90 : 9.99,
      Team: billingCycle === 'yearly' ? 299.90 : 29.99
    };

    if (plan !== 'Free' && amounts[plan]) {
      const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(paypalEmail)}&amount=${amounts[plan]}&currency_code=USD&item_name=DocuSprint ${plan} ${billingCycle === 'yearly' ? 'Yearly' : 'Monthly'} Subscription&return=${encodeURIComponent(window.location.origin + '/dashboard?payment=success')}&cancel_return=${encodeURIComponent(window.location.origin + '/pricing')}`;
      window.open(paypalUrl, '_blank');
    }
  };

  return (
    <div className="py-12 bg-slate-950 min-h-screen">
      <Helmet>
        <title>Pricing Plans - Free & Premium | DocuSprint</title>
        <meta name="description" content="DocuSprint pricing: Free plan with basic PDF tools, Premium for professionals, and Team plans for businesses. Start free today!" />
        <link rel="canonical" href="https://docusprint.app/pricing" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "DocuSprint Pricing",
            "description": "Pricing plans for DocuSprint document management tools",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {"@type": "Product", "name": "Free Plan", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"}},
                {"@type": "Product", "name": "Premium Plan", "offers": {"@type": "Offer", "price": "9.99", "priceCurrency": "USD"}},
                {"@type": "Product", "name": "Team Plan", "offers": {"@type": "Offer", "price": "29.99", "priceCurrency": "USD"}}
              ]
            }
          }
        `}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Free tools for everyone. Premium features for power users and teams.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400'
              }`}
            >
              Yearly
              <span className="ml-1 text-emerald-400">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-slate-900 border rounded-2xl p-6 ${
                plan.popular
                  ? 'border-2 border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'border-slate-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    : 'bg-slate-800'
                }`}>
                  <plan.icon className={`w-7 h-7 ${plan.popular ? 'text-white' : 'text-slate-400'}`} />
                </div>

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>

                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">
                    {getPrice(plan.price)}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-slate-400">
                      /{billingCycle === 'yearly' ? 'year' : 'month'}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan.name)}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/25'
                    : plan.name === 'Free'
                    ? 'bg-slate-800 text-white hover:bg-slate-700'
                    : 'border border-slate-700 text-white hover:bg-slate-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Money Back */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center mb-16">
          <h3 className="text-xl font-bold text-white mb-2">
            30-Day Money-Back Guarantee
          </h3>
          <p className="text-slate-400">
            Not satisfied? Get a full refund within 30 days. No questions asked.
          </p>
        </div>

        {/* Enterprise */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Need a Custom Plan?</h2>
          <p className="text-indigo-100 mb-6">
            Enterprise solutions with unlimited users, dedicated support, and custom integrations.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
}
