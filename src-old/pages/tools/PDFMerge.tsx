import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { PDFDocument } from 'pdf-lib';
import { Upload, FileText, X, Download, ArrowDown, GripVertical, Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface PDFFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function PDFMerge() {
  const { user } = useAuthStore();
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(f => f.type === 'application/pdf');
    addFiles(droppedFiles);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const pdfFiles: PDFFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size
    }));
    setFiles(prev => [...prev, ...pdfFiles]);
    setError(null);
    setResultUrl(null);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (fromIndex: number, toIndex: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      const [moved] = newFiles.splice(fromIndex, 1);
      newFiles.splice(toIndex, 0, moved);
      return newFiles;
    });
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      setError('Please add at least 2 PDF files to merge');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
    } catch (err) {
      setError('Failed to merge PDFs. Please ensure all files are valid PDFs.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Merge PDF Files Free - Combine Multiple PDFs | DocuMaster</title>
        <meta name="description" content="Merge multiple PDF files into one document for free. No signup required. Drag and drop, arrange, and merge PDFs instantly." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Merge PDF Files</h1>
          <p className="text-secondary-600">Combine multiple PDF documents into a single file.</p>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors mb-6"
        >
          <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
          <p className="text-lg text-secondary-600 mb-2">Drag and drop PDF files here</p>
          <p className="text-sm text-secondary-500 mb-4">or</p>
          <label className="btn btn-primary cursor-pointer">
            <FileText className="w-4 h-4 mr-2" />
            Select Files
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
          <p className="text-xs text-secondary-400 mt-4">
            {user ? 'Premium: Up to 100 MB' : 'Free: Up to 10 MB per file'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="card mb-6">
            <h3 className="font-semibold text-secondary-900 mb-4">
              Uploaded Files ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg group"
                >
                  <GripVertical className="w-4 h-4 text-secondary-400 cursor-move" />
                  <span className="text-sm text-secondary-400">{index + 1}</span>
                  <FileText className="w-5 h-5 text-primary-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-secondary-900">{file.name}</p>
                    <p className="text-xs text-secondary-500">{formatSize(file.size)}</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {index > 0 && (
                      <button
                        onClick={() => moveFile(index, index - 1)}
                        className="p-1 hover:bg-secondary-200 rounded"
                      >
                        <ArrowDown className="w-4 h-4 rotate-180" />
                      </button>
                    )}
                    {index < files.length - 1 && (
                      <button
                        onClick={() => moveFile(index, index + 1)}
                        className="p-1 hover:bg-secondary-200 rounded"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-error-100 rounded"
                  >
                    <X className="w-4 h-4 text-error-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Merge Button */}
        {files.length >= 2 && (
          <button
            onClick={mergePDFs}
            disabled={loading}
            className="btn btn-primary w-full mb-6"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Merge {files.length} PDFs
              </>
            )}
          </button>
        )}

        {/* Result */}
        {resultUrl && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-900">Merge Complete!</p>
                  <p className="text-sm text-secondary-600">Your merged PDF is ready</p>
                </div>
              </div>
              <a
                href={resultUrl}
                download="merged-document.pdf"
                className="btn btn-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </a>
            </div>
          </div>
        )}

        {/* Usage Limit */}
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
