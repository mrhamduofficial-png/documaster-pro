import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Instagram, Send, Loader, Check, CircleAlert as AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Submit to Formspree (free tier - 50 submissions/month)
      const response = await fetch('https://formspree.io/f/xpwzgvkp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12">
      <Helmet>
        <title>Contact Us - DocuMaster</title>
        <meta name="description" content="Contact DocuMaster. Get support, ask questions, or provide feedback. We're here to help with all your document management needs." />
        <link rel="canonical" href="https://documaster.app/contact" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">Contact Us</h1>
          <p className="text-lg text-secondary-600">We'd love to hear from you. Get in touch with our team.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Mail, title: 'Email', value: 'support@documaster.app', href: 'mailto:support@documaster.app' },
            { icon: Instagram, title: 'Instagram', value: '@mr__hamdan__official', href: 'https://instagram.com/mr__hamdan__official' },
            { icon: MessageSquare, title: 'Response Time', value: 'Within 24 hours', href: null }
          ].map((item) => (
            <div key={item.title} className="card text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-secondary-900">{item.title}</h3>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-secondary-600">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {submitted ? (
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Message Sent!</h2>
            <p className="text-secondary-600">We'll get back to you within 24 hours.</p>
            <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }} className="btn btn-outline mt-6">
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="card">
            <h2 className="text-xl font-bold text-secondary-900 mb-6">Send us a message</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Subject *</label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input"
                >
                  <option value="">Select a topic</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing Question">Billing Question</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Business Inquiry">Business Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input min-h-[150px] resize-none"
                  placeholder="How can we help?"
                />
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary w-full py-4">
                {loading ? (
                  <><Loader className="w-5 h-5 animate-spin mr-2" />Sending...</>
                ) : (
                  <><Send className="w-5 h-5 mr-2" />Send Message</>
                )}
              </button>

              <p className="text-xs text-secondary-500 text-center">We respect your privacy. Your information will never be shared.</p>
            </form>
          </div>
        )}

        {/* Founder Section */}
        <div className="mt-12 bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            H
          </div>
          <h3 className="text-xl font-bold text-secondary-900">Hamdan</h3>
          <p className="text-secondary-600 mb-4">Founder & Developer</p>
          <a
            href="https://instagram.com/mr__hamdan__official"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <Instagram className="w-5 h-5" />
            Follow @mr__hamdan__official
          </a>
        </div>
      </div>
    </div>
  );
}
