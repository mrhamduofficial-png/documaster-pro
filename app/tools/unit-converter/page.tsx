'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Calculator, ArrowLeftRight, Copy, Check } from 'lucide-react'

const unitCategories = [
  {
    name: 'Length',
    units: [
      { name: 'Meters', symbol: 'm', toBase: 1 },
      { name: 'Kilometers', symbol: 'km', toBase: 1000 },
      { name: 'Centimeters', symbol: 'cm', toBase: 0.01 },
      { name: 'Millimeters', symbol: 'mm', toBase: 0.001 },
      { name: 'Miles', symbol: 'mi', toBase: 1609.344 },
      { name: 'Yards', symbol: 'yd', toBase: 0.9144 },
      { name: 'Feet', symbol: 'ft', toBase: 0.3048 },
      { name: 'Inches', symbol: 'in', toBase: 0.0254 },
    ]
  },
  {
    name: 'Weight',
    units: [
      { name: 'Kilograms', symbol: 'kg', toBase: 1 },
      { name: 'Grams', symbol: 'g', toBase: 0.001 },
      { name: 'Milligrams', symbol: 'mg', toBase: 0.000001 },
      { name: 'Pounds', symbol: 'lb', toBase: 0.453592 },
      { name: 'Ounces', symbol: 'oz', toBase: 0.0283495 },
      { name: 'Metric Tons', symbol: 't', toBase: 1000 },
    ]
  },
  {
    name: 'Temperature',
    units: [
      { name: 'Celsius', symbol: '°C', toBase: 1, special: 'celsius' },
      { name: 'Fahrenheit', symbol: '°F', toBase: 1, special: 'fahrenheit' },
      { name: 'Kelvin', symbol: 'K', toBase: 1, special: 'kelvin' },
    ]
  },
  {
    name: 'Area',
    units: [
      { name: 'Square Meters', symbol: 'm²', toBase: 1 },
      { name: 'Square Kilometers', symbol: 'km²', toBase: 1000000 },
      { name: 'Square Feet', symbol: 'ft²', toBase: 0.092903 },
      { name: 'Square Yards', symbol: 'yd²', toBase: 0.836127 },
      { name: 'Acres', symbol: 'ac', toBase: 4046.86 },
      { name: 'Hectares', symbol: 'ha', toBase: 10000 },
    ]
  },
  {
    name: 'Volume',
    units: [
      { name: 'Liters', symbol: 'L', toBase: 1 },
      { name: 'Milliliters', symbol: 'mL', toBase: 0.001 },
      { name: 'Cubic Meters', symbol: 'm³', toBase: 1000 },
      { name: 'Gallons (US)', symbol: 'gal', toBase: 3.78541 },
      { name: 'Quarts (US)', symbol: 'qt', toBase: 0.946353 },
      { name: 'Cups (US)', symbol: 'cup', toBase: 0.236588 },
    ]
  },
  {
    name: 'Speed',
    units: [
      { name: 'Meters/Second', symbol: 'm/s', toBase: 1 },
      { name: 'Kilometers/Hour', symbol: 'km/h', toBase: 0.277778 },
      { name: 'Miles/Hour', symbol: 'mph', toBase: 0.44704 },
      { name: 'Knots', symbol: 'kn', toBase: 0.514444 },
      { name: 'Feet/Second', symbol: 'ft/s', toBase: 0.3048 },
    ]
  },
  {
    name: 'Data',
    units: [
      { name: 'Bytes', symbol: 'B', toBase: 1 },
      { name: 'Kilobytes', symbol: 'KB', toBase: 1024 },
      { name: 'Megabytes', symbol: 'MB', toBase: 1048576 },
      { name: 'Gigabytes', symbol: 'GB', toBase: 1073741824 },
      { name: 'Terabytes', symbol: 'TB', toBase: 1099511627776 },
    ]
  },
  {
    name: 'Time',
    units: [
      { name: 'Seconds', symbol: 's', toBase: 1 },
      { name: 'Minutes', symbol: 'min', toBase: 60 },
      { name: 'Hours', symbol: 'h', toBase: 3600 },
      { name: 'Days', symbol: 'd', toBase: 86400 },
      { name: 'Weeks', symbol: 'wk', toBase: 604800 },
      { name: 'Years', symbol: 'yr', toBase: 31536000 },
    ]
  },
]

