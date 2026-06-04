import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { AIChatWidget } from '@/components/ai-chat-widget'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://docusprint.app'),
  title: {
    default: 'DocuSprint - Free AI-Powered Document & PDF Tools | Fast Online Utilities',
    template: '%s | DocuSprint'
  },
  description: 'DocuSprint offers free AI-powered document tools: PDF converter, image compressor, QR generator, AI writing assistant, text summarizer, code generator & more. Ultra-fast, no signup required.',
  keywords: ['free pdf tools', 'online document converter', 'ai writing assistant', 'image compressor', 'qr code generator', 'word counter', 'pdf to word', 'ai text summarizer', 'code generator'],
  authors: [{ name: 'Hamdan', url: 'https://instagram.com/mr__hamdan__official' }],
  creator: 'Hamdan',
  publisher: 'DocuSprint',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://docusprint.app',
    siteName: 'DocuSprint',
    title: 'DocuSprint - Free AI-Powered Document & PDF Tools',
    description: 'Ultra-fast AI-powered document tools. Convert PDFs, compress images, generate QR codes, AI writing & more. 100% free.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DocuSprint - AI Document Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocuSprint - Free AI-Powered Document Tools',
    description: 'Ultra-fast AI document tools. Convert, compress, generate - all free!',
    images: ['/og-image.png'],
    creator: '@docusprint',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://docusprint.app',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "DocuSprint",
              "url": "https://docusprint.app",
              "description": "Free AI-powered document and PDF tools for everyone",
              "applicationCategory": "UtilitiesApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Person",
                "name": "Hamdan",
                "url": "https://instagram.com/mr__hamdan__official"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-[rgb(var(--background))] font-sans antialiased">
        <Providers>
          {children}
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  )
}
