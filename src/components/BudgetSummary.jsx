import { formatIDR, itemTotal } from '../utils/format'

// Dashboard kecil: total estimasi biaya seluruh itinerary.
export default function BudgetSummary({ items }) {
  const grandTotal = items.reduce((sum, it) => sum + itemTotal(it), 0)
  const transport = items.reduce((s, it) => s + (Number(it.transportCost) || 0), 0)
  const lodging = items.reduce((s, it) => s + (Number(it.lodgingCost) || 0), 0)
  const other = items.reduce((s, it) => s + (Number(it.otherCost) || 0), 0)

  const breakdown = [
    { label: 'Transportasi', value: transport },
    { label: 'Penginapan', value: lodging },
    { label: 'Konsumsi/Lain', value: other },
  ]

  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-6 text-white shadow-lg">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-indigo-100">Total Estimasi Biaya</span>
        <span className="text-3xl font-bold tracking-tight sm:text-4xl">
          {formatIDR(grandTotal)}
        </span>
        <span className="text-sm text-indigo-100">
          {items.length} destinasi tersimpan
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {breakdown.map((b) => (
          <div key={b.label} className="rounded-xl bg-white/10 p-3 backdrop-blur">
            <div className="text-xs text-indigo-100">{b.label}</div>
            <div className="mt-1 text-lg font-semibold">{formatIDR(b.value)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
