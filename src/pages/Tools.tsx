import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Layers,
  Scissors,
  FileText,
  Image,
  ScanLine,
  PenTool,
  FileOutput,
  Users,
  CloudLightning,
  Lock
} from 'lucide-react';

const tools = [
  {
    icon: Layers,
    title: 'PDF Merge',
    description: 'Combine multiple PDF files into a single document. Perfect for consolidating reports, contracts, or presentations.',
    href: '/tools/pdf-merge',
    features: ['Unlimited files', 'Maintain quality', 'Drag & drop', 'Instant processing']
  },
  {
    icon: Scissors,
    title: 'PDF Split',
    description: 'Split PDFs into individual pages or extract specific page ranges. Ideal for separating documents.',
    href: '/tools/pdf-split',
    features: ['Custom page ranges', 'Batch split', 'Preview pages', 'Quick download']
  },
  {
    icon: FileText,
    title: 'PDF Compress',
    description: 'Reduce PDF file size while maintaining quality. Great for email attachments and uploads.',
    href: '/tools/pdf-compress',
    features: ['Up to 90% reduction', 'Quality options', 'Fast processing', 'Batch support']
  },
  {
    icon: FileOutput,
    title: 'Word to PDF',
    description: 'Convert Word documents (.doc, .docx) to PDF format with perfect formatting preservation.',
    href: '/tools/word-to-pdf',
    features: ['Format preservation', 'Batch convert', 'Free to use', 'No watermarks']
  },
  {
    icon: Image,
    title: 'Image Converter',
    description: 'Convert images between PNG, JPG, WEBP, and more formats. Resize and optimize in one click.',
    href: '/tools/image-converter',
    features: ['Multiple formats', 'Batch convert', 'Resize options', 'Quality control']
  },
  {
    icon: ScanLine,
    title: 'OCR Scanner',
    description: 'Extract text from images and scanned documents. Powered by advanced AI recognition.',
    href: '/tools/ocr-scanner',
    features: ['Multi-language', 'High accuracy', 'Export to text', 'Table detection']
  },
  {
    icon: PenTool,
    title: 'Digital Signature',
    description: 'Add digital signatures to your PDFs. Legally binding and secure.',
    href: '/tools/digital-sign',
    features: ['Legally binding', 'Certificate based', 'Multiple signers', 'Timestamp']
  },
  {
    icon: FileText,
    title: 'PDF Format',
    description: 'Convert PDFs to other formats like Word, Excel, or images while preserving layout.',
    href: '/tools/pdf-format',
    features: ['Multi-format output', 'Layout preservation', 'Batch convert', 'High quality']
  }
];

const premiumTools = [
  {
    icon: CloudLightning,
    title: 'Batch Processing',
    description: 'Process multiple files at once with our batch automation tools.',
    plan: 'premium'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Real-time commenting, approval workflows, and document sharing.',
    plan: 'premium'
  },
  {
    icon: Lock,
    title: 'Advanced Security',
    description: 'Password protection, encryption, and secure document storage.',
    plan: 'premium'
  }
];

export default function Tools() {
  return (
    <div className="py-12">
      <Helmet>
        <title>Free PDF Tools - Merge, Split, Convert | DocuMaster</title>
        <meta name="description" content="Free online PDF tools: merge PDFs, split documents, compress files, convert Word to PDF, OCR scanner, and more. No signup required." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-4">
            Free Document Tools
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Powerful, free tools to manage your documents. No signup required.
            Your files are secure and automatically deleted after processing.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {tools.map((tool) => (
            <div key={tool.href} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">{tool.title}</h3>
                  <p className="text-secondary-600 mt-1">{tool.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <Link
                to={tool.href}
                className="btn btn-primary w-full"
              >
                Use Tool Free
              </Link>
            </div>
          ))}
        </div>

        {/* Premium Tools */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Premium Features</h2>
            <p className="text-secondary-600">Unlock powerful tools with a DocuMaster Premium subscription</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {premiumTools.map((tool) => (
              <div key={tool.title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-4">
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">{tool.title}</h3>
                <p className="text-sm text-secondary-600">{tool.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="btn btn-primary">
              View Pricing Plans
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-secondary-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Are the tools really free?', a: 'Yes! Basic features are free forever. Premium features require a subscription.' },
              { q: 'Are my files safe?', a: 'Your files are encrypted with 256-bit SSL and automatically deleted within 1 hour.' },
              { q: 'Is there a file size limit?', a: 'Free users can process files up to 10 MB. Premium users have 100 MB limit.' },
              { q: 'Do I need to create an account?', a: 'No account needed for basic tools. Sign up for free to save documents and settings.' }
            ].map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-semibold text-secondary-900 mb-2">{faq.q}</h3>
                <p className="text-secondary-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
