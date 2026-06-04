'use client'

import { Header, Footer } from '@/components/navigation'
import Link from 'next/link'
import { 
  FileText, Image, Code, ArrowRight, Calculator,
  Hash, QrCode, Lock, Braces, Binary, Type, Minimize2, Palette, Ruler, Cake,
  FileSpreadsheet, FilePlus, FileX, FileArchive, Table
} from 'lucide-react'

const toolCategories = [
  {
    name: 'PDF Tools',
    description: 'Edit, merge, split and compress PDF files',
    icon: FileText,
    color: 'from-red-500 to-orange-500',
    tools: [
      { name: 'PDF Merge', href: '/tools/pdf-merge', icon: FilePlus, description: 'Combine multiple PDFs into one' },
      { name: 'PDF Split', href: '/tools/pdf-split', icon: FileX, description: 'Split PDF into separate pages' },
      { name: 'PDF Compress', href: '/tools/pdf-compress', icon: FileArchive, description: 'Reduce PDF file size' },
      { name: 'Text to PDF', href: '/tools/text-to-pdf', icon: FileText, description: 'Convert text to PDF document' },
    ]
  },
  {
    name: 'Excel & Data Tools',
    description: 'Convert and process spreadsheet data',
    icon: FileSpreadsheet,
    color: 'from-green-500 to-emerald-500',
    tools: [
      { name: 'Excel to JSON', href: '/tools/excel-to-json', icon: Table, description: 'Convert Excel files to JSON' },
      { name: 'JSON to Excel', href: '/tools/json-to-excel', icon: FileSpreadsheet, description: 'Convert JSON data to Excel' },
    ]
  },
  {
    name: 'Text Tools',
    description: 'Text processing and generation utilities',
    icon: Type,
    color: 'from-blue-500 to-cyan-500',
    tools: [
      { name: 'Word Counter', href: '/tools/word-counter', icon: Hash, description: 'Count words, characters, sentences' },
      { name: 'Lorem Ipsum Generator', href: '/tools/lorem-ipsum', icon: FileText, description: 'Generate placeholder text' },
      { name: 'Text Case Converter', href: '/tools/case-converter', icon: Type, description: 'Convert text to any case' },
    ]
  },
  {
    name: 'Image Tools',
    description: 'Compress and optimize images',
    icon: Image,
    color: 'from-purple-500 to-pink-500',
    tools: [
      { name: 'Image Compressor', href: '/tools/image-compress', icon: Minimize2, description: 'Reduce image size without quality loss' },
      { name: 'QR Code Generator', href: '/tools/qr-generator', icon: QrCode, description: 'Create custom QR codes' },
    ]
  },
  {
    name: 'Developer Tools',
    description: 'Essential tools for developers',
    icon: Code,
    color: 'from-indigo-500 to-blue-500',
    tools: [
      { name: 'JSON Formatter', href: '/tools/json-formatter', icon: Braces, description: 'Format and validate JSON' },
      { name: 'Base64 Encoder/Decoder', href: '/tools/base64', icon: Binary, description: 'Encode and decode Base64' },
      { name: 'Hash Generator', href: '/tools/hash-generator', icon: Hash, description: 'Generate MD5, SHA-1, SHA-256 hashes' },
      { name: 'Color Picker', href: '/tools/color-picker', icon: Palette, description: 'Pick colors and convert formats' },
    ]
  },
  {
    name: 'Calculators & Converters',
    description: 'Useful calculators and converters',
    icon: Calculator,
    color: 'from-yellow-500 to-orange-500',
    tools: [
      { name: 'Unit Converter', href: '/tools/unit-converter', icon: Ruler, description: 'Convert between units of measurement' },
      { name: 'Age Calculator', href: '/tools/age-calculator', icon: Cake, description: 'Calculate exact age and more' },
      { name: 'Password Generator', href: '/tools/password-generator', icon: Lock, description: 'Generate secure passwords' },
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
            <h1 className="text-4xl font-bold mb-4 text-slate-900">All Free Online Tools</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              18+ free online tools for PDF, Excel, text, images, and development - no signup required
            </p>
          </div>

          {/* Ad Slot */}
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-24 mb-12 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
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
                    <h2 className="text-2xl font-bold text-slate-900">{category.name}</h2>
                    <p className="text-sm text-slate-500">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map((tool, toolIndex) => (
                    <Link
                      key={toolIndex}
                      href={tool.href}
                      className="bg-white border border-slate-200 rounded-xl p-5 group hover:border-blue-300 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <tool.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {tool.name}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            {tool.description}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
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
