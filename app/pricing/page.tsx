import { Header, Footer } from '@/components/navigation'
import { Check, Sparkles, Zap, Crown, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - DocuSprint Pro & Team Plans',
  description: 'Upgrade to DocuSprint Pro for unlimited AI tools, ad-free experience, OCR features, and priority support. Start with a 7-day free trial.',
}

// GUMROAD PRODUCT LINKS - Replace these with your actual Gumroad product URLs
const GUMROAD_LINKS = {
  pro_monthly: 'https://docusprint.gumroad.com/l/pro-monthly',
  pro_yearly: 'https://docusprint.gumroad.com/l/pro-yearly',
  team_monthly: 'https://docusprint.gumroad.com/l/team-monthly',
  team_yearly: 'https://docusprint.gumroad.com/l/team-yearly',
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    yearlyPrice: null,
    description: 'Perfect for occasional use',
    icon: Zap,
    color: 'bg-[rgb(var(--secondary))]',
    features: [
      '5 AI tool uses per day',
      'Basic PDF tools (unlimited)',
      'Image compression (5MB limit)',
      'Standard QR codes',
      'Word counter & text tools',
      'Community support',
    ],
    limitations: [
      'Ads displayed',
      'No OCR features',
      'No batch processing',
      'No API access',
    ],
    cta: 'Get Started Free',
    ctaVariant: 'secondary' as const,
    href: '/register',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    yearlyPrice: '$79/year',
    yearlySavings: 'Save $29',
    description: 'For power users & professionals',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-[rgb(var(--primary))] to-purple-600',
    popular: true,
    features: [
      'Unlimited AI tool uses',
      'All PDF tools (unlimited)',
      'Image compression (50MB limit)',
      'Advanced QR with logos & colors',
      'OCR text extraction',
      'AI Background Remover',
      'Priority processing speed',
      'Ad-free experience',
      'Email support (24hr response)',
      'API access (1,000 requests/day)',
      'Export in all formats',
    ],
    limitations: [],
    cta: 'Start 7-Day Free Trial',
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
    cta: 'Start Team Trial',
    ctaVariant: 'secondary' as const,
    href: GUMROAD_LINKS.team_monthly,
    gumroad: true,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))] mb-4">
              Simple Pricing
            </span>
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Start free, upgrade when you need more power. Cancel anytime.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`card relative ${plan.popular ? 'border-[rgb(var(--primary))] ring-2 ring-[rgb(var(--primary))]/20 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[rgb(var(--primary))] text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${plan.color} flex items-center justify-center mb-4`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                  <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">{plan.description}</p>
                  
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-[rgb(var(--muted-foreground))]">{plan.period}</span>
                  </div>
                  
                  {plan.yearlyPrice && (
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
                      or {plan.yearlyPrice}{' '}
                      <span className="text-green-500 font-medium">({plan.yearlySavings})</span>
                    </p>
                  )}
                  
                  {plan.gumroad ? (
                    <a 
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full ${plan.ctaVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {plan.cta}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link 
                      href={plan.href}
                      className={`flex items-center justify-center w-full ${plan.ctaVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
                
                <div className="border-t border-[rgb(var(--border))] p-6">
                  <p className="text-sm font-semibold mb-4">What&apos;s included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {plan.limitations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
                      <p className="text-xs text-[rgb(var(--muted-foreground))] mb-2">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start gap-2 text-xs text-[rgb(var(--muted-foreground))]">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500">
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">30-day money-back guarantee on all paid plans</span>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period with no additional charges.'
                },
                {
                  q: 'Is there a free trial for Pro?',
                  a: 'Yes, we offer a 7-day free trial for Pro. No credit card required to start. You can upgrade anytime during or after the trial.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay through our secure payment partner Gumroad.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with your purchase, contact us for a full refund, no questions asked.'
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
                <div key={index} className="card p-5">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{faq.a}</p>
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
