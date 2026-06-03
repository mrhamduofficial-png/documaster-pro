'use client'

import { useState, useCallback } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Image as ImageIcon, Upload, Download, Trash2, Settings } from 'lucide-react'
import type { Metadata } from 'next'

export default function ImageCompressPage() {
  const [images, setImages] = useState<{ file: File; preview: string; compressed?: string; originalSize: number; compressedSize?: number }[]>([])
  const [quality, setQuality] = useState(80)
  const [processing, setProcessing] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    addImages(files)
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'))
      addImages(files)
    }
  }

  const addImages = (files: File[]) => {
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      originalSize: file.size,
    }))
    setImages(prev => [...prev, ...newImages])
  }

  const compressImages = async () => {
    setProcessing(true)
    
    const compressed = await Promise.all(
      images.map(async (img) => {
        return new Promise<typeof images[0]>((resolve) => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          const image = new window.Image()
          image.crossOrigin = 'anonymous'
          
          image.onload = () => {
            canvas.width = image.width
            canvas.height = image.height
            ctx?.drawImage(image, 0, 0)
            
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve({
                    ...img,
                    compressed: URL.createObjectURL(blob),
                    compressedSize: blob.size,
                  })
                } else {
                  resolve(img)
                }
              },
              'image/jpeg',
              quality / 100
            )
          }
          
          image.src = img.preview
        })
      })
    )
    
    setImages(compressed)
    setProcessing(false)
  }

  const downloadAll = () => {
    images.forEach((img, index) => {
      if (img.compressed) {
        const link = document.createElement('a')
        link.href = img.compressed
        link.download = `compressed-${index + 1}.jpg`
        link.click()
      }
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const totalSaved = images.reduce((acc, img) => {
    if (img.compressedSize) {
      return acc + (img.originalSize - img.compressedSize)
    }
    return acc
  }, 0)

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Image Compressor</h1>
            <p className="text-[rgb(var(--muted-foreground))]">
              Compress images without losing quality. Supports JPEG, PNG, WebP.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="drop-zone mb-6"
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 mx-auto mb-4 text-[rgb(var(--muted-foreground))]" />
              <p className="text-lg font-medium mb-2">Drop images here or click to upload</p>
              <p className="text-sm text-[rgb(var(--muted-foreground))]">
                Supports JPEG, PNG, WebP up to 10MB each
              </p>
            </label>
          </div>

          {/* Quality Slider */}
          {images.length > 0 && (
            <div className="card p-4 mb-6">
              <div className="flex items-center gap-4">
                <Settings className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Quality</span>
                    <span className="text-sm text-[rgb(var(--primary))]">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Images Grid */}
          {images.length > 0 && (
            <div className="space-y-4 mb-6">
              {images.map((img, index) => (
                <div key={index} className="card p-4 flex items-center gap-4">
                  <img
                    src={img.compressed || img.preview}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm truncate">{img.file.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-[rgb(var(--muted-foreground))]">
                      <span>Original: {formatSize(img.originalSize)}</span>
                      {img.compressedSize && (
                        <>
                          <span>→</span>
                          <span className="text-green-500">Compressed: {formatSize(img.compressedSize)}</span>
                          <span className="text-green-500">
                            (-{Math.round((1 - img.compressedSize / img.originalSize) * 100)}%)
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeImage(index)}
                    className="p-2 hover:bg-[rgb(var(--secondary))] rounded-lg"
                  >
                    <Trash2 className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
                  </button>
                </div>
              ))}

              {/* Summary */}
              {totalSaved > 0 && (
                <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <p className="text-green-500 font-medium">
                    Total saved: {formatSize(totalSaved)}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                <button
                  onClick={compressImages}
                  disabled={processing}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Compressing...
                    </>
                  ) : (
                    'Compress Images'
                  )}
                </button>
                {images.some(img => img.compressed) && (
                  <button
                    onClick={downloadAll}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download All
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Ad Slot */}
          <div className="ads-slot h-24 mb-8">
            <span>Advertisement Area</span>
          </div>

          {/* SEO Content */}
          <section className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-4">How to Compress Images Online</h2>
            <div className="card p-6 mb-6">
              <ol className="space-y-3 text-[rgb(var(--muted-foreground))]">
                <li><strong>1. Upload:</strong> Drag and drop your images or click to select files</li>
                <li><strong>2. Adjust Quality:</strong> Use the slider to set compression level (lower = smaller file)</li>
                <li><strong>3. Compress:</strong> Click the compress button to process all images</li>
                <li><strong>4. Download:</strong> Save your compressed images individually or all at once</li>
              </ol>
            </div>

            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                'Batch compression - process multiple images at once',
                'Adjustable quality from 10% to 100%',
                'Client-side processing - your images never leave your device',
                'Supports JPEG, PNG, and WebP formats',
                'No file size limits for free users',
                'Instant download of compressed files',
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <span className="text-green-500">✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
