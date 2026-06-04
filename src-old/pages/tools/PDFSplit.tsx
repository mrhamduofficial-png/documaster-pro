import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, Loader, Scissors } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function PDFSplit() {
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [pageRange, setPageRange] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ name: string; url: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type === 'application/pdf');
    if (dropped) handleFile(dropped);
  }, []);

  const handleFile = async (pdfFile: File) => {
    setFile(pdfFile);
    setResults([]);
    setError(null);

    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    } catch {
      setError('Failed to read PDF. Please ensure it\'s a valid file.');
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const parsePageRanges = (input: string, maxPages: number): number[][] => {
    const ranges: number[][] = [];
    const parts = input.split(',').map(p => p.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n));
        if (!isNaN(start) && !isNaN(end)) {
          const range = [];
          for (let i = Math.max(1, start); i <= Math.min(maxPages, end); i++) {
            range.push(i - 1);
          }
          if (range.length > 0) ranges.push(range);
        }
      } else {
        const page = parseInt(part);
        if (!isNaN(page) && page >= 1 && page <= maxPages) {
          ranges.push([page - 1]);
        }
      }
    }
    return ranges;
  };

  const splitPDF = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const newResults: { name: string; url: string }[] = [];

      if (splitMode === 'all') {
        for (let i = 0; i < pdf.getPageCount(); i++) {
          const newPdf = await PDFDocument.create();
          const [page] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(page);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
          newResults.push({
            name: `${file.name.replace('.pdf', '')}_page_${i + 1}.pdf`,
            url: URL.createObjectURL(blob)
          });
        }
      } else {
        const ranges = parsePageRanges(pageRange, pageCount);
        if (ranges.length === 0) {
          setError('Invalid page range. Use format like: 1-3, 5, 7-10');
          setLoading(false);
          return;
        }

        for (let i = 0; i < ranges.length; i++) {
          const newPdf = await PDFDocument.create();
          const pages = await newPdf.copyPages(pdf, ranges[i]);
          pages.forEach(page => newPdf.addPage(page));
          const pdfBytes = await newPdf.save();
          const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
          newResults.push({
            name: `${file.name.replace('.pdf', '')}_split_${i + 1}.pdf`,
            url: URL.createObjectURL(blob)
          });
        }
      }

      setResults(newResults);
    } catch (err) {
      setError('Failed to split PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>Split PDF Free - Extract Pages from PDF | DocuMaster</title>
        <meta name="description" content="Split PDF files into individual pages or extract specific pages. Free online tool, no signup required." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Split PDF</h1>
          <p className="text-secondary-600">Extract pages or split a PDF into multiple files.</p>
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
                  <p className="text-sm text-secondary-500">
                    {formatSize(file.size)} - {pageCount} pages
                  </p>
                </div>
                <button onClick={() => { setFile(null); setPageCount(0); setResults([]); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <p className="text-sm font-medium text-secondary-700 mb-3">Split Mode</p>
                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => setSplitMode('all')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      splitMode === 'all' ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'
                    }`}
                  >
                    <p className="font-medium text-secondary-900">Split All Pages</p>
                    <p className="text-sm text-secondary-600">Create one PDF per page ({pageCount} files)</p>
                  </button>
                  <button
                    onClick={() => setSplitMode('range')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors ${
                      splitMode === 'range' ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'
                    }`}
                  >
                    <p className="font-medium text-secondary-900">Custom Range</p>
                    <p className="text-sm text-secondary-600">Extract specific pages</p>
                  </button>
                </div>

                {splitMode === 'range' && (
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Page Range
                    </label>
                    <input
                      type="text"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      placeholder="e.g., 1-3, 5, 7-10"
                      className="input"
                    />
                    <p className="text-xs text-secondary-500 mt-1">
                      Use commas to separate, hyphens for ranges
                    </p>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={splitPDF} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Scissors className="w-4 h-4 mr-2" />
                  Split PDF
                </>
              )}
            </button>
          </>
        )}

        {results.length > 0 && (
          <div className="card bg-accent-50 border-accent-200">
            <h3 className="font-semibold text-secondary-900 mb-4">
              Split Complete! ({results.length} files)
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
