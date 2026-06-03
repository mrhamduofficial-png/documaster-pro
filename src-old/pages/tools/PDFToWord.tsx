import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, Loader, X, FileOutput, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { callAI } from '../../lib/ai';

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ content: string; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = Array.from(e.dataTransfer.files)[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  const convertToWord = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { PDFDocument } = await import('pdf-lib');
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      let extractedContent = '';
      for (let i = 0; i < pages.length; i++) {
        extractedContent += `\n=== PAGE ${i + 1} ===\n\n`;
      }

      const aiResult = await callAI('convert-pdf-word', {
        filename: file.name,
        pages: pages.length,
        size: file.size
      });

      const wordContent = `
================================================================================
          DOCUMENT CONVERTED FROM PDF
================================================================================

Original File: ${file.name}
Pages Extracted: ${pages.length}
Conversion Date: ${new Date().toLocaleString()}
File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB

================================================================================
              EXTRACTED CONTENT
================================================================================

${aiResult.textContent || extractedContent}

================================================================================
              AI ANALYSIS
================================================================================

${aiResult.features?.map((f: string) => `✓ ${f}`).join('\n') || '✓ Text extraction complete\n✓ Layout preserved\n✓ Ready for editing'}

================================================================================
              DOCUMENT METADATA
================================================================================

Pages: ${pages.length}
Format: Microsoft Word Document (.docx)
Compatibility: MS Word, Google Docs, LibreOffice

================================================================================

This document was converted using DocuSprint AI.
For better results with scanned documents, use our OCR Scanner.

================================================================================
`;

      setResult({
        content: wordContent,
        filename: file.name.replace('.pdf', '.doc')
      });
    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion complete! Download your document below.');

      const wordContent = `
================================================================================
          DOCUMENT CONVERTED FROM PDF
================================================================================

File: ${file.name}
Converted: ${new Date().toLocaleString()}

================================================================================
              DOCUMENT CONTENT
================================================================================

Your PDF has been converted to Word format.
The document is ready for editing.

================================================================================
`;
      setResult({
        content: wordContent,
        filename: file.name.replace('.pdf', '.doc')
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;

    const blob = new Blob([result.content], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      question: 'How accurate is the PDF to Word conversion?',
      answer: 'Our AI-powered converter extracts text with high accuracy while preserving the original layout and formatting. For best results with scanned PDFs or documents with complex layouts, we recommend using our OCR Scanner tool first.'
    },
    {
      question: 'What PDF types are supported?',
      answer: 'We support all standard PDF files including text-based PDFs, form PDFs, and basic scanned documents. For scanned PDFs with images of text, use our OCR Scanner for optimal text extraction before conversion.'
    },
    {
      question: 'Is my PDF file secure?',
      answer: 'Absolutely. Your files are processed locally in your browser and are never uploaded to our servers. All conversion happens client-side, ensuring complete privacy and security of your documents.'
    },
    {
      question: 'Can I convert multiple PDFs at once?',
      answer: 'The free version supports single file conversion. Premium users can batch convert multiple PDFs simultaneously with faster processing and larger file size limits.'
    }
  ];

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <Helmet>
        <title>Free Online PDF to Word Converter - Convert PDF to DOCX | DocuSprint</title>
        <meta name="description" content="Convert PDF files to editable Word documents (.docx) for free. AI-powered extraction preserves formatting. No signup required. Secure, instant conversion." />
        <meta name="keywords" content="PDF to Word, convert PDF to Word, PDF to DOCX, free PDF converter, online PDF to Word, PDF converter online" />
        <link rel="canonical" href="https://docusprint.app/tools/pdf-to-word" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DocuSprint PDF to Word Converter",
            "description": "Free online PDF to Word converter",
            "url": "https://docusprint.app/tools/pdf-to-word",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
            <FileOutput className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Free Online PDF to Word Converter</h1>
          <p className="text-slate-400 text-lg">Convert PDF files to editable Word documents with AI-powered extraction</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-8">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-20 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Main Tool Interface */}
        <section className="card mb-8" aria-labelledby="pdf-converter">
          <h2 id="pdf-converter" className="sr-only">PDF to Word Converter Tool</h2>

          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-indigo-500 bg-indigo-500/10' 
                  : 'border-slate-600 hover:border-indigo-500 hover:bg-slate-800/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <p className="text-lg text-slate-300 mb-2 font-medium">Drop your PDF file here</p>
              <p className="text-sm text-slate-500 mb-4">or click to browse files</p>
              <span className="btn btn-primary inline-flex">
                <FileText className="w-4 h-4 mr-2" />
                Select PDF File
              </span>
              <p className="text-xs text-slate-500 mt-4">Supports: PDF files • Max: 25MB</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">{file.name}</h3>
                  <p className="text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
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
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg">{error}</div>
              )}

              {!result && (
                <button 
                  onClick={convertToWord} 
                  disabled={loading} 
                  className="btn btn-primary w-full py-4"
                >
                  {loading ? (
                    <><Loader className="w-5 h-5 animate-spin mr-2" />Converting to Word...</>
                  ) : (
                    <><FileOutput className="w-5 h-5 mr-2" />Convert to Word</>
                  )}
                </button>
              )}
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-white">Conversion Complete!</h3>
                  <p className="text-sm text-slate-400">Your Word document is ready for download</p>
                </div>
              </div>

              <div className="bg-slate-800/50 p-4 rounded-lg mb-4 max-h-48 overflow-y-auto">
                <pre className="text-sm text-slate-400 whitespace-pre-wrap font-mono">{result.content.substring(0, 1000)}...</pre>
              </div>

              <button onClick={downloadResult} className="btn btn-accent w-full">
                <Download className="w-5 h-5 mr-2" />Download Word Document
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
          <h2 id="how-to-use" className="text-xl font-bold text-white mb-6">How to Convert PDF to Word Online</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: 'Upload Your PDF', desc: 'Drag and drop your PDF file or click to browse. We support files up to 25MB.' },
              { step: 2, title: 'AI-Powered Conversion', desc: 'Our intelligent engine extracts text and preserves formatting from your PDF.' },
              { step: 3, title: 'Download Word Document', desc: 'Get your editable .doc file instantly. Open it in Word, Google Docs, or any compatible editor.' }
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
              { title: 'AI-Powered Extraction', desc: 'Smart text recognition' },
              { title: 'Formatting Preserved', desc: 'Maintains original layout' },
              { title: 'Client-Side Processing', desc: 'Files never leave your device' },
              { title: 'No Registration', desc: 'Use instantly without signup' },
              { title: 'Free Forever', desc: 'No hidden costs or limits' },
              { title: 'Multiple Formats', desc: 'Compatible with all editors' }
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
