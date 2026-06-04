import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  Zap,
  Menu,
  X,
  User,
  LogOut,
  Instagram,
  ChevronRight,
  FileText,
  Image,
  QrCode,
  Hash,
  Layers,
  Scissors,
  ScanLine,
  Globe,
  Twitter,
  Linkedin,
  Moon,
  Sun
} from 'lucide-react';
import Chatbot from './Chatbot';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { user, signOut, isPremium } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const navLinks = [
    { to: '/tools', label: 'Tools' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ];

  const toolCategories = [
    {
      title: 'PDF Tools',
      links: [
        { to: '/tools/pdf-merge', label: 'Merge PDF', icon: Layers },
        { to: '/tools/pdf-split', label: 'Split PDF', icon: Scissors },
        { to: '/tools/pdf-compress', label: 'Compress PDF', icon: FileText },
        { to: '/tools/pdf-to-word', label: 'PDF to Word', icon: FileText },
        { to: '/tools/word-to-pdf', label: 'Word to PDF', icon: FileText }
      ]
    },
    {
      title: 'Image Tools',
      links: [
        { to: '/tools/image-compress', label: 'Image Compressor', icon: Image },
        { to: '/tools/image-converter', label: 'Image Converter', icon: Image },
        { to: '/tools/image-resize', label: 'Image Resize', icon: Image }
      ]
    },
    {
      title: 'Utility Tools',
      links: [
        { to: '/tools/qr-generator', label: 'QR Generator', icon: QrCode },
        { to: '/tools/word-counter', label: 'Word Counter', icon: Hash },
        { to: '/tools/ocr-scanner', label: 'OCR Scanner', icon: ScanLine },
        { to: '/tools/document-translator', label: 'Translator', icon: Globe }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="DocuSprint Home">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">DocuSprint</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.to 
                      ? 'text-white bg-slate-800' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {user ? (
                <>
                  {isPremium && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                      <Zap className="w-4 h-4" />
                      Premium
                    </span>
                  )}
                  <Link to="/dashboard" className="btn btn-ghost">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button onClick={() => signOut()} className="btn btn-outline">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth" className="btn btn-ghost">Sign In</Link>
                  <Link to="/auth?register=true" className="btn btn-primary">
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-3 rounded-xl font-medium ${
                    location.pathname === link.to 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2 border-t border-slate-800 mt-4">
                {user ? (
                  <>
                    <Link to="/dashboard" className="btn btn-secondary w-full">Dashboard</Link>
                    <button onClick={() => signOut()} className="btn btn-outline w-full">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" className="btn btn-secondary w-full">Sign In</Link>
                    <Link to="/auth?register=true" className="btn btn-primary w-full">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/50 border-t border-slate-800 mt-20" role="contentinfo">
        {/* Top Ad Slot */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="ads-slot">
            <p className="text-xs text-slate-500 mb-2">Advertisement</p>
            <div className="h-24 flex items-center justify-center text-slate-600">
              <span>Ad Space Available</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">DocuSprint</span>
              </Link>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                The complete web utility platform by Hamdan. Free tools for everyone, premium features for professionals. Fast, secure, and no signup required.
              </p>

              {/* Owner Profile */}
              <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3 border border-slate-700/50">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold">Hamdan</p>
                  <p className="text-xs text-slate-400">Founder & Developer</p>
                </div>
                <a
                  href="https://instagram.com/mr__hamdan__official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Follow on Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* PDF Tools */}
            <div>
              <h4 className="text-white font-semibold mb-4">PDF Tools</h4>
              <ul className="space-y-2.5 text-sm">
                {toolCategories[0].links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Utility Tools */}
            <div>
              <h4 className="text-white font-semibold mb-4">Utility Tools</h4>
              <ul className="space-y-2.5 text-sm">
                {toolCategories[2].links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors">About Us</Link></li>
                <li><Link to="/pricing" className="text-slate-400 hover:text-indigo-400 transition-colors">Pricing</Link></li>
                <li><Link to="/blog" className="text-slate-400 hover:text-indigo-400 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</Link></li>
                <li><Link to="/privacy" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} DocuSprint. Created by Hamdan. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/docusprint" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-indigo-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/docusprint" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Watermark Badge */}
      <div className="fixed bottom-4 left-4 z-40">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-slate-700 text-xs text-slate-400 flex items-center gap-2">
          <Zap className="w-3 h-3 text-indigo-400" />
          Powered by DocuSprint
        </div>
      </div>

      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}
