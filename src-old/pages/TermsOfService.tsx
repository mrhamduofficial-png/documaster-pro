import { Helmet } from 'react-helmet-async';
import { FileText, CheckCircle, AlertTriangle, XCircle, CreditCard, Scale, Mail } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="py-12 bg-slate-950">
      <Helmet>
        <title>Terms of Service - DocuSprint | Usage Terms & Conditions</title>
        <meta name="description" content="DocuSprint Terms of Service. Read our terms and conditions for using our web utility platform and document tools." />
        <link rel="canonical" href="https://docusprint.app/terms" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400">Please read these terms carefully before using DocuSprint</p>
        </header>

        <div className="card mb-8">
          <p className="text-slate-400 mb-4"><strong className="text-white">Last Updated:</strong> January 2024</p>
          <p className="text-slate-400 leading-relaxed">
            Welcome to DocuSprint. By using our services, you agree to these Terms of Service.
            Please read them carefully before using our platform.
          </p>
        </div>

        <div className="space-y-8">
          <section className="card" aria-labelledby="acceptance">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 id="acceptance" className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            </div>
            <p className="text-slate-400">
              By accessing or using DocuSprint, you agree to be bound by these Terms and our Privacy Policy.
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="card" aria-labelledby="service">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 id="service" className="text-xl font-bold text-white">2. Description of Service</h2>
            </div>
            <p className="text-slate-400">
              DocuSprint provides online web utility tools including PDF conversion, image compression,
              QR code generation, word counting, and related services. Services are provided &ldquo;as is&rdquo; without
              warranties of any kind.
            </p>
          </section>

          <section className="card" aria-labelledby="accounts">
            <h2 id="accounts" className="text-xl font-bold text-white mb-4">3. User Accounts</h2>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must be at least 13 years old to use our services</li>
              <li>One person per account; sharing accounts is prohibited</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="acceptable-use">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h2 id="acceptable-use" className="text-xl font-bold text-white">4. Acceptable Use</h2>
            </div>
            <p className="text-slate-400 mb-4">You agree NOT to:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>Upload malicious files or content</li>
              <li>Infringe on intellectual property rights</li>
              <li>Attempt to hack or disrupt our services</li>
              <li>Use automated scripts without permission</li>
              <li>Upload illegal, harmful, or offensive content</li>
              <li>Reverse engineer our software</li>
              <li>Click on advertisements fraudulently or use automated clicking</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="ip">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-purple-400" />
              </div>
              <h2 id="ip" className="text-xl font-bold text-white">5. Intellectual Property</h2>
            </div>
            <p className="text-slate-400">
              DocuSprint and its content, features, and functionality are owned by DocuSprint and are
              protected by copyright, trademark, and other intellectual property laws. You retain all
              rights to the documents you upload to our service.
            </p>
          </section>

          <section className="card" aria-labelledby="subscriptions">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 id="subscriptions" className="text-xl font-bold text-white">6. Premium Subscriptions</h2>
            </div>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li>Subscriptions are billed monthly or yearly</li>
              <li>You can cancel anytime; access continues until the current period ends</li>
              <li>No refunds for partial subscription periods</li>
              <li>Prices may change with 30 days notice</li>
            </ul>
          </section>

          <section className="card" aria-labelledby="liability">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
              </div>
              <h2 id="liability" className="text-xl font-bold text-white">7. Limitation of Liability</h2>
            </div>
            <p className="text-slate-400">
              DocuSprint is not liable for any indirect, incidental, special, or consequential damages
              arising from your use of our services. We are not responsible for the content of documents
              processed through our platform.
            </p>
          </section>

          <section className="card" aria-labelledby="advertising">
            <h2 id="advertising" className="text-xl font-bold text-white mb-4">8. Advertising</h2>
            <p className="text-slate-400">
              DocuSprint displays third-party advertisements through Google AdSense. By using our services,
              you acknowledge and accept that advertisements will be displayed. You agree not to click on
              advertisements fraudulently or use automated means to interact with ads.
            </p>
          </section>

          <section className="card" aria-labelledby="termination">
            <h2 id="termination" className="text-xl font-bold text-white mb-4">9. Termination</h2>
            <p className="text-slate-400">
              We reserve the right to suspend or terminate accounts that violate these Terms.
              You may delete your account at any time from your dashboard.
            </p>
          </section>

          <section className="card" aria-labelledby="contact">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-pink-400" />
              </div>
              <h2 id="contact" className="text-xl font-bold text-white">10. Contact</h2>
            </div>
            <p className="text-slate-400">
              For questions about these Terms, please contact us:
            </p>
            <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-slate-300"><strong>Email:</strong> legal@docusprint.app</p>
              <p className="text-slate-300"><strong>Instagram:</strong> @mr__hamdan__official</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
