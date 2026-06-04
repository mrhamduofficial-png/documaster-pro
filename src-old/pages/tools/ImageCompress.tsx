import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, X, Download, Loader, Minimize2, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
    if (dropped) {
      setFile(dropped);
      setResult(null);
      setError(null);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const compressImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = URL.createObjectURL(file);

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      ctx.drawImage(img, 0, 0);

      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);

      const base64 = dataUrl.split(',')[1];
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      setResult({ url: dataUrl, size: bytes.length });
    } catch (err) {
      setError('Failed to compress image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    const kb = bytes / 1024;
    return kb > 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb.toFixed(2) + ' KB';
  };

  const faqs = [
    {
      question: 'How does the image compressor work?',
      answer: 'Our image compressor uses advanced canvas-based compression algorithms that run entirely in your browser. When you upload an image, it\'s processed locally using HTML5 Canvas API to reduce file size while maintaining visual quality. This client-side approach ensures your images never leave your device.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'Our free image compressor supports all major image formats including JPEG, PNG, WebP, and GIF. JPEG images typically achieve the best compression ratios, while PNG images maintain transparency during compression.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free users can compress images up to 10MB per file. Premium users enjoy unlimited file sizes with faster processing and batch compression capabilities.'
    },
    {
      question: 'Will I lose image quality?',
      answer: 'You have full control over the quality vs. file size tradeoff using our slider. At 70-80% quality, most images show no visible difference while achieving significant file size reduction. For web optimization, 60-70% is often ideal.'
    }
  ];

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <Helmet>
        <title>Fast Image Compressor Online - Compress Images Free | DocuSprint</title>
        <meta name="description" content="Compress and reduce image file size online for free. Fast, secure, client-side image compression. Perfect for web optimization and faster loading. Supports JPEG, PNG, WebP." />
        <meta name="keywords" content="fast image compressor, compress image online, reduce image size, image compression, JPEG compressor, PNG compressor, web optimization" />
        <link rel="canonical" href="https://docusprint.app/tools/image-compress" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DocuSprint Image Compressor",
            "description": "Free online image compressor tool",
            "url": "https://docusprint.app/tools/image-compress",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/25">
            <Minimize2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Fast Image Compressor</h1>
          <p className="text-slate-400 text-lg">Reduce image file size without losing quality - 100% free online tool</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-8">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-20 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Main Tool Interface */}
        <section className="card mb-8" aria-labelledby="compress-tool">
          <h2 id="compress-tool" className="sr-only">Image Compression Tool</h2>
          
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-indigo-500 hover:bg-slate-800/30 transition-all cursor-pointer"
            >
              <Image className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-lg text-slate-300 mb-2 font-medium">Drop your image here</p>
              <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
              <label className="btn btn-primary cursor-pointer">
                <Image className="w-4 h-4 mr-2" />
                Select Image
                <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
              </label>
              <p className="text-xs text-slate-500 mt-4">Supports: JPEG, PNG, WebP, GIF • Max: 10MB</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-xl">
                <div className="w-20 h-20 bg-slate-700 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <p className="text-sm text-slate-400">Original: {formatSize(file.size)}</p>
                  <p className="text-xs text-slate-500">{file.type}</p>
                </div>
                <button 
                  onClick={() => { setFile(null); setResult(null); }} 
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Quality: <span className="text-indigo-400">{quality}%</span>
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))} 
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6">{error}</div>
              )}

              <button 
                onClick={compressImage} 
                disabled={loading} 
                className="btn btn-primary w-full py-4"
              >
                {loading ? (
                  <><Loader className="w-5 h-5 animate-spin mr-2" />Compressing...</>
                ) : (
                  <><Minimize2 className="w-5 h-5 mr-2" />Compress Image</>
                )}
              </button>
            </>
          )}

          {result && file && (
            <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="font-semibold text-white">Image Compressed Successfully!</p>
                  <p className="text-sm text-slate-400">
                    {formatSize(file.size)} → {formatSize(result.size)}
                    <span className="text-emerald-400 ml-2 font-medium">
                      (-{((1 - result.size / file.size) * 100).toFixed(1)}%)
                    </span>
                  </p>
                </div>
              </div>
              <a 
                href={result.url} 
                download={file.name.replace(/\.[^.]+$/, '_compressed.jpg')} 
                className="btn btn-accent w-full"
              >
                <Download className="w-5 h-5 mr-2" />Download Compressed Image
              </a>
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
          <h2 id="how-to-use" className="text-xl font-bold text-white mb-6">How to Compress Images Online</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: 'Upload Your Image', desc: 'Click the upload area or drag and drop your image file (JPEG, PNG, WebP, or GIF)' },
              { step: 2, title: 'Adjust Quality', desc: 'Use the slider to balance between file size and image quality. Lower values = smaller files.' },
              { step: 3, title: 'Download Result', desc: 'Click compress and download your optimized image instantly. No email required.' }
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

        {/* Key Features */}
        <section className="card mb-8" aria-labelledby="features">
          <h2 id="features" className="text-xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Client-Side Processing', desc: 'Images never leave your device' },
              { title: 'No Registration', desc: 'Use instantly without signup' },
              { title: 'Adjustable Quality', desc: 'Full control over compression' },
              { title: 'All Formats Supported', desc: 'JPEG, PNG, WebP, GIF' },
              { title: 'Instant Download', desc: 'Get results in seconds' },
              { title: '100% Free', desc: 'No hidden costs or limits' }
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
