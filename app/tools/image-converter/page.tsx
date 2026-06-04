'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { FileImage, Upload, Download, ArrowLeft, X, Trash2 } from 'lucide-react'

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

interface ImageFile {
  id: string
  file: File
  preview: string
  converted: string | null
}

export default function ImageConverterPage() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [outputFormat, setOutputFormat] = useState('png')
  const [quality, setQuality] = useState(90)
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newImages: ImageFile[] = []
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          newImages.push({
            id: Math.random().toString(36).substr(2, 9),
            file,
            preview: event.target?.result as string,
            converted: null
          })
          if (newImages.length === files.length) {
            setImages(prev => [...prev, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const convertImages = async () => {
    if (images.length === 0) return
    
    setLoading(true)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const convertedImages = await Promise.all(
      images.map(async (imgData) => {
        return new Promise<ImageFile>((resolve) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            
            // For JPEG, fill white background
            if (outputFormat === 'jpeg') {
              ctx.fillStyle = '#ffffff'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
            
            ctx.drawImage(img, 0, 0)
            
            const mimeType = outputFormat === 'jpeg' ? 'image/jpeg' : 
                           outputFormat === 'png' ? 'image/png' : 
                           outputFormat === 'webp' ? 'image/webp' : 'image/png'
            
            const dataUrl = canvas.toDataURL(mimeType, quality / 100)
            
            resolve({
              ...imgData,
              converted: dataUrl
            })
          }
          img.src = imgData.preview
        })
      })
    )
    
    setImages(convertedImages)
    setLoading(false)
  }

  const downloadImage = (imgData: ImageFile) => {
    if (!imgData.converted) return
    
    const link = document.createElement('a')
    link.href = imgData.converted
    const originalName = imgData.file.name.replace(/\.[^/.]+$/, '')
    link.download = `${originalName}.${outputFormat}`
    link.click()
  }

  const downloadAll = () => {
    images.forEach((img, index) => {
      if (img.converted) {
        setTimeout(() => downloadImage(img), index * 200)
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <canvas ref={canvasRef} className="hidden" />
      
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileImage className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Image Format Converter</h1>
            <p className="text-slate-600">Convert images between PNG, JPG, and WebP formats</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* Upload Area */}
            <div className="mb-6">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-slate-400 text-sm">PNG, JPG, WebP, GIF, BMP supported</p>
                </label>
              </div>
            </div>
            
            {/* Conversion Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Output Format
                </label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG / JPG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quality: {quality}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
            
            {/* Image List */}
            {images.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">{images.length} Image(s)</h3>
                  <button
                    onClick={() => setImages([])}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.converted || img.preview}
                        alt="Preview"
                        className="w-full aspect-square object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {img.converted && (
                        <button
                          onClick={() => downloadImage(img)}
                          className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      {img.converted && (
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          Converted
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={convertImages}
                disabled={loading || images.length === 0}
                className="flex-1 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Converting...
                  </>
                ) : (
                  <>Convert to {outputFormat.toUpperCase()}</>
                )}
              </button>
              
              {images.some(img => img.converted) && (
                <button
                  onClick={downloadAll}
                  className="px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download All
                </button>
              )}
            </div>
          </div>
          
          {/* Instructions */}
          <div className="mt-8 bg-slate-50 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Supported Conversions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-slate-600">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-medium text-slate-900 mb-2">PNG</h3>
                <p className="text-sm">Best for graphics, logos, screenshots with transparency</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-medium text-slate-900 mb-2">JPEG</h3>
                <p className="text-sm">Best for photos, smaller file size, no transparency</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-medium text-slate-900 mb-2">WebP</h3>
                <p className="text-sm">Modern format, best compression, supports transparency</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
