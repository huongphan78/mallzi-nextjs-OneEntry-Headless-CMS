'use client'
import React from 'react'
import { Button } from '../ui/button'
import { productType } from '@/lib/interface'

type Props = {
  product: productType
  quantity?: number
  attrs?: { size?: string; color?: string }
  label?: string
  openInNewTab?: boolean
}

function normalizeUrl(u?: string) {
  if (!u) return ''
  // nếu người nhập quên http/https thì thêm vào cho chắc
  if (!/^https?:\/\//i.test(u)) return `https://${u}`
  return u
}

const ViewToBuyBtn: React.FC<Props> = ({
  product,
  quantity = 1,
  attrs,
  label = 'View to Buy',
  openInNewTab = true,
}) => {
  const handleGo = () => {
    const base = normalizeUrl(product?.url)
    if (!base) return
    try {
      const u = new URL(base)
      if (attrs?.size)  u.searchParams.set('size', attrs.size)
      if (attrs?.color) u.searchParams.set('color', attrs.color)
      if (quantity)     u.searchParams.set('qty', String(quantity))
      u.searchParams.set('ref', 'mallzii')

      const href = u.toString()
      if (openInNewTab) window.open(href, '_blank', 'noopener,noreferrer')
      else window.location.href = href
    } catch (e) {
      console.error('Invalid product.url', product?.url, e)
    }
  }

  return (
   <Button
    onClick={handleGo}
    disabled={!product?.url}
    aria-label="View to Buy"
    className="font-normal mt-4 md:text-[1.25rem] rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[1px] active:scale-[.99]"
    title={product?.url ? 'Open partner product page' : 'External URL not set'}
  >
    View to Buy
  </Button>
  )
}

export default ViewToBuyBtn
