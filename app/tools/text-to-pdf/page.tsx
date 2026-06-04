'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">DocuSprint</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-slate-600 hover:text-blue-600">Tools</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600">Pricing</Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600">About</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-600">
        <p>&copy; 2025 DocuSprint. Created by Hamdan</p>
      </div>
    </footer>
  )
}

export default function TextToPdfPage() {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [fontSize, setFontSize] = useState(12)
  const [loading, setLoading] = useState(false)

  const createPdf = async () => {
    if (!text.trim()) return
    
    setLoading(true)
    try {
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      const pageWidth = 595.28
      const pageHeight = 841.89
      const margin = 50
      const lineHeight = fontSize * 1.5
      
      let page = pdfDoc.addPage([pageWidth, pageHeight])
      let yPosition = pageHeight - margin
      
      // Add title if provided
      if (title.trim()) {
        page.drawText(title, {
          x: margin,
          y: yPosition,
          size: fontSize + 6,
          font: boldFont,
          color: rgb(0, 0, 0),
        })
        yPosition -= lineHeight * 2
      }
      
      // Split text into lines
      const words = text.split(' ')
      let currentLine = ''
      
      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        const textWidth = font.widthOfTextAtSize(testLine, fontSize)
        
        if (textWidth > pageWidth - margin * 2) {
          page.drawText(currentLine, {
            x: margin,
            y: yPosition,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          })
          yPosition -= lineHeight
          currentLine = word
          
          // Add new page if needed
          if (yPosition < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight])
            yPosition = pageHeight - margin
          }
        } else {
          currentLine = testLine
        }
      }
      
      // Draw remaining text
      if (currentLine) {
        page.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        })
      }
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = title ? `${title.replace(/[^a-zA-Z0-9]/g, '-')}.pdf` : 'document.pdf'
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error creating PDF:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Text to PDF Converter</h1>
            <p className="text-slate-600">Convert your text into a professional PDF document</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Document Title (Optional)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter or paste your text here..."
                className="w-full h-64 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="8"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={createPdf}
              disabled={!text.trim() || loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating PDF...' : 'Create PDF'}
            </button>
          </div>

          <div className="mt-12 bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Enter an optional title for your document</li>
              <li>Type or paste your text content in the text area</li>
              <li>Adjust the font size using the slider</li>
              <li>Click "Create PDF" to generate and download your document</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
