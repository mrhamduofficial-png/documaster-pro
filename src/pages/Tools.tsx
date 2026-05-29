import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layers, Scissors, FileText, Image, ScanLine, PenTool, FileOutput, Users, CloudLightning, Lock, Droplets, RotateCw, Hash, Maximize2, Minimize2, Video, QrCode, Sparkles, Globe, ChartBar as FileBarChart, FileCheck, Shield, Clock, LayoutGrid as Layout, Diff } from 'lucide-react';

const pdfTools = [
  { icon: Layers, title: 'PDF Merge', description: 'Combine multiple PDF files into one document', href: '/tools/pdf-merge', free: true },
  { icon: Scissors, title: 'PDF Split', description: 'Split PDFs into individual pages or extract ranges', href: '/tools/pdf-split', free: true },
  { icon: FileText, title: 'PDF Compress', description: 'Reduce PDF file size while maintaining quality', href: '/tools/pdf-compress', free: true },
  { icon: Lock, title: 'PDF Unlock', description: 'Remove restrictions from PDF files', href: '/tools/pdf-unlock', free: true },
  { icon: Droplets, title: 'PDF Watermark', description: 'Add custom watermarks to PDF documents', href: '/tools/pdf-watermark', free: true },
  { icon: RotateCw, title: 'PDF Rotate', description: 'Rotate PDF pages in any direction', href: '/tools/pdf-rotate', free: true },
  { icon: Hash, title: 'PDF Page Numbers', description: 'Add page numbers to PDF documents', href: '/tools/pdf-page-numbers', free: true },
  { icon: FileOutput, title: 'Word to PDF', description: 'Convert Word documents to PDF format', href: '/tools/word-to-pdf', free: true },
  { icon: FileOutput, title: 'PDF to Word', description: 'Convert PDF to editable Word documents', href: '/tools/pdf-to-word', free: true },
  { icon: FileOutput, title: 'PDF to Excel', description: 'Extract tables from PDF to Excel', href: '/tools/pdf-to-excel', free: true }
];

const imageTools = [
  { icon: Image, title: 'Image Converter', description: 'Convert images between PNG, JPG, WebP formats', href: '/tools/image-converter', free: true },
  { icon: Maximize2, title: 'Image Resize', description: 'Resize images to any dimension', href: '/tools/image-resize', free: true },
  { icon: Minimize2, title: 'Image Compress', description: 'Reduce image file size for web', href: '/tools/image-compress', free: true },
  { icon: Sparkles, title: 'AI Image Enhancer', description: 'Upscale images to HD, 4K, 8K quality', href: '/tools/image-enhancer', free: true }
];

const utilityTools = [
  { icon: ScanLine, title: 'OCR Scanner', description: 'Extract text from images and scanned documents', href: '/tools/ocr-scanner', free: true },
  { icon: PenTool, title: 'Digital Signature', description: 'Add digital signatures to PDF documents', href: '/tools/digital-sign', free: true },
  { icon: QrCode, title: 'QR Code Generator', description: 'Create custom QR codes instantly', href: '/tools/qr-generator', free: true },
  { icon: Hash, title: 'Word Counter', description: 'Count words, characters, sentences', href: '/tools/word-counter', free: true },
  { icon: Diff, title: 'Document Diff', description: 'Compare two documents side by side', href: '/tools/document-diff', free: true },
  { icon: Globe, title: 'Document Translator', description: 'Translate documents to multiple languages', href: '/tools/document-translator', free: true }
];

const aiTools = [
  { icon: FileText, title: 'Text Summarizer', description: 'AI-powered text summarization', href: '/tools/text-summarizer', free: true },
  { icon: Sparkles, title: 'LinkedIn Post Generator', description: 'Generate engaging LinkedIn posts with AI', href: '/tools/linkedin-post-generator', free: true },
  { icon: FileCheck, title: 'Contract Generator', description: 'Auto-generate legal contracts', href: '/tools/contract-generator', free: true },
  { icon: FileBarChart, title: 'Report Generator', description: 'Auto-generate professional reports', href: '/tools/report-generator', free: true }
];

