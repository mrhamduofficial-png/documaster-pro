import { useState, useCallback, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument, rgb } from 'pdf-lib';
import { Upload, FileText, X, Download, Loader, PenTool, FileSignature } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function DigitalSign() {
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    ctx.beginPath();

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#1e40af';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setSignature(null);
      }
    }
  };

  const signDocument = async () => {
    if (!file || !signature) {
      setError('Please upload a PDF and draw your signature');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      const pages = pdfDoc.getPages();
      const lastPage = pages[pages.length - 1];

      const signatureImage = await pdfDoc.embedPng(signature);
      const signatureDims = signatureImage.scale(0.3);

      lastPage.drawImage(signatureImage, {
        x: lastPage.getWidth() - signatureDims.width - 50,
        y: 50,
        width: signatureDims.width,
        height: signatureDims.height,
      });

      // Add timestamp
      const font = await pdfDoc.embedFont('Helvetica');
      const date = new Date().toLocaleString();
      lastPage.drawText(date, {
        x: lastPage.getWidth() - signatureDims.width - 50,
        y: 30,
        size: 8,
        font,
        color: rgb(0.5, 0.5, 0.5),
      });

      // Add signature line
      lastPage.drawText('Digitally signed via DocuMaster', {
        x: lastPage.getWidth() - signatureDims.width - 50,
        y: 15,
        size: 6,
        font,
        color: rgb(0.3, 0.3, 0.3),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to sign document. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Digital Sign PDF Free - Add Signature to Document | DocuMaster</title>
        <meta name="description" content="Add digital signatures to PDF documents for free. Draw your signature, position it, and download your signed document." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Digital Signature</h1>
          <p className="text-secondary-600">Add your signature to PDF documents.</p>
        </div>

        {/* Step 1: Upload */}
        <div className="card mb-6">
          <h3 className="font-semibold text-secondary-900 mb-4">Step 1: Upload Document</h3>
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors"
            >
              <FileText className="w-10 h-10 text-secondary-400 mx-auto mb-3" />
              <p className="text-secondary-600 mb-3">Drag and drop a PDF file</p>
              <label className="btn btn-secondary cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
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
            <div className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
              <FileText className="w-6 h-6 text-primary-600" />
              <div className="flex-1">
                <p className="font-medium text-secondary-900">{file.name}</p>
                <p className="text-sm text-secondary-500">Ready to sign</p>
              </div>
              <button
                onClick={() => setFile(null)}
                className="p-1 hover:bg-secondary-200 rounded"
              >
                <X className="w-4 h-4 text-secondary-500" />
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Draw Signature */}
        <div className="card mb-6">
          <h3 className="font-semibold text-secondary-900 mb-4">Step 2: Draw Your Signature</h3>
          <div className="border-2 border-secondary-200 rounded-lg p-2 bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={150}
              className="w-full border border-secondary-100 rounded cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <div className="flex justify-end mt-3">
            <button onClick={clearSignature} className="text-sm text-secondary-600 hover:text-secondary-900">
              Clear
            </button>
          </div>

          {/* Signature Preview */}
          {signature && (
            <div className="mt-4 p-3 bg-accent-50 rounded-lg">
              <p className="text-sm text-secondary-600 mb-2">Signature preview:</p>
              <img src={signature} alt="Signature" className="bg-white p-2 rounded" style={{ maxWidth: '200px' }} />
            </div>
          )}
        </div>

        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Sign Button */}
        <button
          onClick={signDocument}
          disabled={loading || !file || !signature}
          className="btn btn-primary w-full mb-6"
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <FileSignature className="w-4 h-4 mr-2" />
              Sign Document
            </>
          )}
        </button>

        {/* Result */}
        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Document Signed!</p>
                  <p className="text-sm text-secondary-600">Your signature has been added</p>
                </div>
              </div>
              <a
                href={result}
                download={file.name.replace('.pdf', '_signed.pdf')}
                className="btn btn-primary"
              >
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
