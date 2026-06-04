import { Header, Footer } from '@/components/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - DocuSprint',
  description: 'DocuSprint Privacy Policy. Learn how we collect, use, and protect your personal information when you use our AI-powered document tools.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-slate-900">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: January 2025</p>
          
          <div className="prose max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">1. Introduction</h2>
              <p className="text-slate-600 leading-relaxed">
                Welcome to DocuSprint. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, disclose, and safeguard your information when you 
                use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium mb-2 text-slate-800">2.1 Personal Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                When you register for an account or use our services, we may collect:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Profile information you choose to provide</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6 text-slate-800">2.2 Usage Information</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                We automatically collect certain information when you use our services:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and features used</li>
                <li>Time and date of visits</li>
              </ul>

              <h3 className="text-xl font-medium mb-2 mt-6 text-slate-800">2.3 Files You Process</h3>
              <p className="text-slate-600 leading-relaxed">
                When you use our document tools, your files are processed client-side (in your browser) whenever possible. 
                For AI-powered features, your content is sent to our secure servers for processing and is not stored 
                after the operation is complete.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">3. How We Use Your Information</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process your transactions</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our services and develop new features</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Detect and prevent fraud or abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">4. Cookies and Tracking</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Understand how you use our services</li>
                <li>Provide personalized content</li>
                <li>Analyze website traffic and performance</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-4">
                You can control cookies through your browser settings. However, disabling cookies may limit 
                some features of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">5. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your data, 
                including encryption, secure servers, and regular security audits. However, no method of 
                transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">6. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">7. Children&apos;s Privacy</h2>
              <p className="text-slate-600 leading-relaxed">
                Our services are not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">8. International Data Transfers</h2>
              <p className="text-slate-600 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">9. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by 
                posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-slate-900">10. Contact Us</h2>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-600 mt-4">
                Email: <a href="mailto:support@docusprint.app" className="text-blue-600 hover:underline">support@docusprint.app</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
