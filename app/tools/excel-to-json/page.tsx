'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { Upload, FileSpreadsheet, Download, ArrowLeft, Table, Copy, Check } from 'lucide-react'
import { Header, Footer } from '@/components/navigation'

export default function ExcelToJSONPage() {
  const [file, setFile] = useState<File | null>(null)
  const [jsonData, setJsonData] = useState<string>('')
  const [processing, setProcessing] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFile = useCallback(async (newFile: File | null) => {
    if (!newFile) return
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]
    if (!validTypes.includes(newFile.type) && !newFile.name.match(/\.(xlsx?|csv)$/i)) {
      alert('Please upload an Excel (.xlsx, .xls) or CSV file')
      return
    }
    
    setFile(newFile)
    setProcessing(true)

    try {
      const XLSX = await import('xlsx')
      const arrayBuffer = await newFile.arrayBuffer()
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]]
      const data = XLSX.utils.sheet_to_json(firstSheet)
      setJsonData(JSON.stringify(data, null, 2))
    } catch (error) {
      alert('Error processing file. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonData)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJSON = () => {
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = file?.name.replace(/\.(xlsx?|csv)$/i, '.json') || 'data.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/tools" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
              <Table className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Excel to JSON Converter</h1>
            <p className="text-slate-600">Convert Excel and CSV files to JSON format</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0] || null) }}
            >
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">Drag & drop an Excel or CSV file here, or</p>
              <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                Browse Files
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                />
              </label>
              <p className="text-sm text-slate-400 mt-3">Supports .xlsx, .xls, .csv</p>
            </div>

            {processing && (
              <div className="mt-6 text-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-slate-600">Processing file...</p>
              </div>
            )}

            {jsonData && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-slate-900">{file?.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={downloadJSON}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download JSON
                    </button>
                  </div>
                </div>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono">
                  {jsonData}
                </pre>
              </div>
            )}
          </div>

          <div className="mt-12 prose max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Convert Excel to JSON</h2>
            <ol className="list-decimal list-inside space-y-2 text-slate-600">
              <li>Upload your Excel (.xlsx, .xls) or CSV file</li>
              <li>The tool will automatically convert it to JSON</li>
              <li>Copy the JSON or download as a file</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
