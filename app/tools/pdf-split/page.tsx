'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Upload, FileText, Download, ArrowLeft, Scissors } from 'lucide-react'
import { Header, Footer } from '@/components/navigation'

export default function PDFSplitPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pageCount, setPageCount] = useState(0)
  const [splitMode, setSplitMode] = useState<'all' | 'range' | 'extract'>('all')
  const [rangeStart, setRangeStart] = useState(1)
  const [rangeEnd, setRangeEnd] = useState(1)
  const [extractPages, setExtractPages] = useState('')
  const [splitting, setSplitting] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFile = useCallback(async (newFile: File | null) => {
    if (!newFile || newFile.type !== 'application/pdf') return
    setFile(newFile)
    
    try {
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await newFile.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      const count = pdf.getPageCount()
      setPageCount(count)
      setRangeEnd(count)
    } catch {
      alert('Error reading PDF file')
    }
  }, [])

  const splitPDF = async () => {
    if (!file) return
    setSplitting(true)

    try {
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)

      if (splitMode === 'all') {
        // Split into individual pages
        for (let i = 0; i < pdf.getPageCount(); i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdf, [i])
          newPdf.addPage(page)
          const pdfBytes = await newPdf.save()
          downloadPDF(pdfBytes, `page-${i + 1}.pdf`)
        }
      } else if (splitMode === 'range') {
        // Extract page range
        const newPdf = await PDFDocument.create()
        const indices = []
        for (let i = rangeStart - 1; i < rangeEnd; i++) {
          indices.push(i)
        }
        const pages = await newPdf.copyPages(pdf, indices)
        pages.forEach(page => newPdf.addPage(page))
        const pdfBytes = await newPdf.save()
        downloadPDF(pdfBytes, `pages-${rangeStart}-${rangeEnd}.pdf`)
      } else if (splitMode === 'extract') {
        // Extract specific pages
        const pageNumbers = extractPages.split(',').map(p => parseInt(p.trim()) - 1).filter(p => p >= 0 && p < pageCount)
        if (pageNumbers.length === 0) {
          alert('Please enter valid page numbers')
          setSplitting(false)
          return
        }
        const newPdf = await PDFDocument.create()
        const pages = await newPdf.copyPages(pdf, pageNumbers)
        pages.forEach(page => newPdf.addPage(page))
        const pdfBytes = await newPdf.save()
        downloadPDF(pdfBytes, `extracted-pages.pdf`)
      }
    } catch (error) {
      alert('Error splitting PDF. Please try again.')
    } finally {
      setSplitting(false)
    }
  }

  const downloadPDF = (bytes: Uint8Array, filename: string) => {
    const blob = new Blob([bytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-2xl mb-4">
              <Scissors className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Split</h1>
            <p className="text-slate-600">Split PDF into multiple files or extract specific pages</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0] || null) }}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Drag & drop a PDF file here, or</p>
                <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  Browse Files
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg mb-6">
                  <FileText className="w-8 h-8 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500">{pageCount} pages | {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={() => { setFile(null); setPageCount(0) }} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-slate-900">Split Options</h3>
                  
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="mode" checked={splitMode === 'all'} onChange={() => setSplitMode('all')} />
                    <div>
                      <p className="font-medium text-slate-900">Split All Pages</p>
                      <p className="text-sm text-slate-500">Create separate PDF for each page</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="mode" checked={splitMode === 'range'} onChange={() => setSplitMode('range')} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Extract Page Range</p>
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="number"
                          min={1}
                          max={pageCount}
                          value={rangeStart}
                          onChange={(e) => setRangeStart(parseInt(e.target.value) || 1)}
                          className="w-20 px-3 py-1 border rounded text-sm"
                          disabled={splitMode !== 'range'}
                        />
                        <span className="text-slate-500">to</span>
                        <input
                          type="number"
                          min={1}
                          max={pageCount}
                          value={rangeEnd}
                          onChange={(e) => setRangeEnd(parseInt(e.target.value) || 1)}
                          className="w-20 px-3 py-1 border rounded text-sm"
                          disabled={splitMode !== 'range'}
                        />
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="mode" checked={splitMode === 'extract'} onChange={() => setSplitMode('extract')} />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">Extract Specific Pages</p>
                      <input
                        type="text"
                        placeholder="e.g., 1, 3, 5, 7"
                        value={extractPages}
                        onChange={(e) => setExtractPages(e.target.value)}
                        className="w-full mt-2 px-3 py-1 border rounded text-sm"
                        disabled={splitMode !== 'extract'}
                      />
                    </div>
                  </label>
                </div>

                <button
                  onClick={splitPDF}
                  disabled={splitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {splitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Splitting...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Split & Download
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Split PDF Files</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Upload your PDF file by dragging or browsing</li>
              <li>Choose your split option: all pages, range, or specific pages</li>
              <li>Click "Split & Download" to get your files</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
