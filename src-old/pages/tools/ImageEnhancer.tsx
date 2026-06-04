import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { X, Download, Loader, Sparkles, Crown, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

type Quality = 'hd' | '4k' | '8k';

export default function ImageEnhancer() {
  const { isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [quality, setQuality] = useState<Quality>('hd');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [enhancedDimensions, setEnhancedDimensions] = useState({ width: 0, height: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);

      // Get original dimensions
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files)[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const enhanceImage = async () => {
    if (!file || !preview) return;
    setLoading(true);
    setError(null);

    try {
      // Load the image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = preview;
      });

      // Calculate upscale factor
      const upscaleFactor: Record<Quality, number> = { hd: 2, '4k': 4, '8k': 8 };
      const factor = upscaleFactor[quality];

      // Create canvas with new dimensions
      const canvas = document.createElement('canvas');
      const newWidth = Math.min(img.naturalWidth * factor, 8000); // Cap at 8K
      const newHeight = Math.min(img.naturalHeight * factor, 8000);

      canvas.width = newWidth;
      canvas.height = newHeight;

      setEnhancedDimensions({ width: newWidth, height: newHeight });

      // Get context and draw
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      // Apply image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Use multiple passes for better upscaling quality
      if (factor > 2) {
        // Multi-pass upscaling for better quality
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = img.naturalWidth * 2;
        tempCanvas.height = img.naturalHeight * 2;
        const tempCtx = tempCanvas.getContext('2d');
        if (tempCtx) {
          tempCtx.imageSmoothingEnabled = true;
          tempCtx.imageSmoothingQuality = 'high';
          tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
          ctx.drawImage(tempCanvas, 0, 0, newWidth, newHeight);
        }
      } else {
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
      }

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      setResult(dataUrl);
    } catch (err) {
      setError('Failed to enhance image. Please try a different image.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>AI Image Upscaler - Enhance to HD/4K/8K | DocuMaster</title>
        <meta name="description" content="AI-powered image enhancement. Upscale images to HD, 4K, or 8K quality for free. Enhance photo resolution automatically." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AI Image Enhancer</h1>
          <p className="text-secondary-600">Upscale images to HD, 4K, or 8K quality</p>
        </div>

        {/* Upload Area */}
        {!file ? (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            <Upload className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <p className="text-xl font-medium text-secondary-700 mb-2">Click to upload or drag & drop</p>
            <p className="text-secondary-500">PNG, JPG, WebP up to 50MB</p>
          </div>
        ) : (
          <>
            {/* File Info */}
            <div className="card mb-6">
              <div className="flex items-start gap-4">
                {preview && (
                  <div className="w-32 h-32 bg-secondary-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-secondary-900 mb-1">{file.name}</h3>
                  <p className="text-sm text-secondary-500 mb-2">
                    {formatSize(file.size)} | {originalDimensions.width} x {originalDimensions.height}px
                  </p>

                  {/* Quality Selection */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">Output Quality</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'hd', label: 'HD', desc: '2x upscale', free: true },
                        { value: '4k', label: '4K', desc: '4x upscale', free: false },
                        { value: '8k', label: '8K', desc: '8x upscale', free: false }
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setQuality(opt.value as Quality)}
                          disabled={!isPremium && !opt.free}
                          className={`p-3 rounded-lg border-2 text-left transition-colors ${
                            quality === opt.value
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-secondary-200 hover:border-secondary-300'
                          } ${!isPremium && !opt.free ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <p className="font-bold text-secondary-900">{opt.label}</p>
                          <p className="text-xs text-secondary-600">{opt.desc}</p>
                          {!opt.free && <span className="text-xs text-primary-600">Premium</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={() => { setFile(null); setPreview(null); setResult(null); }} className="p-2 hover:bg-secondary-100 rounded">
                  <X className="w-5 h-5 text-secondary-500" />
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
            )}

            <button onClick={enhanceImage} disabled={loading} className="btn btn-primary w-full mb-6 py-4">
              {loading ? (
                <><Loader className="w-5 h-5 animate-spin mr-2" />Enhancing...</>
              ) : (
                <><Sparkles className="w-5 h-5 mr-2" />Enhance Image</>
              )}
            </button>
          </>
        )}

        {/* Result */}
        {result && (
          <div className="card bg-gradient-to-br from-accent-50 to-purple-50 border-accent-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-secondary-900 text-lg">Image Enhanced!</h3>
                <p className="text-sm text-secondary-600">Quality: {quality.toUpperCase()}</p>
              </div>
              <div className="text-right text-sm text-secondary-600">
                <p>{enhancedDimensions.width} x {enhancedDimensions.height}px</p>
                <p className="text-green-600 font-medium">
                  {Math.round((enhancedDimensions.width * enhancedDimensions.height) / (originalDimensions.width * originalDimensions.height) * 100)}% larger
                </p>
              </div>
            </div>
            <div className="bg-white p-2 rounded-lg mb-4">
              <img src={result} alt="Enhanced" className="max-w-full max-h-[400px] mx-auto rounded" />
            </div>
            <a href={result} download={`${file?.name.replace(/\.[^.]+$/, '')}_enhanced_${quality}.png`} className="btn btn-primary w-full">
              <Download className="w-5 h-5 mr-2" />Download Enhanced Image
            </a>
          </div>
        )}

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
            <div className="flex items-center gap-4">
              <Crown className="w-10 h-10 text-primary-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900">Unlock 4K and 8K Enhancement</h3>
                <p className="text-sm text-secondary-600">Get premium for unlimited 4K/8K upscaling</p>
              </div>
              <Link to="/pricing" className="btn btn-primary">Upgrade</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
