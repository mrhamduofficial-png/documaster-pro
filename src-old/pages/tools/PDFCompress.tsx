import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, Loader, Minimize } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

type CompressionLevel = 'low' | 'medium' | 'high';

export default function PDFCompress() {
  const { user, isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type === 'application/pdf');
    if (dropped) {
      setFile(dropped);
      setOriginalSize(dropped.size);
      setResult(null);
      setError(null);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setOriginalSize(e.target.files[0].size);
      setResult(null);
      setError(null);
    }
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  const getSavingsPercentage = (original: number, compressed: number) => {
    const saved = ((original - compressed) / original) * 100;
    return saved.toFixed(1);
  };

  const compressPDF = async () => {
    if (!file) return;

    const fileLimit = isPremium ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > fileLimit) {
      setError(`File too large. max ${isPremium ? '100 MB' : '10 MB'} for ${isPremium ? 'your plan' : 'free users'}.`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      // Simple compression by saving with optimized settings
      const pdfBytes = await pdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      // For demo, we'll just use the pdf-lib output
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult({
        url,
        size: pdfBytes.length
      });
    } catch (err) {
      setError('Failed to compress PDF. The file may be password-protected or corrupted.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const compressionOptions = [
    { level: 'low' as CompressionLevel, label: 'Low', desc: 'Best quality, smaller reduction' },
    { level: 'medium' as CompressionLevel, label: 'Medium', desc: 'Balanced quality and size' },
    { level: 'high' as CompressionLevel, label: 'High', desc: 'Maximum reduction, may affect quality' }
  ];

  return (
    <div className="py-8">
      <Helmet>
        <title>Compress PDF Free - Reduce PDF Size Online | DocuMaster</title>
        <meta name="description" content="Compress PDF files for free. Reduce file size while maintaining quality. Perfect for email attachments and uploads." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Compress PDF</h1>
          <p className="text-secondary-600">Reduce PDF file size while maintaining quality.</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drag and drop a PDF file</p>
            <p className="text-sm text-secondary-500 mb-4">or</p>
            <label className="btn btn-primary cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Select File
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-xs text-secondary-400 mt-4">
              {isPremium ? 'Up to 100 MB' : 'Up to 10 MB'}
            </p>
          </div>
        ) : (
          <>
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-primary-600" />
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">Original size: {formatSize(originalSize)}</p>
                </div>
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="p-2 hover:bg-secondary-100 rounded"
                >
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-medium text-secondary-700 mb-3">Compression Level</p>
                <div className="grid grid-cols-3 gap-3">
                  {compressionOptions.map((opt) => (
                    <button
                      key={opt.level}
                      onClick={() => setCompressionLevel(opt.level)}
                      className={`p-3 rounded-lg border-2 text-left transition-colors ${
                        compressionLevel === opt.level
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-secondary-200 hover:border-secondary-300'
                      }`}
                    >
                      <p className="font-medium text-secondary-900">{opt.label}</p>
                      <p className="text-xs text-secondary-600">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={compressPDF} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Minimize className="w-4 h-4 mr-2" />
                  Compress PDF
                </>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Compression Complete!</p>
                  <p className="text-sm text-secondary-600">
                    {formatSize(originalSize)} {`\u2192`} {formatSize(result.size)}
                    <span className="text-accent-600 ml-2">
                      (Saved {getSavingsPercentage(originalSize, result.size)}%)
                    </span>
                  </p>
                </div>
              </div>
              <a href={result.url} download={file.name.replace('.pdf', '_compressed.pdf')} className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
          </div>
        )}

        {!user && (
          <div className="mt-6 p-4 bg-primary-50 rounded-lg text-center">
            <p className="text-sm text-secondary-700">
              <span className="font-semibold">Free tier:</span> 5 operations per day.
              <a href="/pricing" className="text-primary-600 hover:underline ml-1">Upgrade for unlimited</a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
