'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { FileText, Upload, Download, ArrowLeft, CheckCircle, X, FileDown, Loader2 } from 'lucide-react'

// Header Component
function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">DocuSprint</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/tools" className="text-slate-600 hover:text-blue-600 transition-colors">All Tools</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600 transition-colors">Pricing</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2025 DocuSprint. Created by Hamdan</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-500 hover:text-blue-600 text-sm">Privacy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-blue-600 text-sm">Terms</Link>
            <Link href="/contact" className="text-slate-500 hover:text-blue-600 text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function PDFToWordPage() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setError('')
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setIsComplete(false)
      setExtractedText('')
    } else {
      setError('Please upload a PDF file')
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setIsComplete(false)
      setExtractedText('')
    } else {
      setError('Please upload a PDF file')
    }
  }

  const extractTextFromPDF = async () => {
    if (!file) return
    
    setIsProcessing(true)
    setError('')
    
    try {
      const pdfjsLib = await import('pdfjs-dist')
      
      // Set worker source
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      
      let fullText = ''
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item: { str?: string }) => item.str || '')
          .join(' ')
        fullText += pageText + '\n\n'
      }
      
      setExtractedText(fullText.trim())
      setIsComplete(true)
    } catch (err) {
      console.error('Error extracting PDF:', err)
      setError('Failed to extract text from PDF. Please try another file.')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadAsWord = () => {
    if (!extractedText) return
    
    // Create a simple HTML document that Word can open
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${file?.name.replace('.pdf', '') || 'Document'}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 1in; }
          p { margin-bottom: 12pt; }
        </style>
      </head>
      <body>
        ${extractedText.split('\n\n').map(para => `<p>${para}</p>`).join('')}
      </body>
      </html>
    `
    
    const blob = new Blob([htmlContent], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file?.name.replace('.pdf', '') || 'document'}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadAsText = () => {
    if (!extractedText) return
    
    const blob = new Blob([extractedText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file?.name.replace('.pdf', '') || 'document'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const removeFile = () => {
    setFile(null)
    setExtractedText('')
    setIsComplete(false)
    setError('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          {/* Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">PDF to Word Converter</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Extract text from PDF files and convert to editable Word documents. 100% free, works in your browser.
            </p>
          </div>

          {/* Tool Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
            {/* Upload Area */}
            {!file ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg text-slate-600 mb-2">Drag & drop your PDF file here</p>
                <p className="text-slate-400 mb-4">or</p>
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-slate-400 mt-4">Supports PDF files up to 50MB</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Info */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Convert Button */}
                {!isComplete && (
                  <button
                    onClick={extractTextFromPDF}
                    disabled={isProcessing}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Extracting Text...
                      </>
                    ) : (
                      <>
                        <FileDown className="w-5 h-5 mr-2" />
                        Convert to Word
                      </>
                    )}
                  </button>
                )}

                {/* Success State */}
                {isComplete && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      <span className="text-green-700 font-medium">Text extracted successfully!</span>
                    </div>

                    {/* Preview */}
                    <div className="border border-slate-200 rounded-lg p-4 max-h-64 overflow-y-auto bg-slate-50">
                      <p className="text-sm text-slate-600 whitespace-pre-wrap">{extractedText.slice(0, 2000)}{extractedText.length > 2000 ? '...' : ''}</p>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={downloadAsWord}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download as Word (.doc)
                      </button>
                      <button
                        onClick={downloadAsText}
                        className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download as Text (.txt)
                      </button>
                    </div>

                    {/* Convert Another */}
                    <button
                      onClick={removeFile}
                      className="w-full py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Convert Another PDF
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Extract All Text</h3>
              <p className="text-slate-600 text-sm">Accurately extracts all text content from your PDF documents</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Multiple Formats</h3>
              <p className="text-slate-600 text-sm">Download as Word document or plain text file</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">100% Private</h3>
              <p className="text-slate-600 text-sm">Files are processed in your browser, never uploaded to servers</p>
            </div>
          </div>

          {/* How to Use */}
          <div className="mt-12 bg-slate-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">How to Convert PDF to Word</h2>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">1</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Upload your PDF</h3>
                  <p className="text-slate-600">Drag and drop or click to select your PDF file</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">2</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Click Convert</h3>
                  <p className="text-slate-600">Our tool will extract all text from your PDF</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">3</span>
                <div>
                  <h3 className="font-semibold text-slate-900">Download Word File</h3>
                  <p className="text-slate-600">Get your editable Word document instantly</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
