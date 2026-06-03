import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Copy, Check, Loader, Zap } from 'lucide-react';
import { callAI } from '../../lib/ai';

export default function TextSummarizer() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ original: 0, summary: 0, reduction: 0 });

  const summarize = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const result = await callAI('summarize', { text });
      const originalWords = text.split(/\s+/).filter((w: string) => w).length;
      const summaryWords = result.split(/\s+/).filter((w: string) => w).length;

      setSummary(result);
      setStats({
        original: originalWords,
        summary: summaryWords,
        reduction: Math.round((1 - summaryWords / originalWords) * 100)
      });
    } catch (error) {
      console.error('Summarization error:', error);
      setSummary('Error processing text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>AI Text Summarizer - Instant Summary Generator | DocuMaster</title>
        <meta name="description" content="AI-powered text summarizer. Instantly summarize articles, documents, and long texts. Free and fast." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AI Text Summarizer</h1>
          <p className="text-secondary-600">Instantly summarize long texts with AI</p>
        </div>

        {/* Stats */}
        {summary && stats.original > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-secondary-900">{stats.original}</p>
              <p className="text-sm text-secondary-600">Original Words</p>
            </div>
            <div className="card text-center py-4 bg-accent-50 border-accent-200">
              <p className="text-2xl font-bold text-accent-700">{stats.summary}</p>
              <p className="text-sm text-secondary-600">Summary Words</p>
            </div>
            <div className="card text-center py-4 bg-green-50 border-green-200">
              <p className="text-2xl font-bold text-green-700">{stats.reduction}%</p>
              <p className="text-sm text-secondary-600">Reduction</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Original Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your long text here..."
              className="input min-h-[350px] resize-none"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-secondary-500">{text.split(/\s+/).filter(w => w).length} words</p>
              <button onClick={() => setText('')} className="text-xs text-secondary-500 hover:text-secondary-700">
                Clear
              </button>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-accent-50 to-primary-50 border-accent-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-secondary-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-600" />
                AI Summary
              </label>
              {summary && (
                <button onClick={copySummary} className="btn btn-outline btn-sm">
                  {copied ? <><Check className="w-4 h-4 mr-1" />Copied!</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
                </button>
              )}
            </div>
            <div className="input min-h-[350px] bg-white overflow-y-auto whitespace-pre-wrap">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-2" />
                    <p className="text-secondary-600">AI is processing...</p>
                  </div>
                </div>
              ) : summary || (
                <span className="text-secondary-400">AI-powered summary will appear here...</span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={summarize}
          disabled={loading || !text.trim()}
          className="btn btn-primary w-full mt-6 py-4 text-lg"
        >
          {loading ? (
            <><Loader className="w-5 h-5 mr-2 animate-spin" />Processing...</>
          ) : (
            <><Zap className="w-5 h-5 mr-2" />Generate AI Summary</>
          )}
        </button>
      </div>
    </div>
  );
}
