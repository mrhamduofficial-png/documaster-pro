'use client'

import { useState } from 'react'
import { Header, Footer } from '@/components/navigation'
import { Calendar, Cake, Clock, Star } from 'lucide-react'

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('')
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0])
  const [result, setResult] = useState<{
    years: number
    months: number
    days: number
    totalDays: number
    totalWeeks: number
    totalHours: number
    nextBirthday: number
    zodiacSign: string
    chineseZodiac: string
  } | null>(null)

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { name: 'Capricorn', end: { month: 1, day: 19 } },
      { name: 'Aquarius', end: { month: 2, day: 18 } },
      { name: 'Pisces', end: { month: 3, day: 20 } },
      { name: 'Aries', end: { month: 4, day: 19 } },
      { name: 'Taurus', end: { month: 5, day: 20 } },
      { name: 'Gemini', end: { month: 6, day: 20 } },
      { name: 'Cancer', end: { month: 7, day: 22 } },
      { name: 'Leo', end: { month: 8, day: 22 } },
      { name: 'Virgo', end: { month: 9, day: 22 } },
      { name: 'Libra', end: { month: 10, day: 22 } },
      { name: 'Scorpio', end: { month: 11, day: 21 } },
      { name: 'Sagittarius', end: { month: 12, day: 21 } },
      { name: 'Capricorn', end: { month: 12, day: 31 } },
    ]
    
    for (const sign of signs) {
      if (month < sign.end.month || (month === sign.end.month && day <= sign.end.day)) {
        return sign.name
      }
    }
    return 'Capricorn'
  }

  const getChineseZodiac = (year: number): string => {
    const animals = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
    return animals[(year - 1900) % 12]
  }

  const calculateAge = () => {
    if (!birthDate) return
    
    const birth = new Date(birthDate)
    const to = new Date(toDate)
    
    if (birth > to) {
      alert('Birth date cannot be in the future')
      return
    }
    
    let years = to.getFullYear() - birth.getFullYear()
    let months = to.getMonth() - birth.getMonth()
    let days = to.getDate() - birth.getDate()
    
    if (days < 0) {
      months--
      const lastMonth = new Date(to.getFullYear(), to.getMonth(), 0)
      days += lastMonth.getDate()
    }
    
    if (months < 0) {
      years--
      months += 12
    }
    
    const diffTime = Math.abs(to.getTime() - birth.getTime())
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60))
    
    // Calculate days until next birthday
    const nextBirthdayYear = to.getMonth() > birth.getMonth() || 
      (to.getMonth() === birth.getMonth() && to.getDate() >= birth.getDate())
      ? to.getFullYear() + 1
      : to.getFullYear()
    const nextBirthday = new Date(nextBirthdayYear, birth.getMonth(), birth.getDate())
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - to.getTime()) / (1000 * 60 * 60 * 24))
    
    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      nextBirthday: daysUntilBirthday,
      zodiacSign: getZodiacSign(birth.getMonth() + 1, birth.getDate()),
      chineseZodiac: getChineseZodiac(birth.getFullYear()),
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
              <Cake className="w-4 h-4 text-cyan-600" />
              <span className="text-sm font-medium text-cyan-600">Calculator Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Age Calculator</h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Calculate your exact age in years, months, days, and more
            </p>
          </div>

          {/* Ad Slot */}
          <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-20 mb-8 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Advertisement Area</span>
          </div>

          {/* Calculator */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">Date of Birth</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={toDate}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700">Calculate Age As Of</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900"
                />
              </div>
            </div>
            
            <button
              onClick={calculateAge}
              disabled={!birthDate}
              className="w-full px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Calculate Age
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-6">
              {/* Main Age */}
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 text-white text-center">
                <p className="text-sm opacity-80 mb-2">Your Age</p>
                <p className="text-4xl font-bold mb-2">
                  {result.years} years, {result.months} months, {result.days} days
                </p>
                <p className="text-sm opacity-80">
                  or {result.years} years and {result.months * 30 + result.days} days
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold text-slate-900">{result.totalDays.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Total Days</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold text-slate-900">{result.totalWeeks.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Total Weeks</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold text-slate-900">{result.totalHours.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Total Hours</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                  <Cake className="w-6 h-6 mx-auto mb-2 text-pink-500" />
                  <div className="text-2xl font-bold text-slate-900">{result.nextBirthday}</div>
                  <div className="text-xs text-slate-500">Days to Birthday</div>
                </div>
              </div>

              {/* Zodiac Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Zodiac Sign</div>
                    <div className="text-lg font-semibold text-slate-900">{result.zodiacSign}</div>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-2xl">🐲</span>
                  </div>
                  <div>
                    <div className="text-sm text-slate-500">Chinese Zodiac</div>
                    <div className="text-lg font-semibold text-slate-900">{result.chineseZodiac}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Info */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900">How It Works</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">1.</span>
                  Enter your date of birth
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">2.</span>
                  Optionally change the target date (defaults to today)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">3.</span>
                  Click calculate to see your exact age in multiple formats
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">4.</span>
                  View your zodiac sign and days until your next birthday
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
