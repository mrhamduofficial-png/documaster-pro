import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Tesseract from 'tesseract.js';
import { Image, X, Download, Loader, ScanLine, Copy, Check } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function OCRScanner() {
  const { user, isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const performOCR = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });

      setResult(result.data.text);
    } catch (err) {
      setError('Failed to extract text. Please try with a clearer image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadText = () => {
    if (!result || !file) return;
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.[^/.]+$/, '') + '_ocr.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const languages = [
    { code: 'eng', name: 'English' },
    { code: 'spa', name: 'Spanish' },
    { code: 'fra', name: 'French' },
    { code: 'deu', name: 'German' },
    { code: 'chi_sim', name: 'Chinese (Simplified)' },
    { code: 'jpn', name: 'Japanese' },
  ];

  return (
    <div className="py-8">
      <Helmet>
        <title>OCR Scanner Free - Extract Text from Images | DocuMaster</title>
        <meta name="description" content="Free online OCR scanner. Extract text from images and scanned documents. Support for multiple languages. No signup required." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">OCR Scanner</h1>
          <p className="text-secondary-600">Extract text from images and scanned documents.</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Image className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drag and drop an image</p>
            <p className="text-sm text-secondary-500 mb-4">Supports: PNG, JPG, WebP</p>
            <label className="btn btn-primary cursor-pointer">
              <Image className="w-4 h-4 mr-2" />
              Select Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
            <p className="text-xs text-secondary-400 mt-4">
              {isPremium ? 'Processing: Priority' : 'Processing: Standard speed'}
            </p>
          </div>
        ) : (
          <>
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">{file.type}</p>
                </div>
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="p-2 hover:bg-secondary-100 rounded"
                >
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-medium text-secondary-700 mb-2">Supported Languages</p>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <span
                      key={lang.code}
                      className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                    >
                      {lang.name}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-secondary-400 mt-2">
                  {isPremium ? 'All languages available' : 'Upgrade for more languages'}
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={performOCR} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin mr-2" />
                  Processing... {progress}%
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4 mr-2" />
                  Extract Text
                </>
              )}
            </button>
          </>
        )}

        {result && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900">Extracted Text</h3>
              <div className="flex gap-2">
                <button onClick={copyToClipboard} className="btn btn-outline btn-sm">
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </button>
                <button onClick={downloadText} className="btn btn-outline btn-sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg max-h-64 overflow-y-auto">
              <pre className="text-sm text-secondary-700 whitespace-pre-wrap font-sans">
                {result}
              </pre>
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
