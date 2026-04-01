import { X, ExternalLink, Star, Globe } from 'lucide-react'
import { FEAST_TYPES, LITURGICAL_COLORS, COUNTRIES } from '../data/feasts'

export default function FeastModal({ feast, country, onClose }) {
  if (!feast) return null

  const typeInfo = FEAST_TYPES[feast.rank] || FEAST_TYPES.commemoration
  const colorInfo = LITURGICAL_COLORS[feast.liturgicalColor]
  const isHolyForCountry = country !== 'ALL' && feast.holyDayOf?.includes(country)
  const isHolyAnywhere = feast.holyDayOf?.length > 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-stone-50 to-stone-100 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Rank badge */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeInfo.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${typeInfo.dotColor}`} />
                  {typeInfo.label}
                </span>

                {/* Liturgical colour badge */}
                {colorInfo && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
                    <span className={`w-3 h-3 rounded-full ${colorInfo.indicator}`} />
                    {colorInfo.label}
                  </span>
                )}

                {feast.moveable && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Moveable Feast
                  </span>
                )}
              </div>

              {/* Name */}
              <h2 className="text-xl font-bold text-stone-900 leading-tight">
                <span className="mr-2">{feast.icon}</span>
                {feast.name}
              </h2>

              {/* Date */}
              <p className="text-sm text-stone-500 mt-1">
                {new Date(2000, feast.month - 1, feast.day).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-stone-200 transition-colors text-stone-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          {/* Holy Day indicator */}
          {isHolyAnywhere && (
            <div className={`flex items-start gap-2 rounded-xl p-3 ${
              isHolyForCountry
                ? 'bg-red-50 border border-red-200'
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <Star className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHolyForCountry ? 'text-red-500' : 'text-amber-500'}`} />
              <div>
                <p className={`text-xs font-semibold ${isHolyForCountry ? 'text-red-700' : 'text-amber-700'}`}>
                  Holy Day of Obligation
                </p>
                <p className="text-xs text-stone-600 mt-0.5">
                  Required in:{' '}
                  {feast.holyDayOf.map((code, i) => (
                    <span key={code}>
                      {i > 0 && ', '}
                      <span className="font-medium">{COUNTRIES[code]?.flag} {COUNTRIES[code]?.label}</span>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-stone-700 text-sm leading-relaxed">{feast.description}</p>

          {/* Note */}
          {feast.note && (
            <p className="text-xs text-stone-400 italic border-t pt-3">{feast.note}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          <a
            href={feast.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4" />
            Read on Wikipedia
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
