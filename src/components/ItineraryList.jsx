import { formatDateRange, formatIDR, itemTotal } from '../utils/format'

// Daftar itinerary dalam bentuk card. Tiap card punya aksi Edit & Delete.
export default function ItineraryList({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-slate-500">
          Belum ada destinasi. Tambahkan lewat form di samping.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-slate-800">
                {item.destination}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                {formatDateRange(item.startDate, item.endDate)}
              </p>
              <span className="mt-2 inline-block rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                {item.transport}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Subtotal</div>
              <div className="text-lg font-bold text-slate-800">
                {formatIDR(itemTotal(item))}
              </div>
            </div>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-sm">
            <div>
              <dt className="text-slate-400">Transportasi</dt>
              <dd className="font-medium text-slate-700">{formatIDR(item.transportCost)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Penginapan</dt>
              <dd className="font-medium text-slate-700">{formatIDR(item.lodgingCost)}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Lain-lain</dt>
              <dd className="font-medium text-slate-700">{formatIDR(item.otherCost)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => onEdit(item)}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Hapus
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
