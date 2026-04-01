import { Star } from 'lucide-react'
import { FEAST_TYPES, COUNTRIES } from '../data/feasts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Sidebar list of all feasts in the current month, sorted by day.
 */
export default function FeastList({ month, feastsByDay, country, onFeastClick }) {
  const entries = Object.entries(feastsByDay)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .flatMap(([day, feasts]) => feasts.map(f => ({ ...f, _day: Number(day) })))

  if (entries.length === 0) {
    return (
      <aside className="lg:w-72 xl:w-80 shrink-0 px-4 pb-6 lg:px-0">
        <div className="bg-white rounded-xl border border-slate-100 p-4 text-sm text-slate-400 text-center">
          No feasts this month.
        </div>
      </aside>
    )
  }

  return (
    <aside className="lg:w-72 xl:w-80 shrink-0 px-4 pb-6 lg:pl-0 lg:pr-4">
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-700">
            {MONTHS[month - 1]} — {entries.length} feast{entries.length !== 1 ? 's' : ''}
          </h2>
        </div>
        <ul className="divide-y divide-slate-50 max-h-[calc(100vh-260px)] overflow-y-auto">
          {entries.map((feast) => {
            const typeInfo = FEAST_TYPES[feast.type] || FEAST_TYPES.commemoration
            const isHolyForCountry = country !== 'ALL' && feast.holyDayOf?.includes(country)
            const hasHolyDayAnywhere = feast.holyDayOf?.length > 0

            return (
              <li key={`${feast.id}-${feast._day}`}>
                <button
                  onClick={() => onFeastClick(feast)}
                  className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-start gap-2.5">
                    {/* Day badge */}
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 mt-0.5">
                      {feast._day}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        {(isHolyForCountry || (hasHolyDayAnywhere && country === 'ALL')) && (
                          <Star className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-xs font-semibold text-slate-800 leading-snug group-hover:text-slate-900">
                          {feast.icon} {feast.name}
                        </p>
                      </div>
                      <span className={`inline-flex items-center gap-1 mt-0.5 px-1.5 py-0 rounded-full text-[10px] font-medium border ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      {(isHolyForCountry || (hasHolyDayAnywhere && country === 'ALL')) && (
                        <span className="ml-1 inline-flex items-center gap-1 mt-0.5 px-1.5 py-0 rounded-full text-[10px] font-medium border bg-red-50 text-red-700 border-red-200">
                          Holy Day {isHolyForCountry ? `(${COUNTRIES[country]?.flag})` : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
