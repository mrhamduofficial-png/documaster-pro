import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import PDFFormat from './pages/tools/PDFFormat';
import PDFMerge from './pages/tools/PDFMerge';
import PDFSplit from './pages/tools/PDFSplit';
import PDFCompress from './pages/tools/PDFCompress';
import ImageConverter from './pages/tools/ImageConverter';
import WordToPDF from './pages/tools/WordToPDF';
import OCRScanner from './pages/tools/OCRScanner';
import DigitalSign from './pages/tools/DigitalSign';

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

            {/* Tool Routes */}
            <Route path="tools/pdf-format" element={<PDFFormat />} />
            <Route path="tools/pdf-merge" element={<PDFMerge />} />
            <Route path="tools/pdf-split" element={<PDFSplit />} />
            <Route path="tools/pdf-compress" element={<PDFCompress />} />
            <Route path="tools/image-converter" element={<ImageConverter />} />
            <Route path="tools/word-to-pdf" element={<WordToPDF />} />
            <Route path="tools/ocr-scanner" element={<OCRScanner />} />
            <Route path="tools/digital-sign" element={<DigitalSign />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
