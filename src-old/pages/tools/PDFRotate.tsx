import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument, degrees } from 'pdf-lib';
import { FileText, X, Download, Loader, RotateCw, RotateCcw } from 'lucide-react';

export default function PDFRotate() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
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

  const rotatePDF = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle || 0;
        page.setRotation(degrees(currentRotation + rotation));
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to rotate PDF. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>Rotate PDF Free - Rotate PDF Pages Online | DocuMaster</title>
        <meta name="description" content="Rotate PDF pages clockwise or counterclockwise. Free online tool to change PDF orientation." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <RotateCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Rotate PDF</h1>
          <p className="text-secondary-600">Rotate PDF pages to any orientation</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <RotateCw className="w-12 h-12 text-secondary-400 mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }} />
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

              <div className="border-t border-secondary-200 pt-4">
                <label className="block text-sm font-medium text-secondary-700 mb-3">Rotation Direction</label>
                <div className="grid grid-cols-4 gap-3">
                  {[{ angle: -90, icon: RotateCcw, label: '-90°' },
                    { angle: 90, icon: RotateCw, label: '+90°' },
                    { angle: 180, icon: RotateCw, label: '180°' },
                    { angle: 270, icon: RotateCcw, label: '-270°' }
                  ].map((opt) => (
                    <button
                      key={opt.angle}
                      onClick={() => setRotation(opt.angle)}
                      className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${rotation === opt.angle ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-secondary-300'}`}
                    >
                      <opt.icon className="w-6 h-6 text-primary-600" />
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={rotatePDF} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><RotateCw className="w-4 h-4 mr-2" />Rotate PDF</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <RotateCw className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">PDF Rotated!</p>
                  <p className="text-sm text-secondary-600">Rotated by {rotation}°</p>
                </div>
              </div>
              <a href={result} download={file.name.replace('.pdf', '_rotated.pdf')} className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
