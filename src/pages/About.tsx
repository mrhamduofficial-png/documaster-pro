import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Users, Target, Zap, Shield, Instagram, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12">
      <Helmet>
        <title>About Us - DocuMaster | Free Document Tools for Everyone</title>
        <meta name="description" content="Learn about DocuMaster - the free document management platform created by Hamdan. Our mission is to provide professional document tools accessible to everyone." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-4">About DocuMaster</h1>
          <p className="text-lg text-secondary-600">Making professional document tools accessible to everyone</p>
        </div>

        {/* Mission */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900">Our Mission</h2>
          </div>
          <p className="text-secondary-600 leading-relaxed">
            DocuMaster was founded with a simple yet powerful mission: to provide professional-grade document
            management tools that are accessible to everyone, regardless of their budget. We believe that quality
            document tools shouldn't cost a fortune, which is why we offer most of our features completely free.
          </p>
        </div>

        {/* Founder */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
              H
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-secondary-900">Hamdan</h3>
              <p className="text-secondary-600 mb-4">Founder & Developer</p>
              <p className="text-secondary-700 mb-4">
                "I created DocuMaster to help millions of people manage their documents efficiently.
                Our platform serves students, professionals, and businesses worldwide with tools that
                were once only available through expensive software."
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

        {/* Values */}
        <h2 className="text-2xl font-bold text-secondary-900 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            { icon: Zap, title: 'Free Forever', desc: 'Core tools remain free for everyone, always.' },
            { icon: Shield, title: 'Privacy First', desc: 'Your files are encrypted and auto-deleted.' },
            { icon: Globe, title: 'Global Access', desc: 'Used by millions across 150+ countries.' },
            { icon: Users, title: 'User Focused', desc: 'Built based on community feedback.' }
          ].map((value) => (
            <div key={value.title} className="card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <value.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900">{value.title}</h3>
                  <p className="text-sm text-secondary-600">{value.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-secondary-900 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">DocuMaster by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '20+', label: 'Free Tools' },
              { value: '1M+', label: 'Documents Processed' },
              { value: '150+', label: 'Countries' },
              { value: '50K+', label: 'Daily Users' }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-secondary-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Ready to get started?</h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tools" className="btn btn-primary">Explore Free Tools</Link>
            <Link to="/pricing" className="btn btn-outline">View Premium Plans</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
