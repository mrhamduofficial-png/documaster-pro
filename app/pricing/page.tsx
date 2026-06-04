import { Header, Footer } from '@/components/navigation'
import { Check, Sparkles, Zap, Crown, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - DocuSprint Pro & Team Plans',
  description: 'Upgrade to DocuSprint Pro for unlimited PDF tools, ad-free experience, batch processing, and priority support.',
}

// GUMROAD PRODUCT LINKS
const GUMROAD_LINKS = {
  pro_monthly: 'https://sitecrafters.gumroad.com/l/vtvrir',
  pro_yearly: 'https://sitecrafters.gumroad.com/l/rxejgf',
  team_monthly: 'https://sitecrafters.gumroad.com/l/watuai',
  team_yearly: 'https://sitecrafters.gumroad.com/l/watuai',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    yearlyPrice: null,
    description: 'Perfect for occasional use',
    icon: Zap,
    color: 'bg-slate-500',
    features: [
      'All basic tools (unlimited)',
      'PDF merge (up to 3 files)',
      'Image compression (5MB limit)',
      'Standard QR codes',
      'Word counter & text tools',
      'Community support',
    ],
    limitations: [
      'Ads displayed',
      'No batch processing',
      'Limited PDF features',
      'No API access',
    ],
    cta: 'Get Started Free',
    ctaVariant: 'secondary' as const,
    href: '/tools',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    yearlyPrice: '$79/year',
    yearlySavings: 'Save $29',
    description: 'For power users & professionals',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-blue-600 to-purple-600',
    popular: true,
    features: [
      'All tools (unlimited)',
      'PDF merge (unlimited files)',
      'PDF split & compress',
      'Image compression (50MB limit)',
      'Advanced QR with logos & colors',
      'Batch processing',
      'Priority processing speed',
      'Ad-free experience',
      'Email support (24hr response)',
      'API access (1,000 requests/day)',
      'Export in all formats',
    ],
    limitations: [],
    cta: 'Get Pro Access',
    ctaVariant: 'primary' as const,
    href: GUMROAD_LINKS.pro_monthly,
    gumroad: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    yearlyPrice: '$249/year',
    yearlySavings: 'Save $99',
    description: 'For teams & businesses',
    icon: Crown,
    color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Team workspace & sharing',
      'Admin dashboard & analytics',
      'Shared templates library',
      'Priority phone support',
      'Custom branding (white-label)',
      'API access (10,000 requests/day)',
      'SSO & SAML integration',
      'Custom contract available',
      'Dedicated account manager',
    ],
    limitations: [],
    cta: 'Get Team Access',
    ctaVariant: 'secondary' as const,
    href: GUMROAD_LINKS.team_monthly,
    gumroad: true,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-600 mb-4">
              Simple Pricing
            </span>
            <h1 className="text-4xl font-bold mb-4 text-slate-900">Choose Your Plan</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free, upgrade when you need more power. Cancel anytime.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl border relative ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500/20 scale-105' : 'border-slate-200'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-4`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-1 text-slate-900">{plan.name}</h2>
                  <p className="text-sm text-slate-500 mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  
                  {plan.yearlyPrice && (
                    <p className="text-sm text-slate-500 mb-4">
                      or {plan.yearlyPrice}{' '}
                      <span className="text-green-600 font-medium">({plan.yearlySavings})</span>
                    </p>
                  )}
                  
                  {plan.gumroad ? (
                    <a 
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.ctaVariant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {plan.cta}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link 
                      href={plan.href}
                      className={`flex items-center justify-center w-full py-3 px-4 rounded-lg font-medium transition-colors ${plan.ctaVariant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
                
                <div className="border-t border-slate-200 p-6">
                  <p className="text-sm font-semibold mb-4 text-slate-900">What&apos;s included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-xs text-slate-500 mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-2 text-xs text-slate-400">
                            <X className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-600">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">30-day money-back guarantee on all paid plans</span>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-slate-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period with no additional charges.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay through our secure payment partner.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us for a full refund.'
                },
                {
                  q: 'Can I switch between plans?',
                  a: 'Absolutely! You can upgrade or downgrade your plan at any time. If upgrading, you will only pay the prorated difference.'
                },
                {
                  q: 'Do you offer discounts for students or non-profits?',
                  a: 'Yes! We offer 50% off for students and non-profit organizations. Contact us with proof of eligibility to receive your discount code.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-slate-200 p-5">
                  <h3 className="font-semibold mb-2 text-slate-900">{faq.q}</h3>
                  <p className="text-sm text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
