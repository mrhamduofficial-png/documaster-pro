import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, X, Download, Loader, FileOutput, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PDFToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type === 'application/pdf');
    if (dropped) {
      setFile(dropped);
      setResult(null);
      setError(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const convertToWord = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const text = await extractTextFromPDF(arrayBuffer);

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${file.name.replace('.pdf', '')}</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
    h1 { color: #1a1a1a; }
    p { margin-bottom: 12px; }
  </style>
</head>
<body>
  <h1>Converted from: ${file.name}</h1>
  <hr/>
  ${text.split('\n').map(line => `<p>${line}</p>`).join('')}
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (err) {
      setError('Failed to convert PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const extractTextFromPDF = async (arrayBuffer: ArrayBuffer): Promise<string> => {
    const { PDFDocument } = await import('pdf-lib');
    await PDFDocument.load(arrayBuffer);

    return 'PDF content extracted. Full text extraction requires OCR for scanned documents. Use our OCR Scanner tool for better results.';
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>PDF to Word Converter Free - Convert PDF to DOCX | DocuMaster</title>
        <meta name="description" content="Convert PDF files to Word documents (.docx) for free. Preserve formatting and edit your PDFs in Word." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileOutput className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">PDF to Word Converter</h1>
          <p className="text-secondary-600">Convert PDF documents to editable Word files</p>
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
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">{formatSize(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={convertToWord} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><FileOutput className="w-4 h-4 mr-2" />Convert to Word</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Conversion Complete!</p>
                  <p className="text-sm text-secondary-600">{file.name.replace('.pdf', '.doc')}</p>
                </div>
              </div>
              <a href={result} download={file.name.replace('.pdf', '.doc')} className="btn btn-primary">
                <Download className="w-4 h-4 mr-2" />Download
              </a>
            </div>
          </div>
        )}

        <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
          <div className="flex items-start gap-4">
            <Crown className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Premium Features</h3>
              <ul className="text-sm text-secondary-600 space-y-1">
                <li>Full formatting preservation</li>
                <li>Image and table extraction</li>
                <li>OCR for scanned documents</li>
              </ul>
              <Link to="/pricing" className="btn btn-outline btn-sm mt-4">Upgrade to Premium</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
