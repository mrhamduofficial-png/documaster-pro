'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { 
  Menu, X, Zap, FileText, Image, Code, 
  ChevronDown, Home, Grid, DollarSign, Info,
  Hash, Lock, QrCode, Braces, Binary, Type
} from 'lucide-react'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Tools', href: '/tools', icon: Grid },
  { name: 'Pricing', href: '/pricing', icon: DollarSign },
  { name: 'About', href: '/about', icon: Info },
]

const toolCategories = [
  {
    name: 'Text Tools',
    icon: FileText,
    tools: [
      { name: 'Word Counter', href: '/tools/word-counter' },
      { name: 'Lorem Ipsum Generator', href: '/tools/lorem-ipsum' },
      { name: 'Case Converter', href: '/tools/case-converter' },
    ]
  },
  {
    name: 'Image Tools',
    icon: Image,
    tools: [
      { name: 'Image Compressor', href: '/tools/image-compress' },
      { name: 'QR Generator', href: '/tools/qr-generator' },
    ]
  },
  {
    name: 'Developer Tools',
    icon: Code,
    tools: [
      { name: 'JSON Formatter', href: '/tools/json-formatter' },
      { name: 'Base64 Encoder', href: '/tools/base64' },
      { name: 'Hash Generator', href: '/tools/hash-generator' },
      { name: 'Color Picker', href: '/tools/color-picker' },
    ]
  },
  {
    name: 'Calculators',
    icon: Lock,
    tools: [
      { name: 'Unit Converter', href: '/tools/unit-converter' },
      { name: 'Age Calculator', href: '/tools/age-calculator' },
      { name: 'Password Generator', href: '/tools/password-generator' },
    ]
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-xl'} border-b border-slate-200`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Docu<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Sprint</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium flex items-center gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsMenuOpen(!toolsMenuOpen)}
                className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors font-medium flex items-center gap-2"
              >
                <Grid className="w-4 h-4" />
                All Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-[500px] bg-white rounded-2xl border border-slate-200 shadow-xl p-4 grid grid-cols-2 gap-4">
                  {toolCategories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center gap-2 mb-2 text-blue-600">
                        <category.icon className="w-4 h-4" />
                        <span className="font-semibold text-sm">{category.name}</span>
                      </div>
                      <ul className="space-y-1">
                        {category.tools.map((tool) => (
                          <li key={tool.name}>
                            <Link
                              href={tool.href}
                              className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
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
            {/* Get Premium Button */}
            <Link href="/pricing" className="hidden sm:block bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
              Get Premium
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-200">
                <Link
                  href="/pricing"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-center hover:bg-blue-700 transition-colors"
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
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">DocuSprint</span>
            </Link>
            <p className="text-sm text-slate-600 mb-4">
              Free online tools for everyone. Fast, secure, and easy to use.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Popular Tools</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/tools/qr-generator" className="hover:text-blue-600 transition-colors">QR Generator</Link></li>
              <li><Link href="/tools/image-compress" className="hover:text-blue-600 transition-colors">Image Compressor</Link></li>
              <li><Link href="/tools/unit-converter" className="hover:text-blue-600 transition-colors">Unit Converter</Link></li>
              <li><Link href="/tools/json-formatter" className="hover:text-blue-600 transition-colors">JSON Formatter</Link></li>
              <li><Link href="/tools/color-picker" className="hover:text-blue-600 transition-colors">Color Picker</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} DocuSprint. All rights reserved. Created by Hamdan from India.</p>
        </div>
      </div>
    </footer>
  )
}
