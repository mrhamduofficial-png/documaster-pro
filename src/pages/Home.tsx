import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
  Shield,
  Instagram,
  Star,
  Sparkles,
  Globe,
  QrCode,
  Hash
} from 'lucide-react';

const tools = [
  { icon: Layers, title: 'PDF Merge', description: 'Combine multiple PDFs into one', href: '/tools/pdf-merge', color: 'from-blue-500 to-blue-600' },
  { icon: Scissors, title: 'PDF Split', description: 'Extract pages or split PDFs', href: '/tools/pdf-split', color: 'from-green-500 to-green-600' },
  { icon: FileText, title: 'PDF Compress', description: 'Reduce file size instantly', href: '/tools/pdf-compress', color: 'from-purple-500 to-purple-600' },
  { icon: FileText, title: 'PDF to Word', description: 'Convert PDF to editable Word', href: '/tools/pdf-to-word', color: 'from-orange-500 to-orange-600' },
  { icon: FileText, title: 'PDF to Excel', description: 'Extract tables to Excel', href: '/tools/pdf-to-excel', color: 'from-emerald-500 to-emerald-600' },
  { icon: Image, title: 'Image Converter', description: 'Convert between image formats', href: '/tools/image-converter', color: 'from-pink-500 to-pink-600' },
  { icon: Sparkles, title: 'AI Image Enhancer', description: 'Upscale to HD/4K/8K', href: '/tools/image-enhancer', color: 'from-violet-500 to-violet-600' },
  { icon: ScanLine, title: 'OCR Scanner', description: 'Extract text from images', href: '/tools/ocr-scanner', color: 'from-cyan-500 to-cyan-600' },
  { icon: PenTool, title: 'Digital Sign', description: 'Sign documents digitally', href: '/tools/digital-sign', color: 'from-amber-500 to-amber-600' },
  { icon: QrCode, title: 'QR Generator', description: 'Create custom QR codes', href: '/tools/qr-generator', color: 'from-indigo-500 to-indigo-600' },
  { icon: Globe, title: 'Translator', description: 'Translate documents', href: '/tools/document-translator', color: 'from-teal-500 to-teal-600' },
  { icon: Hash, title: 'Word Counter', description: 'Count words & characters', href: '/tools/word-counter', color: 'from-rose-500 to-rose-600' }
];

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Process documents in seconds, not minutes. Our optimized tools deliver results instantly.' },
  { icon: Shield, title: 'Bank-Level Security', description: '256-bit SSL encryption. Your files are automatically deleted after processing.' },
  { icon: Users, title: '50K+ Daily Users', description: 'Trusted by students, professionals, and businesses in 150+ countries.' }
];

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>DocuMaster - Free PDF Tools & Document Management | 30+ Free Tools</title>
        <meta name="description" content="Free PDF tools for everyone. Merge PDFs, split documents, compress files, convert PDF to Word/Excel, OCR scanning, digital signatures. 30+ free tools. Created by Hamdan." />
        <meta name="keywords" content="PDF merge, PDF split, PDF compress, PDF to Word, PDF to Excel, OCR, digital signature, free PDF tools, document converter" />
        <meta property="og:title" content="DocuMaster - Free PDF Tools & Document Management" />
        <meta property="og:description" content="30+ free PDF tools for everyone. Merge, split, compress, convert documents instantly." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://documaster.app" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Trusted by 50,000+ users worldwide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Free PDF Tools for
              <span className="block text-accent-300">Everyone</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              30+ professional document tools. Merge PDFs, convert files, scan documents, and more.
              No signup required. Your files are secure and automatically deleted.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/tools" className="btn bg-white text-primary-600 hover:bg-secondary-100 text-lg px-8 py-4 shadow-lg">
                Explore Free Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/auth?register=true" className="btn border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                Create Free Account
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-white/80">
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-300" /> 100% Free Tools</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-300" /> No Watermark</span>
              <span className="flex items-center gap-2"><Check className="w-4 h-4 text-accent-300" /> Mobile Friendly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 lg:py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Popular Tools
            </h2>
            <p className="text-lg text-secondary-600">
              Start using our most popular tools for free
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
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
              View All 30+ Tools
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Why Choose DocuMaster?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="card text-center">
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

      {/* Owner Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-accent-600 h-32" />
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center gap-6 -mt-16">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg">
                  H
                </div>
                <div className="text-center md:text-left pt-8 md:pt-0 flex-1">
                  <h2 className="text-2xl font-bold text-secondary-900">Hamdan</h2>
                  <p className="text-secondary-600 mb-4">Founder & Developer of DocuMaster</p>
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
              <p className="mt-6 text-secondary-700 text-center md:text-left">
                "I created DocuMaster to provide professional-grade document tools accessible to everyone.
                Whether you're a student, freelancer, or business owner, you deserve powerful tools without the cost.
                Thank you for trusting DocuMaster!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
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
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Loved by Users Worldwide
            </h2>
            <div className="flex items-center justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 text-secondary-600">50,000+ happy users</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', role: 'Student', text: 'DocuMaster saved me during exam season. The PDF merge and compress tools are lifesavers! Free and super fast.' },
              { name: 'John D.', role: 'Business Owner', text: 'We switched from expensive software to DocuMaster. The tools are professional quality without the high costs.' },
              { name: 'Lisa K.', role: 'Freelancer', text: 'Fast, reliable, and free. I use it daily for client work. The OCR scanner is incredibly accurate.' }
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
              href="https://twitter.com/intent/tweet?text=Check%20out%20DocuMaster%20-%2030+%20free%20PDF%20tools!&url=https://documaster.app"
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
