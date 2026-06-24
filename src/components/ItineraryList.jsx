import { formatDateRange, formatIDR, itemTotal } from '../utils/format'

// Daftar itinerary dalam bentuk card compact. Tiap card punya aksi Edit & Delete.
export default function ItineraryList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-slate-500">
          Belum ada agenda. Tambahkan lewat form di samping.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        // Hanya tampilkan biaya yang diisi (> 0), digabung jadi satu baris.
        const rows = [
          { label: 'Transportasi', value: Number(item.transportCost) || 0 },
          { label: 'Penginapan', value: Number(item.lodgingCost) || 0 },
          { label: 'Lain-lain', value: Number(item.otherCost) || 0 },
        ].filter((r) => r.value > 0)

        return (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-800">{item.destination}</h3>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span>{formatDateRange(item.startDate, item.endDate)}</span>
                  {item.transport && (
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
                      {item.transport}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-none items-center gap-1">
                <span className="mr-1 font-bold text-slate-800">{formatIDR(itemTotal(item))}</span>
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  title="Edit"
                  aria-label="Edit"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  title="Hapus"
                  aria-label="Hapus"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5h6v2m-1 0v12m-4-12v12M5 7l1 13h12l1-13" />
                  </svg>
                </button>
              </div>
            </div>

            {rows.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                {rows.map((r) => (
                  <span key={r.label}>
                    {r.label}: <span className="font-medium text-slate-700">{formatIDR(r.value)}</span>
                  </span>
                ))}
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
