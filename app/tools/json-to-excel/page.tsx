'use client'

import { useState } from 'react'
import Link from 'next/link'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">DocuSprint</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/tools" className="text-slate-600 hover:text-blue-600">Tools</Link>
            <Link href="/pricing" className="text-slate-600 hover:text-blue-600">Pricing</Link>
            <Link href="/about" className="text-slate-600 hover:text-blue-600">About</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-slate-600">
        <p>&copy; 2025 DocuSprint. Created by Hamdan</p>
      </div>
    </footer>
  )
}

export default function JsonToExcelPage() {
  const [jsonInput, setJsonInput] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const convertToExcel = () => {
    setError('')
    setSuccess(false)
    
    try {
      const data = JSON.parse(jsonInput)
      
      if (!Array.isArray(data)) {
        setError('JSON must be an array of objects')
        return
      }
      
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      saveAs(blob, 'converted-data.xlsx')
      setSuccess(true)
    } catch (err) {
      setError('Invalid JSON format. Please check your input.')
    }
  }

  const loadSampleData = () => {
    const sample = JSON.stringify([
      { name: "John Doe", email: "john@example.com", age: 30 },
      { name: "Jane Smith", email: "jane@example.com", age: 25 },
      { name: "Bob Johnson", email: "bob@example.com", age: 35 }
    ], null, 2)
    setJsonInput(sample)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">JSON to Excel Converter</h1>
            <p className="text-slate-600">Convert JSON data to Excel spreadsheet format</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-slate-700">JSON Data</label>
              <button
                onClick={loadSampleData}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Load Sample Data
              </button>
            </div>
            
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[{"name": "John", "email": "john@example.com"}]'
              className="w-full h-64 p-4 border border-slate-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                Excel file downloaded successfully!
              </div>
            )}

            <button
              onClick={convertToExcel}
              disabled={!jsonInput.trim()}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Convert to Excel
            </button>
          </div>

          <div className="mt-12 bg-slate-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Paste your JSON array data in the text area above</li>
              <li>JSON must be an array of objects (e.g., [{"key": "value"}])</li>
              <li>Click "Convert to Excel" to download the spreadsheet</li>
              <li>Open the downloaded file in Excel, Google Sheets, or similar</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
