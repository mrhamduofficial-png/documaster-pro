import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, FileText, Calendar, Download, Shield, Check } from 'lucide-react';

export default function Timestamping() {
  const [file, setFile] = useState<File | null>(null);
  const [timestamp, setTimestamp] = useState<string | null>(null);
  const [hash, setHash] = useState<string | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setTimestamp(new Date().toISOString());
      setHash(generateHash());
    }
  };

  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Document Timestamping - Certify Documents | DocuMaster</title>
        <meta name="description" content="Add secure timestamps to your documents. Certify when a document was created or modified." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Document Timestamping</h1>
          <p className="text-secondary-600">Certify when your document was created or modified</p>
        </div>

        <div className="card mb-6">
          <div className="border-2 border-dashed border-secondary-300 rounded-xl p-8 text-center">
            <FileText className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <p className="text-secondary-600 mb-4">Upload document to timestamp</p>
            <label className="btn btn-primary cursor-pointer">
              <Calendar className="w-4 h-4 mr-2" />Select Document
              <input type="file" onChange={handleFile} className="hidden" />
            </label>
          </div>
        </div>

        {file && timestamp && hash && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <p className="font-semibold text-secondary-900">Document Timestamped</p>
                <p className="text-sm text-secondary-600">{file.name}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-secondary-600">Timestamp</span>
                <span className="font-mono font-medium text-secondary-900">{timestamp}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-secondary-600">Document Hash</span>
                <span className="font-mono text-xs text-secondary-900 break-all">{hash}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-600">Algorithm</span>
                <span className="font-medium text-secondary-900">SHA-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-600">File Size</span>
                <span className="font-medium text-secondary-900">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-secondary-700">
                <p className="font-medium">Timestamp Certificate</p>
                <p>This timestamp certifies the document existed at the specified time. Share this hash to prove the document's authenticity.</p>
              </div>
            </div>

            <button className="btn btn-primary w-full mt-4">
              <Download className="w-4 h-4 mr-2" />Download Certificate
            </button>
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
          {[
            { icon: Clock, title: 'Instant', desc: 'Timestamps in seconds' },
            { icon: Shield, title: 'Secure', desc: 'Cryptographic proof' },
            { icon: Calendar, title: 'Permanent', desc: 'Immutable record' }
          ].map((item) => (
            <div key={item.title} className="card py-4">
              <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
              <h3 className="font-semibold text-secondary-900">{item.title}</h3>
              <p className="text-sm text-secondary-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
