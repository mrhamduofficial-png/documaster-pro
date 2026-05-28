import { Link } from 'react-router-dom';
import {
  FileText,
  Layers,
  Scissors,
  Image,
  ScanLine,
  PenTool,
  ArrowRight,
  Check,
  Users,
  Zap,
  Shield
} from 'lucide-react';

const tools = [
  {
    icon: Layers,
    title: 'PDF Merge',
    description: 'Combine multiple PDFs into one document',
    href: '/tools/pdf-merge',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Scissors,
    title: 'PDF Split',
    description: 'Extract pages or split PDFs into multiple files',
    href: '/tools/pdf-split',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: FileText,
    title: 'PDF Compress',
    description: 'Reduce file size while maintaining quality',
    href: '/tools/pdf-compress',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: FileText,
    title: 'Word to PDF',
    description: 'Convert Word documents to PDF format',
    href: '/tools/word-to-pdf',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Image,
    title: 'Image Converter',
    description: 'Convert images between formats instantly',
    href: '/tools/image-converter',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: ScanLine,
    title: 'OCR Scanner',
    description: 'Extract text from images and scanned documents',
    href: '/tools/ocr-scanner',
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    icon: PenTool,
    title: 'Digital Sign',
    description: 'Add digital signatures to documents',
    href: '/tools/digital-sign',
    color: 'from-amber-500 to-amber-600'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Comment, approve, and collaborate on documents',
    href: '/dashboard',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process documents in seconds with our optimized tools'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your files are encrypted and automatically deleted after processing'
  },
  {
    icon: Users,
    title: 'Team Ready',
    description: 'Collaborate with teammates on documents with real-time comments'
  }
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-secondary-200 mb-8">
              <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm text-secondary-600">Trusted by 100,000+ users worldwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              Your Complete Document
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Management Solution
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-secondary-600 max-w-3xl mx-auto mb-10">
              Merge PDFs, convert documents, scan with OCR, add digital signatures, and more.
              Free tools for everyone. Premium features for professionals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/tools"
                className="btn btn-primary text-lg px-8 py-3 shadow-lg shadow-primary-500/25"
              >
                Start Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/pricing"
                className="btn btn-secondary text-lg px-8 py-3"
              >
                View Pricing
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-secondary-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-accent-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-accent-500" />
                <span>Files auto-delete</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-accent-500" />
                <span>256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Powerful Tools, Simple Interface
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Everything you need to manage documents efficiently. Free forever for basic features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="group card hover:shadow-lg hover:border-primary-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">{tool.title}</h3>
                <p className="text-secondary-600 text-sm">{tool.description}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tools" className="btn btn-outline">
              View All Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose DocuMaster?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{feature.title}</h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Unlock Premium Features
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get unlimited access to all tools, faster processing, larger file limits, and priority support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="btn bg-white text-primary-600 hover:bg-secondary-100 text-lg px-8 py-3"
            >
              View Plans
            </Link>
            <Link
              to="/auth?register=true"
              className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-3"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Loved by Users Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', role: 'Student', text: 'DocuMaster saved me during exam season. The PDF merge and compress tools are lifesavers!' },
              { name: 'John D.', role: 'Business Owner', text: 'We switched from expensive software to DocuMaster. The team collaboration features are excellent.' },
              { name: 'Lisa K.', role: 'Freelancer', text: 'Fast, reliable, and free. I use it daily for client work. The premium plan is worth it!' }
            ].map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-secondary-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary-600 mb-4">Found DocuMaster useful? Share it with your friends!</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20DocuMaster%20-%20the%20best%20free%20PDF%20tools!&url=https://documaster.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Share on Twitter
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://documaster.app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
