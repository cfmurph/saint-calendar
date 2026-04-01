import { Star } from 'lucide-react'
import { FEAST_TYPES, LITURGICAL_COLORS, COUNTRIES } from '../data/feasts'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export default function FeastList({ month, feastsByDay, country, onFeastClick }) {
  const entries = Object.entries(feastsByDay)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .flatMap(([day, feasts]) => feasts.map(f => ({ ...f, _day: Number(day) })))

  if (entries.length === 0) {
    return (
      <aside className="lg:w-72 xl:w-80 shrink-0 px-4 pb-6 lg:px-0">
        <div className="bg-white rounded-xl border border-stone-100 p-4 text-sm text-stone-400 text-center">
          No feasts this month.
        </div>
      </aside>
    )
  }

  return (
    <aside className="lg:w-72 xl:w-80 shrink-0 px-4 pb-6 lg:pl-0 lg:pr-4">
      <div className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-sm">
        <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
          <h2 className="text-sm font-semibold text-stone-700">
            {MONTHS[month - 1]} — {entries.length} feast{entries.length !== 1 ? 's' : ''}
          </h2>
        </div>
        <ul className="divide-y divide-stone-50 max-h-[calc(100vh-300px)] overflow-y-auto">
          {entries.map((feast) => {
            const typeInfo = FEAST_TYPES[feast.rank] || FEAST_TYPES.commemoration
            const colorInfo = LITURGICAL_COLORS[feast.liturgicalColor]
            const isHolyForCountry = country !== 'ALL' && feast.holyDayOf?.includes(country)
            const hasHolyDayAnywhere = feast.holyDayOf?.length > 0

            return (
              <li key={`${feast.id}-${feast._day}`}>
                <button
                  onClick={() => onFeastClick(feast)}
                  className="w-full text-left px-4 py-2.5 hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex items-start gap-2.5">
                    {/* Day badge */}
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-600 mt-0.5">
                      {feast._day}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        {(isHolyForCountry || (hasHolyDayAnywhere && country === 'ALL')) && (
                          <Star className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                        )}
                        <p className="text-xs font-semibold text-stone-800 leading-snug group-hover:text-stone-900 truncate">
                          {feast.icon} {feast.name}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        <span className={`inline-flex items-center gap-1 px-1.5 py-0 rounded-full text-[10px] font-medium border ${typeInfo.color}`}>
                          {typeInfo.label}
                        </span>
                        {colorInfo && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0 rounded-full text-[10px] font-medium bg-stone-50 border border-stone-200 text-stone-600">
                            <span className={`w-2 h-2 rounded-full ${colorInfo.indicator}`} />
                            {colorInfo.label}
                          </span>
                        )}
                        {(isHolyForCountry || (hasHolyDayAnywhere && country === 'ALL')) && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0 rounded-full text-[10px] font-medium border bg-red-50 text-red-700 border-red-200">
                            ★ Holy Day {isHolyForCountry ? `(${COUNTRIES[country]?.flag})` : ''}
                          </span>
                        )}
                      </div>
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
