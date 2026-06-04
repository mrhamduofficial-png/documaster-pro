'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Upload, Download, ArrowLeft, CheckCircle, X, Edit3, Loader2, Type, Highlighter, Square, Circle, Minus, Undo, Redo, Save, Trash2 } from 'lucide-react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

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

type Annotation = {
  id: string
  type: 'text' | 'highlight' | 'rectangle' | 'circle' | 'line'
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  color: string
  page: number
  endX?: number
  endY?: number
}

export default function PDFEditorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [pdfData, setPdfData] = useState<Uint8Array | null>(null)
  const [pageImages, setPageImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState('')
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selectedTool, setSelectedTool] = useState<'text' | 'highlight' | 'rectangle' | 'circle' | 'line' | null>(null)
  const [textInput, setTextInput] = useState('')
  const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedColor, setSelectedColor] = useState('#3b82f6')
  const [history, setHistory] = useState<Annotation[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null)

  const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#000000']

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const loadPDF = async (selectedFile: File) => {
    setIsLoading(true)
    setError('')
    
    try {
      const arrayBuffer = await selectedFile.arrayBuffer()
      const pdfBytes = new Uint8Array(arrayBuffer)
      
      // Load with pdf-lib for editing
      const doc = await PDFDocument.load(pdfBytes)
      setPdfDoc(doc)
      setPdfData(pdfBytes)
      
      // Render pages as images using pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const images: string[] = []
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const scale = 1.5
        const viewport = page.getViewport({ scale })
        
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        
        const ctx = canvas.getContext('2d')
        if (ctx) {
          await page.render({ canvasContext: ctx, viewport, canvas }).promise
          images.push(canvas.toDataURL('image/png'))
        }
      }
      
      setPageImages(images)
      setFile(selectedFile)
      setAnnotations([])
      setHistory([])
      setHistoryIndex(-1)
    } catch (err) {
      console.error('Error loading PDF:', err)
      setError('Failed to load PDF. Please try another file.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      loadPDF(droppedFile)
    } else {
      setError('Please upload a PDF file')
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      loadPDF(selectedFile)
    } else {
      setError('Please upload a PDF file')
    }
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (selectedTool === 'text') {
      setTextPosition({ x, y })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return
    if (!['highlight', 'rectangle', 'circle', 'line'].includes(selectedTool || '')) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setIsDrawing(true)
    setDrawStart({ x, y })
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDrawing || !drawStart || !canvasRef.current) return
    
    const rect = canvasRef.current.getBoundingClientRect()
    const endX = e.clientX - rect.left
    const endY = e.clientY - rect.top
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: selectedTool as 'highlight' | 'rectangle' | 'circle' | 'line',
      x: Math.min(drawStart.x, endX),
      y: Math.min(drawStart.y, endY),
      width: Math.abs(endX - drawStart.x),
      height: Math.abs(endY - drawStart.y),
      endX,
      endY,
      color: selectedColor,
      page: currentPage
    }
    
    addAnnotation(newAnnotation)
    setIsDrawing(false)
    setDrawStart(null)
  }

  const addAnnotation = (annotation: Annotation) => {
    const newAnnotations = [...annotations, annotation]
    setAnnotations(newAnnotations)
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newAnnotations)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const addTextAnnotation = () => {
    if (!textInput.trim() || !textPosition) return
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      type: 'text',
      x: textPosition.x,
      y: textPosition.y,
      text: textInput,
      color: selectedColor,
      page: currentPage
    }
    
    addAnnotation(newAnnotation)
    setTextInput('')
    setTextPosition(null)
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setAnnotations(history[historyIndex - 1])
    } else if (historyIndex === 0) {
      setHistoryIndex(-1)
      setAnnotations([])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setAnnotations(history[historyIndex + 1])
    }
  }

  const clearAnnotations = () => {
    setAnnotations([])
    setHistory([])
    setHistoryIndex(-1)
  }

  const downloadPDF = async () => {
    if (!pdfDoc) return
    
    try {
      // Clone the document
      const newDoc = await PDFDocument.load(pdfData!)
      const pages = newDoc.getPages()
      const font = await newDoc.embedFont(StandardFonts.Helvetica)
      
      // Add text annotations to PDF
      for (const annotation of annotations) {
        if (annotation.type === 'text' && annotation.text) {
          const page = pages[annotation.page]
          const { height } = page.getSize()
          
          // Convert hex to rgb
          const r = parseInt(annotation.color.slice(1, 3), 16) / 255
          const g = parseInt(annotation.color.slice(3, 5), 16) / 255
          const b = parseInt(annotation.color.slice(5, 7), 16) / 255
          
          page.drawText(annotation.text, {
            x: annotation.x / 1.5, // Adjust for scale
            y: height - (annotation.y / 1.5),
            size: 14,
            font,
            color: rgb(r, g, b)
          })
        }
        
        if (annotation.type === 'rectangle' && annotation.width && annotation.height) {
          const page = pages[annotation.page]
          const { height } = page.getSize()
          
          const r = parseInt(annotation.color.slice(1, 3), 16) / 255
          const g = parseInt(annotation.color.slice(3, 5), 16) / 255
          const b = parseInt(annotation.color.slice(5, 7), 16) / 255
          
          page.drawRectangle({
            x: annotation.x / 1.5,
            y: height - (annotation.y / 1.5) - (annotation.height / 1.5),
            width: annotation.width / 1.5,
            height: annotation.height / 1.5,
            borderColor: rgb(r, g, b),
            borderWidth: 2
          })
        }
        
        if (annotation.type === 'highlight' && annotation.width && annotation.height) {
          const page = pages[annotation.page]
          const { height } = page.getSize()
          
          const r = parseInt(annotation.color.slice(1, 3), 16) / 255
          const g = parseInt(annotation.color.slice(3, 5), 16) / 255
          const b = parseInt(annotation.color.slice(5, 7), 16) / 255
          
          page.drawRectangle({
            x: annotation.x / 1.5,
            y: height - (annotation.y / 1.5) - (annotation.height / 1.5),
            width: annotation.width / 1.5,
            height: annotation.height / 1.5,
            color: rgb(r, g, b),
            opacity: 0.3
          })
        }
      }
      
      const pdfBytes = await newDoc.save()
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `edited-${file?.name || 'document.pdf'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error saving PDF:', err)
      setError('Failed to save PDF. Please try again.')
    }
  }

  const currentPageAnnotations = annotations.filter(a => a.page === currentPage)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Edit3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">PDF Editor</h1>
            <p className="text-lg text-slate-600">Add text, highlights, shapes and annotations to your PDF</p>
          </div>

          {!file ? (
            /* Upload Area */
            <div className="max-w-2xl mx-auto">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {isLoading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                    <p className="text-lg text-slate-600">Loading PDF...</p>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
          ) : (
            /* Editor */
            <div className="space-y-4">
              {/* Toolbar */}
              <div className="bg-slate-100 rounded-xl p-4 flex flex-wrap items-center gap-4">
                {/* Tools */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedTool(selectedTool === 'text' ? null : 'text')}
                    className={`p-2 rounded-lg transition-colors ${selectedTool === 'text' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                    title="Add Text"
                  >
                    <Type className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedTool(selectedTool === 'highlight' ? null : 'highlight')}
                    className={`p-2 rounded-lg transition-colors ${selectedTool === 'highlight' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                    title="Highlight"
                  >
                    <Highlighter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedTool(selectedTool === 'rectangle' ? null : 'rectangle')}
                    className={`p-2 rounded-lg transition-colors ${selectedTool === 'rectangle' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                    title="Rectangle"
                  >
                    <Square className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedTool(selectedTool === 'circle' ? null : 'circle')}
                    className={`p-2 rounded-lg transition-colors ${selectedTool === 'circle' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                    title="Circle"
                  >
                    <Circle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedTool(selectedTool === 'line' ? null : 'line')}
                    className={`p-2 rounded-lg transition-colors ${selectedTool === 'line' ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'}`}
                    title="Line"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-300" />

                {/* Colors */}
                <div className="flex items-center gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${selectedColor === color ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-300" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={undo}
                    disabled={historyIndex < 0}
                    className="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Undo"
                  >
                    <Undo className="w-5 h-5" />
                  </button>
                  <button
                    onClick={redo}
                    disabled={historyIndex >= history.length - 1}
                    className="p-2 rounded-lg bg-white text-slate-700 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Redo"
                  >
                    <Redo className="w-5 h-5" />
                  </button>
                  <button
                    onClick={clearAnnotations}
                    className="p-2 rounded-lg bg-white text-red-600 hover:bg-red-50 transition-colors"
                    title="Clear All"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Save Button */}
                <button
                  onClick={downloadPDF}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </button>
              </div>

              {/* Canvas */}
              <div className="bg-slate-200 rounded-xl p-4 overflow-auto">
                <div
                  ref={canvasRef}
                  className="relative mx-auto bg-white shadow-lg cursor-crosshair"
                  style={{ width: 'fit-content' }}
                  onClick={handleCanvasClick}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                >
                  {pageImages[currentPage] && (
                    <img 
                      src={pageImages[currentPage]} 
                      alt={`Page ${currentPage + 1}`}
                      className="max-w-full pointer-events-none"
                      draggable={false}
                    />
                  )}
                  
                  {/* Render annotations */}
                  {currentPageAnnotations.map(annotation => (
                    <div key={annotation.id}>
                      {annotation.type === 'text' && (
                        <div
                          className="absolute pointer-events-none font-semibold"
                          style={{
                            left: annotation.x,
                            top: annotation.y,
                            color: annotation.color
                          }}
                        >
                          {annotation.text}
                        </div>
                      )}
                      {annotation.type === 'highlight' && (
                        <div
                          className="absolute pointer-events-none"
                          style={{
                            left: annotation.x,
                            top: annotation.y,
                            width: annotation.width,
                            height: annotation.height,
                            backgroundColor: annotation.color,
                            opacity: 0.3
                          }}
                        />
                      )}
                      {annotation.type === 'rectangle' && (
                        <div
                          className="absolute pointer-events-none"
                          style={{
                            left: annotation.x,
                            top: annotation.y,
                            width: annotation.width,
                            height: annotation.height,
                            border: `2px solid ${annotation.color}`
                          }}
                        />
                      )}
                      {annotation.type === 'circle' && (
                        <div
                          className="absolute pointer-events-none rounded-full"
                          style={{
                            left: annotation.x,
                            top: annotation.y,
                            width: annotation.width,
                            height: annotation.height,
                            border: `2px solid ${annotation.color}`
                          }}
                        />
                      )}
                    </div>
                  ))}

                  {/* Text input popup */}
                  {textPosition && selectedTool === 'text' && (
                    <div
                      className="absolute bg-white shadow-lg rounded-lg p-2 z-10"
                      style={{ left: textPosition.x, top: textPosition.y }}
                    >
                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTextAnnotation()}
                        placeholder="Enter text..."
                        className="px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={addTextAnnotation}
                        className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => { setTextPosition(null); setTextInput(''); }}
                        className="ml-1 px-2 py-1 bg-slate-200 text-slate-700 rounded text-sm hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Page Navigation */}
              {pageImages.length > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-slate-600">
                    Page {currentPage + 1} of {pageImages.length}
                  </span>
                  <button
                    onClick={() => setCurrentPage(Math.min(pageImages.length - 1, currentPage + 1))}
                    disabled={currentPage === pageImages.length - 1}
                    className="px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* New File Button */}
              <div className="text-center">
                <button
                  onClick={() => { setFile(null); setPageImages([]); setPdfDoc(null); setAnnotations([]); }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit Another PDF
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* Features */}
          {!file && (
            <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Type className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Add Text</h3>
                <p className="text-slate-600 text-sm">Add custom text anywhere on your PDF pages</p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Highlighter className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Highlight</h3>
                <p className="text-slate-600 text-sm">Highlight important sections with custom colors</p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Square className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Draw Shapes</h3>
                <p className="text-slate-600 text-sm">Add rectangles, circles, and lines to annotate</p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
