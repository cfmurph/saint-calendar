import { FEAST_TYPES } from '../data/feasts'

export default function DayCell({ day, feasts, country, isToday, isCurrentMonth, onFeastClick }) {
  if (!isCurrentMonth) {
    return <div className="min-h-[90px] bg-slate-50/50 rounded-lg p-1" />
  }

  const visibleFeasts = feasts.slice(0, 3)
  const overflow = feasts.length - 3

  return (
    <div
      className={`min-h-[90px] rounded-xl p-2 transition-all duration-200 border
        ${isToday
          ? 'bg-yellow-50 border-yellow-400 shadow-sm'
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'
        }`}
    >
      {/* Day number */}
      <div className="flex items-center justify-between mb-1">
        <span
          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold
            ${isToday ? 'bg-yellow-500 text-white shadow-sm' : 'text-slate-700'}`}
        >
          {day}
        </span>
      </div>

      {/* Feast list */}
      <div className="space-y-0.5">
        {visibleFeasts.map(feast => {
          const typeInfo = FEAST_TYPES[feast.type] || FEAST_TYPES.commemoration
          const isHolyForCountry = country !== 'ALL' && feast.holyDayOf?.includes(country)
          const hasHolyDayAnywhere = feast.holyDayOf?.length > 0

          return (
            <button
              key={feast.id}
              onClick={() => onFeastClick(feast)}
              className={`w-full text-left rounded-md px-1.5 py-0.5 text-xs leading-tight transition-all
                hover:scale-[1.02] hover:shadow-sm active:scale-100 group
                ${isHolyForCountry
                  ? 'bg-red-50 border border-red-200 text-red-800 hover:bg-red-100'
                  : hasHolyDayAnywhere && country === 'ALL'
                  ? 'bg-red-50 border border-red-200 text-red-800 hover:bg-red-100'
                  : `${typeInfo.color} border`
                }`}
            >
              <div className="flex items-start gap-1 min-w-0">
                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0 ${
                  isHolyForCountry || (hasHolyDayAnywhere && country === 'ALL')
                    ? 'bg-red-500'
                    : typeInfo.dotColor
                }`} />
                <span className="truncate font-medium leading-snug">
                  {feast.icon} {feast.name}
                </span>
              </div>
            </button>
          )
        })}

        {overflow > 0 && (
          <button
            onClick={() => onFeastClick(feasts[3])}
            className="w-full text-left text-xs text-slate-400 hover:text-slate-600 pl-1 font-medium transition-colors"
          >
            +{overflow} more…
          </button>
        )}
      </div>
    </div>
  )
}
