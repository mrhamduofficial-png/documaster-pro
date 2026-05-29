import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Upload, Download, Loader, X, FileOutput, CircleCheck as CheckCircle } from 'lucide-react';
import { extractTextFromPDF, convertPDFToWord, formatFileSize } from '../../lib/ai';

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a PDF file');
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      setError('File too large. Maximum 100MB allowed.');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
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
      // Extract text from PDF
      const pdfContent = await extractTextFromPDF(file);

      // Convert to Word format
      const wordUrl = await convertPDFToWord(pdfContent, file.name);

      setResult({
        url: wordUrl,
        filename: file.name.replace('.pdf', '.docx')
      });
    } catch (err: any) {
      setError(err.message || 'Failed to convert PDF. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = result.filename;
    a.click();
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>PDF to Word Converter - Free & Instant | DocuMaster</title>
        <meta name="description" content="Convert PDF files to editable Word documents (.docx) for free. AI-powered extraction with instant results." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileOutput className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">PDF to Word Converter</h1>
          <p className="text-secondary-600">AI-powered PDF to Word conversion</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
            />
            <Upload className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <p className="text-xl font-medium text-secondary-700 mb-2">Drop PDF file here</p>
            <p className="text-secondary-500">or click to browse (up to 100MB)</p>
          </div>
        ) : (
          <div className="card mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900">{file.name}</h3>
                <p className="text-sm text-secondary-500">{formatFileSize(file.size)}</p>
              </div>
              <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                <X className="w-5 h-5 text-secondary-500" />
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
        )}

        {file && !result && (
          <button onClick={convertToWord} disabled={loading} className="btn btn-primary w-full mb-6 py-4">
            {loading ? <><Loader className="w-5 h-5 animate-spin mr-2" />Converting...</> : 'Convert to Word'}
          </button>
        )}

        {result && (
          <div className="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-bold text-secondary-900">✓ Conversion Complete!</h3>
                <p className="text-sm text-secondary-600">Ready for download</p>
              </div>
            </div>

            <button onClick={downloadResult} className="btn btn-primary w-full">
              <Download className="w-5 h-5 mr-2" />Download Word Document (.docx)
            </button>
          </div>
        )}

        <div className="bg-secondary-50 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-secondary-900 mb-3">How It Works</h3>
          <ol className="space-y-2 text-secondary-600">
            <li>✓ Upload your PDF file</li>
            <li>✓ AI extracts all text content</li>
            <li>✓ Download as editable Word document</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
