import { useEffect, useRef, useState } from 'react'

/**
 * Persisted state hook.
 * Pakai localStorage; fallback ke sessionStorage kalau localStorage
 * tidak tersedia (mis. mode private di sebagian browser).
 * Data otomatis tersimpan tiap kali value berubah.
 */

function getStorage() {
  // Tes ketersediaan storage tanpa melempar error saat blocked.
  const test = '__storage_test__'
  try {
    window.localStorage.setItem(test, test)
    window.localStorage.removeItem(test)
    return window.localStorage
  } catch {
    try {
      window.sessionStorage.setItem(test, test)
      window.sessionStorage.removeItem(test)
      return window.sessionStorage
    } catch {
      return null // SSR atau storage diblokir total
    }
  }
}

export function useLocalStorage(key, initialValue) {
  const storageRef = useRef(null)
  if (storageRef.current === null && typeof window !== 'undefined') {
    storageRef.current = getStorage()
  }

  const [value, setValue] = useState(() => {
    const storage = storageRef.current
    if (!storage) return initialValue
    try {
      const raw = storage.getItem(key)
      return raw != null ? JSON.parse(raw) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    const storage = storageRef.current
    if (!storage) return
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch {
      // Kuota penuh / storage diblokir — abaikan agar UI tetap jalan.
    }
  }, [key, value])

  return [value, setValue]
}
