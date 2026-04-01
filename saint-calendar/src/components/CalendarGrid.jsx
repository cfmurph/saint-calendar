import DayCell from './DayCell'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarGrid({ year, month, feastsByDay, country, onFeastClick }) {
  const today = new Date()
  const firstDay = new Date(year, month - 1, 1).getDay() // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate()

  // Build grid cells: leading blanks + days + trailing blanks
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7
  const cells = []
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - firstDay + 1
    cells.push({ dayNum, isCurrentMonth: dayNum >= 1 && dayNum <= daysInMonth })
  }

  const isToday = (d) =>
    today.getFullYear() === year &&
    today.getMonth() + 1 === month &&
    today.getDate() === d

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {WEEKDAYS.map((wd, i) => (
          <div
            key={wd}
            className={`text-center text-xs font-semibold uppercase tracking-wide py-2 rounded-lg
              ${i === 0 || i === 6 ? 'text-slate-400 bg-slate-50' : 'text-slate-500 bg-slate-50'}`}
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, idx) => (
          <DayCell
            key={idx}
            day={cell.dayNum}
            feasts={cell.isCurrentMonth ? (feastsByDay[cell.dayNum] || []) : []}
            country={country}
            isToday={cell.isCurrentMonth && isToday(cell.dayNum)}
            isCurrentMonth={cell.isCurrentMonth}
            onFeastClick={onFeastClick}
          />
        ))}
      </div>
    </div>
  )
}
