import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Copy, Check, Loader, Wand as Wand2 } from 'lucide-react';

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const summarize = async () => {
    if (!text.trim()) return;

    setLoading(true);

    // Simple extractive summarization
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    const wordFreq: Record<string, number> = {};

    sentences.forEach(s => {
      s.toLowerCase().split(/\s+/).forEach(word => {
        if (word.length > 3) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
    });

    const scored = sentences.map(s => {
      const words = s.toLowerCase().split(/\s+/);
      const score = words.reduce((sum, w) => sum + (wordFreq[w] || 0), 0);
      return { sentence: s.trim(), score };
    });

    const topSentences = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.ceil(sentences.length / 3))
      .map(s => s.sentence);

    setSummary(topSentences.join('. ') + '.');
    setLoading(false);
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>Text Summarizer Free - Summarize Articles & Documents | DocuMaster</title>
        <meta name="description" content="Free AI-powered text summarizer. Reduce long articles and documents to key points instantly." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Text Summarizer</h1>
          <p className="text-secondary-600">AI-powered text summarization tool</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Original Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your long text here..."
              className="input min-h-[300px] resize-none"
            />
            <p className="text-xs text-secondary-500 mt-2">{text.split(/\s+/).filter(w => w).length} words</p>
          </div>

          <div className="card bg-accent-50 border-accent-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700">Summary</label>
              {summary && (
                <button onClick={copySummary} className="btn btn-outline btn-sm">
                  {copied ? <><Check className="w-4 h-4 mr-1" />Copied</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
                </button>
              )}
            </div>
            <div className="input min-h-[300px] bg-white overflow-y-auto">
              {summary || <span className="text-secondary-400">Summary will appear here...</span>}
            </div>
            {summary && <p className="text-xs text-secondary-500 mt-2">{summary.split(/\s+/).filter(w => w).length} words</p>}
          </div>
        </div>

        <button onClick={summarize} disabled={loading || !text.trim()} className="btn btn-primary w-full mt-6">
          {loading ? <><Loader className="w-4 h-4 mr-2 animate-spin" />Summarizing...</> : (
            <><Wand2 className="w-4 h-4 mr-2" />Summarize Text</>
          )}
        </button>

        <div className="mt-6 p-4 bg-secondary-50 rounded-lg">
          <p className="text-sm text-secondary-600 text-center">
            This tool uses AI to extract the most important sentences.
            <a href="/pricing" className="text-primary-600 hover:underline ml-1">Premium</a>
            {' '}offers more advanced AI models.
          </p>
        </div>
      </div>
    </div>
  );
}
