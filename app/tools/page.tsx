import { Header, Footer } from '@/components/navigation'
import Link from 'next/link'
import { 
  Sparkles, FileText, Image, Code, ArrowRight,
  PenTool, Languages, Hash, QrCode, Lock, Braces,
  FileImage, Minimize2, Type, Mail, Linkedin, FileCode, Binary
} from 'lucide-react'

const toolCategories = [
  {
    name: 'AI Tools',
    description: 'Powered by advanced AI models',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    tools: [
      { name: 'AI Writing Assistant', href: '/tools/ai-writer', icon: PenTool, description: 'Generate blog posts, emails, social media content' },
      { name: 'Text Summarizer', href: '/tools/summarizer', icon: FileText, description: 'Summarize long texts instantly' },
      { name: 'AI Translator', href: '/tools/translator', icon: Languages, description: 'Translate to 100+ languages' },
      { name: 'Code Generator', href: '/tools/code-generator', icon: Code, description: 'Generate code in any language' },
      { name: 'Grammar Checker', href: '/tools/grammar-checker', icon: Type, description: 'Fix grammar & improve style' },
      { name: 'Email Writer', href: '/tools/email-writer', icon: Mail, description: 'Write professional emails' },
      { name: 'LinkedIn Generator', href: '/tools/linkedin-generator', icon: Linkedin, description: 'Create viral LinkedIn posts' },
    ]
  },
  {
    name: 'PDF Tools',
    description: 'Complete PDF management suite',
    icon: FileText,
    color: 'from-red-500 to-orange-500',
    tools: [
      { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText, description: 'Convert PDF to DOCX' },
      { name: 'Word to PDF', href: '/tools/word-to-pdf', icon: FileText, description: 'Convert DOCX to PDF' },
      { name: 'Merge PDF', href: '/tools/pdf-merge', icon: FileText, description: 'Combine multiple PDFs' },
      { name: 'Compress PDF', href: '/tools/pdf-compress', icon: Minimize2, description: 'Reduce PDF file size' },
    ]
  },
  {
    name: 'Image Tools',
    description: 'Edit and optimize images',
    icon: Image,
    color: 'from-yellow-500 to-amber-500',
    tools: [
      { name: 'Image Compressor', href: '/tools/image-compress', icon: FileImage, description: 'Compress without quality loss' },
      { name: 'Background Remover', href: '/tools/background-remover', icon: Image, description: 'AI-powered background removal', premium: true },
      { name: 'Image Converter', href: '/tools/image-converter', icon: FileImage, description: 'Convert between formats' },
    ]
  },
  {
    name: 'Utility Tools',
    description: 'Developer & everyday utilities',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    tools: [
      { name: 'QR Generator', href: '/tools/qr-generator', icon: QrCode, description: 'Create custom QR codes' },
      { name: 'Word Counter', href: '/tools/word-counter', icon: Hash, description: 'Count words & characters' },
      { name: 'JSON Formatter', href: '/tools/json-formatter', icon: Braces, description: 'Format & validate JSON' },
      { name: 'Password Generator', href: '/tools/password-generator', icon: Lock, description: 'Generate secure passwords' },
      { name: 'Hash Generator', href: '/tools/hash-generator', icon: Hash, description: 'Generate SHA & MD5 hashes' },
      { name: 'Base64 Encoder', href: '/tools/base64', icon: Binary, description: 'Encode & decode Base64' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum', icon: FileText, description: 'Generate placeholder text' },
    ]
  },
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">All Tools</h1>
            <p className="text-xl text-[rgb(var(--muted-foreground))] max-w-2xl mx-auto">
              50+ free online tools for documents, images, and productivity
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-12">
            <span>Advertisement Area</span>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {toolCategories.map((category, index) => (
              <section key={index}>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <Link
                      key={toolIndex}
                      href={tool.href}
                      className="card p-5 group hover:border-[rgb(var(--primary))]/50 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[rgb(var(--secondary))] flex items-center justify-center group-hover:bg-[rgb(var(--primary))]/20 transition-colors">
                          <tool.icon className="w-5 h-5 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm group-hover:text-[rgb(var(--primary))] transition-colors truncate">
                              {tool.name}
                            </h3>
                            {tool.premium && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[rgb(var(--muted-foreground))] mt-1 line-clamp-2">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--primary))] group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
