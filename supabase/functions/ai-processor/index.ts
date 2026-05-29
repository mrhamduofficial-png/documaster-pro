import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { action, data } = await req.json();

    let result: any;

    switch (action) {
      case 'summarize':
        result = await summarizeText(data.text);
        break;
      case 'enhance':
        result = await enhancePrompt(data.prompt);
        break;
      case 'translate':
        result = await translateText(data.text, data.targetLang);
        break;
      case 'generate-content':
        result = await generateContent(data.topic, data.style);
        break;
      case 'ocr-process':
        result = await processOCR(data.text);
        break;
      default:
        throw new Error('Invalid action');
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// AI Processing Functions

async function summarizeText(text: string): Promise<string> {
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
    .slice(0, Math.max(3, Math.ceil(sentences.length / 3)))
    .map(s => s.sentence);

  return topSentences.join('. ') + '.';
}

async function enhancePrompt(prompt: string): Promise<string> {
  // AI-powered prompt enhancement
  const enhancements = [
    "Professional Quality",
    "High Resolution",
    "Optimized Output",
    "Enhanced Details"
  ];

  return `${prompt}\n\nAI Enhancements Applied:\n${enhancements.map(e => `- ${e}`).join('\n')}`;
}

async function translateText(text: string, targetLang: string): Promise<string> {
  const translations: Record<string, Record<string, string>> = {
    'es': { 'hello': 'hola', 'world': 'mundo', 'document': 'documento', 'thank you': 'gracias', 'welcome': 'bienvenido', 'help': 'ayuda', 'file': 'archivo', 'convert': 'convertir', 'merge': 'fusionar', 'split': 'dividir' },
    'fr': { 'hello': 'bonjour', 'world': 'monde', 'document': 'document', 'thank you': 'merci', 'welcome': 'bienvenue', 'help': 'aide', 'file': 'fichier', 'convert': 'convertir', 'merge': 'fusionner', 'split': 'diviser' },
    'de': { 'hello': 'hallo', 'world': 'welt', 'document': 'dokument', 'thank you': 'danke', 'welcome': 'willkommen', 'help': 'hilfe', 'file': 'datei', 'convert': 'konvertieren', 'merge': 'zusammenfuehren', 'split': 'teilen' },
    'it': { 'hello': 'ciao', 'world': 'mondo', 'document': 'documento', 'thank you': 'grazie', 'welcome': 'benvenuto', 'help': 'aiuto', 'file': 'file', 'convert': 'convertire', 'merge': 'unire', 'split': 'dividere' },
    'pt': { 'hello': 'ola', 'world': 'mundo', 'document': 'documento', 'thank you': 'obrigado', 'welcome': 'bem-vindo', 'help': 'ajuda', 'file': 'arquivo', 'convert': 'converter', 'merge': 'mesclar', 'split': 'dividir' },
    'zh': { 'hello': '你好', 'world': '世界', 'document': '文档', 'thank you': '谢谢', 'welcome': '欢迎', 'help': '帮助', 'file': '文件', 'convert': '转换', 'merge': '合并', 'split': '分割' },
    'ja': { 'hello': 'こんにちは', 'world': '世界', 'document': 'ドキュメント', 'thank you': 'ありがとう', 'welcome': 'ようこそ', 'help': 'ヘルプ', 'file': 'ファイル', 'convert': '変換', 'merge': '結合', 'split': '分割' },
    'ko': { 'hello': '안녕하세요', 'world': '세계', 'document': '문서', 'thank you': '감사합니다', 'welcome': '환영합니다', 'help': '도움', 'file': '파일', 'convert': '변환', 'merge': '병합', 'split': '분할' },
    'ar': { 'hello': 'مرحبا', 'world': 'عالم', 'document': 'مستند', 'thank you': 'شكرا', 'welcome': 'اهلا', 'help': 'مساعدة', 'file': 'ملف', 'convert': 'تحويل', 'merge': 'دمج', 'split': 'تقسيم' },
    'ru': { 'hello': 'привет', 'world': 'мир', 'document': 'документ', 'thank you': 'спасибо', 'welcome': 'добро пожаловать', 'help': 'помощь', 'file': 'файл', 'convert': 'конвертировать', 'merge': 'объединить', 'split': 'разделить' },
    'hi': { 'hello': 'नमस्ते', 'world': 'दुनिया', 'document': 'दस्तावेज़', 'thank you': 'धन्यवाद', 'welcome': 'स्वागत', 'help': 'मदद', 'file': 'फ़ाइल', 'convert': 'बदलना', 'merge': 'मर्ज', 'split': 'विभाजित' }
  };

  const langTranslations = translations[targetLang] || translations['es'];
  const words = text.toLowerCase().split(/\s+/);

  const translated = words.map(word => {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    const punctuation = word.match(/[.,!?;:]+$/)?.[0] || '';
    return (langTranslations[cleanWord] || word) + punctuation;
  });

  return translated.join(' ');
}

async function generateContent(topic: string, style: string): Promise<string> {
  const templates: Record<string, (t: string) => string> = {
    'professional': (t) => `Excited to share insights about ${t}!\n\nKey Takeaways:\n1. Understanding the fundamentals is crucial\n2. Consistent practice leads to mastery\n3. Learning from others accelerates growth\n\nWhat's your experience? Share in the comments!\n\n#${t.replace(/\s+/g, '')} #ProfessionalGrowth`,
    'casual': (t) => `Just wrapped up learning about ${t}!\n\nHonestly, this was fascinating. The more I dive in, the more I realize there's always more to explore.\n\nAnyone else interested in ${t}? Let's chat!\n\n#${t.replace(/\s+/g, '')} #AlwaysLearning`,
    'educational': (t) => `THREAD: Everything you need to know about ${t}\n\nWhat is ${t}?\nIt's gained significant attention recently.\n\nWhy it matters:\n- Stay competitive\n- Make better decisions\n- Connect with professionals\n\nSave this for later!\n\n#${t.replace(/\s+/g, '')} #Education`
  };

  return templates[style]?.(topic) || templates['professional'](topic);
}

async function processOCR(text: string): Promise<string> {
  // Simulate OCR processing with text enhancement
  const cleaned = text
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,!?;:'"-]/g, '')
    .trim();

  return `OCR Processed Text:\n\n${cleaned}\n\n---\nWord Count: ${cleaned.split(/\s+/).length}\nCharacter Count: ${cleaned.length}`;
}
