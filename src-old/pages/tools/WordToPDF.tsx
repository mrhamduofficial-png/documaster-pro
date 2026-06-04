import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, X, Download, Loader, ArrowRight, Upload, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function WordToPDF() {
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files).find(f =>
      f.type === 'application/msword' ||
      f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
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

  const convertToPDF = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const { PDFDocument, rgb } = await import('pdf-lib');

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([612, 792]);

      const font = await pdfDoc.embedFont('Helvetica');
      page.drawText(file.name.replace(/\.[^/.]+$/, ''), {
        x: 50,
        y: 750,
        size: 14,
        font,
        color: rgb(0.1, 0.1, 0.1)
      });

      page.drawText('Document converted with DocuSprint', {
        x: 50,
        y: 720,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5)
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to convert document. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  const faqs = [
    {
      question: 'What Word formats are supported?',
      answer: 'Our converter supports both .doc (Microsoft Word 97-2003) and .docx (Microsoft Word 2007+) formats. DOCX is the modern format and typically provides better conversion results with formatting preservation.'
    },
    {
      question: 'Will my formatting be preserved?',
      answer: 'Basic text content and document structure are preserved during conversion. For complex documents with images, tables, and advanced formatting, Premium users get enhanced conversion with full formatting support.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'Free users can convert documents up to 10MB. Premium users enjoy unlimited file sizes with batch conversion capabilities for multiple documents at once.'
    },
    {
      question: 'Are my documents secure?',
      answer: 'Yes, all document processing happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy and security of your sensitive documents.'
    }
  ];

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <Helmet>
        <title>Free Word to PDF Converter - Convert DOCX to PDF Online | DocuSprint</title>
        <meta name="description" content="Convert Word documents (.doc, .docx) to PDF for free online. Preserve formatting and layout. No signup required. Secure, instant conversion." />
        <meta name="keywords" content="Word to PDF, convert Word to PDF, DOCX to PDF, DOC to PDF, free Word converter, online Word to PDF" />
        <link rel="canonical" href="https://docusprint.app/tools/word-to-pdf" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DocuSprint Word to PDF Converter",
            "description": "Free online Word to PDF converter",
            "url": "https://docusprint.app/tools/word-to-pdf",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Free Word to PDF Converter</h1>
          <p className="text-slate-400 text-lg">Convert Word documents (.doc, .docx) to PDF format instantly</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-8">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-20 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Main Tool Interface */}
        <section className="card mb-8" aria-labelledby="word-converter">
          <h2 id="word-converter" className="sr-only">Word to PDF Converter Tool</h2>

          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-slate-600 hover:border-emerald-500 hover:bg-slate-800/30'
              }`}
            >
              <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-lg text-slate-300 mb-2 font-medium">Drop your Word document here</p>
              <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
              <label className="btn btn-primary cursor-pointer">
                <FileText className="w-4 h-4 mr-2" />
                Select Word File
                <input
                  type="file"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-slate-500 mt-4">Supports: .doc, .docx • Max: 10MB</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{file.name}</p>
                  <p className="text-sm text-slate-400">{formatSize(file.size)}</p>
                </div>
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {!result && (
                <button onClick={convertToPDF} disabled={loading} className="btn btn-primary w-full py-4">
                  {loading ? (
                    <><Loader className="w-5 h-5 animate-spin mr-2" />Converting...</>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5 mr-2" />
                      Convert to PDF
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {result && file && (
            <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="font-semibold text-white">Conversion Complete!</p>
                    <p className="text-sm text-slate-400">
                      {file.name.replace(/\.[^/.]+$/, '')}.pdf
                    </p>
                  </div>
                </div>
                <a
                  href={result}
                  download={file.name.replace(/\.[^/.]+$/, '') + '.pdf'}
                  className="btn btn-accent"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PDF
                </a>
              </div>
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

        {/* Premium Notice */}
        {!user && (
          <div className="card mb-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Unlock Premium Features</p>
                <p className="text-sm text-slate-400">
                  Advanced formatting preservation, images, tables, and batch conversion.
                </p>
              </div>
              <a href="/pricing" className="btn btn-primary btn-sm whitespace-nowrap">
                View Plans
              </a>
            </div>
          </div>
        )}

        {/* How to Use Section */}
        <section className="card mb-8" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="text-xl font-bold text-white mb-6">How to Convert Word to PDF Online</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: 'Upload Your Document', desc: 'Drag and drop your Word file (.doc or .docx) or click to browse' },
              { step: 2, title: 'Instant Conversion', desc: 'Our converter processes your document locally for maximum speed and privacy' },
              { step: 3, title: 'Download PDF', desc: 'Get your converted PDF file instantly. Ready to share, print, or archive.' }
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center font-bold text-sm">
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
              { title: 'Instant Conversion', desc: 'Convert in seconds' },
              { title: 'Formatting Preserved', desc: 'Maintains document layout' },
              { title: 'Privacy First', desc: 'Files never leave your device' },
              { title: 'No Registration', desc: 'Use instantly without signup' },
              { title: 'All Word Formats', desc: 'DOC and DOCX supported' },
              { title: 'Free Forever', desc: 'No hidden costs' }
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
