import { useState, useMemo } from 'react'
import Header from './components/Header'
import CalendarGrid from './components/CalendarGrid'
import FeastList from './components/FeastList'
import FeastModal from './components/FeastModal'
import { FIXED_FEASTS } from './data/feasts'
import { getMoveableFeasts } from './data/moveable'

/** 1962 rank precedence for sorting (lower = higher precedence) */
const RANK_ORDER = {
  'class-1': 0,
  'class-2': 1,
  'vigil': 2,
  'class-3': 3,
  'privileged-feria': 4,
  'commemoration': 5,
}

export default function App() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [country, setCountry] = useState('ALL')
  const [selectedFeast, setSelectedFeast] = useState(null)

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

    // Sort each day's feasts by 1962 rank precedence
    for (const day of Object.keys(byDay)) {
      byDay[day].sort((a, b) => (RANK_ORDER[a.rank] ?? 9) - (RANK_ORDER[b.rank] ?? 9))
    }

    return byDay
  }, [year, month])

  return (
    <div className="min-h-screen bg-stone-100">
      <Header
        year={year}
        month={month}
        country={country}
        onYearChange={setYear}
        onMonthChange={setMonth}
        onCountryChange={setCountry}
      />

      <main className="max-w-7xl mx-auto lg:flex lg:gap-0">
        <div className="flex-1 min-w-0">
          <CalendarGrid
            year={year}
            month={month}
            feastsByDay={feastsByDay}
            country={country}
            onFeastClick={setSelectedFeast}
          />
        </div>

        <FeastList
          month={month}
          feastsByDay={feastsByDay}
          country={country}
          onFeastClick={setSelectedFeast}
        />
      </main>

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
