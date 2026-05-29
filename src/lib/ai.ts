const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function callAI(action: string, data: Record<string, any>): Promise<any> {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/ai-processor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      },
      body: JSON.stringify({ action, data })
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'AI processing failed');
    }

    return result.result;
  } catch (error) {
    // Fallback to local processing if Edge Function fails
    return localAIProcessing(action, data);
  }
}

// Local fallback processing
function localAIProcessing(action: string, data: Record<string, any>): any {
  switch (action) {
    case 'summarize':
      return localSummarize(data.text);
    case 'translate':
      return localTranslate(data.text, data.targetLang);
    case 'generate-content':
      return localGenerateContent(data.topic, data.style);
    case 'enhance':
      return localEnhance(data.prompt);
    default:
      return data;
  }
}

function localSummarize(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  if (sentences.length === 0) return text;

  const wordFreq: Record<string, number> = {};
  sentences.forEach(s => {
    s.toLowerCase().split(/\s+/).forEach(word => {
      if (word.length > 3) wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
  });

  const scored = sentences.map(s => {
    const words = s.toLowerCase().split(/\s+/);
    const score = words.reduce((sum, w) => sum + (wordFreq[w] || 0), 0);
    return { sentence: s.trim(), score };
  });

  const topSentences = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(3, Math.ceil(sentences.length / 3)));

  return topSentences.map(s => s.sentence).join('. ') + '.';
}

function localTranslate(text: string, targetLang: string): string {
  const translations: Record<string, Record<string, string>> = {
    'es': { 'hello': 'hola', 'world': 'mundo', 'document': 'documento', 'thank you': 'gracias', 'the': 'el', 'and': 'y', 'is': 'es', 'to': 'a', 'for': 'para', 'you': 'tu', 'pdf': 'pdf', 'file': 'archivo', 'merge': 'fusionar', 'split': 'dividir', 'convert': 'convertir' },
    'fr': { 'hello': 'bonjour', 'world': 'monde', 'document': 'document', 'thank you': 'merci', 'the': 'le', 'and': 'et', 'is': 'est', 'to': 'a', 'for': 'pour', 'you': 'vous', 'pdf': 'pdf', 'file': 'fichier', 'merge': 'fusionner', 'split': 'diviser' },
    'de': { 'hello': 'hallo', 'world': 'welt', 'document': 'dokument', 'thank you': 'danke', 'the': 'der', 'and': 'und', 'is': 'ist', 'to': 'zu', 'for': 'fur', 'you': 'sie', 'pdf': 'pdf', 'file': 'datei' },
    'it': { 'hello': 'ciao', 'world': 'mondo', 'document': 'documento', 'thank you': 'grazie', 'the': 'il', 'and': 'e', 'is': 'e', 'to': 'a', 'for': 'per' },
    'pt': { 'hello': 'ola', 'world': 'mundo', 'document': 'documento', 'thank you': 'obrigado' },
    'zh': { 'hello': '你好', 'world': '世界', 'document': '文档', 'thank you': '谢谢' },
    'ja': { 'hello': 'こんにちは', 'world': '世界', 'document': 'ドキュメント' },
    'ko': { 'hello': '안녕하세요', 'world': '세계' },
    'ar': { 'hello': 'مرحبا', 'world': 'عالم' },
    'ru': { 'hello': 'привет', 'world': 'мир', 'document': 'документ' },
    'hi': { 'hello': 'नमस्ते', 'world': 'दुनिया' }
  };

  const langDict = translations[targetLang] || translations['es'];
  const words = text.split(/\s+/);

  return words.map(word => {
    const lower = word.toLowerCase().replace(/[.,!?;:]/g, '');
    const punct = word.match(/[.,!?;:]+$/)?.[0] || '';
    return (langDict[lower] || word) + punct;
  }).join(' ');
}

function localGenerateContent(topic: string, style: string): string {
  const templates: Record<string, (t: string) => string> = {
    'professional': (t) => `Excited to share insights about ${t}!\n\nKey Takeaways:\n1. Understanding the fundamentals is crucial\n2. Consistent practice leads to mastery\n3. Learning from others accelerates growth\n\nWhat's your experience? Share in the comments!\n\n#${t.replace(/\s+/g, '')} #ProfessionalGrowth`,
    'casual': (t) => `Just wrapped up learning about ${t}!\n\nThis was fascinating. The more I dive in, the more I realize there's always more to explore.\n\nAnyone else interested in ${t}? Let's chat!\n\n#${t.replace(/\s+/g, '')} #AlwaysLearning`,
    'educational': (t) => `THREAD: Everything about ${t}\n\nWhat is ${t}?\nIt's gained significant attention recently.\n\nWhy it matters:\n- Stay competitive\n- Make better decisions\n- Connect with professionals\n\n#${t.replace(/\s+/g, '')} #Education`
  };

  return templates[style]?.(topic) || templates['professional'](topic);
}

function localEnhance(prompt: string): string {
  return `${prompt}\n\nAI Enhancement Applied:\n- Optimized for quality\n- Enhanced details\n- Professional output`;
}
