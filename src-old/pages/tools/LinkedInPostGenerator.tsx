import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Copy, Check, Loader, PenTool, Zap } from 'lucide-react';
import { callAI } from '../../lib/ai';

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const generatedContent = await callAI('generate-content', { topic, style: tone });
      setResult(generatedContent);
    } catch (error) {
      console.error('Generation error:', error);
      setResult('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>AI LinkedIn Post Generator - Create Viral Content | DocuMaster</title>
        <meta name="description" content="AI-powered LinkedIn post generator. Create engaging viral content in seconds. Professional, casual, or educational styles." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">AI LinkedIn Post Generator</h1>
          <p className="text-secondary-600">Create viral LinkedIn content with AI</p>
        </div>

        <div className="card mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">Topic or Key Point</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., remote work, leadership, AI trends..."
                className="input text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Post Style</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'professional', label: 'Professional', desc: 'Formal tone' },
                  { value: 'casual', label: 'Casual', desc: 'Friendly vibe' },
                  { value: 'educational', label: 'Educational', desc: 'Thread style' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTone(opt.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-colors ${
                      tone === opt.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-secondary-200 hover:border-secondary-300'
                    }`}
                  >
                    <p className="font-semibold text-secondary-900">{opt.label}</p>
                    <p className="text-xs text-secondary-600">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={generate} disabled={loading || !topic.trim()} className="btn btn-primary w-full mb-6 py-4">
          {loading ? (
            <><Loader className="w-5 h-5 mr-2 animate-spin" />AI is creating...</>
          ) : (
            <><Zap className="w-5 h-5 mr-2" />Generate AI Post</>
          )}
        </button>

        {result && (
          <div className="card bg-gradient-to-br from-accent-50 to-primary-50 border-accent-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-secondary-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-600" />
                AI-Generated Post
              </span>
              <button onClick={copyResult} className="btn btn-primary btn-sm">
                {copied ? <><Check className="w-4 h-4 mr-1" />Copied!</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
              </button>
            </div>
            <div className="bg-white p-5 rounded-lg whitespace-pre-wrap text-secondary-700 min-h-[200px] text-lg leading-relaxed">
              {loading ? <Loader className="w-6 h-6 animate-spin text-primary-600" /> : result}
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-secondary-500">{result.length} characters</p>
              <p className="text-xs text-secondary-500">LinkedIn max: 3,000</p>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-secondary-50 rounded-lg text-center">
          <p className="text-sm text-secondary-600">
            Powered by AI. Generate unlimited posts for free!
          </p>
        </div>
      </div>
    </div>
  );
}
