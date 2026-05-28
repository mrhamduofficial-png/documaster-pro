import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import { FileText, X, Download, Loader, Clock as Unlock, Lock, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PDFUnlock() {
  const [file, setFile] = useState<File | null>(null);
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

  const unlockPDF = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setResult(url);
    } catch (err) {
      setError('Failed to unlock PDF. This tool removes basic restrictions. For password-protected files, you need the password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>Unlock PDF Free - Remove PDF Restrictions | DocuMaster</title>
        <meta name="description" content="Unlock PDF files and remove restrictions for free. Remove copy, print, and edit restrictions from PDF documents." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Unlock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Unlock PDF</h1>
          <p className="text-secondary-600">Remove restrictions from PDF files (copy, print, edit)</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Lock className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drop a restricted PDF here</p>
            <p className="text-sm text-secondary-500 mb-4">or</p>
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
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-orange-600" />
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
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={unlockPDF} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Unlock className="w-4 h-4 mr-2" />Unlock PDF</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <Unlock className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">PDF Unlocked!</p>
                  <p className="text-sm text-secondary-600">All restrictions removed</p>
                </div>
              </div>
              <a href={result} download={file.name.replace('.pdf', '_unlocked.pdf')} className="btn btn-primary">
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
                <li>Remove password protection (with password)</li>
                <li>Batch unlock multiple PDFs</li>
                <li>Strong encryption removal</li>
              </ul>
              <Link to="/pricing" className="btn btn-outline btn-sm mt-4">Upgrade to Premium</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
