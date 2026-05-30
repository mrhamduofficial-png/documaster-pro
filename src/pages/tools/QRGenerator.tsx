import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Loader } from 'lucide-react';
import QRCode from 'qrcode';

export default function QRGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateQR = async () => {
    if (!text.trim()) {
      setError('Please enter content for the QR code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Generate QR code using the real qrcode library
      const dataUrl = await QRCode.toDataURL(text.trim(), {
        width: size,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        },
        errorCorrectionLevel: 'H' // High error correction for better scanning
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

  return (
    <div className="py-8">
      <Helmet>
        <title>QR Code Generator Free - Create Scannable QR Codes | DocuMaster</title>
        <meta name="description" content="Generate custom, scannable QR codes for free. Add URLs, text, WiFi credentials, or contact info. Customizable colors and sizes. Instant download." />
        <meta name="keywords" content="QR code generator, free QR code, custom QR code, URL QR code, WiFi QR code, contact QR code" />
        <link rel="canonical" href="https://documaster.app/tools/qr-generator" />
      </Helmet>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">QR Code Generator</h1>
          <p className="text-secondary-600">Create scannable QR codes for URLs, text, WiFi, and more</p>
        </div>

        <div className="card mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Content</label>
              <textarea
                value={text}
                onChange={(e) => { setText(e.target.value); setError(null); }}
                placeholder="Enter URL, text, WiFi credentials, or any content..."
                className="input min-h-[100px] resize-none"
              />
              <p className="text-xs text-secondary-500 mt-1">Tip: Use format wifi:T:WPA;S:NetworkName;P:Password;; for WiFi QR codes</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Size: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                step="32"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full accent-primary-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Foreground Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-secondary-200"
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
                <label className="block text-sm font-medium text-secondary-700 mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border border-secondary-200"
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
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        <button
          onClick={generateQR}
          disabled={loading || !text.trim()}
          className="btn btn-primary w-full mb-6 py-4"
        >
          {loading ? (
            <><Loader className="w-5 h-5 animate-spin mr-2" />Generating...</>
          ) : (
            <><QrCode className="w-5 h-5 mr-2" />Generate QR Code</>
          )}
        </button>

        {result && (
          <div className="card bg-gradient-to-br from-accent-50 to-indigo-50 border-accent-200 text-center">
            <h3 className="font-bold text-secondary-900 mb-4 text-lg">Your QR Code is Ready!</h3>
            <div className="bg-white p-6 rounded-xl inline-block mb-4 shadow-sm">
              <img src={result} alt="Generated QR Code" className="mx-auto max-w-full" />
            </div>
            <p className="text-sm text-secondary-600 mb-4">Scan this QR code with any QR scanner app</p>
            <button onClick={downloadQR} className="btn btn-primary">
              <Download className="w-5 h-5 mr-2" />Download PNG
            </button>
          </div>
        )}

        <div className="mt-8 bg-secondary-50 rounded-lg p-6">
          <h3 className="font-semibold text-secondary-900 mb-3">QR Code Use Cases</h3>
          <ul className="space-y-2 text-secondary-600 text-sm">
            <li>Website URLs - Direct users to your website</li>
            <li>WiFi Credentials - Share network access easily</li>
            <li>Contact Info - vCard format for business cards</li>
            <li>Plain Text - Any message or information</li>
            <li>Email Addresses - mailto:email@example.com</li>
            <li>Phone Numbers - tel:+1234567890</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
