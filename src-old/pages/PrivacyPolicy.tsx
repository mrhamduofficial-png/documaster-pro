import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Eye, Trash2, Database, Globe, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="py-12 bg-slate-950">
      <Helmet>
        <title>Privacy Policy - DocuSprint | Data Protection & Security</title>
        <meta name="description" content="DocuSprint Privacy Policy. Learn how we collect, use, and protect your personal information and document data. Your privacy is our priority." />
        <link rel="canonical" href="https://docusprint.app/privacy" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Your privacy is our priority</p>
        </header>

        <div className="card mb-8">
          <p className="text-slate-400 mb-4"><strong className="text-white">Last Updated:</strong> January 2024</p>
          <p className="text-slate-400 leading-relaxed">
            DocuSprint (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web utility platform.
          </p>
        </div>

        <div className="space-y-8">
          <section className="card" aria-labelledby="info-collect">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 id="info-collect" className="text-xl font-bold text-white">1. Information We Collect</h2>
            </div>
            
            <h3 className="font-semibold text-white mb-2">Personal Information</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2 mb-4">
              <li>Name and email address (when you create an account)</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Usage data and preferences</li>
            </ul>

            <h3 className="font-semibold text-white mb-2">Document Data</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>Uploaded files are processed securely and automatically deleted within 1 hour</li>
              <li>We do NOT read, store, or share your document contents</li>
              <li>Files are encrypted during transmission (256-bit SSL)</li>
              <li>Most processing happens client-side in your browser</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="info-use">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 id="info-use" className="text-xl font-bold text-white">2. How We Use Your Information</h2>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>Process and convert your documents</li>
              <li>Provide customer support</li>
              <li>Send service updates and newsletters (with your consent)</li>
              <li>Improve our services and develop new features</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="data-security">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <h2 id="data-security" className="text-xl font-bold text-white">3. Data Security</h2>
            </div>
            <p className="text-slate-400 mb-4">
              We implement industry-standard security measures:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>256-bit SSL encryption for all data transfers</li>
              <li>Client-side processing for most tools (files never leave your device)</li>
              <li>Automatic file deletion after processing</li>
              <li>Secure servers with regular security audits</li>
              <li>No access to your document contents</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="third-party">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 id="third-party" className="text-xl font-bold text-white">4. Third-Party Services</h2>
            </div>
            <p className="text-slate-400 mb-4">We use the following third-party services:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li><strong className="text-white">Supabase:</strong> Database and authentication</li>
              <li><strong className="text-white">Google AdSense:</strong> Display advertising</li>
              <li><strong className="text-white">Google Analytics:</strong> Anonymous usage statistics</li>
              <li><strong className="text-white">Vercel:</strong> Hosting and deployment</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="your-rights">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-orange-400" />
              </div>
              <h2 id="your-rights" className="text-xl font-bold text-white">5. Your Rights</h2>
            </div>
            <p className="text-slate-400 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>Access your personal data</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
              <li>Opt-out of personalized advertising</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="cookies">
            <h2 id="cookies" className="text-xl font-bold text-white mb-4">6. Cookies & Advertising</h2>
            <p className="text-slate-400 mb-4">
              We use cookies for essential functionality and to display relevant advertisements through Google AdSense. 
              You can manage cookie preferences through your browser settings. AdSense may use cookies to serve ads based on your prior visits.
            </p>
            <p className="text-slate-400">
              You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Ads Settings</a>.
            </p>
          </section>

          <section className="card" aria-labelledby="contact">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-pink-400" />
              </div>
              <h2 id="contact" className="text-xl font-bold text-white">7. Contact Us</h2>
            </div>
            <p className="text-slate-400">
              For privacy-related inquiries, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300"><strong>Email:</strong> privacy@docusprint.app</p>
              <p className="text-slate-300"><strong>Instagram:</strong> @mr__hamdan__official</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
