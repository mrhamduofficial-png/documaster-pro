import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, Loader, FileOutput } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

type OutputFormat = 'pdf' | 'images';

export default function PDFFormat() {
  const { user, isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>('images');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type === 'application/pdf');
    if (dropped) {
      setFile(dropped);
      setResults([]);
      setError(null);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResults([]);
      setError(null);
    }
  };

  const convertPDF = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pageCount = pdf.getPageCount();

      if (format === 'images') {
        const imageResults: { name: string; url: string }[] = [];

        for (let i = 0; i < pageCount; i++) {
          const singlePagePdf = await PDFDocument.create();
          const [copiedPage] = await singlePagePdf.copyPages(pdf, [i]);
          singlePagePdf.addPage(copiedPage);

          const pdfBytes = await singlePagePdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });

          imageResults.push({
            name: `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`,
            url: URL.createObjectURL(blob)
          });
        }

        setResults(imageResults);
      }
    } catch (err) {
      setError('Failed to convert PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>PDF Format Converter Free - Convert PDFs | DocuMaster</title>
        <meta name="description" content="Convert PDFs to various formats. Extract pages as images or individual PDFs. Free online tool." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">PDF Format Converter</h1>
          <p className="text-secondary-600">Convert PDFs to different formats.</p>
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
          </div>
        ) : (
          <>
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-primary-600" />
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">{formatSize(file.size)}</p>
                </div>
                <button
                  onClick={() => { setFile(null); setResults([]); }}
                  className="p-2 hover:bg-secondary-100 rounded"
                >
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-medium text-secondary-700 mb-3">Output Format</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setFormat('images')}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      format === 'images'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-secondary-300'
                    }`}
                  >
                    <FileOutput className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="font-medium text-secondary-900">Extract as Pages</p>
                    <p className="text-xs text-secondary-600">Split PDF into individual pages</p>
                  </button>
                  <button
                    disabled={!isPremium}
                    onClick={() => setFormat('pdf')}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      format === 'pdf'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-secondary-300'
                    } ${!isPremium ? 'opacity-50' : ''}`}
                  >
                    <FileText className="w-5 h-5 text-primary-600 mb-2" />
                    <p className="font-medium text-secondary-900">
                      {isPremium ? 'To Word/Excel' : 'Premium'}
                    </p>
                    <p className="text-xs text-secondary-600">
                      {isPremium ? 'Convert to editable formats' : 'Upgrade to unlock'}
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={convertPDF} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <FileOutput className="w-4 h-4 mr-2" />
                  Convert
                </>
              )}
            </button>
          </>
        )}

        {results.length > 0 && (
          <div className="card bg-accent-50 border-accent-200">
            <h3 className="font-semibold text-secondary-900 mb-4">
              Conversion Complete! ({results.length} files)
            </h3>
            <div className="space-y-2">
              {results.map((result, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary-600" />
                    <span className="text-sm text-secondary-700">{result.name}</span>
                  </div>
                  <a href={result.url} download={result.name} className="btn btn-outline btn-sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </a>
                </div>
              ))}
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