export default function UnitConverterPage() {
  const [category, setCategory] = useState(unitCategories[0])
  const [fromUnit, setFromUnit] = useState(category.units[0])
  const [toUnit, setToUnit] = useState(category.units[1])
  const [fromValue, setFromValue] = useState('')
  const [toValue, setToValue] = useState('')
  const [copied, setCopied] = useState(false)

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius: number
    
    // Convert to Celsius first
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * 5/9
        break
      case 'kelvin':
        celsius = value - 273.15
        break
      default:
        celsius = value
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'fahrenheit':
        return celsius * 9/5 + 32
      case 'kelvin':
        return celsius + 273.15
      default:
        return celsius
    }
  }

  const handleFromValueChange = (value: string) => {
    setFromValue(value)
    if (!value || isNaN(parseFloat(value))) {
      setToValue('')
      return
    }
    
    const numValue = parseFloat(value)
    let result: number
    
    if (category.name === 'Temperature') {
      result = convertTemperature(numValue, (fromUnit as any).special, (toUnit as any).special)
    } else {
      const baseValue = numValue * fromUnit.toBase
      result = baseValue / toUnit.toBase
    }
    
    setToValue(result.toFixed(6).replace(/\.?0+$/, ''))
  }

  const handleToValueChange = (value: string) => {
    setToValue(value)
    if (!value || isNaN(parseFloat(value))) {
      setFromValue('')
      return
    }
    
    const numValue = parseFloat(value)
    let result: number
    
    if (category.name === 'Temperature') {
      result = convertTemperature(numValue, (toUnit as any).special, (fromUnit as any).special)
    } else {
      const baseValue = numValue * toUnit.toBase
      result = baseValue / fromUnit.toBase
    }
    
    setFromValue(result.toFixed(6).replace(/\.?0+$/, ''))
  }

  const handleCategoryChange = (newCategory: typeof category) => {
    setCategory(newCategory)
    setFromUnit(newCategory.units[0])
    setToUnit(newCategory.units[1])
    setFromValue('')
    setToValue('')
  }

  const swapUnits = () => {
    const tempUnit = fromUnit
    const tempValue = fromValue
    setFromUnit(toUnit)
    setToUnit(tempUnit)
    setFromValue(toValue)
    setToValue(tempValue)
  }

  const copyResult = () => {
    if (toValue) {
      navigator.clipboard.writeText(`${toValue} ${toUnit.symbol}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
              <Calculator className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Calculator Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Unit Converter</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Convert between different units of measurement instantly
            </p>
          </div>

          {/* Ad Slot */}
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-20 mb-8 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-slate-700">Category</label>
            <div className="flex flex-wrap gap-2">
              {unitCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    category.name === cat.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Converter */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
              {/* From */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">From</label>
                <select
                  value={fromUnit.name}
                  onChange={(e) => {
                    const unit = category.units.find(u => u.name === e.target.value)
                    if (unit) {
                      setFromUnit(unit)
                      if (fromValue) handleFromValueChange(fromValue)
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 mb-2"
                >
                  {category.units.map((unit) => (
                    <option key={unit.name} value={unit.name}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={fromValue}
                  onChange={(e) => handleFromValueChange(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-lg font-mono"
                />
              </div>

              {/* Swap Button */}
              <button
                onClick={swapUnits}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors self-center mb-2"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>

              {/* To */}
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">To</label>
                <select
                  value={toUnit.name}
                  onChange={(e) => {
                    const unit = category.units.find(u => u.name === e.target.value)
                    if (unit) {
                      setToUnit(unit)
                      if (fromValue) handleFromValueChange(fromValue)
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 mb-2"
                >
                  {category.units.map((unit) => (
                    <option key={unit.name} value={unit.name}>
                      {unit.name} ({unit.symbol})
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <input
                    type="number"
                    value={toValue}
                    onChange={(e) => handleToValueChange(e.target.value)}
                    placeholder="Result"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 text-lg font-mono pr-12"
                  />
                  {toValue && (
                    <button
                      onClick={copyResult}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-100"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Result Display */}
            {fromValue && toValue && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center">
                <p className="text-lg text-slate-700">
                  <span className="font-bold">{fromValue} {fromUnit.symbol}</span>
                  <span className="mx-2">=</span>
                  <span className="font-bold text-blue-600">{toValue} {toUnit.symbol}</span>
                </p>
              </div>
            )}
          </div>

          {/* Quick Reference */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { from: '1 mile', to: '1.609 kilometers' },
                { from: '1 inch', to: '2.54 centimeters' },
                { from: '1 pound', to: '0.4536 kilograms' },
                { from: '1 gallon', to: '3.785 liters' },
                { from: '32°F', to: '0°C' },
                { from: '1 GB', to: '1024 MB' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between">
                  <span className="text-slate-600">{item.from}</span>
                  <span className="text-slate-400">=</span>
                  <span className="font-medium text-slate-900">{item.to}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
