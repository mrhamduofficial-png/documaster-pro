import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Layers,
  Scissors,
  Image,
  ScanLine,
  ArrowRight,
  Check,
  Users,
  Zap,
  Shield,
  Instagram,
  Star,
  Globe,
  QrCode,
  Hash,
  Minimize2,
  ChevronRight,
  Sparkles,
  Clock,
  Lock,
  Download,
  FileOutput
} from 'lucide-react';

const featuredTools = [
  { 
    icon: Minimize2, 
    title: 'Image Compressor', 
    description: 'Reduce image file size without quality loss', 
    href: '/tools/image-compress', 
    gradient: 'from-pink-500 to-rose-500',
    tag: 'Popular'
  },
  { 
    icon: FileOutput, 
    title: 'PDF to Word', 
    description: 'Convert PDF to editable Word documents', 
    href: '/tools/pdf-to-word', 
    gradient: 'from-blue-500 to-indigo-500',
    tag: 'AI Powered'
  },
  { 
    icon: FileText, 
    title: 'Word to PDF', 
    description: 'Convert Word documents to PDF format', 
    href: '/tools/word-to-pdf', 
    gradient: 'from-emerald-500 to-teal-500',
    tag: 'Free'
  },
  { 
    icon: QrCode, 
    title: 'QR Code Generator', 
    description: 'Create custom, scannable QR codes', 
    href: '/tools/qr-generator', 
    gradient: 'from-indigo-500 to-purple-500',
    tag: 'Instant'
  },
  { 
    icon: Hash, 
    title: 'Word Counter', 
    description: 'Count words, characters & paragraphs', 
    href: '/tools/word-counter', 
    gradient: 'from-cyan-500 to-blue-500',
    tag: 'Real-time'
  },
  { 
    icon: Layers, 
    title: 'PDF Merge', 
    description: 'Combine multiple PDFs into one', 
    href: '/tools/pdf-merge', 
    gradient: 'from-orange-500 to-amber-500',
    tag: 'Fast'
  }
];

const allTools = [
  { icon: Layers, title: 'PDF Merge', description: 'Combine multiple PDFs', href: '/tools/pdf-merge', color: 'from-blue-500 to-blue-600' },
  { icon: Scissors, title: 'PDF Split', description: 'Extract pages from PDF', href: '/tools/pdf-split', color: 'from-green-500 to-green-600' },
  { icon: FileText, title: 'PDF Compress', description: 'Reduce PDF file size', href: '/tools/pdf-compress', color: 'from-purple-500 to-purple-600' },
  { icon: FileOutput, title: 'PDF to Word', description: 'Convert to editable Word', href: '/tools/pdf-to-word', color: 'from-orange-500 to-orange-600' },
  { icon: FileText, title: 'PDF to Excel', description: 'Extract tables to Excel', href: '/tools/pdf-to-excel', color: 'from-emerald-500 to-emerald-600' },
  { icon: Image, title: 'Image Converter', description: 'Convert image formats', href: '/tools/image-converter', color: 'from-pink-500 to-pink-600' },
  { icon: Sparkles, title: 'AI Image Enhancer', description: 'Upscale to HD/4K/8K', href: '/tools/image-enhancer', color: 'from-violet-500 to-violet-600' },
  { icon: ScanLine, title: 'OCR Scanner', description: 'Extract text from images', href: '/tools/ocr-scanner', color: 'from-cyan-500 to-cyan-600' },
  { icon: QrCode, title: 'QR Generator', description: 'Create custom QR codes', href: '/tools/qr-generator', color: 'from-indigo-500 to-indigo-600' },
  { icon: Globe, title: 'Translator', description: 'Translate documents', href: '/tools/document-translator', color: 'from-teal-500 to-teal-600' },
  { icon: Hash, title: 'Word Counter', description: 'Count words & characters', href: '/tools/word-counter', color: 'from-rose-500 to-rose-600' },
  { icon: Minimize2, title: 'Image Compress', description: 'Reduce image size', href: '/tools/image-compress', color: 'from-amber-500 to-amber-600' }
];

const features = [
  { 
    icon: Zap, 
    title: 'Lightning Fast', 
    description: 'Client-side processing for instant results. No waiting, no uploads to slow servers.',
    gradient: 'from-yellow-500 to-orange-500'
  },
  { 
    icon: Shield, 
    title: 'Bank-Level Security', 
    description: '256-bit SSL encryption. Files processed locally and never stored on our servers.',
    gradient: 'from-emerald-500 to-teal-500'
  },
  { 
    icon: Users, 
    title: '100K+ Happy Users', 
    description: 'Trusted by students, freelancers, and businesses in 150+ countries worldwide.',
    gradient: 'from-blue-500 to-indigo-500'
  }
];

const stats = [
  { value: '30+', label: 'Free Tools' },
  { value: '100K+', label: 'Daily Users' },
  { value: '150+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' }
];

