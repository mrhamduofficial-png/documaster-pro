import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import {
  FileText,
  Menu,
  X,
  User,
  LogOut,
  Zap,
  Instagram,
  Sparkles
} from 'lucide-react';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  const navLinks = [
    { to: '/tools', label: 'Tools' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/blog', label: 'Blog' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary-900">DocuMaster</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${location.pathname === link.to ? 'text-primary-600' : 'text-secondary-600 hover:text-secondary-900'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  {isPremium && (
                    <span className="flex items-center gap-1 text-sm text-accent-600 bg-accent-50 px-3 py-1 rounded-full">
                      <Zap className="w-4 h-4" />
                      Premium
                    </span>
                  )}
                  <Link to="/dashboard" className="btn btn-secondary">
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
                  <Link to="/auth" className="btn btn-secondary">Sign In</Link>
                  <Link to="/auth?register=true" className="btn btn-primary">Get Started</Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-secondary-200">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 rounded-lg ${location.pathname === link.to ? 'bg-primary-50 text-primary-600' : 'text-secondary-600'}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
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
      <main className="pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary-900 text-secondary-300 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">DocuMaster</span>
              </div>
              <p className="text-sm mb-4">The complete document management platform by Hamdan. Free tools for everyone, premium features for professionals.</p>

              {/* Owner Profile */}
              <div className="bg-secondary-800 rounded-xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Hamdan</p>
                  <p className="text-xs text-secondary-400">Founder & Developer</p>
                </div>
                <a
                  href="https://instagram.com/mr__hamdan__official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">PDF Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tools/pdf-merge" className="hover:text-white transition-colors">Merge PDF</Link></li>
                <li><Link to="/tools/pdf-split" className="hover:text-white transition-colors">Split PDF</Link></li>
                <li><Link to="/tools/pdf-compress" className="hover:text-white transition-colors">Compress PDF</Link></li>
                <li><Link to="/tools/pdf-watermark" className="hover:text-white transition-colors">Watermark</Link></li>
                <li><Link to="/tools/pdf-rotate" className="hover:text-white transition-colors">Rotate PDF</Link></li>
                <li><Link to="/tools/pdf-unlock" className="hover:text-white transition-colors">Unlock PDF</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Other Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/tools/image-resize" className="hover:text-white transition-colors">Image Resize</Link></li>
                <li><Link to="/tools/image-compress" className="hover:text-white transition-colors">Image Compress</Link></li>
                <li><Link to="/tools/ocr-scanner" className="hover:text-white transition-colors">OCR Scanner</Link></li>
                <li><Link to="/tools/qr-generator" className="hover:text-white transition-colors">QR Generator</Link></li>
                <li><Link to="/tools/word-counter" className="hover:text-white transition-colors">Word Counter</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Ad Placeholder */}
          <div className="mt-8 p-4 bg-secondary-800 rounded-lg text-center">
            <p className="text-xs text-secondary-500">Advertisement</p>
            <div className="h-24 flex items-center justify-center text-secondary-600">
              <Sparkles className="w-6 h-6 mr-2" />
              Ad Space Available
            </div>
          </div>

          <div className="border-t border-secondary-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">&copy; {new Date().getFullYear()} DocuMaster. Created by Hamdan. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="https://twitter.com/documaster" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
              <a href="https://instagram.com/mr__hamdan__official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a href="https://linkedin.com/company/documaster" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Watermark Badge */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg border border-secondary-200 text-xs text-secondary-600">
          Made with DocuMaster by Hamdan
        </div>
      </div>
    </div>
  );
}
