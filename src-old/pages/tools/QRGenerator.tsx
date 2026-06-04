import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Loader, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter content for the QR code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataUrl = await QRCode.toDataURL(text.trim(), {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: 'H'
      });

      setResult(dataUrl);
    } catch (err) {
      console.error('QR generation failed:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (!result) return;

    const link = document.createElement('a');
    link.href = result;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const faqs = [
    {
      question: 'What is a QR code?',
      answer: 'A QR (Quick Response) code is a two-dimensional barcode that can store various types of information like URLs, text, contact details, WiFi credentials, and more. When scanned with a smartphone camera or QR reader app, the encoded information is instantly decoded and accessible.'
    },
    {
      question: 'What can I encode in a QR code?',
      answer: 'You can encode almost any text-based data: website URLs, plain text, email addresses (mailto:), phone numbers (tel:), SMS messages, WiFi network credentials, vCard contact information, calendar events, and geographic locations.'
    },
    {
      question: 'How do I create a WiFi QR code?',
      answer: 'Use this format: WIFI:T:WPA;S:NetworkName;P:YourPassword;; Replace WPA with WEP or leave T: empty for open networks. Replace NetworkName and YourPassword with your actual WiFi credentials.'
    },
    {
      question: 'Are the generated QR codes permanent?',
      answer: 'Yes! The QR codes are static images that work forever. Unlike dynamic QR codes from some services, these don\'t expire or require subscriptions. Download and use them anywhere - print, share, or embed them freely.'
    }
  ];

  const useCases = [
    { title: 'Website URLs', example: 'https://example.com', desc: 'Direct users to any webpage' },
    { title: 'WiFi Access', example: 'WIFI:T:WPA;S:MyNetwork;P:password123;;', desc: 'Share network credentials' },
    { title: 'Email', example: 'mailto:hello@example.com', desc: 'Pre-fill recipient address' },
    { title: 'Phone', example: 'tel:+1234567890', desc: 'Quick dial phone numbers' },
    { title: 'SMS', example: 'sms:+1234567890?body=Hello', desc: 'Pre-compose text messages' },
    { title: 'Plain Text', example: 'Any text message', desc: 'Display any information' }
  ];

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <Helmet>
        <title>Free QR Code Generator - Create Custom QR Codes Online | DocuSprint</title>
        <meta name="description" content="Generate custom, scannable QR codes for free. Create QR codes for URLs, WiFi, text, contacts, and more. Customizable colors and sizes. Instant download, no signup required." />
        <meta name="keywords" content="QR code generator, free QR code, custom QR code, URL QR code, WiFi QR code, contact QR code, QR code maker" />
        <link rel="canonical" href="https://docusprint.app/tools/qr-generator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DocuSprint QR Code Generator",
            "description": "Free online QR code generator tool",
            "url": "https://docusprint.app/tools/qr-generator",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/25">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Free QR Code Generator</h1>
          <p className="text-slate-400 text-lg">Create custom, scannable QR codes for URLs, WiFi, text, and more</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-8">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-20 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Main Tool Interface */}
        <section className="card mb-8" aria-labelledby="qr-tool">
          <h2 id="qr-tool" className="sr-only">QR Code Generator Tool</h2>
          
          <div className="space-y-6">
            {/* Content Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Content to Encode</label>
              <textarea
                value={text}
                onChange={(e) => { setText(e.target.value); setError(null); }}
                placeholder="Enter URL, text, WiFi credentials, or any content..."
                className="input min-h-[120px] resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                Tip: For WiFi, use format: <code className="text-indigo-400">WIFI:T:WPA;S:NetworkName;P:Password;;</code>
              </p>
            </div>

            {/* Size Slider */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Size: <span className="text-indigo-400">{size}px</span>
              </label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>128px</span>
                <span>512px</span>
              </div>
            </div>

            {/* Color Pickers */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Foreground Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border border-slate-600 bg-transparent"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="input flex-1"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border border-slate-600 bg-transparent"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="input flex-1"
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">{error}</div>
            )}

            <button
              onClick={generateQR}
              disabled={loading || !text.trim()}
              className="btn btn-primary w-full py-4"
            >
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin mr-2" />Generating...</>
              ) : (
                <><QrCode className="w-5 h-5 mr-2" />Generate QR Code</>
              )}
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl text-center">
              <h3 className="font-bold text-white mb-4 text-lg">Your QR Code is Ready!</h3>
              <div className="bg-white p-6 rounded-xl inline-block mb-4 shadow-lg">
                <img src={result} alt="Generated QR Code" className="mx-auto max-w-full" />
              </div>
              <p className="text-sm text-slate-400 mb-4">Scan this QR code with any smartphone camera or QR scanner app</p>
              <button onClick={downloadQR} className="btn btn-accent">
                <Download className="w-5 h-5 mr-2" />Download PNG
              </button>
            </div>
          )}
        </section>

        {/* Ad Slot Below Tool */}
        <div className="ads-slot mb-12">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-slate-600">
            <span>Ad Space - Below Tool</span>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="card mb-8" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="text-xl font-bold text-white mb-6">How to Create QR Codes</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: 'Enter Your Content', desc: 'Type or paste the URL, text, WiFi credentials, or any data you want to encode' },
              { step: 2, title: 'Customize Appearance', desc: 'Adjust the size and colors to match your branding or preferences' },
              { step: 3, title: 'Generate & Download', desc: 'Click generate to create your QR code, then download as a PNG image' }
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold text-sm">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Use Cases */}
        <section className="card mb-8" aria-labelledby="use-cases">
          <h2 id="use-cases" className="text-xl font-bold text-white mb-6">QR Code Use Cases & Examples</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="p-4 bg-slate-800/50 rounded-xl">
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400 mb-2">{item.desc}</p>
                <code className="text-xs text-indigo-400 bg-slate-900 px-2 py-1 rounded block truncate">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="card mb-8" aria-labelledby="features">
          <h2 id="features" className="text-xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Custom Colors', desc: 'Match your brand colors' },
              { title: 'High Resolution', desc: 'Up to 512px output' },
              { title: 'Error Correction', desc: 'Scannable even if damaged' },
              { title: 'Instant Generation', desc: 'No waiting or processing' },
              { title: 'No Watermarks', desc: 'Clean, professional codes' },
              { title: 'Forever Free', desc: 'No expiration or limits' }
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="card" aria-labelledby="faq">
          <h2 id="faq" className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-700 rounded-xl overflow-hidden"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                  aria-expanded={faqOpen === index}
                >
                  <span className="font-medium text-white" itemProp="name">{faq.question}</span>
                  {faqOpen === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {faqOpen === index && (
                  <div 
                    className="px-4 pb-4 text-slate-400 text-sm leading-relaxed"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
