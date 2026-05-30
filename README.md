# DocuMaster - AI-Powered Document Management Platform

**Status**: ✅ Fully Functional - Production Ready

An all-in-one document management platform with 30+ AI-powered tools for PDF processing, image conversion, and document management.

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier works)
- Groq API key (optional, for real AI - free tier available)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Features

### Free PDF Tools
- **PDF Merge** - Combine multiple PDFs
- **PDF Split** - Extract or split pages
- **PDF Compress** - Reduce file size
- **PDF Watermark** - Add watermarks
- **PDF Unlock** - Remove passwords
- **PDF Rotate** - Rotate pages
- **PDF Page Numbers** - Add page numbers
- **PDF Format** - Format PDFs
- **PDF to Word** - Convert to .docx (AI-powered)
- **PDF to Excel** - Extract tables (AI-powered)
- **Word to PDF** - Convert docs to PDF

### Free Image Tools
- **Image Converter** - PNG, JPG, WebP conversion
- **Image Resize** - Change dimensions
- **Image Compress** - Reduce file size
- **Image Enhancer** - HD/4K upscaling (AI-powered)

### Free Document Tools
- **OCR Scanner** - Extract text from images (AI-powered)
- **Digital Signature** - Add signatures
- **Document Protection** - Password protect
- **Document Translator** - 12+ languages (AI-powered)
- **Document Diff** - Compare documents

### Free AI Tools
- **Text Summarizer** - AI-powered summaries
- **LinkedIn Post Generator** - AI content creation
- **Contract Generator** - Template-based
- **Report Generator** - Professional reports
- **QR Code Generator** - Create scannable QR codes
- **Word Counter** - Analyze text
- **Timestamping** - Add timestamps

### Premium Features ($9.99/month)
- Unlimited operations
- 100 MB file size limit
- 4K/8K image upscaling
- Batch processing
- No ads
- Priority support
- 5 GB cloud storage

### Team Features ($29.99/month)
- Up to 10 team members
- Real-time collaboration
- Document workflows
- Team analytics
- API access
- Advanced security

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: Groq API (Mixtral model)
- **PDF Processing**: pdf-lib
- **OCR**: Tesseract.js
- **QR Codes**: qrcode library
- **Build**: Vite
- **Deployment**: GitHub Actions CI/CD

## Authentication

### Email/Password
- Create account with email and password (6+ characters)
- Login with email and password
- Automatic profile creation

### Google OAuth
- Sign in with Google
- One-click authentication
- Automatic profile setup

## AI Integration

### With Groq API (Recommended)
1. Get free API key at https://console.groq.com/keys
2. Add to `.env`: `VITE_GROQ_API_KEY=gsk_your_key`
3. Chatbot gets real AI responses
4. No credit card needed

### Without API Key
- Uses local processing for most tools
- Chatbot provides FAQ-based responses
- All features still work

## Database Schema

### Tables
- `profiles` - User profiles with subscription info
- `documents` - User documents and files
- `teams` - Team information
- `team_members` - Team membership
- `documents_comments` - Document annotations
- `usage_logs` - Track operations
- `blog_posts` - Blog content

### Security
- Row Level Security (RLS) enabled on all tables
- JWT-based authentication
- Encrypted connections (SSL)
- GDPR compliant

## Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Optional (for AI chat)
VITE_GROQ_API_KEY=gsk_your_api_key
```

## Deployment

### GitHub Actions (Automatic)
- Runs on push to main branch
- Builds project with Vite
- Runs TypeScript checks
- Creates build artifacts

### Manual Deployment
```bash
# Build
npm run build

# Deploy dist/ folder to:
# - Vercel (git push automatic)
# - Netlify (drag & drop dist/)
# - Any static host
```

## File Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components
│   ├── tools/        # Individual tool pages
│   └── Auth.tsx      # Authentication
├── lib/              # Utilities
│   ├── ai.ts         # AI API integration
│   └── supabase.ts   # Database client
├── store/            # Zustand state management
└── index.css         # Global styles

public/              # Static assets
supabase/
├── functions/        # Edge Functions
└── migrations/       # Database migrations
```

## Performance

- **Build Size**: ~1.2 MB (gzipped)
- **Load Time**: <2s
- **AI Response**: <3s with Groq API
- **Chatbot Rate Limit**: 10 messages/minute

## Security Features

- ✅ 256-bit SSL encryption
- ✅ Row Level Security policies
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Secure file handling
- ✅ No file storage (files auto-deleted)

## Testing

Run build to verify everything works:
```bash
npm run build
```

Verify in browser:
- [ ] Can sign up
- [ ] Can sign in
- [ ] Can use tools
- [ ] Chatbot responds
- [ ] Contact form works

## Support & Contact

- **GitHub Issues**: Report bugs and request features
- **Contact Form**: /contact page
- **Email**: support@documaster.app
- **Instagram**: @mr__hamdan__official

## License

Created by Hamdan

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## Roadmap

- [ ] Blockchain document verification
- [ ] Advanced team collaboration
- [ ] Mobile apps
- [ ] API documentation
- [ ] Webhooks support
- [ ] Advanced analytics

