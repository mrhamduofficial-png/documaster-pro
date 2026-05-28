import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Video, X, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function VideoConverter() {
  const { isPremium } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return mb.toFixed(2) + ' MB';
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Video Converter Free - Convert Video Formats | DocuMaster</title>
        <meta name="description" content="Convert video files between formats. MP4, WebM, AVI, and more. Premium feature with fast processing." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Video Converter</h1>
          <p className="text-secondary-600">Convert videos between MP4, WebM, AVI formats</p>
        </div>

        {!isPremium && (
          <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 mb-6">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-primary-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900">Premium Feature</h3>
                <p className="text-sm text-secondary-600">Video conversion requires a Premium subscription</p>
              </div>
              <Link to="/pricing" className="btn btn-primary">Upgrade</Link>
            </div>
          </div>
        )}

        <div className="card">
          <div className="border-2 border-dashed border-secondary-300 rounded-xl p-12 text-center hover:border-primary-400 transition-colors">
            <Video className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-lg text-secondary-600 mb-2">Drop a video file here</p>
            <p className="text-sm text-secondary-500 mb-4">Supports: MP4, WebM, AVI, MOV</p>
            <label className="btn btn-primary cursor-pointer disabled:opacity-50">
              <Video className="w-4 h-4 mr-2" />
              Select Video
              <input
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
                disabled={!isPremium}
              />
            </label>
          </div>

          {file && (
            <div className="mt-4 p-4 bg-secondary-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-secondary-900">{file.name}</p>
                <p className="text-sm text-secondary-500">{formatSize(file.size)}</p>
              </div>
              <button onClick={() => setFile(null)} className="p-2 hover:bg-secondary-200 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {['MP4', 'WebM', 'AVI', 'GIF'].map((format) => (
            <button
              key={format}
              disabled={!isPremium}
              className="btn btn-outline py-4 disabled:opacity-50"
            >
              Convert to {format}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
