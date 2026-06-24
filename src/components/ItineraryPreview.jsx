import { formatDateRange, formatIDR, itemTotal, tripDateRange } from '../utils/format'

// Panel preview ringkas: daftar itinerary berurutan + total keseluruhan.
// Cocok sebagai rangkuman "jadinya seperti apa" sebelum/ saat planning.
export default function ItineraryPreview({ items }) {
  if (items.length === 0) return null

  const grandTotal = items.reduce((sum, it) => sum + itemTotal(it), 0)
  const range = tripDateRange(items)

  return (
    <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-800">Preview Perjalanan</h2>
        {range && <span className="text-sm text-slate-500">{range}</span>}
      </div>

      <ol className="divide-y divide-slate-100">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-center gap-4 py-3">
            <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo-50 text-sm font-semibold text-indigo-700">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-slate-800">{item.destination}</div>
              <div className="text-xs text-slate-500">
                {formatDateRange(item.startDate, item.endDate)}
                {item.transport ? ` · ${item.transport}` : ''}
              </div>
            </div>
            <div className="flex-none text-right font-semibold text-slate-700">
              {formatIDR(itemTotal(item))}
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex items-center justify-between border-t-2 border-slate-200 pt-4">
        <span className="font-semibold text-slate-800">Total Keseluruhan</span>
        <span className="text-xl font-bold text-indigo-700">{formatIDR(grandTotal)}</span>
      </div>
    </section>
  )
}
