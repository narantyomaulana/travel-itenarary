// Helper format mata uang Rupiah + opsi transportasi default.

export const TRANSPORT_OPTIONS = [
  'Pesawat',
  'KRL',
  'Busway/TransJakarta',
  'Sewa Kendaraan',
  'Kereta Api',
  'Kapal Laut',
  'Lainnya',
]

const idr = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export function formatIDR(value) {
  const n = Number(value) || 0
  return idr.format(n)
}

// Total biaya satu item itinerary.
export function itemTotal(item) {
  return (
    (Number(item.transportCost) || 0) +
    (Number(item.lodgingCost) || 0) +
    (Number(item.otherCost) || 0)
  )
}

function formatOneDate(value) {
  if (!value) return null
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return d.toLocaleDateString('id-ID', { dateStyle: 'medium' })
}

// Tampilkan rentang tanggal "dari – sampai" (tanpa waktu).
export function formatDateRange(startDate, endDate) {
  const start = formatOneDate(startDate)
  const end = formatOneDate(endDate)
  if (start && end) return start === end ? start : `${start} – ${end}`
  return start || end || '-'
}

// Ambil hanya digit dari input lalu jadikan number (untuk field biaya).
export function parseNumber(value) {
  const digits = String(value).replace(/\D/g, '')
  return digits ? Number(digits) : 0
}

// Format number jadi string ribuan ala Indonesia: 1500000 -> "1.500.000".
export function formatNumberInput(value) {
  const n = parseNumber(value)
  return n ? new Intl.NumberFormat('id-ID').format(n) : ''
}
