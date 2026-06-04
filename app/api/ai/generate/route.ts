import { generateText } from 'ai'

export async function POST(req: Request) {
  const { prompt, type, text, options } = await req.json()

  const systemPrompts: Record<string, string> = {
    write: `You are a professional writing assistant. Help users create compelling content including:
- Blog posts and articles
- Marketing copy and ads
- Social media posts
- Emails and letters
- Product descriptions
Provide well-structured, engaging content that matches the requested tone and style.`,
    
    summarize: `You are a text summarization expert. Create ${options?.length || 'medium'}-length summaries.
${options?.style === 'bullet' ? 'Use bullet points for the summary.' : 'Write in paragraph form.'}
Capture key points, main themes, and important facts while being significantly shorter than the original.`,
    
    translate: `You are a professional translator. Translate text accurately while:
- Preserving the original meaning and tone
- Using natural expressions in the target language
- Maintaining formatting and structure
Provide translations that read naturally to native speakers.`,
    
    code: `You are an expert programmer. Generate clean, efficient code with:
- Clear comments explaining logic
- Best practices and conventions
- Error handling where appropriate
- Examples of usage
Support all major programming languages.`,
    
    grammar: `You are a grammar and style expert. Review text and provide:
- Corrected version with fixes highlighted
- Explanation of errors found
- Suggestions for improved clarity and flow
- Style recommendations
Be thorough but encouraging.`,
    
    email: `You are a professional email writer. Craft emails that are:
- Clear and professional
- Appropriately formatted
- Action-oriented when needed
- Suitable for the intended audience
Include subject line suggestions.`,
    
    linkedin: `You are a LinkedIn content expert. Create posts that:
- Engage professional audiences
- Use appropriate hashtags
- Include calls to action
- Follow LinkedIn best practices
- Are optimized for visibility`,
    
    resume: `You are a resume writing expert. Help create resumes that:
- Highlight achievements with metrics
- Use action verbs
- Are ATS-friendly
- Match industry standards
- Stand out to recruiters`
  }

  const inputText = text || prompt

  try {
    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompts[type] || systemPrompts.write,
      prompt: inputText,
    })

    return Response.json({ result: result.text })
  } catch (error) {
    console.error('AI Generation Error:', error)
    return Response.json({ 
      result: 'Sorry, there was an error processing your request. Please try again.',
      error: true 
    }, { status: 500 })
  }
}
