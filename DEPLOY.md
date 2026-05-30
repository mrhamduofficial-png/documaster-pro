# DocuMaster - Quick Deploy Guide

## Your Website is Ready!

Everything is fixed and working. Here's how to deploy in 5 minutes:

## Option 1: Vercel (Easiest - Recommended)

### Step 1: Connect GitHub
1. Go to https://vercel.com
2. Sign up or login
3. Click "New Project"
4. Select your GitHub repository
5. Click "Import"

### Step 2: Add Environment Variables
In Vercel dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add:
```
VITE_SUPABASE_URL = https://krdrncxdkqtlisjxiihj.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtyZHJuY3hka3F0bGlzanhpaWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjE4ODAsImV4cCI6MjA5NTUzNzg4MH0.4AexkvoFMT5c-X28MY2XL1BwnDxz9N_MkcACObwaFPI
VITE_GROQ_API_KEY = gsk_your_api_key_here (optional)
```

### Step 3: Deploy
Click "Deploy" - Done! Your site is live!

### Step 4: Add Domain (Optional)
1. In Vercel dashboard, go to "Domains"
2. Add your custom domain
3. Follow DNS instructions

---

## Option 2: Netlify

### Step 1: Build Locally
```bash
npm run build
```

### Step 2: Upload
1. Go to https://netlify.com
2. Drag and drop the `dist/` folder
3. Done!

### Step 3: Connect GitHub (For Auto-Deploys)
1. Click "Connect to Git"
2. Select GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variables in "Site Settings"
6. Every push auto-deploys!

---

## Option 3: GitHub Pages

### Step 1: Update vite.config.ts
Change `base: '/'` to `base: '/repository-name/'`

### Step 2: Build
```bash
npm run build
```

### Step 3: Deploy
```bash
git add .
git commit -m "Deploy"
git push origin main
```

Go to "Settings" → "Pages" → select "Deploy from a branch" → choose `main` and `dist/` folder

---

## Option 4: Any Hosting (Manual Upload)

### Step 1: Build
```bash
npm run build
```

### Step 2: Upload
Upload `dist/` folder to your hosting FTP/Control Panel

### Step 3: Configure
Make sure your host is set to serve `index.html` for all routes (SPA configuration)

---

## Verify Deployment

After deploying, check:
- [ ] Homepage loads
- [ ] Can signup/login
- [ ] Tools load
- [ ] Chatbot appears
- [ ] Contact form works
- [ ] No console errors

---

## Add Real AI (Groq - Free)

1. Go to https://console.groq.com/keys
2. Sign up (free, no credit card)
3. Create API key
4. Add to environment variables:
```
VITE_GROQ_API_KEY=gsk_your_key_here
```
5. Redeploy
6. Chatbot now uses real AI!

---

## Custom Domain Setup

### Vercel
1. In Project Settings → Domains
2. Add domain
3. Copy DNS records from Vercel
4. Add to your domain registrar DNS
5. Wait 5 minutes
6. Done!

### Netlify
1. In Site Settings → Domain management
2. Add custom domain
3. Update DNS at registrar
4. Done!

---

## Monitor Your Site

### Vercel
- Analytics in Dashboard
- Logs in "Deployments"
- Errors in "Functions"

### Netlify
- Analytics in "Analytics"
- Deploy logs visible
- Function logs available

### Supabase
- Go to https://app.supabase.com
- Check "Auth" for user signups
- Check "Tables" for usage data
- Monitor in "Functions" for Edge Function logs

---

## Troubleshooting

### Blank Page After Deploy
1. Check environment variables are set
2. Check VITE_SUPABASE_URL format
3. Check browser console for errors
4. Verify Supabase project is active

### Can't Login After Deploy
1. Supabase URL must be exactly: `https://krdrncxdkqtlisjxiihj.supabase.co`
2. Anon key must be complete (no truncation)
3. Check network tab in DevTools
4. Clear browser cache

### Tools Don't Work
1. Check VITE_SUPABASE_ANON_KEY is set
2. Verify file size is under limits
3. Check internet connection
4. Try smaller file for testing

### AI Chat Not Working
1. Works without Groq key (uses FAQ)
2. If using Groq, verify key format
3. Check Groq API key starts with `gsk_`
4. Verify API key in environment variables
5. Check Groq dashboard for quota

---

## Performance Tips

1. **Images**: Use WebP format
2. **PDFs**: Compress before upload
3. **Cache**: Netlify/Vercel cache automatically
4. **CDN**: Your host provides CDN
5. **Monitoring**: Check performance dashboards

---

## Security Checklist

- ✅ HTTPS enabled (automatic)
- ✅ Environment variables are secret
- ✅ No credentials in git
- ✅ Database RLS enabled
- ✅ Auth configured
- ✅ CORS configured
- ✅ Rate limiting enabled

---

## Support

If you have issues:
1. Check console errors (F12 → Console)
2. Check network errors (F12 → Network)
3. Verify environment variables
4. Check Supabase dashboard
5. Contact support at support@documaster.app

---

## Your Deployment Checklist

- [ ] Choose hosting provider (Vercel recommended)
- [ ] Connect GitHub repository
- [ ] Add environment variables
- [ ] Deploy
- [ ] Test signup/login
- [ ] Test tools
- [ ] Add custom domain (optional)
- [ ] Add Groq API key for real AI (optional)
- [ ] Monitor performance
- [ ] Celebrate! 🎉

---

**You're ready to launch!**

Any questions? Check README.md or SETUP.md for more details.
