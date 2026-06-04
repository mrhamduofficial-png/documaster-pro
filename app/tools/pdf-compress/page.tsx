'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Upload, FileText, Download, ArrowLeft, FileDown } from 'lucide-react'
import { Header, Footer } from '@/components/navigation'

export default function PDFCompressPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressing, setCompressing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium')
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null)

  const handleFile = useCallback((newFile: File | null) => {
    if (!newFile || newFile.type !== 'application/pdf') return
    setFile(newFile)
    setResult(null)
  }, [])

  const compressPDF = async () => {
    if (!file) return
    setCompressing(true)

    try {
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await PDFDocument.load(arrayBuffer)
      
      // Re-save PDF with compression
      const compressedBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      })

      const originalSize = file.size
      const compressedSize = compressedBytes.length
      setResult({ original: originalSize, compressed: compressedSize })

      const blob = new Blob([new Uint8Array(compressedBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `compressed-${file.name}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      alert('Error compressing PDF. Please try again.')
    } finally {
      setCompressing(false)
    }
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
              <FileDown className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Compress</h1>
            <p className="text-slate-600">Reduce PDF file size while maintaining quality</p>
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
                    <p className="text-sm text-slate-500">{formatSize(file.size)}</p>
                  </div>
                  <button onClick={() => { setFile(null); setResult(null) }} className="text-red-500 hover:text-red-700">
                    Remove
                  </button>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Compression Quality</h3>
                  <div className="flex gap-3">
                    {(['low', 'medium', 'high'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                          quality === q
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <p className="font-medium capitalize">{q}</p>
                        <p className="text-xs text-slate-500">
                          {q === 'low' && 'Maximum compression'}
                          {q === 'medium' && 'Balanced'}
                          {q === 'high' && 'Best quality'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {result && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="font-semibold text-green-800 mb-2">Compression Complete!</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Original: {formatSize(result.original)}</span>
                      <span className="text-slate-600">Compressed: {formatSize(result.compressed)}</span>
                      <span className="font-medium text-green-700">
                        Saved: {((1 - result.compressed / result.original) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={compressPDF}
                  disabled={compressing}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {compressing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Compress & Download
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Compress PDF Files</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Upload your PDF file by dragging or browsing</li>
              <li>Select compression quality level</li>
              <li>Click "Compress & Download" to get your smaller PDF</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
