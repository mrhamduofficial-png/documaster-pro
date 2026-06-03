import { Header, Footer } from '@/components/navigation'
import { Check, Sparkles, Zap, Crown } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for occasional use',
    icon: Zap,
    color: 'bg-[rgb(var(--secondary))]',
    features: [
      '5 AI tool uses per day',
      'Basic PDF tools (unlimited)',
      'Image compression (5MB limit)',
      'Standard QR codes',
      'Community support',
    ],
    limitations: [
      'Ads displayed',
      'No OCR features',
      'No priority processing',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary' as const,
    href: '/register',
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For power users & professionals',
    icon: Sparkles,
    color: 'bg-gradient-to-br from-[rgb(var(--primary))] to-purple-600',
    popular: true,
    features: [
      'Unlimited AI tool uses',
      'All PDF tools (unlimited)',
      'Image compression (50MB limit)',
      'Advanced QR with logos',
      'OCR text extraction',
      'Priority processing',
      'Ad-free experience',
      'Email support',
      'API access (1000 req/day)',
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    ctaVariant: 'primary' as const,
    href: '/register?plan=pro',
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    description: 'For teams & businesses',
    icon: Crown,
    color: 'bg-gradient-to-br from-amber-500 to-orange-600',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Team workspace',
      'Admin dashboard',
      'Shared templates',
      'Priority support',
      'Custom branding',
      'API access (10K req/day)',
      'SSO integration',
    ],
    limitations: [],
    cta: 'Contact Sales',
    ctaVariant: 'secondary' as const,
    href: '/contact?plan=team',
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
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Start free, upgrade when you need more power
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`card relative ${plan.popular ? 'border-[rgb(var(--primary))] ring-2 ring-[rgb(var(--primary))]/20' : ''}`}
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
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-[rgb(var(--muted-foreground))]">{plan.period}</span>
                  </div>
                  
                  <Link 
                    href={plan.href}
                    className={`btn w-full justify-center ${plan.ctaVariant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {plan.cta}
                  </Link>
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
                          <li key={limitIndex} className="text-xs text-[rgb(var(--muted-foreground))]">
                            • {limitation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I cancel my subscription anytime?',
                  a: 'Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.'
                },
                {
                  q: 'Is there a free trial for Pro?',
                  a: 'Yes, we offer a 7-day free trial for Pro. No credit card required to start.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'Yes, we offer a 30-day money-back guarantee if you&apos;re not satisfied.'
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
