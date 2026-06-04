import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { FileText, X, Download, Loader, Hash } from 'lucide-react';

export default function PDFPageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center'>('bottom-center');
  const [startNumber, setStartNumber] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type === 'application/pdf');
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

  const addPageNumbers = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        const pageNumber = index + startNumber;
        const text = `Page ${pageNumber} of ${pages.length}`;
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        let x, y;
        switch (position) {
          case 'bottom-center':
            x = (width - textWidth) / 2;
            y = 30;
            break;
          case 'bottom-right':
            x = width - textWidth - 30;
            y = 30;
            break;
          case 'top-center':
            x = (width - textWidth) / 2;
            y = height - 30;
            break;
          default:
            x = (width - textWidth) / 2;
            y = 30;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to add page numbers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>Add Page Numbers to PDF Free | DocuMaster</title>
        <meta name="description" content="Add page numbers to PDF documents for free. Choose position, starting number, and font size." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Add Page Numbers</h1>
          <p className="text-secondary-600">Add page numbers to your PDF documents</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Hash className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drop a PDF file here</p>
            <label className="btn btn-primary cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Select PDF
              <input type="file" accept=".pdf" onChange={handleFileInput} className="hidden" />
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
                <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Position</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'bottom-center', label: 'Bottom Center' },
                      { value: 'bottom-right', label: 'Bottom Right' },
                      { value: 'top-center', label: 'Top Center' }
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setPosition(opt.value as typeof position)}
                        className={`p-3 rounded-lg border-2 text-sm transition-colors ${position === opt.value ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Start Number: {startNumber}</label>
                  <input type="number" min="0" value={startNumber} onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)} className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Font Size: {fontSize}px</label>
                  <input type="range" min="8" max="24" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={addPageNumbers} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Hash className="w-4 h-4 mr-2" />Add Page Numbers</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash className="w-6 h-6 text-accent-600" />
                <div>
                  <p className="font-semibold text-secondary-900">Page Numbers Added!</p>
                  <p className="text-sm text-secondary-600">Starting from {startNumber}</p>
                </div>
              </div>
              <a href={result} download={file.name.replace('.pdf', '_numbered.pdf')} className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
