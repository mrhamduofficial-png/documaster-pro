'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { 
  QrCode, Copy, Check, Download, RefreshCw,
  Link, Wifi, Mail, Phone, MapPin
} from 'lucide-react'
import QRCode from 'qrcode'

const qrTypes = [
  { id: 'url', name: 'URL', icon: Link, placeholder: 'https://example.com' },
  { id: 'text', name: 'Text', icon: QrCode, placeholder: 'Enter your text' },
  { id: 'email', name: 'Email', icon: Mail, placeholder: 'email@example.com' },
  { id: 'phone', name: 'Phone', icon: Phone, placeholder: '+1234567890' },
  { id: 'wifi', name: 'WiFi', icon: Wifi, placeholder: 'Network name' },
]

const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#a855f7' },
]

export default function QRGeneratorPage() {
  const [qrType, setQrType] = useState('url')
  const [input, setInput] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiSecurity, setWifiSecurity] = useState('WPA')
  const [qrCode, setQrCode] = useState('')
  const [color, setColor] = useState('#000000')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQR = async () => {
    if (!input.trim()) return
    
    setIsGenerating(true)
    
    let data = input
    
    if (qrType === 'email') {
      data = `mailto:${input}`
    } else if (qrType === 'phone') {
      data = `tel:${input}`
    } else if (qrType === 'wifi') {
      data = `WIFI:T:${wifiSecurity};S:${input};P:${wifiPassword};;`
    }
    
    try {
      const qrDataUrl = await QRCode.toDataURL(data, {
        width: 400,
        margin: 2,
        color: {
          dark: color,
          light: '#ffffff',
        },
      })
      setQrCode(qrDataUrl)
    } catch (err) {
      console.error('Error generating QR code:', err)
    }
    
    setIsGenerating(false)
  }

  const handleDownload = () => {
    if (!qrCode) return
    const link = document.createElement('a')
    link.href = qrCode
    link.download = 'qrcode.png'
    link.click()
  }

  const handleCopy = async () => {
    if (!qrCode) return
    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: copy data URL
      navigator.clipboard.writeText(qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-4">
              <QrCode className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-400">Free Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">QR Code Generator</h1>
            <p className="text-[rgb(var(--muted-foreground))] max-w-xl mx-auto">
              Create custom QR codes for URLs, WiFi, contacts, and more. Free and instant.
            </p>
          </div>

          {/* Ad Slot */}
          <div className="ads-slot h-20 mb-8">
            <span>Advertisement Area</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="card p-6">
              {/* Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">QR Code Type</label>
                <div className="grid grid-cols-5 gap-2">
                  {qrTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setQrType(type.id)}
                      className={`p-3 rounded-xl border-2 transition-all text-center ${
                        qrType === type.id
                          ? 'border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10'
                          : 'border-[rgb(var(--border))] hover:border-[rgb(var(--primary))]/50'
                      }`}
                    >
                      <type.icon className={`w-5 h-5 mx-auto mb-1 ${
                        qrType === type.id ? 'text-[rgb(var(--primary))]' : 'text-[rgb(var(--muted-foreground))]'
                      }`} />
                      <span className="text-xs">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  {qrType === 'wifi' ? 'Network Name (SSID)' : qrTypes.find(t => t.id === qrType)?.name}
                </label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={qrTypes.find(t => t.id === qrType)?.placeholder}
                  className="input-field"
                />
              </div>

              {/* WiFi-specific fields */}
              {qrType === 'wifi' && (
                <>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="WiFi password"
                      className="input-field"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Security Type</label>
                    <select
                      value={wifiSecurity}
                      onChange={(e) => setWifiSecurity(e.target.value)}
                      className="input-field"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None</option>
                    </select>
                  </div>
                </>
              )}

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">QR Code Color</label>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-10 h-10 rounded-xl border-2 transition-all ${
                        color === c.value ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateQR}
                disabled={!input.trim() || isGenerating}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <QrCode className="w-5 h-5" />
                )}
                Generate QR Code
              </button>
            </div>

            {/* Output Section */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">Preview</h3>
              
              <div className="bg-white rounded-2xl p-8 mb-4 flex items-center justify-center min-h-[300px]">
                {qrCode ? (
                  <img src={qrCode} alt="Generated QR Code" className="max-w-full" />
                ) : (
                  <div className="text-center text-slate-400">
                    <QrCode className="w-20 h-20 mx-auto mb-4 opacity-30" />
                    <p className="text-sm">QR code will appear here</p>
                  </div>
                )}
              </div>

              {qrCode && (
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </button>
                  <button
                    onClick={handleCopy}
                    className="btn-secondary flex items-center justify-center gap-2 px-6"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FAQ */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: 'What can I encode in a QR code?', a: 'You can encode URLs, text, emails, phone numbers, WiFi credentials, and more.' },
                { q: 'Is there a size limit?', a: 'QR codes can store up to 4,296 alphanumeric characters. For best results, keep content concise.' },
                { q: 'Can I customize the QR code color?', a: 'Yes! Choose from our preset colors or use your brand colors for custom QR codes.' },
              ].map((faq, i) => (
                <div key={i} className="card p-6">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">{faq.a}</p>
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
