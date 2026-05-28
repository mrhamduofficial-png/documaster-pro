import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sparkles, Copy, Check, Loader, PenTool } from 'lucide-react';

export default function LinkedInPostGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);

    // Template-based generation
    const templates = {
      professional: `Excited to share some insights about ${topic}!\n\nAfter diving deep into this topic, here are my key takeaways:\n\n1. Understanding the fundamentals is crucial\n2. Consistent practice leads to mastery\n3. Learning from others accelerates growth\n\nWhat's your experience with ${topic}? I'd love to hear your thoughts in the comments!\n\n#${topic.replace(/\s+/g, '')} #ProfessionalGrowth #Learning`,
      casual: `Just wrapped up an amazing deep dive into ${topic}! \n\nHonestly, I had no idea how fascinating this would be. The more I learn, the more I realize there's so much more to explore.\n\nAnyone else geeking out over ${topic}? Drop a comment and let's chat!\n\n#${topic.replace(/\s+/g, '')} #AlwaysLearning`,
      educational: `THREAD: Everything you need to know about ${topic}\n\nLet me break this down in simple terms...\n\nWhat is ${topic}?\nIt's a concept/practice/skill that has gained significant attention recently.\n\nWhy does it matter?\nUnderstanding ${topic} can help you:\n- Stay competitive in your field\n- Make better decisions\n- Connect with like-minded professionals\n\nSave this for later reference!\n\n#${topic.replace(/\s+/g, '')} #Education #Thread`
    };

    setResult(templates[tone as keyof typeof templates] || templates.professional);
    setTimeout(() => setLoading(false), 1000);
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8">
      <Helmet>
        <title>LinkedIn Post Generator Free - AI Content Writer | DocuMaster</title>
        <meta name="description" content="Free AI-powered LinkedIn post generator. Create engaging posts in seconds with different tones and styles." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">LinkedIn Post Generator</h1>
          <p className="text-secondary-600">AI-powered content creation for LinkedIn</p>
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
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">Post Style</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'professional', label: 'Professional' },
                  { value: 'casual', label: 'Casual' },
                  { value: 'educational', label: 'Educational' }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTone(opt.value)}
                    className={`p-3 rounded-lg border-2 text-sm transition-colors ${tone === opt.value ? 'border-primary-500 bg-primary-50' : 'border-secondary-200'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button onClick={generate} disabled={loading || !topic.trim()} className="btn btn-primary w-full mb-6">
          {loading ? <><Loader className="w-4 w-4 mr-2 animate-spin" />Generating...</> : (
            <><Sparkles className="w-4 h-4 mr-2" />Generate Post</>
          )}
        </button>

        {result && (
          <div className="card bg-accent-50 border-accent-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-secondary-700">Generated Post</span>
              <button onClick={copyResult} className="btn btn-outline btn-sm">
                {copied ? <><Check className="w-4 h-4 mr-1" />Copied!</> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg whitespace-pre-wrap text-secondary-700 min-h-[200px]">
              {result}
            </div>
            <p className="text-xs text-secondary-500 mt-2">{result.length} characters (LinkedIn max: 3000)</p>
          </div>
        )}
      </div>
    </div>
  );
}
