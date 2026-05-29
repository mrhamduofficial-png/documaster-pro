import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="py-12">
      <Helmet>
        <title>Privacy Policy - DocuMaster</title>
        <meta name="description" content="DocuMaster Privacy Policy. Learn how we collect, use, and protect your personal information and document data." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-secondary-900 mb-8">Privacy Policy</h1>

        <div className="card mb-6">
          <p className="text-secondary-600 mb-4"><strong>Last Updated:</strong> January 2024</p>
          <p className="text-secondary-600">
            DocuMaster ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our document management platform.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">1. Information We Collect</h2>
            <div className="card">
              <h3 className="font-semibold text-secondary-900 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Name and email address (when you create an account)</li>
                <li>Payment information (processed securely via PayPal)</li>
                <li>Usage data and preferences</li>
              </ul>

              <h3 className="font-semibold text-secondary-900 mt-4 mb-2">Document Data</h3>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Uploaded files are processed securely and automatically deleted within 1 hour</li>
                <li>We do NOT read, store, or share your document contents</li>
                <li>Files are encrypted during transmission (256-bit SSL)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">2. How We Use Your Information</h2>
            <div className="card">
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Process and convert your documents</li>
                <li>Provide customer support</li>
                <li>Send service updates and newsletters (with your consent)</li>
                <li>Improve our services and develop new features</li>
                <li>Prevent fraud and ensure platform security</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">3. Data Security</h2>
            <div className="card">
              <p className="text-secondary-600 mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>256-bit SSL encryption for all data transfers</li>
                <li>Automatic file deletion after processing</li>
                <li>Secure servers with regular security audits</li>
                <li>No access to your document contents</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">4. Third-Party Services</h2>
            <div className="card">
              <p className="text-secondary-600 mb-4">We use the following third-party services:</p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li><strong>Supabase:</strong> Database and authentication</li>
                <li><strong>PayPal:</strong> Payment processing (we don't store card details)</li>
                <li><strong>Google Analytics:</strong> Anonymous usage statistics</li>
                <li><strong>Vercel:</strong> Hosting and deployment</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">5. Your Rights</h2>
            <div className="card">
              <p className="text-secondary-600 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-secondary-600 space-y-2">
                <li>Access your personal data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">6. Cookies</h2>
            <div className="card">
              <p className="text-secondary-600">
                We use essential cookies to operate our service and analytics cookies to understand usage patterns.
                You can manage cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">7. Contact Us</h2>
            <div className="card">
              <p className="text-secondary-600">
                For privacy-related inquiries, please contact us at:
                <br /><br />
                <strong>Email:</strong> privacy@documaster.app
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
