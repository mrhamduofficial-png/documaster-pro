import { Header, Footer } from '@/components/navigation'
import Link from 'next/link'
import { 
  Sparkles, FileText, Image, Code, Zap, Shield, Clock, 
  Globe, ArrowRight, Star, CheckCircle, Play,
  PenTool, Languages, Hash, QrCode, Lock, Wand2
} from 'lucide-react'

const featuredTools = [
  {
    name: 'AI Writing Assistant',
    description: 'Generate blog posts, emails, social media content with AI',
    icon: PenTool,
    href: '/tools/ai-writer',
    color: 'from-purple-500 to-pink-500',
    badge: 'AI Powered',
    premium: false,
  },
  {
    name: 'Code Generator',
    description: 'Generate code in Python, JavaScript, TypeScript & more',
    icon: Code,
    href: '/tools/code-generator',
    color: 'from-green-500 to-emerald-500',
    badge: 'AI Powered',
    premium: false,
  },
  {
    name: 'AI Translator',
    description: 'Translate text to 100+ languages instantly',
    icon: Languages,
    href: '/tools/translator',
    color: 'from-blue-500 to-cyan-500',
    badge: 'AI Powered',
    premium: false,
  },
  {
    name: 'PDF to Word',
    description: 'Convert PDF documents to editable Word files',
    icon: FileText,
    href: '/tools/pdf-to-word',
    color: 'from-red-500 to-orange-500',
    badge: 'Popular',
    premium: false,
  },
  {
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: Image,
    href: '/tools/image-compress',
    color: 'from-yellow-500 to-amber-500',
    badge: 'Fast',
    premium: false,
  },
  {
    name: 'QR Generator',
    description: 'Create custom QR codes for URLs, WiFi, contacts',
    icon: QrCode,
    href: '/tools/qr-generator',
    color: 'from-indigo-500 to-violet-500',
    badge: 'Free',
    premium: false,
  },
]

