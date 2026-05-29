import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <div className="py-12">
      <Helmet>
        <title>Terms of Service - DocuMaster</title>
        <meta name="description" content="DocuMaster Terms of Service. Read our terms and conditions for using our document management platform." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Terms of Service</h1>

        <div className="card mb-6">
          <p className="text-secondary-600 mb-4"><strong>Last Updated:</strong> January 2024</p>
          <p className="text-secondary-600">
            Welcome to DocuMaster. By using our services, you agree to these Terms of Service.
            Please read them carefully.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Acceptance of Terms</h2>
            <div className="card">
              <p className="text-secondary-600">
                By accessing or using DocuMaster, you agree to be bound by these Terms and our Privacy Policy.
                If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. Description of Service</h2>
            <div className="card">
              <p className="text-secondary-600">
                DocuMaster provides online document management tools including PDF conversion, editing,
                compression, OCR scanning, and related services. Services are provided "as is" without
                warranties of any kind.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. User Accounts</h2>
            <div className="card">
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>You must provide accurate information when creating an account</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 13 years old to use our services</li>
                <li>One person per account; sharing accounts is prohibited</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Acceptable Use</h2>
            <div className="card">
              <p className="text-secondary-600 mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Upload malicious files or content</li>
                <li>Infringe on intellectual property rights</li>
                <li>Attempt to hack or disrupt our services</li>
                <li>Use automated scripts without permission</li>
                <li>Upload illegal, harmful, or offensive content</li>
                <li>Reverse engineer our software</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Intellectual Property</h2>
            <div className="card">
              <p className="text-secondary-600">
                DocuMaster and its content, features, and functionality are owned by DocuMaster and are
                protected by copyright, trademark, and other intellectual property laws. You retain all
                rights to the documents you upload to our service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Premium Subscriptions</h2>
            <div className="card">
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Subscriptions are billed monthly or yearly via PayPal</li>
                <li>You can cancel anytime; access continues until the current period ends</li>
                <li>No refunds for partial subscription periods</li>
                <li>Prices may change with 30 days notice</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Limitation of Liability</h2>
            <div className="card">
              <p className="text-secondary-600">
                DocuMaster is not liable for any indirect, incidental, special, or consequential damages
                arising from your use of our services. We are not responsible for the content of documents
                processed through our platform.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">8. Termination</h2>
            <div className="card">
              <p className="text-secondary-600">
                We reserve the right to suspend or terminate accounts that violate these Terms.
                You may delete your account at any time from your dashboard.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">9. Contact</h2>
            <div className="card">
              <p className="text-secondary-600">
                For questions about these Terms, please contact us:
                <br /><br />
                <strong>Email:</strong> legal@documaster.app
                <br />
                <strong>Instagram:</strong> @mr__hamdan__official
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
