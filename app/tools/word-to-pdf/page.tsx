'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, Upload, Download, ArrowLeft, X, FileIcon } from 'lucide-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">DocuSprint</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/tools" className="text-slate-600 hover:text-blue-600">Tools</Link>
          <Link href="/pricing" className="text-slate-600 hover:text-blue-600">Pricing</Link>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
        <p>© 2025 DocuSprint. Created by Hamdan from India.</p>
      </div>
    </footer>
  )
}

export default function WordToPdfPage() {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setFileName(file.name)
    
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      const content = await file.text()
      setText(content)
      setTitle(file.name.replace('.txt', ''))
    } else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
      alert('For Word documents, please copy and paste the text content. Direct .doc/.docx parsing requires server-side processing.')
    }
  }

  const handleConvert = async () => {
    if (!text.trim()) {
      alert('Please enter or upload some text')
      return
    }
    
    setLoading(true)
    
    try {
      const pdfDoc = await PDFDocument.create()
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
      const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
      
      const fontSize = 12
      const titleSize = 18
      const lineHeight = fontSize * 1.5
      const margin = 50
      const pageWidth = 595.28
      const pageHeight = 841.89
      const maxWidth = pageWidth - margin * 2
      
      const lines = text.split('\n')
      let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
      let yPosition = pageHeight - margin
      
      // Add title if provided
      if (title) {
        currentPage.drawText(title, {
          x: margin,
          y: yPosition,
          size: titleSize,
          font: boldFont,
          color: rgb(0, 0, 0),
        })
        yPosition -= titleSize * 2
      }
      
      for (const line of lines) {
        const words = line.split(' ')
        let currentLine = ''
        
        for (const word of words) {
          const testLine = currentLine ? currentLine + ' ' + word : word
          const textWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize)
          
          if (textWidth > maxWidth && currentLine) {
            if (yPosition < margin + lineHeight) {
              currentPage = pdfDoc.addPage([pageWidth, pageHeight])
              yPosition = pageHeight - margin
            }
            
            currentPage.drawText(currentLine, {
              x: margin,
              y: yPosition,
              size: fontSize,
              font: timesRomanFont,
              color: rgb(0, 0, 0),
            })
            yPosition -= lineHeight
            currentLine = word
          } else {
            currentLine = testLine
          }
        }
        
        if (currentLine) {
          if (yPosition < margin + lineHeight) {
            currentPage = pdfDoc.addPage([pageWidth, pageHeight])
            yPosition = pageHeight - margin
          }
          
          currentPage.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          })
          yPosition -= lineHeight
        } else {
          yPosition -= lineHeight
        }
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${title || 'document'}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error converting to PDF:', error)
      alert('Error converting to PDF. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Word to PDF Converter</h1>
            <p className="text-slate-600">Convert text documents to PDF format instantly</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Upload Text File (Optional)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept=".txt,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-slate-400 text-sm">TXT files supported</p>
                </label>
              </div>
              {fileName && (
                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <FileIcon className="w-4 h-4" />
                  <span>{fileName}</span>
                  <button onClick={() => { setFileName(''); setText(''); setTitle(''); }} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Document Title (Optional)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            
            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Document Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text content here..."
                rows={12}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono text-sm"
              />
              <div className="mt-2 text-sm text-slate-500">
                {text.length} characters | {text.split(/\s+/).filter(w => w).length} words
              </div>
            </div>
            
            {/* Convert Button */}
            <button
              onClick={handleConvert}
              disabled={loading || !text.trim()}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Converting...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Convert to PDF & Download
                </>
              )}
            </button>
          </div>
          
          {/* Instructions */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Use</h2>
            <ol className="space-y-2 text-slate-600">
              <li>1. Upload a text file or paste your content directly</li>
              <li>2. Add an optional title for your document</li>
              <li>3. Click "Convert to PDF & Download" to generate your PDF</li>
              <li>4. The PDF will automatically download to your device</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
