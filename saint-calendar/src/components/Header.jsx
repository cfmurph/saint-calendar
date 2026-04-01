import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar } from 'lucide-react'
import { COUNTRIES, FEAST_TYPES } from '../data/feasts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function Header({ year, month, country, onYearChange, onMonthChange, onCountryChange }) {
  const prevMonth = () => {
    if (month === 1) { onMonthChange(12); onYearChange(year - 1) }
    else onMonthChange(month - 1)
  }
  const nextMonth = () => {
    if (month === 12) { onMonthChange(1); onYearChange(year + 1) }
    else onMonthChange(month + 1)
  }

  return (
    <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & title */}
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 rounded-full p-2 shadow-lg">
              <Calendar className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Catholic Feast Calendar</h1>
              <p className="text-slate-400 text-xs">Holy Days · Saints · Solemnities</p>
            </div>
          </div>

          {/* Country selector */}
          <div className="flex items-center gap-2 bg-slate-700/50 rounded-xl p-1">
            {Object.entries(COUNTRIES).map(([code, info]) => (
              <button
                key={code}
                onClick={() => onCountryChange(code)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  country === code
                    ? 'bg-yellow-500 text-slate-900 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-600'
                }`}
              >
                <span className="mr-1">{info.flag}</span>
                <span className="hidden sm:inline">{info.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Month / Year navigation */}
      <div className="bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => onYearChange(year - 1)}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              title="Previous year"
            >
              <ChevronsLeft className="w-5 h-5 text-slate-400" />
            </button>
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              title="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-slate-300" />
            </button>

            <div className="flex items-center gap-3 min-w-[220px] justify-center">
              {/* Month selector */}
              <select
                value={month}
                onChange={e => onMonthChange(Number(e.target.value))}
                className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-500 cursor-pointer"
              >
                {MONTHS.map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>

              {/* Year input */}
              <input
                type="number"
                value={year}
                onChange={e => {
                  const v = Number(e.target.value)
                  if (v >= 1 && v <= 9999) onYearChange(v)
                }}
                className="w-20 bg-slate-700 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-base font-semibold text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              title="Next month"
            >
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button
              onClick={() => onYearChange(year + 1)}
              className="p-1.5 rounded-lg hover:bg-slate-700 transition-colors"
              title="Next year"
            >
              <ChevronsRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-slate-900/40 border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center text-xs text-slate-400">
            {Object.entries(FEAST_TYPES).map(([type, info]) => (
              <span key={type} className="flex items-center gap-1.5">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${info.dotColor}`} />
                {info.label}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500" />
              Holy Day of Obligation
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
