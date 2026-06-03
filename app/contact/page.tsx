import { Header, Footer } from '@/components/navigation'
import { Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - DocuSprint Support',
  description: 'Get in touch with DocuSprint support team. We are here to help with any questions about our AI-powered document tools.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              Have a question or need help? We&apos;re here for you. Reach out and we&apos;ll respond as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--secondary))] border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--secondary))] border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--secondary))] border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[rgb(var(--secondary))] border border-[rgb(var(--border))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] transition-all resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[rgb(var(--primary))]" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:support@docusprint.app" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                        support@docusprint.app
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-[rgb(var(--primary))]" />
                    </div>
                    <div>
                      <p className="font-medium">Social Media</p>
                      <a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener noreferrer" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                        @mr__hamdan__official
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[rgb(var(--primary))]" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-[rgb(var(--muted-foreground))]">
                        Free: 48-72 hours<br />
                        Pro: Within 24 hours<br />
                        Team: Priority support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[rgb(var(--primary))]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[rgb(var(--primary))]" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-[rgb(var(--muted-foreground))]">
                        Worldwide - Online Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="/pricing" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                      View Pricing Plans
                    </a>
                  </li>
                  <li>
                    <a href="/tools" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                      Browse All Tools
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--primary))] transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card p-6 bg-gradient-to-br from-[rgb(var(--primary))]/10 to-purple-600/10 border-[rgb(var(--primary))]/20">
                <h3 className="text-lg font-semibold mb-2">Need Immediate Help?</h3>
                <p className="text-[rgb(var(--muted-foreground))] text-sm mb-4">
                  Pro and Team subscribers get priority support. Upgrade your plan for faster response times.
                </p>
                <a href="/pricing" className="btn-primary text-sm">
                  Upgrade Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
