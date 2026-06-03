'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { 
  Menu, X, Sun, Moon, Zap, FileText, Image, Code, 
  Sparkles, ChevronDown, Home, Grid, DollarSign, Info
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Grid },
  { name: 'Pricing', href: '/pricing', icon: DollarSign },
  { name: 'About', href: '/about', icon: Info },
]

const toolCategories = [
  {
    name: 'AI Tools',
    icon: Sparkles,
    tools: [
      { name: 'AI Writing Assistant', href: '/tools/ai-writer' },
      { name: 'Text Summarizer', href: '/tools/summarizer' },
      { name: 'AI Translator', href: '/tools/translator' },
      { name: 'Code Generator', href: '/tools/code-generator' },
      { name: 'Grammar Checker', href: '/tools/grammar-checker' },
    ]
  },
  {
    name: 'PDF Tools',
    icon: FileText,
    tools: [
      { name: 'PDF to Word', href: '/tools/pdf-to-word' },
      { name: 'Word to PDF', href: '/tools/word-to-pdf' },
      { name: 'Merge PDF', href: '/tools/pdf-merge' },
      { name: 'Compress PDF', href: '/tools/pdf-compress' },
    ]
  },
  {
    name: 'Image Tools',
    icon: Image,
    tools: [
      { name: 'Image Compressor', href: '/tools/image-compress' },
      { name: 'Background Remover', href: '/tools/background-remover' },
      { name: 'Image Converter', href: '/tools/image-converter' },
    ]
  },
  {
    name: 'Utilities',
    icon: Code,
    tools: [
      { name: 'QR Generator', href: '/tools/qr-generator' },
      { name: 'Word Counter', href: '/tools/word-counter' },
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Password Generator', href: '/tools/password-generator' },
    ]
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--background))]/80 backdrop-blur-xl border-b border-[rgb(var(--border))]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[rgb(var(--foreground))]">
              Docu<span className="gradient-text">Sprint</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="btn-ghost flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                className="btn-ghost flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                All Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-[600px] card p-4 grid grid-cols-2 gap-4 shadow-xl">
                  {toolCategories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center gap-2 mb-2 text-[rgb(var(--primary))]">
                        <category.icon className="w-4 h-4" />
                        <span className="font-semibold text-sm">{category.name}</span>
                      </div>
                      <ul className="space-y-1">
                        {category.tools.map((tool) => (
                          <li key={tool.name}>
                            <Link
                              href={tool.href}
                              className="block px-3 py-1.5 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))] rounded-lg transition-colors"
                              onClick={() => setToolsMenuOpen(false)}
                            >
                              {tool.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-xl bg-[rgb(var(--secondary))] hover:bg-[rgb(var(--muted))] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-[rgb(var(--foreground))]" />
                ) : (
                  <Moon className="w-5 h-5 text-[rgb(var(--foreground))]" />
                )}
              </button>
            )}

            {/* Get Premium Button */}
            <Link href="/pricing" className="hidden sm:block btn-primary text-sm">
              Get Premium
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[rgb(var(--secondary))]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgb(var(--border))]">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[rgb(var(--secondary))] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-[rgb(var(--primary))]" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-[rgb(var(--border))]">
                <Link
                  href="/pricing"
                  className="block w-full btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Premium
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="bg-[rgb(var(--card))] border-t border-[rgb(var(--border))] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">DocuSprint</span>
            </Link>
            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-4">
              Free AI-powered document tools for everyone. Fast, secure, and easy to use.
            </p>
            <p className="text-sm text-[rgb(var(--muted-foreground))]">
              Created by{' '}
              <a
                href="https://instagram.com/mr__hamdan__official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgb(var(--primary))] hover:underline"
              >
                Hamdan
              </a>
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-[rgb(var(--muted-foreground))]">
              <li><Link href="/tools/ai-writer" className="hover:text-[rgb(var(--primary))]">AI Writing Assistant</Link></li>
              <li><Link href="/tools/pdf-to-word" className="hover:text-[rgb(var(--primary))]">PDF to Word</Link></li>
              <li><Link href="/tools/image-compress" className="hover:text-[rgb(var(--primary))]">Image Compressor</Link></li>
              <li><Link href="/tools/qr-generator" className="hover:text-[rgb(var(--primary))]">QR Generator</Link></li>
              <li><Link href="/tools/code-generator" className="hover:text-[rgb(var(--primary))]">Code Generator</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-[rgb(var(--muted-foreground))]">
              <li><Link href="/about" className="hover:text-[rgb(var(--primary))]">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-[rgb(var(--primary))]">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-[rgb(var(--primary))]">Contact</Link></li>
              <li><a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener noreferrer" className="hover:text-[rgb(var(--primary))]">Instagram</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-[rgb(var(--muted-foreground))]">
              <li><Link href="/privacy" className="hover:text-[rgb(var(--primary))]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[rgb(var(--primary))]">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-[rgb(var(--primary))]">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[rgb(var(--border))] text-center text-sm text-[rgb(var(--muted-foreground))]">
          <p>&copy; {new Date().getFullYear()} DocuSprint. All rights reserved. Built with love by Hamdan.</p>
        </div>
      </div>
    </footer>
  )
}
