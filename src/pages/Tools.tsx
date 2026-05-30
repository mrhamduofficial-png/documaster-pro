import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Layers, Scissors, FileText, Image, ScanLine, PenTool, FileOutput, 
  Users, CloudLightning, Lock, Droplets, RotateCw, Hash, Maximize2, 
  Minimize2, Video, QrCode, Sparkles, Globe, ChartBar as FileBarChart, 
  FileCheck, Shield, Clock, LayoutGrid as Layout, Diff, Search
} from 'lucide-react';
import { useState } from 'react';

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
  { icon: Minimize2, title: 'Image Compressor', description: 'Reduce image file size for web optimization', href: '/tools/image-compress', free: true },
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
  const [searchQuery, setSearchQuery] = useState('');

  const allTools = [...pdfTools, ...imageTools, ...utilityTools, ...aiTools];
  
  const filteredTools = searchQuery 
    ? allTools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div className="py-12 bg-slate-950">
      <Helmet>
        <title>Free PDF & Document Tools - 30+ Web Utility Tools | DocuSprint</title>
        <meta name="description" content="30+ free web utility tools: PDF merge, split, compress, convert, OCR, image compressor, QR generator, word counter, and more. No signup required. Fast and secure." />
        <meta name="keywords" content="PDF tools, PDF merge, PDF split, PDF compress, PDF converter, OCR scanner, image compressor, QR code generator, word counter, free online tools" />
        <meta property="og:title" content="Free PDF & Document Tools - DocuSprint" />
        <meta property="og:description" content="30+ free web utility tools for everyone. Professional document management without the cost." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://docusprint.app/tools" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            30+ Free Web Utility Tools
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            Professional document and web tools for everyone. No signup required.
            Your files are encrypted and automatically deleted after processing.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-12"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-sm rounded-full font-medium border border-emerald-500/20">100% Free</span>
            <span className="px-4 py-2 bg-indigo-500/10 text-indigo-400 text-sm rounded-full font-medium border border-indigo-500/20">No Watermark</span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-400 text-sm rounded-full font-medium border border-purple-500/20">Bank-Level Security</span>
            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 text-sm rounded-full font-medium border border-cyan-500/20">Mobile Friendly</span>
          </div>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-12">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Search Results */}
        {filteredTools && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">
              Search Results ({filteredTools.length})
            </h2>
            {filteredTools.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      {tool.free && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">Free</span>}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">No tools found matching "{searchQuery}"</p>
            )}
          </section>
        )}

        {/* PDF Tools */}
        {!filteredTools && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                PDF Tools
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pdfTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      {tool.free && <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">Free</span>}
                    </div>
                    <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Image Tools */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                  <Image className="w-5 h-5 text-white" />
                </div>
                Image Tools
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {imageTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">Free</span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Utility Tools */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                Utility Tools
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {utilityTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">Free</span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* AI Tools */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                AI-Powered Tools
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {aiTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <tool.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-full font-medium border border-violet-500/20">AI</span>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                    <p className="text-sm text-slate-400">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Sidebar Ad */}
        <div className="ads-slot mb-12">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-slate-600">
            <span>Ad Space - Mid Page</span>
          </div>
        </div>

        {/* Premium Features */}
        <section className="card mb-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Premium Features</h2>
            <p className="text-slate-400">Unlock powerful tools with a DocuSprint Premium subscription</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumTools.map((tool) => (
              tool.href ? (
                <Link
                  key={tool.title}
                  to={tool.href}
                  className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                  <p className="text-sm text-slate-400">{tool.description}</p>
                </Link>
              ) : (
                <div key={tool.title} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.title}</h3>
                  <p className="text-sm text-slate-400">{tool.description}</p>
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
        <section className="max-w-3xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              { q: 'Are the tools really free?', a: 'Yes! Most tools are free forever. Some advanced features require a Premium subscription for unlimited use.' },
              { q: 'Are my files safe?', a: 'Your files are encrypted with 256-bit SSL and automatically deleted within 1 hour of processing. We never read or store your document contents.' },
              { q: 'Is there a file size limit?', a: 'Free users can process files up to 10 MB. Premium users have 100 MB limit per file.' },
              { q: 'Do I need to create an account?', a: 'No account needed for basic tools. Sign up to save documents, track usage, and access premium features.' },
              { q: 'How many operations can I do per day?', a: 'Free users have 10 operations per day. Premium users have unlimited access to all tools.' },
              { q: 'Which devices are supported?', a: 'DocuSprint works on all devices - desktop, tablet, and mobile. No software installation required.' }
            ].map((faq) => (
              <div 
                key={faq.q} 
                className="card"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <h3 className="font-semibold text-white mb-2" itemProp="name">{faq.q}</h3>
                <p 
                  className="text-slate-400"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{faq.a}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
