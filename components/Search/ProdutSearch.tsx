'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Item = { id: number; title: string; price: number; image?: string }

export default function ProductSearch({
  placeholder = 'Search products…',
  maxResults = 8,
  minChars = 2,
}: { placeholder?: string; maxResults?: number; minChars?: number }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  // debounce
  const [debounced, setDebounced] = useState(q)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(q.trim()), 250)
    return () => clearTimeout(t)
  }, [q])

  // fetch API
  useEffect(() => {
    const run = async () => {
      if (debounced.length < minChars) { setItems([]); return }
      setLoading(true)
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(debounced)}&limit=${maxResults}`, { cache: 'no-store' })
        const data = await r.json()
        setItems(Array.isArray(data.items) ? data.items : [])
      } finally { setLoading(false) }
    }
    run()
  }, [debounced, maxResults, minChars])

  // click ngoài -> đóng
  useEffect(() => {
    const h = (e: MouseEvent) => { if (!boxRef.current?.contains(e.target as Node)) setOpen(false) }
    window.addEventListener('click', h); return () => window.removeEventListener('click', h)
  }, [])

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) setOpen(true)
    if (!items.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => (i + 1) % items.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => (i - 1 + items.length) % items.length) }
    else if (e.key === 'Enter') { e.preventDefault(); const p = items[activeIdx]; if (p) window.location.href = `/products/${p.id}` }
    else if (e.key === 'Escape') setOpen(false)
  }

  const showDropdown = open && debounced.length >= minChars

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-2 text-sm outline-none transition focus:ring-2 focus:ring-black/70"
      />
      {showDropdown && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-xl">
          {loading ? (
            <div className="p-4 text-sm text-neutral-500">Searching…</div>
          ) : items.length === 0 ? (
            <div className="p-4 text-sm text-neutral-500">No results for “{debounced}”</div>
          ) : (
            <ul role="listbox">
              {items.map((p, i) => (
                <li key={p.id}>
                  <Link
                    href={`/products/${p.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm transition ${i === activeIdx ? 'bg-neutral-100' : 'hover:bg-neutral-50'}`}
                  >
                    <img src={p.image || ''} alt={p.title} className="h-10 w-10 rounded-lg object-cover bg-neutral-100" />
                    <div className="min-w-0">
                      <div className="truncate font-medium">{p.title}</div>
                      <div className="truncate text-xs text-neutral-500">${p.price}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
