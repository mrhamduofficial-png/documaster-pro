import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Diff } from 'lucide-react';

export default function DocumentDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [result, setResult] = useState<{ type: string; content: string }[]>([]);

  const compareDocuments = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const diff: { type: string; content: string }[] = [];

    const maxLines = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        diff.push({ type: 'same', content: line1 });
      } else {
        if (line1) diff.push({ type: 'removed', content: `- ${line1}` });
        if (line2) diff.push({ type: 'added', content: `+ ${line2}` });
      }
    }

    setResult(diff);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Document Diff - Compare Documents | DocuMaster</title>
        <meta name="description" content="Compare two documents side by side. Highlight differences between text files instantly." />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Diff className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Document Diff</h1>
          <p className="text-secondary-600">Compare two documents and find differences</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-blue-600">1</span>
              </div>
              <span className="font-medium text-secondary-900">Original Document</span>
            </div>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Paste the original document text here..."
              className="input min-h-[300px] resize-none font-mono text-sm"
            />
          </div>

          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-green-600">2</span>
              </div>
              <span className="font-medium text-secondary-900">Modified Document</span>
            </div>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Paste the modified document text here..."
              className="input min-h-[300px] resize-none font-mono text-sm"
            />
          </div>
        </div>

        <button onClick={compareDocuments} disabled={!text1 || !text2} className="btn btn-primary w-full mb-6">
          <Diff className="w-4 h-4 mr-2" />Compare Documents
        </button>

        {result.length > 0 && (
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-secondary-900">Comparison Result</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-green-600">
                  <span className="w-3 h-3 bg-green-200 rounded" /> Added
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <span className="w-3 h-3 bg-red-200 rounded" /> Removed
                </span>
                <span className="flex items-center gap-1 text-secondary-600">
                  <span className="w-3 h-3 bg-secondary-200 rounded" /> Unchanged
                </span>
              </div>
            </div>
            <div className="font-mono text-sm space-y-1 max-h-[400px] overflow-y-auto">
              {result.map((line, i) => (
                <div
                  key={i}
                  className={`px-3 py-1 rounded ${
                    line.type === 'added'
                      ? 'bg-green-50 text-green-800'
                      : line.type === 'removed'
                      ? 'bg-red-50 text-red-800 line-through'
                      : 'bg-secondary-50 text-secondary-600'
                  }`}
                >
                  {line.content || <span className="text-secondary-400">(empty line)</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