const premiumTools = [
  { icon: Shield, title: 'Document Protection', description: 'Password protect your documents', href: '/tools/document-protection', plan: 'premium' },
  { icon: Clock, title: 'Document Timestamping', description: 'Certify document creation time', href: '/tools/timestamping', plan: 'premium' },
  { icon: Layout, title: 'Template Gallery', description: '50+ professional document templates', href: '/tools/templates', plan: 'premium' },
  { icon: Video, title: 'Video Converter', description: 'Convert video formats', href: '/tools/video-converter', plan: 'premium' },
  { icon: CloudLightning, title: 'Batch Processing', description: 'Process multiple files at once', plan: 'premium' },
  { icon: Users, title: 'Team Collaboration', description: 'Real-time commenting and workflows', plan: 'premium' }
];

export default function Tools() {
  return (
    <div className="py-12">
      <Helmet>
        <title>Free PDF & Document Tools - 30+ Tools | DocuMaster</title>
        <meta name="description" content="30+ free document tools: PDF merge, split, compress, convert, OCR, image converter, QR generator, AI tools, and more. No signup required. Professional document management." />
        <meta name="keywords" content="PDF tools, PDF merge, PDF split, PDF compress, PDF converter, OCR scanner, image converter, document tools, free PDF tools, online PDF editor" />
        <meta property="og:title" content="Free PDF & Document Tools - DocuMaster" />
        <meta property="og:description" content="30+ free document tools for everyone. Professional document management without the cost." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://documaster.app/tools" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-4">
            30+ Free Document Tools
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Professional document tools for everyone. No signup required.
            Your files are encrypted and automatically deleted after processing.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <span className="px-4 py-2 bg-accent-100 text-accent-700 text-sm rounded-full font-medium">100% Free</span>
            <span className="px-4 py-2 bg-primary-100 text-primary-700 text-sm rounded-full font-medium">No Watermark</span>
            <span className="px-4 py-2 bg-secondary-100 text-secondary-700 text-sm rounded-full font-medium">Bank-Level Security</span>
            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium">Mobile Friendly</span>
          </div>
        </div>

        {/* PDF Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            PDF Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {pdfTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="card hover:shadow-lg hover:border-primary-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  {tool.free && <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded font-medium">Free</span>}
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-secondary-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Image Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <Image className="w-6 h-6 text-pink-600" />
            Image Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {imageTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="card hover:shadow-lg hover:border-pink-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded font-medium">Free</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-secondary-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Utility Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <Hash className="w-6 h-6 text-orange-600" />
            Utility Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {utilityTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="card hover:shadow-lg hover:border-orange-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs bg-accent-100 text-accent-700 px-2 py-0.5 rounded font-medium">Free</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-secondary-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-secondary-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-violet-600" />
            AI-Powered Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {aiTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="card hover:shadow-lg hover:border-violet-200 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <tool.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded font-medium">AI</span>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                <p className="text-sm text-secondary-600">{tool.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Premium Features */}
        <section className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-secondary-900 mb-2">Premium Features</h2>
            <p className="text-secondary-600">Unlock powerful tools with a DocuMaster Premium subscription</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumTools.map((tool) => (
              tool.href ? (
                <Link
                  key={tool.title}
                  to={tool.href}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-3">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-secondary-600">{tool.description}</p>
                </Link>
              ) : (
                <div key={tool.title} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center mb-3">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-1">{tool.title}</h3>
                  <p className="text-sm text-secondary-600">{tool.description}</p>
                </div>
              )
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/pricing" className="btn btn-primary">
              View Pricing Plans
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-secondary-900 text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Are the tools really free?', a: 'Yes! Most tools are free forever. Some advanced features require a Premium subscription for unlimited use.' },
              { q: 'Are my files safe?', a: 'Your files are encrypted with 256-bit SSL and automatically deleted within 1 hour of processing. We never read or store your document contents.' },
              { q: 'Is there a file size limit?', a: 'Free users can process files up to 10 MB. Premium users have 100 MB limit per file.' },
              { q: 'Do I need to create an account?', a: 'No account needed for basic tools. Sign up to save documents, track usage, and access premium features.' },
              { q: 'How many operations can I do per day?', a: 'Free users have 10 operations per day. Premium users have unlimited access to all tools.' },
              { q: 'Which devices are supported?', a: 'DocuMaster works on all devices - desktop, tablet, and mobile. No software installation required.' }
            ].map((faq) => (
              <div key={faq.q} className="card">
                <h3 className="font-semibold text-secondary-900 mb-2">{faq.q}</h3>
                <p className="text-secondary-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
