import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, Type, Clock, Copy, Check, ChevronDown, ChevronUp, CheckCircle, FileText } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const stats = useMemo(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, '').length,
      words,
      sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
      paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
      lines: text.split('\n').length,
      readingTime: Math.ceil(words / 200),
      speakingTime: Math.ceil(words / 150)
    };
  }, [text]);

  const topWords = useMemo(() => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    const frequency: Record<string, number> = {};
    
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({ word, count, density: ((count / words.length) * 100).toFixed(1) }));
  }, [text]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearText = () => setText('');

  const faqs = [
    {
      question: 'How does the word counter calculate words?',
      answer: 'Our word counter splits text by whitespace (spaces, tabs, line breaks) to count individual words. It handles multiple spaces and special characters intelligently, giving you an accurate word count similar to what word processors like Microsoft Word use.'
    },
    {
      question: 'What\'s the difference between characters and characters without spaces?',
      answer: 'Characters include every single character in your text including spaces, punctuation, and line breaks. Characters without spaces counts only the visible characters, excluding all whitespace. This is useful for character limits that don\'t count spaces.'
    },
    {
      question: 'How is reading time calculated?',
      answer: 'Reading time is calculated assuming an average reading speed of 200 words per minute (WPM), which is typical for adult readers. Speaking time uses 150 WPM, which is a comfortable pace for presentations and speeches.'
    },
    {
      question: 'What is keyword density?',
      answer: 'Keyword density shows what percentage of your total words a specific word represents. It\'s useful for SEO optimization and ensuring you\'re not overusing certain terms. A healthy density for important keywords is typically 1-3%.'
    }
  ];

  return (
    <div className="py-8 lg:py-12 bg-slate-950">
      <Helmet>
        <title>Free Word Counter Online - Count Words, Characters, Sentences | DocuSprint</title>
        <meta name="description" content="Free online word counter tool. Count words, characters, sentences, paragraphs in real-time. Calculate reading and speaking time. Check keyword density for SEO." />
        <meta name="keywords" content="word counter, character counter, word count, character count, sentence counter, reading time calculator, speaking time, keyword density" />
        <link rel="canonical" href="https://docusprint.app/tools/word-counter" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "DocuSprint Word Counter",
            "description": "Free online word counter tool",
            "url": "https://docusprint.app/tools/word-counter",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          })}
        </script>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/25">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Free Word Counter</h1>
          <p className="text-slate-400 text-lg">Count words, characters, sentences, and paragraphs in real-time</p>
        </header>

        {/* Top Ad Slot */}
        <div className="ads-slot mb-8">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-20 flex items-center justify-center text-slate-600">
            <span>Ad Space - Top Banner</span>
          </div>
        </div>

        {/* Stats Bar */}
        <section className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6" aria-label="Text statistics">
          {[
            { label: 'Words', value: stats.words, icon: Hash },
            { label: 'Characters', value: stats.characters, icon: Type },
            { label: 'No Spaces', value: stats.charactersNoSpaces, icon: Type },
            { label: 'Sentences', value: stats.sentences, icon: FileText },
            { label: 'Paragraphs', value: stats.paragraphs, icon: FileText },
            { label: 'Lines', value: stats.lines, icon: FileText },
            { label: 'Read Time', value: `${stats.readingTime}m`, icon: Clock },
            { label: 'Speak Time', value: `${stats.speakingTime}m`, icon: Clock }
          ].map((stat) => (
            <div key={stat.label} className="card p-3 text-center">
              <stat.icon className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <p className="text-xl lg:text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Main Tool Interface */}
        <section className="card mb-8" aria-labelledby="word-counter-tool">
          <h2 id="word-counter-tool" className="sr-only">Word Counter Tool</h2>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-sm text-slate-400">
              {stats.charactersNoSpaces} characters (no spaces)
            </span>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard} 
                className="btn btn-ghost btn-sm"
                disabled={!text}
              >
                {copied ? (
                  <><Check className="w-4 h-4 mr-1 text-emerald-400" />Copied</>
                ) : (
                  <><Copy className="w-4 h-4 mr-1" />Copy</>
                )}
              </button>
              <button 
                onClick={clearText} 
                className="btn btn-ghost btn-sm"
                disabled={!text}
              >
                Clear
              </button>
            </div>
          </div>
          
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here to count words, characters, and more..."
            className="input min-h-[300px] resize-none text-base leading-relaxed"
            aria-label="Text input for word counting"
          />
        </section>

        {/* Keyword Density */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <section className="card" aria-labelledby="keyword-density">
            <h2 id="keyword-density" className="font-bold text-white mb-4">Keyword Density</h2>
            {topWords.length > 0 ? (
              <div className="space-y-3">
                {topWords.map((item, index) => (
                  <div key={item.word} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-slate-700 rounded text-xs flex items-center justify-center text-slate-400">
                      {index + 1}
                    </span>
                    <span className="flex-1 text-white font-medium">{item.word}</span>
                    <span className="text-slate-400 text-sm">{item.count}x</span>
                    <span className="text-indigo-400 text-sm font-medium">{item.density}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-sm">Start typing to see keyword density...</p>
            )}
          </section>

          <section className="card" aria-labelledby="text-stats">
            <h2 id="text-stats" className="font-bold text-white mb-4">Text Statistics</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Average word length</span>
                <span className="text-white font-medium">
                  {stats.words > 0 ? (stats.charactersNoSpaces / stats.words).toFixed(1) : '0'} characters
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Average sentence length</span>
                <span className="text-white font-medium">
                  {stats.sentences > 0 ? Math.round(stats.words / stats.sentences) : '0'} words
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Average paragraph length</span>
                <span className="text-white font-medium">
                  {stats.paragraphs > 0 ? Math.round(stats.words / stats.paragraphs) : '0'} words
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unique words</span>
                <span className="text-white font-medium">
                  {text.trim() ? new Set(text.toLowerCase().match(/\b[a-z]+\b/g) || []).size : 0}
                </span>
              </div>
            </div>
          </section>
        </div>

        {/* Ad Slot Below Tool */}
        <div className="ads-slot mb-12">
          <p className="text-xs text-slate-500 mb-1">Advertisement</p>
          <div className="h-24 flex items-center justify-center text-slate-600">
            <span>Ad Space - Below Tool</span>
          </div>
        </div>

        {/* How to Use Section */}
        <section className="card mb-8" aria-labelledby="how-to-use">
          <h2 id="how-to-use" className="text-xl font-bold text-white mb-6">How to Count Words Online</h2>
          <ol className="space-y-4">
            {[
              { step: 1, title: 'Enter Your Text', desc: 'Type directly into the text area or paste content from any document, website, or application' },
              { step: 2, title: 'View Real-Time Stats', desc: 'Watch as word count, character count, and other metrics update instantly as you type' },
              { step: 3, title: 'Analyze Your Content', desc: 'Check keyword density, reading time, and other useful statistics for your writing' }
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center font-bold text-sm">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Key Features */}
        <section className="card mb-8" aria-labelledby="features">
          <h2 id="features" className="text-xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Real-Time Counting', desc: 'Updates instantly as you type' },
              { title: 'Multiple Metrics', desc: 'Words, characters, sentences, more' },
              { title: 'Reading Time', desc: 'Estimated reading & speaking time' },
              { title: 'Keyword Density', desc: 'SEO-friendly word analysis' },
              { title: 'Copy & Clear', desc: 'Quick actions for your text' },
              { title: 'No Limits', desc: 'Count unlimited text for free' }
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="card" aria-labelledby="faq">
          <h2 id="faq" className="text-xl font-bold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-slate-700 rounded-xl overflow-hidden"
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
                  aria-expanded={faqOpen === index}
                >
                  <span className="font-medium text-white" itemProp="name">{faq.question}</span>
                  {faqOpen === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {faqOpen === index && (
                  <div 
                    className="px-4 pb-4 text-slate-400 text-sm leading-relaxed"
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
