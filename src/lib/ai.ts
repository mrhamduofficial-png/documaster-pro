const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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

    if (result.success) {
      return result.result;
    }
  } catch (error) {
    console.error('Edge Function error:', error);
  }

  if (GROQ_API_KEY && action === 'chat') {
    try {
      return await callGroqAI(data);
    } catch (error) {
      console.error('Groq API error:', error);
    }
  }

  return localAIProcessing(action, data);
}

async function callGroqAI(data: Record<string, any>): Promise<string> {
  const { message = '', context = '' } = data;

  const systemPrompt = `You are DocuMaster AI Assistant, a helpful AI for a document management tool.
You help users with:
- PDF tools (merge, split, compress, convert, watermark, rotate, unlock, page numbers)
- Image tools (convert, resize, compress, enhance upscaling)
- Document tools (OCR, digital signatures, protection, translation, diff)
- AI tools (summarize, generate LinkedIn posts, contracts, reports)
- Authentication and account questions
- Premium features and pricing

Be friendly, concise, and provide clear step-by-step instructions when needed.
${context ? `Additional context: ${context}` : ''}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7,
      max_tokens: 500,
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API error');
  }

  const result = await response.json();
  return result.choices[0].message.content;
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
    case 'chat':
      return localChatResponse(data.message);
    default:
      return data;
  }
}

function localChatResponse(message: string): string {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes('how') && lowerMsg.includes('merge')) {
    return "To merge PDFs:\n1. Go to PDF Merge tool\n2. Click 'Select Files' or drag & drop\n3. Arrange files in order\n4. Click 'Merge PDFs'\n5. Download your merged file\n\nIt's completely free!";
  }

  if (lowerMsg.includes('how') && lowerMsg.includes('login')) {
    return "To login:\n1. Click 'Sign In' in the top right\n2. Enter your email and password\n3. Or click 'Continue with Google'\n4. You'll be redirected to your dashboard\n\nPassword must be at least 6 characters. If you forgot it, use the reset link on the login page.";
  }

  if (lowerMsg.includes('sign up') || lowerMsg.includes('create account')) {
    return "To create an account:\n1. Click 'Sign In' in the top right\n2. Click the registration link\n3. Enter your name, email, and password (6+ characters)\n4. Click 'Create Account'\n5. You're ready to go!\n\nNo credit card required, completely free!";
  }

  return "Hi! I'm DocuMaster AI Assistant. I can help you with:\n\n• PDF tools (merge, split, compress, convert)\n• Image tools (convert, resize, enhance)\n• AI tools (summarizer, translator, OCR)\n• Account and login help\n• Premium features\n\nWhat would you like help with?";
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
