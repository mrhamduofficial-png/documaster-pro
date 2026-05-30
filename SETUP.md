# DocuMaster - Complete Setup Guide

## Supabase Configuration (Already Done)

Your Supabase instance is fully configured and ready to use:
- **URL**: https://krdrncxdkqtlisjxiihj.supabase.co
- **Anon Key**: Already in .env file
- **Database**: Fully initialized with all tables and RLS policies
- **Auth**: Email/Password + Google OAuth enabled
- **Edge Functions**: AI Processor deployed and active

## Authentication Setup

### Email/Password Authentication
Users can sign up and log in using:
1. Email address
2. Password (minimum 6 characters)

### Google OAuth
Users can also sign in with Google. The OAuth redirect is configured to:
- `{your-domain}/auth/callback`

### Database Profiles
When users sign up, a profile is automatically created in the `profiles` table with:
- `id`: User UUID
- `email`: User email
- `name`: User name
- `plan`: Free by default
- `created_at`: Timestamp

## AI Integration Setup

### Option 1: Groq API (Free Tier - Recommended)

1. **Get Free API Key**:
   - Go to https://console.groq.com/keys
   - Sign up for free (no credit card needed)
   - Create an API key
   - Copy the key

2. **Add to .env**:
   ```
   VITE_GROQ_API_KEY=gsk_your_api_key_here
   ```

3. **How it works**:
   - Chat responses use real AI (Mixtral 8x7B model)
   - Falls back to local processing if API fails
   - Free tier allows sufficient requests for development

### Option 2: OpenAI API

1. **Get API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create an API key
   - Add to .env as `VITE_OPENAI_API_KEY`

2. **Costs**: ~$0.01-0.10 per 1000 requests

### Option 3: Local Processing (No API)
- Works without any API key
- Uses built-in algorithms for:
  - Text summarization
  - Translation (basic)
  - Content generation
  - Chat responses (FAQ-based)

## Edge Functions

The AI Processor Edge Function handles:
- Text summarization
- Translation
- Content generation
- OCR processing
- Chat responses
- PDF/Excel conversions
- Contract/report generation
- LinkedIn post generation

**Status**: ✓ Deployed and active

## Tools Setup

### PDF Tools
- ✓ PDF Merge
- ✓ PDF Split
- ✓ PDF Compress
- ✓ PDF to Word
- ✓ PDF to Excel
- ✓ Word to PDF
- ✓ PDF Watermark
- ✓ PDF Unlock
- ✓ PDF Rotate
- ✓ PDF Page Numbers
- ✓ PDF Format

### Image Tools
- ✓ Image Converter
- ✓ Image Resize
- ✓ Image Compress
- ✓ Image Enhancer

### Document Tools
- ✓ OCR Scanner
- ✓ Digital Signature
- ✓ Document Protection
- ✓ Document Translator
- ✓ Document Diff

### AI Tools
- ✓ Text Summarizer
- ✓ LinkedIn Post Generator
- ✓ Contract Generator
- ✓ Report Generator
- ✓ QR Code Generator
- ✓ Word Counter
- ✓ Timestamping
- ✓ Template Gallery

### Chatbot
- ✓ 24/7 AI Assistant
- ✓ Rate limited (10 messages/minute)
- ✓ FAQ responses for common questions
- ✓ Floating widget on all pages

## Contact Form

- **Provider**: Formspree
- **Form ID**: xpwzgvkp
- **Submissions**: 50/month free tier
- **Status**: ✓ Working

## Environment Variables

```
# Required
VITE_SUPABASE_URL=https://krdrncxdkqtlisjxiihj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional - For real AI responses
VITE_GROQ_API_KEY=gsk_your_api_key_here
# OR
VITE_OPENAI_API_KEY=sk_your_api_key_here
```

## Security Features

- ✓ 256-bit SSL encryption
- ✓ RLS policies on all tables
- ✓ JWT authentication
- ✓ CORS properly configured
- ✓ Rate limiting on chatbot
- ✓ Secure file handling

## Testing Checklist

- [ ] Can sign up with email
- [ ] Can sign in with email
- [ ] Can sign in with Google
- [ ] Tools load and work
- [ ] Chatbot responds to messages
- [ ] Contact form sends emails
- [ ] Premium features visible
- [ ] Dashboard accessible after login

## Deployment

### Prerequisites
- GitHub repository connected
- Supabase project active
- All environment variables set

### GitHub Actions CI/CD
- Automatically runs on push to main
- Builds with: `npm run build`
- Runs TypeScript checks
- Uploads build artifacts

### Deploy Steps
1. Push changes to GitHub
2. CI/CD runs automatically
3. Build output in `dist/` folder
4. Deploy to your hosting (Vercel, Netlify, etc.)

## Troubleshooting

### Sign In Not Working
- Check .env has correct Supabase keys
- Verify email format is correct
- Password must be 6+ characters
- Check browser console for errors

### Tools Not Responding
- Check internet connection
- Verify Supabase is accessible
- Check if API quotas exceeded
- Fallback to local processing works

### Chatbot Not Responding
- Add Groq API key for real AI
- Without key, uses local FAQ responses
- Rate limit: 10 messages/minute

### Build Fails
- Run `npm install` first
- Check Node version (18+)
- Clear cache: `rm -rf dist node_modules`
- Rebuild: `npm run build`

## Support

For issues, visit:
- GitHub Discussions
- Contact form at /contact
- Email: support@documaster.app
- Instagram: @mr__hamdan__official
