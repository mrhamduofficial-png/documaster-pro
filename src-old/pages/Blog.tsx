import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    slug: 'how-to-merge-pdfs-free',
    title: 'How to Merge PDFs for Free: Complete Guide 2024',
    excerpt: 'Learn the best methods to combine multiple PDF documents into one file. Step-by-step tutorial with screenshots.',
    image: 'https://images.pexels.com/photos/5900209/pexels-photo-5900209.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Tutorial'
  },
  {
    slug: 'pdf-compression-tips',
    title: 'PDF Compression Tips: Reduce File Size Without Losing Quality',
    excerpt: 'Discover professional techniques to compress PDFs while maintaining document quality. Perfect for email attachments.',
    image: 'https://images.pexels.com/photos/5900225/pexels-photo-5900225.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Tips'
  },
  {
    slug: 'digital-signatures-guide',
    title: 'Complete Guide to Digital Signatures in 2024',
    excerpt: 'Everything you need to know about digital signatures: legality, how to create them, and best practices.',
    image: 'https://images.pexels.com/photos/5900203/pexels-photo-5900203.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-10',
    readTime: '10 min read',
    category: 'Guide'
  },
  {
    slug: 'ocr-technology-explained',
    title: 'OCR Technology Explained: Extract Text from Images',
    excerpt: 'Understanding OCR (Optical Character Recognition) and how to use it for document digitization.',
    image: 'https://images.pexels.com/photos/5900207/pexels-photo-5900207.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-08',
    readTime: '6 min read',
    category: 'Technology'
  },
  {
    slug: 'document-security-best-practices',
    title: 'Document Security: Best Practices for Businesses',
    excerpt: 'Protect your sensitive documents with encryption, passwords, and secure sharing practices.',
    image: 'https://images.pexels.com/photos/5900232/pexels-photo-5900232.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-05',
    readTime: '8 min read',
    category: 'Security'
  },
  {
    slug: 'pdf-vs-docx-formats',
    title: 'PDF vs DOCX: When to Use Each Format',
    excerpt: 'A comprehensive comparison of PDF and Word document formats. Choose the right format for your needs.',
    image: 'https://images.pexels.com/photos/5900202/pexels-photo-5900202.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Hamdan',
    date: '2024-01-02',
    readTime: '5 min read',
    category: 'Comparison'
  }
];

const categories = ['All', 'Tutorial', 'Tips', 'Guide', 'Technology', 'Security', 'Comparison'];

export default function Blog() {
  return (
    <div className="py-12">
      <Helmet>
        <title>Blog - PDF Tips, Tutorials & Document Management | DocuMaster</title>
        <meta name="description" content="Expert tips and tutorials on PDF management, document security, OCR, digital signatures, and more. Learn how to work with documents efficiently." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DocuMaster Blog",
            "description": "Expert tips and tutorials on PDF management and document tools",
            "author": { "@type": "Person", "name": "Hamdan" },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "author": { "@type": "Person", "name": post.author },
              "datePublished": post.date
            }))
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-4">
            DocuMaster Blog
          </h1>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            Tips, tutorials, and guides for document management, PDF tools, and productivity.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card group hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-secondary-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-primary-50 text-primary-600 text-xs font-medium rounded">
                  {post.category}
                </span>
                <span className="text-xs text-secondary-500">{post.readTime}</span>
              </div>

              <h2 className="text-lg font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                {post.title}
              </h2>

              <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-secondary-500">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-br from-primary-600 to-accent-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
          <p className="text-white/80 mb-6">
            Get the latest tips, tutorials, and updates delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
            />
            <button type="submit" className="btn bg-white text-primary-600 hover:bg-secondary-100">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
