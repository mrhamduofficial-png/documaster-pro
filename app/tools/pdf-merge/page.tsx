'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Upload, FileText, Download, Trash2, GripVertical, ArrowLeft, Merge } from 'lucide-react'
import { Header, Footer } from '@/components/navigation'

export default function PDFMergePage() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return
    const pdfFiles = Array.from(newFiles).filter(f => f.type === 'application/pdf')
    setFiles(prev => [...prev, ...pdfFiles])
  }, [])

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const moveFile = (from: number, to: number) => {
    if (to < 0 || to >= files.length) return
    const newFiles = [...files]
    const [removed] = newFiles.splice(from, 1)
    newFiles.splice(to, 0, removed)
    setFiles(newFiles)
  }

  const mergePDFs = async () => {
    if (files.length < 2) return
    setMerging(true)

    try {
      const { PDFDocument } = await import('pdf-lib')
      const mergedPdf = await PDFDocument.create()

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach(page => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = 'merged-document.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      alert('Error merging PDFs. Please try again.')
    } finally {
      setMerging(false)
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
              <Merge className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Merge</h1>
            <p className="text-slate-600">Combine multiple PDF files into one document</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            {/* Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Drag & drop PDF files here, or</p>
              <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-slate-900 mb-3">Files to Merge ({files.length})</h3>
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <button
                        onClick={() => moveFile(index, index - 1)}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                      >
                        <GripVertical className="w-5 h-5" />
                      </button>
                      <FileText className="w-5 h-5 text-red-500" />
                      <span className="flex-1 text-slate-700 truncate">{file.name}</span>
                      <span className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <button onClick={() => removeFile(index)} className="p-1 text-red-500 hover:text-red-700">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={mergePDFs}
                  disabled={files.length < 2 || merging}
                  className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {merging ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Merging...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Merge & Download PDF
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* SEO Content */}
          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Merge PDF Files</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Upload two or more PDF files by dragging or browsing</li>
              <li>Reorder files by using the drag handles if needed</li>
              <li>Click "Merge & Download" to combine all PDFs</li>
              <li>Your merged PDF will download automatically</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
