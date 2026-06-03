import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Shield, Instagram, Globe, ArrowRight, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 bg-slate-950">
      <Helmet>
        <title>About Us - DocuSprint | Free Web Utility Tools for Everyone</title>
        <meta name="description" content="Learn about DocuSprint - the free web utility platform created by Hamdan. Our mission is to provide professional document tools accessible to everyone." />
        <link rel="canonical" href="https://docusprint.app/about" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About DocuSprint</h1>
          <p className="text-lg text-slate-400">Making professional web tools accessible to everyone</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-12">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-slate-600">
            <span>Ad Space</span>
          </div>
        </div>

        {/* Mission */}
        <section className="card mb-8" aria-labelledby="mission">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 id="mission" className="text-2xl font-bold text-white">Our Mission</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            DocuSprint was founded with a simple yet powerful mission: to provide professional-grade web utility
            tools that are accessible to everyone, regardless of their budget. We believe that quality
            document and utility tools shouldn&apos;t cost a fortune, which is why we offer most of our features completely free.
          </p>
        </section>

        {/* Founder */}
        <section className="card mb-8 overflow-hidden p-0" aria-labelledby="founder">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-24" />
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-center gap-6 -mt-12">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-slate-900 shadow-xl">
                H
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 id="founder" className="text-xl font-bold text-white">Hamdan</h2>
                <p className="text-slate-400 mb-4">Founder & Developer</p>
                <p className="text-slate-400 mb-4">
                  {'"I created DocuSprint to help millions of people manage their documents efficiently. Our platform serves students, professionals, and businesses worldwide with tools that were once only available through expensive software."'}
                </p>
                <a
                  href="https://instagram.com/mr__hamdan__official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                  Follow @mr__hamdan__official
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section aria-labelledby="values">
          <h2 id="values" className="text-2xl font-bold text-white mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Zap, title: 'Free Forever', desc: 'Core tools remain free for everyone, always.', color: 'from-yellow-500 to-orange-500' },
              { icon: Shield, title: 'Privacy First', desc: 'Your files are encrypted and auto-deleted.', color: 'from-emerald-500 to-teal-500' },
              { icon: Globe, title: 'Global Access', desc: 'Used by millions across 150+ countries.', color: 'from-blue-500 to-indigo-500' },
              { icon: Users, title: 'User Focused', desc: 'Built based on community feedback.', color: 'from-purple-500 to-pink-500' }
            ].map((value) => (
              <div key={value.title} className="card">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center`}>
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                    <p className="text-sm text-slate-400">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="card mb-8 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20" aria-labelledby="stats">
          <h2 id="stats" className="text-2xl font-bold text-white mb-6 text-center">DocuSprint by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '30+', label: 'Free Tools' },
              { value: '1M+', label: 'Documents Processed' },
              { value: '150+', label: 'Countries' },
              { value: '100K+', label: 'Daily Users' }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="card mb-8" aria-labelledby="testimonial">
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <blockquote className="text-slate-300 text-lg mb-4 italic">
            {'"DocuSprint has become an essential tool for our team. The free PDF tools are incredibly powerful and the interface is so intuitive. Highly recommended!"'}
          </blockquote>
          <p className="text-slate-500">— Sarah M., Marketing Manager</p>
        </section>

        {/* CTA */}
        <section className="text-center" aria-labelledby="cta">
          <h3 id="cta" className="text-xl font-semibold text-white mb-4">Ready to get started?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tools" className="btn btn-primary btn-lg">
              Explore Free Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link to="/pricing" className="btn btn-outline btn-lg">View Premium Plans</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
