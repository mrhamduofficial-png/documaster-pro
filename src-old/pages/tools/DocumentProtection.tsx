import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Clock as Unlock, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function DocumentProtection() {
  const { isPremium } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'encrypt' | 'decrypt'>('encrypt');

  return (
    <div className="py-8">
      <Helmet>
        <title>Document Protection - Password Protect PDFs | DocuMaster</title>
        <meta name="description" content="Password protect your PDF documents. Add security to sensitive files with encryption." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Document Protection</h1>
          <p className="text-secondary-600">Secure your documents with password protection</p>
        </div>

        {!isPremium && (
          <div className="card bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200 mb-6">
            <div className="flex items-center gap-4">
              <Crown className="w-8 h-8 text-primary-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-secondary-900">Premium Feature</h3>
                <p className="text-sm text-secondary-600">Document protection requires a Premium subscription</p>
              </div>
              <Link to="/pricing" className="btn btn-primary">Upgrade</Link>
            </div>
          </div>
        )}

        <div className="card mb-6">
          <div className="flex mb-6">
            <button
              onClick={() => setActiveTab('encrypt')}
              className={`flex-1 py-3 text-center font-medium rounded-l-lg transition-colors ${
                activeTab === 'encrypt'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />Add Protection
            </button>
            <button
              onClick={() => setActiveTab('decrypt')}
              className={`flex-1 py-3 text-center font-medium rounded-r-lg transition-colors ${
                activeTab === 'decrypt'
                  ? 'bg-primary-600 text-white'
                  : 'bg-secondary-100 text-secondary-600 hover:bg-secondary-200'
              }`}
            >
              <Unlock className="w-4 h-4 inline mr-2" />Remove Protection
            </button>
          </div>

          {activeTab === 'encrypt' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Upload Document</label>
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                  <Shield className="w-10 h-10 text-secondary-400 mx-auto mb-3" />
                  <p className="text-secondary-600">Drop PDF or select file</p>
                  <input type="file" accept=".pdf" className="hidden" id="protect-file" disabled={!isPremium} />
                  <label htmlFor="protect-file" className="btn btn-outline btn-sm mt-3 cursor-pointer {!isPremium ? 'opacity-50' : ''}">Select File</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Password</label>
                <input type="password" placeholder="Enter a strong password" className="input" disabled={!isPremium} />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">Restrictions</label>
                <div className="space-y-2">
                  {['Prevent printing', 'Prevent copying', 'Prevent editing'].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" disabled={!isPremium} />
                      <span className="text-secondary-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button disabled={!isPremium} className="btn btn-primary w-full disabled:opacity-50">
                <Lock className="w-4 h-4 mr-2" />Protect Document
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Upload Protected Document</label>
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                  <Unlock className="w-10 h-10 text-secondary-400 mx-auto mb-3" />
                  <p className="text-secondary-600">Drop protected PDF</p>
                  <input type="file" accept=".pdf" className="hidden" id="unprotect-file" disabled={!isPremium} />
                  <label htmlFor="unprotect-file" className="btn btn-outline btn-sm mt-3 cursor-pointer {!isPremium ? 'opacity-50' : ''}">Select File</label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">Document Password</label>
                <input type="password" placeholder="Enter the document password" className="input" disabled={!isPremium} />
              </div>

              <button disabled={!isPremium} className="btn btn-primary w-full disabled:opacity-50">
                <Unlock className="w-4 h-4 mr-2" />Remove Protection
              </button>
            </div>
          )}
        </div>

        <div className="bg-secondary-50 rounded-xl p-6">
          <h3 className="font-semibold text-secondary-900 mb-3">Supported Security Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {['128-bit AES Encryption', '256-bit AES Encryption', 'User Password', 'Owner Password', 'Print Restrictions', 'Copy Restrictions'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-secondary-600">
                <Shield className="w-4 h-4 text-primary-600" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
