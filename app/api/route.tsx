// app/api/search/route.ts
import { NextResponse } from 'next/server'
import { getProductsByCategory } from '@/app/action'

/** Các page có danh sách sản phẩm */
const SOURCE_PAGES = [
  '/mens-clothing',
  '/womens-clothing',
  '/featured',         // nếu bạn đặt là 'feutured' thì sửa lại cho khớp slug thật
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = (searchParams.get('q') || '').trim()
  const limit = Number(searchParams.get('limit') || 10)

  if (q.length < 2) return NextResponse.json({ items: [] })

  try {
    const buckets = await Promise.all(SOURCE_PAGES.map(p => getProductsByCategory(p)))
    const all = buckets.flat()

    // bỏ trùng theo id
    const seen = new Set<number>()
    const unique = all.filter((p: any) => (seen.has(p.id) ? false : (seen.add(p.id), true)))

    const qq = q.toLowerCase()
    const items = unique
      .filter((p: any) => String(p.title ?? '').toLowerCase().includes(qq)) // chỉ theo title
      .slice(0, limit)
      .map((p: any) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        image: p.images?.[0] || p.src || '',
      }))

    return NextResponse.json({ items })
  } catch (e) {
    console.error('Search API error:', e)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
