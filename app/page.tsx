'use client'

import { Header, Footer } from '@/components/navigation'
import Link from 'next/link'
import { 
  FileText, Image, Code, Zap, Shield, Clock, 
  Globe, ArrowRight,
  Hash, QrCode, Lock, Braces, Palette, Ruler, Cake, Minimize2,
  FilePlus, FileX, FileArchive, FileSpreadsheet, Edit3, FileOutput
} from 'lucide-react'

const featuredTools = [
  {
    name: 'PDF Editor',
    description: 'Edit PDF files online - add text, images, and more',
    icon: Edit3,
    href: '/tools/pdf-editor',
    color: 'from-red-500 to-orange-500',
  },
  {
    name: 'PDF to Word',
    description: 'Convert PDF to editable Word documents',
    icon: FileOutput,
    href: '/tools/pdf-to-word',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'PDF Merge',
    description: 'Combine multiple PDFs into one document',
    icon: FilePlus,
    href: '/tools/pdf-merge',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'QR Code Generator',
    description: 'Create custom QR codes for URLs, WiFi, text & more',
    icon: QrCode,
    href: '/tools/qr-generator',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Image Compressor',
    description: 'Compress images without losing quality',
    icon: Minimize2,
    href: '/tools/image-compress',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Unit Converter',
    description: 'Convert between different units instantly',
    icon: Ruler,
    href: '/tools/unit-converter',
    color: 'from-orange-500 to-red-500',
  },
]

const allToolsList = [
  { name: 'PDF Editor', href: '/tools/pdf-editor', description: 'Edit PDF files' },
  { name: 'PDF to Word', href: '/tools/pdf-to-word', description: 'Convert PDF to Word' },
  { name: 'PDF Merge', href: '/tools/pdf-merge', description: 'Combine PDFs' },
  { name: 'PDF Split', href: '/tools/pdf-split', description: 'Split PDF pages' },
  { name: 'PDF Compress', href: '/tools/pdf-compress', description: 'Compress PDFs' },
  { name: 'Word to PDF', href: '/tools/word-to-pdf', description: 'Convert Word to PDF' },
  { name: 'Text to PDF', href: '/tools/text-to-pdf', description: 'Create PDF from text' },
  { name: 'Excel to JSON', href: '/tools/excel-to-json', description: 'Convert Excel to JSON' },
  { name: 'JSON to Excel', href: '/tools/json-to-excel', description: 'Convert JSON to Excel' },
  { name: 'QR Code Generator', href: '/tools/qr-generator', description: 'Create QR codes' },
  { name: 'Image Compressor', href: '/tools/image-compress', description: 'Compress images' },
  { name: 'Image Converter', href: '/tools/image-converter', description: 'Convert image formats' },
  { name: 'Word Counter', href: '/tools/word-counter', description: 'Count words & characters' },
  { name: 'JSON Formatter', href: '/tools/json-formatter', description: 'Format JSON data' },
  { name: 'Password Generator', href: '/tools/password-generator', description: 'Generate passwords' },
  { name: 'Hash Generator', href: '/tools/hash-generator', description: 'Create hash values' },
  { name: 'Base64 Encoder', href: '/tools/base64', description: 'Encode & decode' },
  { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum', description: 'Placeholder text' },
  { name: 'Case Converter', href: '/tools/case-converter', description: 'Convert text case' },
  { name: 'Color Picker', href: '/tools/color-picker', description: 'Pick & convert colors' },
  { name: 'Unit Converter', href: '/tools/unit-converter', description: 'Convert units' },
  { name: 'Age Calculator', href: '/tools/age-calculator', description: 'Calculate age' },
]

const stats = [
  { value: '10M+', label: 'Files Processed' },
  { value: '500K+', label: 'Happy Users' },
  { value: '22+', label: 'Free Tools' },
  { value: '99.9%', label: 'Uptime' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', description: 'Process files in seconds with our optimized algorithms' },
  { icon: Shield, title: '100% Secure', description: 'Your files are processed locally in your browser' },
  { icon: Globe, title: 'Works Everywhere', description: 'Use on any device - desktop, tablet, or mobile' },
  { icon: Clock, title: 'No Registration', description: 'Use all tools instantly without signup' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900">
              Free PDF, Excel & Online
              <br />
              <span className="text-blue-600">Tools for Everyone</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              PDF Merge, Split, Compress, Excel Converter, QR Generator, Image Compressor & more.
              All tools work instantly in your browser - no signup required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                Explore All Tools
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/tools/pdf-merge" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all">
                Try PDF Merge
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Ad Slot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-24 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
          </div>
        </div>

        {/* Featured Tools */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Popular Tools</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Our most used free online tools - fast, secure, and easy to use
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="bg-white border border-slate-200 rounded-2xl p-6 group hover:border-blue-300 hover:shadow-xl transition-all"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                    <span>Use Tool</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Quick Links */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">All Free Tools</h2>
              <p className="text-slate-600">Quick access to all our tools</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {allToolsList.map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.name}
                    </span>
                    <p className="text-xs text-slate-500">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700">
                View All Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-slate-900">Why Choose DocuSprint?</h2>
              <p className="text-slate-600">Built for speed, security, and simplicity</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-2xl border border-slate-200">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              All tools are completely free to use. No signup, no credit card required.
            </p>
            <Link href="/tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              Explore All Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
