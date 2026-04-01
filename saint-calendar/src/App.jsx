import { useState, useMemo } from 'react'
import Header from './components/Header'
import CalendarGrid from './components/CalendarGrid'
import FeastList from './components/FeastList'
import FeastModal from './components/FeastModal'
import { FIXED_FEASTS } from './data/feasts'
import { getMoveableFeasts } from './data/moveable'

export default function App() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [country, setCountry] = useState('ALL')
  const [selectedFeast, setSelectedFeast] = useState(null)

  // Merge fixed and moveable feasts for the current year, keyed by day of month
  const feastsByDay = useMemo(() => {
    const moveableFeasts = getMoveableFeasts(year)
    const allFeasts = [...FIXED_FEASTS, ...moveableFeasts]

    // Filter to the current month
    const monthFeasts = allFeasts.filter(f => f.month === month)

    // Group by day
    const byDay = {}
    for (const feast of monthFeasts) {
      if (!byDay[feast.day]) byDay[feast.day] = []
      byDay[feast.day].push(feast)
    }

    // Sort each day's feasts: solemnities first, then feasts, memorials, etc.
    const order = { solemnity: 0, feast: 1, memorial: 2, 'optional-memorial': 3, commemoration: 4 }
    for (const day of Object.keys(byDay)) {
      byDay[day].sort((a, b) => (order[a.type] ?? 9) - (order[b.type] ?? 9))
    }

    return byDay
  }, [year, month])

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        year={year}
        month={month}
        country={country}
        onYearChange={setYear}
        onMonthChange={setMonth}
        onCountryChange={setCountry}
      />

      <main className="max-w-7xl mx-auto lg:flex lg:gap-0">
        {/* Calendar takes up the bulk of the space */}
        <div className="flex-1 min-w-0">
          <CalendarGrid
            year={year}
            month={month}
            feastsByDay={feastsByDay}
            country={country}
            onFeastClick={setSelectedFeast}
          />
        </div>

        {/* Sidebar feast list */}
        <FeastList
          month={month}
          feastsByDay={feastsByDay}
          country={country}
          onFeastClick={setSelectedFeast}
        />
      </main>

      {/* Detail modal */}
      {selectedFeast && (
        <FeastModal
          feast={selectedFeast}
          country={country}
          onClose={() => setSelectedFeast(null)}
        />
      )}
    </div>
  )
}
