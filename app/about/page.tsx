import { Header, Footer } from '@/components/navigation'
import { 
  Shield, Zap, Globe, Users, 
  Award, Heart, Target, Rocket
} from 'lucide-react'

const stats = [
  { label: 'Active Users', value: '500K+' },
  { label: 'Documents Processed', value: '10M+' },
  { label: 'Tools Available', value: '50+' },
  { label: 'Countries Served', value: '190+' },
]

const values = [
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files are processed securely and deleted immediately. We never store your documents.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our tools are optimized for speed. Most operations complete in seconds.'
  },
  {
    icon: Globe,
    title: 'Always Accessible',
    description: 'Work from anywhere, on any device. No installation required.'
  },
  {
    icon: Heart,
    title: 'User Focused',
    description: 'We build tools that people actually need, with interfaces anyone can use.'
  },
]

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-founder', image: 'SC' },
  { name: 'Marcus Johnson', role: 'CTO & Co-founder', image: 'MJ' },
  { name: 'Elena Rodriguez', role: 'Head of Product', image: 'ER' },
  { name: 'David Kim', role: 'Head of Engineering', image: 'DK' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-b from-[rgb(var(--primary))]/10 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Making Document Work <span className="text-[rgb(var(--primary))]">Simple</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              DocuSprint was founded with a simple mission: provide free, powerful tools 
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
                  <div className="text-3xl md:text-4xl font-bold text-[rgb(var(--primary))]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-[rgb(var(--muted-foreground))]">
                  <p>
                    DocuSprint started in 2022 when our founders realized how frustrating 
                    it was to do simple document tasks online. Every tool was either 
                    expensive, full of ads, or required confusing downloads.
                  </p>
                  <p>
                    We set out to build the document tools we wished existed: fast, free, 
                    and respectful of user privacy. Today, we serve over 500,000 users 
                    who trust us with their documents every month.
                  </p>
                  <p>
                    Our commitment remains the same: provide powerful tools that are 
                    accessible to everyone, regardless of their technical skills or budget.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[rgb(var(--primary))]/20 to-purple-500/20 rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <Rocket className="w-16 h-16 text-[rgb(var(--primary))] mx-auto mb-4" />
                  <p className="text-lg font-semibold">Founded in 2022</p>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-[rgb(var(--secondary))]/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="card p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgb(var(--primary))]/20 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-[rgb(var(--primary))]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-[rgb(var(--muted-foreground))]">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-4">Meet the Team</h2>
            <p className="text-center text-[rgb(var(--muted-foreground))] mb-12 max-w-xl mx-auto">
              A small team of passionate builders making document work better for everyone.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[rgb(var(--primary))] to-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.image}</span>
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card p-12 bg-gradient-to-br from-[rgb(var(--primary))]/10 to-purple-500/10">
              <Target className="w-12 h-12 text-[rgb(var(--primary))] mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-[rgb(var(--muted-foreground))] mb-6 max-w-lg mx-auto">
                We&apos;re always looking for talented people who share our passion for 
                building great tools.
              </p>
              <a href="/careers" className="btn btn-primary">
                View Open Positions
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
