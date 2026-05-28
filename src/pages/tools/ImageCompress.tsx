import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, X, Download, Loader, Minimize2 } from 'lucide-react';

export default function ImageCompress() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(70);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
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

  const compressImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      ctx.drawImage(img, 0, 0);

      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, quality / 100);

      const base64 = dataUrl.split(',')[1];
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      setResult({ url: dataUrl, size: bytes.length });
    } catch (err) {
      setError('Failed to compress image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    const kb = bytes / 1024;
    return kb > 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb.toFixed(2) + ' KB';
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Compress Image Free - Image Compressor Online | DocuMaster</title>
        <meta name="description" content="Compress and reduce image file size online for free. Perfect for web optimization and faster loading." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Minimize2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Compress Image</h1>
          <p className="text-secondary-600">Reduce image file size without losing quality</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Image className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drop an image here</p>
            <label className="btn btn-primary cursor-pointer">
              <Image className="w-4 h-4 mr-2" />
              Select Image
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        ) : (
          <>
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">Original: {formatSize(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <label className="block text-sm font-medium text-secondary-700 mb-2">Quality: {quality}%</label>
                <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full" />
                <div className="flex justify-between text-xs text-secondary-500 mt-1">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={compressImage} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Minimize2 className="w-4 h-4 mr-2" />Compress Image</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Minimize2 className="w-6 h-6 text-accent-600" />
                <div>
                  <p className="font-semibold text-secondary-900">Image Compressed!</p>
                  <p className="text-sm text-secondary-600">
                    {formatSize(file.size)} {`\u2192`} {formatSize(result.size)}
                    <span className="text-accent-600 ml-2">(-{((1 - result.size / file.size) * 100).toFixed(1)}%)</span>
                  </p>
                </div>
              </div>
            </div>
            <a href={result.url} download={file.name.replace(/\.[^.]+$/, '_compressed.jpg')} className="btn btn-primary w-full">
              <Download className="w-4 h-4 mr-2" />Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
