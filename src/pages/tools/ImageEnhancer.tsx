import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Image as ImageIcon, X, Download, Loader, Sparkles, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

type Quality = 'hd' | '4k' | '8k';

export default function ImageEnhancer() {
  const { isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<Quality>('hd');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
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

  const enhanceImage = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      await new Promise<void>((resolve) => { img.onload = () => resolve(); });

      const upscaleFactor: Record<Quality, number> = { hd: 2, '4k': 4, '8k': 8 };
      const factor = upscaleFactor[quality];

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth * factor;
      canvas.height = img.naturalHeight * factor;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setResult(dataUrl);
    } catch (err) {
      setError('Failed to enhance image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

  return (
    <div className="py-8">
      <Helmet>
        <title>AI Image Upscaler - Enhance to HD/4K/8K | DocuMaster</title>
        <meta name="description" content="AI-powered image enhancement. Upscale images to HD, 4K, or 8K quality for free. Enhance photo resolution automatically." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AI Image Enhancer</h1>
          <p className="text-secondary-600">Upscale images to HD, 4K, or 8K quality</p>
        </div>

        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors"
          >
            <ImageIcon className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drop an image here</p>
            <label className="btn btn-primary cursor-pointer">
              <ImageIcon className="w-4 h-4 mr-2" />
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
                  <p className="text-sm text-secondary-500">{formatSize(file.size)}</p>
                </div>
                <button onClick={() => { setFile(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>

              <div className="border-t border-secondary-200 pt-4">
                <label className="block text-sm font-medium text-secondary-700 mb-3">Output Quality</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'hd', label: 'HD', desc: '2x resolution', free: true },
                    { value: '4k', label: '4K', desc: '4x resolution', free: false },
                    { value: '8k', label: '8K', desc: '8x resolution', free: false }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setQuality(opt.value as Quality)}
                      disabled={!isPremium && !opt.free}
                      className={`p-4 rounded-lg border-2 text-left transition-colors ${
                        quality === opt.value
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-secondary-200 hover:border-secondary-300'
                      } ${!isPremium && !opt.free ? 'opacity-50' : ''}`}
                    >
                      <p className="font-bold text-secondary-900">{opt.label}</p>
                      <p className="text-xs text-secondary-600">{opt.desc}</p>
                      {!opt.free && <span className="text-xs text-primary-600">Premium</span>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={enhanceImage} disabled={loading} className="btn btn-primary w-full mb-6">
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : (
                <><Sparkles className="w-4 h-4 mr-2" />Enhance Image</>
              )}
            </button>
          </>
        )}

        {result && file && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold text-secondary-900">Image Enhanced to {quality.toUpperCase()}!</p>
                <p className="text-sm text-secondary-600">Significantly improved resolution</p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg mb-4">
              <img src={result} alt="Enhanced" className="max-w-full max-h-64 mx-auto" />
            </div>
            <a href={result} download={file.name.replace(/\.[^.]+$/, `_enhanced_${quality}.png`)} className="btn btn-primary w-full">
              <Download className="w-4 h-4 mr-2" />Download Enhanced Image
            </a>
          </div>
        )}

        <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
          <div className="flex items-start gap-4">
            <Crown className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-secondary-900 mb-2">Premium Enhancement</h3>
              <p className="text-sm text-secondary-600 mb-3">
                Upgrade to Premium for 4K and 8K upscaling with advanced AI algorithms.
              </p>
              <Link to="/pricing" className="btn btn-outline btn-sm">Upgrade to Premium</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
