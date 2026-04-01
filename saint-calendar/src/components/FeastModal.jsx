import { X, ExternalLink, Star, Globe } from 'lucide-react'
import { FEAST_TYPES, COUNTRIES } from '../data/feasts'

export default function FeastModal({ feast, country, onClose }) {
  if (!feast) return null

  const typeInfo = FEAST_TYPES[feast.type] || FEAST_TYPES.commemoration
  const isHoly = feast.holyDayOf && feast.holyDayOf.length > 0
  const isHolyForCountry = country !== 'ALL' && feast.holyDayOf?.includes(country)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header strip */}
        <div className={`px-6 pt-6 pb-4 bg-gradient-to-br from-slate-50 to-slate-100 border-b`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Feast type badge */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${typeInfo.color} mb-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${typeInfo.dotColor}`} />
                {typeInfo.label}
              </span>

              {/* Name */}
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                <span className="mr-2">{feast.icon}</span>
                {feast.name}
              </h2>

              {/* Date */}
              <p className="text-sm text-slate-500 mt-1">
                {new Date(2000, feast.month - 1, feast.day).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
                {feast.moveable && <span className="ml-2 text-xs text-slate-400 italic">(moveable feast)</span>}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          {/* Holy Day indicator */}
          {isHoly && (
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
                <p className="text-xs text-slate-600 mt-0.5">
                  Required in:{' '}
                  {feast.holyDayOf.map(code => (
                    <span key={code} className="font-medium">
                      {COUNTRIES[code]?.flag} {COUNTRIES[code]?.label}
                    </span>
                  )).reduce((prev, curr, i) => i === 0 ? [curr] : [...prev, ', ', curr], [])}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-slate-700 text-sm leading-relaxed">{feast.description}</p>

          {/* Note */}
          {feast.note && (
            <p className="text-xs text-slate-400 italic border-t pt-3">{feast.note}</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex gap-3">
          <a
            href={feast.wikipedia}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 text-sm font-semibold transition-colors shadow-sm"
          >
            <Globe className="w-4 h-4" />
            Read on Wikipedia
            <ExternalLink className="w-3.5 h-3.5 opacity-75" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
