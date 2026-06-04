import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image, X, Download, Loader, Maximize2 } from 'lucide-react';

export default function ImageResize() {
  const [file, setFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
    if (dropped) loadImage(dropped);
  }, []);

  const loadImage = (imageFile: File) => {
    setFile(imageFile);
    setResult(null);
    setError(null);

    const img = new window.Image();
    img.src = URL.createObjectURL(imageFile);
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) loadImage(e.target.files[0]);
  };

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (maintainRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setHeight(Math.round(newWidth * ratio));
    }
  };

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (maintainRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setWidth(Math.round(newHeight * ratio));
    }
  };

  const resizeImage = async () => {
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
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      ctx.drawImage(img, 0, 0, width, height);

      const dataUrl = canvas.toDataURL(file.type || 'image/png', 0.9);
      setResult(dataUrl);
    } catch (err) {
      setError('Failed to resize image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Resize Image Free - Image Resizer Online | DocuMaster</title>
        <meta name="description" content="Resize images online for free. Change image dimensions while maintaining quality. Perfect for social media, websites, and print." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Maximize2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Resize Image</h1>
          <p className="text-secondary-600">Change image dimensions to any size</p>
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
                <div className="w-20 h-20 bg-secondary-100 rounded-lg overflow-hidden">
                  <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-secondary-900">{file.name}</p>
                  <p className="text-sm text-secondary-500">Original: {originalDimensions.width} x {originalDimensions.height}</p>
                </div>
                <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Width (px)</label>
                    <input type="number" value={width} onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)} className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">Height (px)</label>
                    <input type="number" value={height} onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)} className="input" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="ratio" checked={maintainRatio} onChange={(e) => setMaintainRatio(e.target.checked)} className="w-4 h-4" />
                  <label htmlFor="ratio" className="text-sm text-secondary-700">Maintain aspect ratio</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">Quick Presets</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { w: 1920, h: 1080, label: 'HD' },
                      { w: 1080, h: 1080, label: 'Square' },
                      { w: 1200, h: 630, label: 'Social' },
                      { w: 800, h: 600, label: 'Web' }
                    ].map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => { setWidth(preset.w); setHeight(preset.h); setMaintainRatio(false); }}
                        className="p-2 text-xs bg-secondary-100 rounded hover:bg-secondary-200 transition-colors"
                      >
                        {preset.label}<br/>{preset.w}x{preset.h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={resizeImage} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Maximize2 className="w-4 h-4 mr-2" />Resize Image</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-secondary-900">Image Resized!</p>
                <p className="text-sm text-secondary-600">New size: {width} x {height}</p>
              </div>
            </div>
            <div className="mb-4 bg-white p-2 rounded-lg inline-block">
              <img src={result} alt="Resized" className="max-w-full max-h-64" />
            </div>
            <a href={result} download={file.name.replace(/\.[^.]+$/, '_resized.png')} className="btn btn-primary w-full">
              <Download className="w-4 h-4 mr-2" />Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
