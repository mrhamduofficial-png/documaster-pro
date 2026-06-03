'use client'

import { useState, useEffect } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Palette, Copy, Check, RefreshCw } from 'lucide-react'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState<string | null>(null)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return { r: 0, g: 0, b: 0 }
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    }
  }

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const formats = [
    { name: 'HEX', value: color.toUpperCase() },
    { name: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { name: 'RGBA', value: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)` },
    { name: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { name: 'CSS Variable', value: `--color: ${color};` },
  ]

  const copyToClipboard = (value: string, format: string) => {
    navigator.clipboard.writeText(value)
    setCopied(format)
    setTimeout(() => setCopied(null), 2000)
  }

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setColor(randomColor)
  }

  const presetColors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
    '#000000', '#ffffff', '#6b7280', '#1e293b', '#0f172a'
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
              <Palette className="w-4 h-4 text-pink-600" />
              <span className="text-sm font-medium text-pink-600">Design Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Color Picker & Converter</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Pick colors and convert between HEX, RGB, HSL formats instantly
            </p>
          </div>

          {/* Ad Slot */}
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-20 mb-8 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
          </div>

          {/* Color Picker */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Color Preview */}
              <div className="flex-shrink-0">
                <div 
                  className="w-full sm:w-48 h-48 rounded-2xl border-4 border-white shadow-lg"
                  style={{ backgroundColor: color }}
                />
              </div>

              {/* Controls */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Pick a Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-12 rounded-lg cursor-pointer border-0"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono uppercase"
                      placeholder="#000000"
                    />
                    <button
                      onClick={generateRandomColor}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Preset Colors */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-700">Preset Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {presetColors.map((presetColor) => (
                      <button
                        key={presetColor}
                        onClick={() => setColor(presetColor)}
                        className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
                          color === presetColor ? 'border-blue-600 scale-110' : 'border-white'
                        }`}
                        style={{ backgroundColor: presetColor }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Formats */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <h3 className="font-semibold mb-4 text-slate-900">Color Formats</h3>
            <div className="space-y-3">
              {formats.map((format) => (
                <div key={format.name} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <div>
                    <span className="text-sm font-medium text-slate-500">{format.name}</span>
                    <p className="font-mono text-slate-900">{format.value}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(format.value, format.name)}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    {copied === format.name ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-400" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Color Info */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{rgb.r}</div>
              <div className="text-xs text-slate-500">Red</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{rgb.g}</div>
              <div className="text-xs text-slate-500">Green</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{rgb.b}</div>
              <div className="text-xs text-slate-500">Blue</div>
            </div>
          </div>

          {/* Info */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">About Color Formats</h2>
            <div className="space-y-4">
              {[
                { name: 'HEX', desc: 'Hexadecimal color codes used in web design. Format: #RRGGBB' },
                { name: 'RGB', desc: 'Red, Green, Blue values from 0-255. Format: rgb(R, G, B)' },
                { name: 'HSL', desc: 'Hue, Saturation, Lightness. Great for adjusting colors. Format: hsl(H, S%, L%)' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
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
