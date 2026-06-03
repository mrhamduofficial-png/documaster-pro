import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib';
import { FileText, X, Download, Loader, Droplets, Type } from 'lucide-react';

export default function PDFWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState('DocuMaster');
  const [opacity, setOpacity] = useState(0.3);
  const [fontSize, setFontSize] = useState(50);
  const [position, setPosition] = useState<'center' | 'diagonal'>('diagonal');
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

  const addWatermark = async () => {
    if (!file || !watermarkText) {
      setError('Please provide both a PDF and watermark text');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = helveticaFont.widthOfTextAtSize(watermarkText, fontSize);

        let x, y;
        const rotation = position === 'diagonal' ? degrees(-45) : undefined;

        if (position === 'diagonal') {
          x = 0;
          y = height / 2;
        } else {
          x = (width - textWidth) / 2;
          y = height / 2 - fontSize / 2;
        }

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font: helveticaFont,
          color: rgb(0.5, 0.5, 0.5),
          opacity: opacity,
          rotate: rotation,
        });

        if (position === 'diagonal') {
          const steps = 3;
          for (let i = 1; i <= steps; i++) {
            const yOffset = height / (steps + 1) * i;
            page.drawText(watermarkText, {
              x: 0,
              y: yOffset,
              size: fontSize * 0.8,
              font: helveticaFont,
              color: rgb(0.5, 0.5, 0.5),
              opacity: opacity * 0.5,
              rotate: degrees(-45),
            });
          }
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to add watermark. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>Add Watermark to PDF Free - PDF Watermark Tool | DocuMaster</title>
        <meta name="description" content="Add text watermarks to PDF documents for free. Customize opacity, size, and position." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Add Watermark to PDF</h1>
          <p className="text-secondary-600">Protect your documents with custom watermarks</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <FileText className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
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
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Watermark Text</label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                    <input
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      className="input pl-10"
                      placeholder="Enter watermark text"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Opacity: {Math.round(opacity * 100)}%</label>
                  <input type="range" min="10" max="80" value={opacity * 100} onChange={(e) => setOpacity(parseInt(e.target.value) / 100)} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Font Size: {fontSize}px</label>
                  <input type="range" min="20" max="100" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Position</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPosition('diagonal')}
                      className={`p-3 rounded-lg border-2 transition-colors ${position === 'diagonal' ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'}`}
                    >
                      Diagonal
                    </button>
                    <button
                      onClick={() => setPosition('center')}
                      className={`p-3 rounded-lg border-2 transition-colors ${position === 'center' ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'}`}
                    >
                      Center
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={addWatermark} disabled={loading || !watermarkText} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Droplets className="w-4 h-4 mr-2" />Add Watermark</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Watermark Added!</p>
                  <p className="text-sm text-secondary-600">{watermarkText}</p>
                </div>
              </div>
              <a href={result} download={file.name.replace('.pdf', '_watermarked.pdf')} className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
