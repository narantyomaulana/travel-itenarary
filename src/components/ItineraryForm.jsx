import { useEffect, useState } from 'react'
import { TRANSPORT_OPTIONS, formatNumberInput, parseNumber } from '../utils/format'

const EMPTY = {
  destination: '',
  startDate: '',
  endDate: '',
  transport: '', // belum dipilih
  transportCost: '',
  lodgingCost: '',
  otherCost: '',
}

// Form input itinerary. Dipakai untuk tambah baru dan edit (controlled).
export default function ItineraryForm({ onSubmit, editing, onCancelEdit }) {
  const [form, setForm] = useState(EMPTY)

  // Saat user klik Edit di list, isi form dengan data item tsb.
  useEffect(() => {
    if (editing) {
      setForm({
        destination: editing.destination ?? '',
        startDate: editing.startDate ?? '',
        endDate: editing.endDate ?? '',
        transport: editing.transport ?? '',
        transportCost: formatNumberInput(editing.transportCost ?? ''),
        lodgingCost: formatNumberInput(editing.lodgingCost ?? ''),
        otherCost: formatNumberInput(editing.otherCost ?? ''),
      })
    } else {
      setForm(EMPTY)
    }
  }, [editing])

  const COST_FIELDS = ['transportCost', 'lodgingCost', 'otherCost']

  function handleChange(e) {
    const { name, value } = e.target
    // Field biaya: simpan sebagai string berformat ribuan.
    const next = COST_FIELDS.includes(name) ? formatNumberInput(value) : value
    setForm((prev) => ({ ...prev, [name]: next }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.destination.trim()) return
    onSubmit({
      ...form,
      transportCost: parseNumber(form.transportCost),
      lodgingCost: parseNumber(form.lodgingCost),
      otherCost: parseNumber(form.otherCost),
    })
    if (!editing) setForm(EMPTY)
  }

  const label = 'block text-sm font-medium text-slate-700 mb-1'
  const field =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 ' +
    'focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'
  // Wrapper untuk input biaya berprefix "Rp".
  const prefixWrap =
    'flex items-center rounded-lg border border-slate-300 ' +
    'focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200'
  const prefix = 'px-3 text-sm font-medium text-slate-500'
  const prefixField =
    'w-full rounded-r-lg px-3 py-2 text-sm text-slate-900 focus:outline-none'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {editing ? 'Edit Agenda' : 'Tambah Agenda'}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="destination">Nama Agenda</label>
          <input
            id="destination"
            name="destination"
            type="text"
            required
            value={form.destination}
            onChange={handleChange}
            placeholder="mis. Pantai Kuta, Tiket Kereta, Hotel"
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="startDate">Tanggal Mulai</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="endDate">Tanggal Selesai</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            min={form.startDate || undefined}
            value={form.endDate}
            onChange={handleChange}
            className={field}
          />
        </div>

        <div>
          <label className={label} htmlFor="transport">Moda Transportasi</label>
          <select
            id="transport"
            name="transport"
            value={form.transport}
            onChange={handleChange}
            className={field}
          >
            <option value="" disabled>Pilih moda transportasi</option>
            {TRANSPORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label} htmlFor="transportCost">Biaya Transportasi</label>
          <div className={prefixWrap}>
            <span className={prefix}>Rp</span>
            <input
              id="transportCost"
              name="transportCost"
              type="text"
              inputMode="numeric"
              value={form.transportCost}
              onChange={handleChange}
              placeholder="0"
              className={prefixField}
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="lodgingCost">Biaya Penginapan</label>
          <div className={prefixWrap}>
            <span className={prefix}>Rp</span>
            <input
              id="lodgingCost"
              name="lodgingCost"
              type="text"
              inputMode="numeric"
              value={form.lodgingCost}
              onChange={handleChange}
              placeholder="0"
              className={prefixField}
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={label} htmlFor="otherCost">Biaya Konsumsi/Lain-lain</label>
          <div className={prefixWrap}>
            <span className={prefix}>Rp</span>
            <input
              id="otherCost"
              name="otherCost"
              type="text"
              inputMode="numeric"
              value={form.otherCost}
              onChange={handleChange}
              placeholder="0"
              className={prefixField}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {editing ? 'Simpan Perubahan' : 'Tambah Agenda'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  )
}