export default function Home() {
  return (
    <div className="bg-slate-950">
      <Helmet>
        <title>DocuSprint - Free Online PDF Converter, Image Compressor & Web Utility Tools</title>
        <meta name="description" content="Free online PDF converter, fast image compressor, QR code generator, word counter, and 30+ all-in-one web utility tools. No signup required. Secure and instant." />
        <meta name="keywords" content="free online PDF converter, fast image compressor, all-in-one web utility tools, PDF to Word, Word to PDF, QR code generator, word counter, image compress" />
        <meta property="og:title" content="DocuSprint - Free Online PDF Converter & Web Utility Tools" />
        <meta property="og:description" content="30+ free web utility tools. PDF converter, image compressor, QR generator, word counter. Fast, secure, no signup." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://docusprint.app" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Top Ad Slot */}
          <div className="ads-slot mb-8 max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 mb-1">Advertisement</p>
            <div className="h-20 flex items-center justify-center text-slate-600">
              <span>Ad Space - Top Banner</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm mb-8">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-indigo-300">Trusted by 100,000+ users worldwide</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight text-balance">
              <span className="text-white">Free Web Tools for</span>
              <br />
              <span className="gradient-text">Everyone</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
              30+ professional utility tools. Compress images, convert PDFs, generate QR codes, count words, and more. 
              No signup required. Your files stay private and secure.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link 
                to="/tools" 
                className="btn btn-primary btn-lg w-full sm:w-auto shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                Explore All Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                to="/auth?register=true" 
                className="btn btn-outline btn-lg w-full sm:w-auto"
              >
                Create Free Account
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" /> 
                100% Free Tools
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" /> 
                No Watermarks
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" /> 
                No Registration
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" /> 
                Privacy Focused
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance">
              Featured Tools
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Our most popular tools, used by thousands of users daily
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Link
                key={tool.href}
                to={tool.href}
                className="tool-card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-400 mb-4">{tool.description}</p>
                <span className="inline-flex items-center text-sm text-indigo-400 font-medium group-hover:text-indigo-300">
                  Use Tool
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/tools" className="btn btn-outline btn-lg">
              View All 30+ Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sidebar Ad Section with Tools Grid */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Tools Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                All Tools
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {allTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="card card-hover p-4 group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <tool.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-white text-sm mb-1">{tool.title}</h3>
                    <p className="text-slate-500 text-xs">{tool.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Slot */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="ads-slot h-[600px] flex flex-col">
                  <p className="text-xs text-slate-500 mb-2">Advertisement</p>
                  <div className="flex-1 flex items-center justify-center text-slate-600">
                    <span>Sidebar Ad Space</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose DocuSprint?
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Built for speed, security, and simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card text-center py-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-400">Simple, fast, and secure</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Download, title: 'Upload Your File', description: 'Drag and drop or click to select files from your device' },
              { step: '02', icon: Clock, title: 'Process Instantly', description: 'Our tools process your files locally for maximum speed and privacy' },
              { step: '03', icon: Lock, title: 'Download Securely', description: 'Get your converted files instantly. No data stored on our servers' }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="card text-center py-10">
                  <span className="text-6xl font-bold text-slate-800 absolute top-4 right-4">{item.step}</span>
                  <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Owner Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden p-0">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32" />
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-6 -mt-16">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-slate-900 shadow-xl">
                  H
                </div>
                <div className="text-center md:text-left pt-8 md:pt-0 flex-1">
                  <h2 className="text-2xl font-bold text-white">Hamdan</h2>
                  <p className="text-slate-400 mb-4">Founder & Developer of DocuSprint</p>
                  <a
                    href="https://instagram.com/mr__hamdan__official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-5 h-5" />
                    Follow @mr__hamdan__official
                  </a>
                </div>
              </div>
              <p className="mt-6 text-slate-400 text-center md:text-left leading-relaxed">
                {'"I created DocuSprint to provide professional-grade web tools accessible to everyone. Whether you\'re a student, freelancer, or business owner, you deserve powerful tools without the cost. Thank you for trusting DocuSprint!"'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative text-center py-12 px-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Unlock Premium Features
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                Get unlimited access to all tools, faster processing, larger file limits, batch processing, and priority support.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/pricing"
                  className="btn btn-primary btn-lg"
                >
                  View Plans
                </Link>
                <Link
                  to="/auth?register=true"
                  className="btn btn-outline btn-lg"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Loved by Users Worldwide
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 text-slate-400">100,000+ happy users</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', role: 'Student', text: 'DocuSprint saved me during exam season. The PDF merge and compress tools are lifesavers! Free and super fast.' },
              { name: 'John D.', role: 'Business Owner', text: 'We switched from expensive software to DocuSprint. The tools are professional quality without the high costs.' },
              { name: 'Lisa K.', role: 'Freelancer', text: 'Fast, reliable, and free. I use it daily for client work. The image compressor is incredibly efficient.' }
            ].map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad + Share Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ad Slot Below Tool Interface */}
          <div className="ads-slot mb-8">
            <p className="text-xs text-slate-500 mb-2">Advertisement</p>
            <div className="h-24 flex items-center justify-center text-slate-600">
              <span>Ad Space - Below Content</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-4">Found DocuSprint useful? Share it with your friends!</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://twitter.com/intent/tweet?text=Check%20out%20DocuSprint%20-%2030+%20free%20web%20utility%20tools!&url=https://docusprint.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Share on Twitter
              </a>
              <a
                href="https://www.facebook.com/sharer/sharer.php?u=https://docusprint.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Share on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
