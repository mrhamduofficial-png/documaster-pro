import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, X, Download, Loader, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

type OutputFormat = 'png' | 'jpeg' | 'webp';

export default function ImageConverter() {
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<OutputFormat>('png');
  const [quality, setQuality] = useState(85);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f =>
      f.type.startsWith('image/')
    );
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

  const convertImage = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      ctx.drawImage(img, 0, 0);

      const mimeType = format === 'jpeg' ? 'image/jpeg' : `image/${format}`;

      const dataUrl = canvas.toDataURL(mimeType, quality / 100);

      setResult(dataUrl);
      URL.revokeObjectURL(img.src);
    } catch (err) {
      setError('Failed to convert image. Please try another file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    return (bytes / 1024).toFixed(1) + ' KB';
  };

  const formats: { value: OutputFormat; label: string; desc: string }[] = [
    { value: 'png', label: 'PNG', desc: 'Best for graphics, transparency' },
    { value: 'jpeg', label: 'JPEG', desc: 'Best for photos, smaller size' },
    { value: 'webp', label: 'WebP', desc: 'Modern format, best compression' }
  ];

  return (
    <div className="py-8">
      <Helmet>
        <title>Image Converter Free - Convert PNG, JPG, WebP | DocuMaster</title>
        <meta name="description" content="Free online image converter. Convert between PNG, JPEG, and WebP formats. Adjust quality and download instantly." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Image Converter</h1>
          <p className="text-secondary-600">Convert images between formats instantly.</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <Image className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drag and drop an image</p>
            <p className="text-sm text-secondary-500 mb-4">Supports: PNG, JPG, WebP, GIF, BMP</p>
            <label className="btn btn-primary cursor-pointer">
              <Image className="w-4 h-4 mr-2" />
              Select Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <>
            <div className="card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">
                    {file.type} - {formatSize(file.size)}
                  </p>
                </div>
                <button
                  onClick={() => { setFile(null); setResult(null); }}
                  className="p-2 hover:bg-secondary-100 rounded"
                >
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Output Format
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {formats.map((f) => (
                      <button
                        key={f.value}
                        onClick={() => setFormat(f.value)}
                        className={`p-3 rounded-lg border-2 text-left transition-colors ${
                          format === f.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-secondary-200 hover:border-secondary-300'
                        }`}
                      >
                        <p className="font-medium text-secondary-900">{f.label}</p>
                        <p className="text-xs text-secondary-600">{f.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-secondary-500">
                    <span>Smaller file</span>
                    <span>Higher quality</span>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <button onClick={convertImage} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Convert to {format.toUpperCase()}
                </>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-white rounded-lg overflow-hidden">
                <img src={result} alt="Converted" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900">Conversion Complete!</p>
                <p className="text-sm text-secondary-600">
                  {file.name.split('.')[0]}.{format}
                </p>
              </div>
            </div>
            <a
              href={result}
              download={file.name.split('.')[0] + '.' + format}
              className="btn btn-primary w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Download {format.toUpperCase()}
            </a>
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