const allTools = [
  { 
    category: 'AI Tools', 
    icon: Sparkles,
    description: 'Powered by advanced AI models',
    tools: [
      { name: 'AI Writing Assistant', href: '/tools/ai-writer', description: 'Generate any type of content' },
      { name: 'Text Summarizer', href: '/tools/summarizer', description: 'Summarize long texts instantly' },
      { name: 'AI Translator', href: '/tools/translator', description: 'Translate to 100+ languages' },
      { name: 'Code Generator', href: '/tools/code-generator', description: 'Generate code in any language' },
      { name: 'Grammar Checker', href: '/tools/grammar-checker', description: 'Fix grammar & improve style' },
      { name: 'Email Writer', href: '/tools/email-writer', description: 'Write professional emails' },
      { name: 'LinkedIn Post Generator', href: '/tools/linkedin-generator', description: 'Create viral LinkedIn posts' },
      { name: 'Resume Builder', href: '/tools/resume-builder', description: 'Build ATS-friendly resumes' },
    ]
  },
  { 
    category: 'PDF Tools', 
    icon: FileText,
    description: 'Complete PDF management suite',
    tools: [
      { name: 'PDF to Word', href: '/tools/pdf-to-word', description: 'Convert PDF to DOCX' },
      { name: 'Word to PDF', href: '/tools/word-to-pdf', description: 'Convert DOCX to PDF' },
      { name: 'Merge PDF', href: '/tools/pdf-merge', description: 'Combine multiple PDFs' },
      { name: 'Split PDF', href: '/tools/pdf-split', description: 'Split PDF into pages' },
      { name: 'Compress PDF', href: '/tools/pdf-compress', description: 'Reduce PDF file size' },
      { name: 'PDF to Image', href: '/tools/pdf-to-image', description: 'Convert PDF to images' },
    ]
  },
  { 
    category: 'Image Tools', 
    icon: Image,
    description: 'Edit and optimize images',
    tools: [
      { name: 'Image Compressor', href: '/tools/image-compress', description: 'Compress without quality loss' },
      { name: 'Background Remover', href: '/tools/background-remover', description: 'AI-powered background removal', premium: true },
      { name: 'Image Converter', href: '/tools/image-converter', description: 'Convert between formats' },
      { name: 'Image Resizer', href: '/tools/image-resize', description: 'Resize to any dimension' },
    ]
  },
  { 
    category: 'Utility Tools', 
    icon: Code,
    description: 'Developer & everyday utilities',
    tools: [
      { name: 'QR Generator', href: '/tools/qr-generator', description: 'Create custom QR codes' },
      { name: 'Word Counter', href: '/tools/word-counter', description: 'Count words & characters' },
      { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format & validate JSON' },
      { name: 'Password Generator', href: '/tools/password-generator', description: 'Generate secure passwords' },
      { name: 'Hash Generator', href: '/tools/hash-generator', description: 'Generate MD5, SHA256 hashes' },
      { name: 'Base64 Encoder', href: '/tools/base64', description: 'Encode & decode Base64' },
    ]
  },
]

const stats = [
  { value: '10M+', label: 'Files Processed' },
  { value: '500K+', label: 'Happy Users' },
  { value: '50+', label: 'Free Tools' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Process files in seconds with our optimized algorithms' },
  { icon: Shield, title: '100% Secure', description: 'Your files are encrypted and automatically deleted' },
  { icon: Globe, title: 'Works Everywhere', description: 'Use on any device - desktop, tablet, or mobile' },
  { icon: Clock, title: 'Always Available', description: '24/7 access to all tools, no downtime' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgb(var(--primary))]/5 to-transparent" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/20 mb-6">
              <Sparkles className="w-4 h-4 text-[rgb(var(--primary))]" />
              <span className="text-sm font-medium text-[rgb(var(--primary))]">
                Now with AI-Powered Tools
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
              Your All-in-One
              <br />
              <span className="gradient-text">AI Document Suite</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto mb-8">
              Free AI-powered tools to convert, compress, and create documents. 
              PDF converter, image tools, AI writing assistant, code generator & more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/tools" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                <Play className="w-5 h-5" />
                Explore Tools
              </Link>
              <Link href="/tools/ai-writer" className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                <Wand2 className="w-5 h-5" />
                Try AI Writer
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-[rgb(var(--muted-foreground))]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Slot - Top Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="ads-slot h-24">
            <span>Advertisement Area</span>
          </div>
        </div>

        {/* Featured Tools */}
        <section className="py-16 bg-[rgb(var(--card))]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Tools</h2>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
                Our most popular AI-powered and utility tools loved by millions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="tool-card group relative overflow-hidden"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      tool.badge === 'AI Powered' 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : tool.badge === 'Popular'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>
                  
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[rgb(var(--primary))] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    {tool.description}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-sm text-[rgb(var(--primary))] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Try Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools by Category */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">All Tools</h2>
              <p className="text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
                Browse our complete collection of 50+ free online tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {allTools.map((category, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.category}</h3>
                      <p className="text-xs text-[rgb(var(--muted-foreground))]">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.tools.map((tool, toolIndex) => (
                      <Link
                        key={toolIndex}
                        href={tool.href}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[rgb(var(--secondary))] transition-colors group"
                      >
                        <div>
                          <span className="text-sm font-medium group-hover:text-[rgb(var(--primary))]">
                            {tool.name}
                          </span>
                          {tool.premium && (
                            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                              PRO
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-[rgb(var(--card))]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose DocuSprint?</h2>
              <p className="text-[rgb(var(--muted-foreground))]">
                Built for speed, security, and simplicity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-14 h-14 mx-auto rounded-2xl gradient-bg flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="card p-12 relative overflow-hidden">
              <div className="absolute inset-0 gradient-bg opacity-10" />
              <div className="relative">
                <h2 className="text-3xl font-bold mb-4">Ready to Boost Your Productivity?</h2>
                <p className="text-[rgb(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
                  Join 500,000+ users who trust DocuSprint for their document needs. 
                  Start free, upgrade when you need more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/tools" className="btn-primary inline-flex items-center justify-center gap-2">
                    Start Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center gap-2">
                    View Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
