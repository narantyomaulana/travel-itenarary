import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import BudgetSummary from './components/BudgetSummary'
import ItineraryForm from './components/ItineraryForm'
import ItineraryList from './components/ItineraryList'
import ItineraryPreview from './components/ItineraryPreview'

// ID unik tanpa dependency eksternal. crypto.randomUUID di browser modern,
// fallback ke timestamp+random untuk lingkungan lama.
function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [items, setItems] = useLocalStorage('travel-itinerary', [])
  const [editing, setEditing] = useState(null)

  function handleSubmit(data) {
    if (editing) {
      setItems((prev) =>
        prev.map((it) => (it.id === editing.id ? { ...it, ...data } : it)),
      )
      setEditing(null)
    } else {
      setItems((prev) => [...prev, { id: makeId(), ...data }])
    }
  }

  function handleDelete(id) {
    setItems((prev) => prev.filter((it) => it.id !== id))
    if (editing && editing.id === id) setEditing(null)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Travel Itinerary & Budget Calculator
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Rencanakan perjalanan & hitung estimasi biaya. Data tersimpan otomatis di browser.
          </p>
        </header>

        <BudgetSummary items={items} />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Form: sticky di layar besar agar tetap terlihat saat list panjang. */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6">
              <ItineraryForm
                onSubmit={handleSubmit}
                editing={editing}
                onCancelEdit={() => setEditing(null)}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Daftar Perjalanan</h2>
              <span className="text-sm text-slate-500">{items.length} agenda</span>
            </div>
            <ItineraryList items={items} onEdit={setEditing} onDelete={handleDelete} />
          </div>
        </div>

        <ItineraryPreview items={items} />

        <footer className="mt-10 text-center text-xs text-slate-400">
          Dibuat dengan React + Vite + Tailwind CSS · Client-side only
        </footer>
      </div>
    </div>
  )
}
