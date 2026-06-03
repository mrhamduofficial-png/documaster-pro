import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';

const blogContent: Record<string, {
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}> = {
  'how-to-merge-pdfs-free': {
    title: 'How to Merge PDFs for Free: Complete Guide 2024',
    excerpt: 'Learn the best methods to combine multiple PDF documents into one file.',
    image: 'https://images.pexels.com/photos/5900209/pexels-photo-5900209.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Hamdan',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Tutorial',
    content: `
## Why Merge PDFs?

Merging PDFs is one of the most common document operations. Whether you're consolidating reports, combining contracts, or organizing scanned documents, PDF merging simplifies your workflow.

## Methods to Merge PDFs

### 1. Online Tools (Easiest)

DocuMaster offers a free PDF merge tool that works directly in your browser:

1. Go to DocuMaster's PDF Merge tool
2. Drag and drop your PDF files
3. Arrange them in the desired order
4. Click "Merge" and download your combined PDF

**Pros:** No software installation, works on any device, completely free
**Cons:** Requires internet connection

### 2. Desktop Software

For frequent PDF operations, consider installing dedicated software like Adobe Acrobat or free alternatives like PDFtk.

### 3. Command Line Tools

Tech-savvy users can use command-line tools like pdftk or Ghostscript for batch operations.

## Tips for Best Results

- Always check page order before merging
- Use consistent page sizes to avoid layout issues
- Compress large PDFs before merging to reduce final file size
- Keep backups of original files

## Conclusion

Online PDF merge tools like DocuMaster make combining documents effortless. Try our free tool today — no signup required!
    `
  },
  'pdf-compression-tips': {
    title: 'PDF Compression Tips: Reduce File Size Without Losing Quality',
    excerpt: 'Discover professional techniques to compress PDFs while maintaining document quality.',
    image: 'https://images.pexels.com/photos/5900225/pexels-photo-5900225.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Hamdan',
    date: '2024-01-12',
    readTime: '7 min read',
    category: 'Tips',
    content: `
## Why Compress PDFs?

Large PDF files cause problems:
- Email attachment limits
- Slow uploads and downloads
- Storage space consumption
- Poor user experience on websites

## Compression Techniques

### 1. Image Compression

PDFs often contain images that can be compressed without visible quality loss. Use tools that apply smart compression algorithms.

### 2. Remove Unwanted Elements

- Delete unnecessary pages
- Remove embedded fonts you don't need
- Strip metadata and hidden content

### 3. Downsample Images

High-resolution images (300 DPI+) can be reduced to 150 DPI for screen viewing without noticeable quality loss.

## Using DocuMaster's PDF Compress Tool

1. Upload your PDF (up to 10 MB free)
2. Select compression level:
   - Low: Best quality, smaller reduction
   - Medium: Balanced
   - High: Maximum reduction, slight quality loss
3. Download compressed PDF

## When Not to Compress

Avoid aggressive compression for:
- Print-ready documents
- Legal documents requiring high fidelity
- Technical drawings with fine details

## Conclusion

PDF compression is essential for efficient document sharing. Use DocuMaster's free tool to reduce file sizes quickly.
    `
  },
  'digital-signatures-guide': {
    title: 'Complete Guide to Digital Signatures in 2024',
    excerpt: 'Everything you need to know about digital signatures: legality, how to create them, and best practices.',
    image: 'https://images.pexels.com/photos/5900203/pexels-photo-5900203.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Hamdan',
    date: '2024-01-10',
    readTime: '10 min read',
    category: 'Guide',
    content: `
## What is a Digital Signature?

A digital signature is a cryptographic technique that validates the authenticity and integrity of a document. Unlike simple electronic signatures, digital signatures provide:

- **Authentication:** Verifies the signer's identity
- **Integrity:** Detects if document was modified after signing
- **Non-repudiation:** Signer cannot deny signing

## Legal Validity

Digital signatures are legally binding in most countries:
- **US:** ESIGN Act and UETA
- **EU:** eIDAS Regulation
- **UK:** Electronic Communications Act

## How to Add Digital Signatures

### Step 1: Get a Digital Certificate

Obtain a certificate from a trusted Certificate Authority (CA) like DigiCert, GlobalSign, or DocuMaster's partner network.

### Step 2: Sign Your Document

Using DocuMaster's Digital Sign tool:
1. Upload your PDF
2. Add your signature (draw, type, or upload)
3. Apply certificate
4. Download signed document

### Step 3: Verify

Recipients can verify the signature using any PDF reader or our verification tool.

## Best Practices

- Use strong passwords for your certificate
- Keep certificate private keys secure
- Time-stamp important documents
- Maintain audit trails

## Conclusion

Digital signatures streamline document workflows while ensuring security and legal compliance. Try DocuMaster's digital signature tool today.
    `
  }
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogContent[slug || ''];

  if (!post) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-2xl font-bold text-secondary-900">Post not found</h1>
        <Link to="/blog" className="btn btn-primary mt-4">Back to Blog</Link>
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title;

  return (
    <div className="py-12">
      <Helmet>
        <title>{post.title} | DocuMaster Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.image,
            "author": { "@type": "Person", "name": post.author },
            "datePublished": post.date,
            "description": post.excerpt
          })}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-primary-50 text-primary-600 text-sm font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-secondary-500">{post.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-secondary-600 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary-600">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors"
            >
              <Twitter className="w-4 h-4 text-secondary-600" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors"
            >
              <Facebook className="w-4 h-4 text-secondary-600" />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-secondary-100 rounded-full hover:bg-secondary-200 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-secondary-600" />
            </a>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-secondary-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-secondary-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-secondary-900 mb-2">
            Try DocuMaster's Free Tools
          </h3>
          <p className="text-secondary-600 mb-4">
            Merge, split, compress, and convert PDFs — all for free.
          </p>
          <Link to="/tools" className="btn btn-primary">
            Explore Free Tools
          </Link>
        </div>
      </article>
    </div>
  );
}
