import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LayoutGrid as Layout, FileText, Download, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const templates = [
  { id: 'resume', name: 'Professional Resume', category: 'CV', premium: false },
  { id: 'invoice', name: 'Business Invoice', category: 'Finance', premium: false },
  { id: 'contract', name: 'Service Contract', category: 'Legal', premium: false },
  { id: 'letter', name: 'Business Letter', category: 'Business', premium: false },
  { id: 'nda', name: 'NDA Agreement', category: 'Legal', premium: true },
  { id: 'proposal', name: 'Project Proposal', category: 'Business', premium: true },
  { id: 'invoice-pro', name: 'Detailed Invoice', category: 'Finance', premium: true },
  { id: 'cover-letter', name: 'Cover Letter', category: 'CV', premium: false }
];

export default function TemplateGallery() {
  const { isPremium } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'CV', 'Business', 'Legal', 'Finance'];

  const filteredTemplates = templates.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="py-8">
      <Helmet>
        <title>Document Templates - Free Templates Gallery | DocuMaster</title>
        <meta name="description" content="Download free document templates. Resumes, invoices, contracts, letters, and more professional templates." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Layout className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Document Templates</h1>
          <p className="text-secondary-600">Professional templates for all your document needs</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              {cat === 'all' ? 'All Templates' : cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="card group">
              <div className="aspect-[3/4] bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                <FileText className="w-16 h-16 text-secondary-300" />
                {template.premium && (
                  <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    Premium
                  </div>
                )}
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/90 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  {!template.premium || isPremium ? (
                    <span className="text-white font-medium">Click to Download</span>
                  ) : (
                    <span className="text-white font-medium flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Premium
                    </span>
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-secondary-900">{template.name}</h3>
              <p className="text-sm text-secondary-600">{template.category}</p>
              <button
                disabled={template.premium && !isPremium}
                className="btn btn-outline btn-sm w-full mt-3 disabled:opacity-50"
              >
                <Download className="w-4 h-4 mr-1" />
                {template.premium && !isPremium ? 'Premium' : 'Download'}
              </button>
            </div>
          ))}
        </div>

        {/* Premium CTA */}
        {!isPremium && (
          <div className="mt-12 card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200">
            <div className="flex items-center gap-4">
              <Crown className="w-12 h-12 text-primary-600" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-secondary-900">Unlock All Templates</h3>
                <p className="text-secondary-600">Get access to 50+ premium templates with a subscription</p>
              </div>
              <Link to="/pricing" className="btn btn-primary">Upgrade</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
