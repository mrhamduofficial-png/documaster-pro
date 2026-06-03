import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

// AdSense Required Pages
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';

// PDF Tools
import PDFFormat from './pages/tools/PDFFormat';
import PDFMerge from './pages/tools/PDFMerge';
import PDFSplit from './pages/tools/PDFSplit';
import PDFCompress from './pages/tools/PDFCompress';
import PDFUnlock from './pages/tools/PDFUnlock';
import PDFWatermark from './pages/tools/PDFWatermark';
import PDFRotate from './pages/tools/PDFRotate';
import PDFPageNumbers from './pages/tools/PDFPageNumbers';
import PDFToWord from './pages/tools/PDFToWord';
import PDFToExcel from './pages/tools/PDFToExcel';

// Image Tools
import ImageConverter from './pages/tools/ImageConverter';
import ImageResize from './pages/tools/ImageResize';
import ImageCompress from './pages/tools/ImageCompress';
import ImageEnhancer from './pages/tools/ImageEnhancer';

// Document Tools
import WordToPDF from './pages/tools/WordToPDF';
import OCRScanner from './pages/tools/OCRScanner';
import DigitalSign from './pages/tools/DigitalSign';
import VideoConverter from './pages/tools/VideoConverter';
import DocumentProtection from './pages/tools/DocumentProtection';
import DocumentDiff from './pages/tools/DocumentDiff';

// Utility Tools
import QRGenerator from './pages/tools/QRGenerator';
import WordCounter from './pages/tools/WordCounter';
import TextSummarizer from './pages/tools/TextSummarizer';
import DocumentTranslator from './pages/tools/DocumentTranslator';

// AI Tools
import LinkedInPostGenerator from './pages/tools/LinkedInPostGenerator';
import ContractGenerator from './pages/tools/ContractGenerator';
import ReportGenerator from './pages/tools/ReportGenerator';
import TemplateGallery from './pages/tools/TemplateGallery';
import Timestamping from './pages/tools/Timestamping';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools" element={<Tools />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="auth" element={<Auth />} />

            {/* AdSense Required Pages */}
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="contact" element={<Contact />} />

            {/* PDF Tools */}
            <Route path="tools/pdf-format" element={<PDFFormat />} />
            <Route path="tools/pdf-merge" element={<PDFMerge />} />
            <Route path="tools/pdf-split" element={<PDFSplit />} />
            <Route path="tools/pdf-compress" element={<PDFCompress />} />
            <Route path="tools/pdf-unlock" element={<PDFUnlock />} />
            <Route path="tools/pdf-watermark" element={<PDFWatermark />} />
            <Route path="tools/pdf-rotate" element={<PDFRotate />} />
            <Route path="tools/pdf-page-numbers" element={<PDFPageNumbers />} />
            <Route path="tools/pdf-to-word" element={<PDFToWord />} />
            <Route path="tools/pdf-to-excel" element={<PDFToExcel />} />

            {/* Image Tools */}
            <Route path="tools/image-converter" element={<ImageConverter />} />
            <Route path="tools/image-resize" element={<ImageResize />} />
            <Route path="tools/image-compress" element={<ImageCompress />} />
            <Route path="tools/image-enhancer" element={<ImageEnhancer />} />

            {/* Document Tools */}
            <Route path="tools/word-to-pdf" element={<WordToPDF />} />
            <Route path="tools/ocr-scanner" element={<OCRScanner />} />
            <Route path="tools/digital-sign" element={<DigitalSign />} />
            <Route path="tools/video-converter" element={<VideoConverter />} />
            <Route path="tools/document-protection" element={<DocumentProtection />} />
            <Route path="tools/document-diff" element={<DocumentDiff />} />

            {/* Utility Tools */}
            <Route path="tools/qr-generator" element={<QRGenerator />} />
            <Route path="tools/word-counter" element={<WordCounter />} />
            <Route path="tools/text-summarizer" element={<TextSummarizer />} />
            <Route path="tools/document-translator" element={<DocumentTranslator />} />

            {/* AI Tools */}
            <Route path="tools/linkedin-post-generator" element={<LinkedInPostGenerator />} />
            <Route path="tools/contract-generator" element={<ContractGenerator />} />
            <Route path="tools/report-generator" element={<ReportGenerator />} />
            <Route path="tools/templates" element={<TemplateGallery />} />
            <Route path="tools/timestamping" element={<Timestamping />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Analytics />
    </HelmetProvider>
  );
}
