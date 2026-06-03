import { Header, Footer } from '@/components/navigation'
import { 
  Shield, Zap, Globe, Heart, Target, MapPin
} from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - DocuSprint | AI-Powered Document Tools',
  description: 'Learn about DocuSprint and its founder Hamdan. We provide free AI-powered document tools to help millions of users worldwide.',
}

const stats = [
  { label: 'Active Users', value: '500K+' },
  { label: 'Documents Processed', value: '10M+' },
  { label: 'Tools Available', value: '15+' },
  { label: 'Countries Served', value: '190+' },
]

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files are processed securely and deleted immediately. We never store your documents on our servers.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our tools are optimized for speed. Most operations complete in seconds, not minutes.'
  },
  {
    icon: Globe,
    title: 'Always Accessible',
    description: 'Work from anywhere, on any device. No installation or downloads required.'
  },
  {
    icon: Heart,
    title: 'User Focused',
    description: 'We build tools that people actually need, with interfaces that anyone can use easily.'
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Making Document Work <span className="text-blue-600">Simple</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              DocuSprint was founded with a simple mission: provide free, powerful AI tools 
              that help people work smarter with their documents.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Meet the Founder</h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Hi, I am <strong className="text-slate-900">Hamdan</strong>, the founder and developer of DocuSprint. 
                    I created this platform to solve a problem I faced myself - finding reliable, fast, 
                    and free document tools online.
                  </p>
                  <p>
                    Based in <strong className="text-slate-900">India</strong>, I started DocuSprint with a vision to make 
                    powerful AI-powered tools accessible to everyone, regardless of their location or budget.
                  </p>
                  <p>
                    Today, DocuSprint serves over 500,000 users from 190+ countries, helping them 
                    with document processing, AI writing, code generation, and much more.
                  </p>
                  <div className="flex items-center gap-2 pt-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">India</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl">
                    <span className="text-6xl font-bold text-white">H</span>
                  </div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full shadow-lg">
                    <p className="font-semibold text-slate-900">Hamdan</p>
                    <p className="text-xs text-slate-500 text-center">Founder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-900">Our Story</h2>
            <div className="space-y-4 text-slate-600 text-center max-w-3xl mx-auto">
              <p>
                DocuSprint started in 2024 when I realized how frustrating it was to do simple document 
                tasks online. Every tool was either expensive, full of annoying ads, or required 
                confusing software downloads.
              </p>
              <p>
                I set out to build the document tools I wished existed: fast, free, and respectful 
                of user privacy. Using the latest AI technology, DocuSprint now offers over 15 
                powerful tools that help people work smarter every day.
              </p>
              <p>
                My commitment remains the same: provide powerful tools that are accessible to everyone, 
                regardless of their technical skills or budget.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card p-12 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Start Using DocuSprint Today</h2>
              <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                Join over 500,000 users who trust DocuSprint for their document needs. 
                All tools are free to use with no registration required.
              </p>
              <a href="/tools" className="btn-primary inline-block">
                Explore All Tools
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
