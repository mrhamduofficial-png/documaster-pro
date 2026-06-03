import { Header, Footer } from '@/components/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - DocuSprint',
  description: 'DocuSprint Terms of Service. Read our terms and conditions for using our AI-powered document tools and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-[rgb(var(--muted-foreground))] mb-8">Last updated: January 2025</p>
          
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                By accessing or using DocuSprint (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                DocuSprint provides AI-powered document tools including but not limited to: AI writing assistant, 
                code generator, image compression, QR code generation, PDF tools, word counting, and text 
                summarization. We reserve the right to modify, suspend, or discontinue any part of the Service 
                at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                To access certain features, you may need to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-[rgb(var(--muted-foreground))] space-y-2">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                <strong>4.1 Free Tier:</strong> Basic features are available for free with usage limitations.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                <strong>4.2 Paid Plans:</strong> Premium features require a paid subscription. Payments are 
                processed securely through Gumroad.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                <strong>4.3 Refunds:</strong> We offer a 30-day money-back guarantee on all paid plans. 
                Contact us for refund requests.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                <strong>4.4 Cancellation:</strong> You may cancel your subscription at any time. Access 
                continues until the end of the billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                You agree NOT to use our Service to:
              </p>
              <ul className="list-disc pl-6 text-[rgb(var(--muted-foreground))] space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Upload malicious content or malware</li>
                <li>Harass, abuse, or harm others</li>
                <li>Generate spam or misleading content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to abuse our services</li>
                <li>Resell or redistribute our services without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed mb-4">
                <strong>6.1 Our Content:</strong> The DocuSprint name, logo, website design, and underlying 
                technology are owned by us and protected by intellectual property laws.
              </p>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                <strong>6.2 Your Content:</strong> You retain ownership of content you create or upload. 
                By using our Service, you grant us a limited license to process your content solely to 
                provide the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. AI-Generated Content</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                Content generated by our AI tools is provided &quot;as is.&quot; You are responsible for reviewing 
                and verifying AI-generated content before use. We do not guarantee the accuracy, 
                completeness, or appropriateness of AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A 
                PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, DOCUSPRINT SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                You agree to indemnify and hold DocuSprint harmless from any claims, damages, or 
                expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Modifications to Terms</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                We may update these Terms from time to time. Continued use of the Service after 
                changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                These Terms are governed by the laws of the jurisdiction in which DocuSprint operates, 
                without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="text-[rgb(var(--muted-foreground))] leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-[rgb(var(--muted-foreground))] mt-4">
                Email: <a href="mailto:legal@docusprint.app" className="text-[rgb(var(--primary))] hover:underline">legal@docusprint.app</a><br />
                Instagram: <a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener noreferrer" className="text-[rgb(var(--primary))] hover:underline">@mr__hamdan__official</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
