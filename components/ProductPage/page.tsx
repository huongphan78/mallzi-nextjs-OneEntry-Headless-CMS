'use client'
import { productType } from '@/lib/interface'
import React, { useMemo, useState } from 'react'
import AddToCartBtn from '../Button/AddToCartBtn'
import ViewToBuyBtn from '../Button/ViewToBuyBtn'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion'

interface ProductPageProps {
  productId: string
  product: productType
}

/* ======================= STATIC CONTENT (accordion only) ======================= */
const STATIC_DESC = `Embrace Japanese streetwear culture with this striking Tokyo Dragon Wave T-Shirt. Featuring a bold dragon design surrounded by traditional Japanese waves and cherry blossoms, this premium black graphic tee combines authentic Japanese artistry with modern street style.

Key Features:

Premium Quality: Soft, comfortable cotton blend fabric
Authentic Design: Traditional Japanese dragon artwork with wave patterns
Versatile Style: Perfect for casual wear, streetwear enthusiasts, and anime fans
Durable Print: High-quality screen printing that won’t fade or crack
Unisex Fit: Comfortable relaxed fit suitable for all body types

Perfect for: Japanese culture enthusiasts, streetwear collectors, anime fans, casual everyday wear, or as a unique gift for dragon and Japanese art lovers.

Available in multiple sizes. Add this eye-catching Japanese-inspired graphic tee to your wardrobe and make a bold fashion statement with authentic Tokyo street style.`

const KEY_FEATURES = [
  'Premium Quality: Soft, comfortable cotton blend fabric',
  'Authentic Design: Traditional Japanese dragon artwork with wave patterns',
  'Versatile Style: Perfect for casual wear, streetwear enthusiasts, and anime fans',
  'Durable Print: High-quality screen printing that won’t fade or crack',
  'Unisex Fit: Comfortable relaxed fit suitable for all body types',
]

const PERFECT_FOR = [
  'Japanese culture enthusiasts',
  'Streetwear collectors',
  'Anime fans',
  'Casual everyday wear',
  'Unique gift for dragon & Japanese art lovers',
]

const ADDITIONAL_INFO = [
  { label: 'Material', value: 'Cotton blend' },
  { label: 'Color', value: 'Black (multi-color graphic)' },
  { label: 'Fit', value: 'Unisex relaxed fit' },
  { label: 'Print', value: 'Premium screen printing' },
  { label: 'Care', value: 'Machine wash cold, inside out' },
]

/* ===================== DEFAULT OPTIONS (fallback UI) ===================== */
const COLOR_OPTIONS_DEFAULT = [
  { label: 'Black', value: 'black', hex: '#111827' },
  { label: 'Royal', value: 'royal', hex: '#274690' },
  { label: 'Navy', value: 'navy', hex: '#0B315E' },
  { label: 'Dark Heather', value: 'dark-heather', hex: '#5B5F6A' },
  { label: 'White', value: 'white', hex: '#FFFFFF' },
]

const SIZE_OPTIONS_DEFAULT = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']

const ProductPage: React.FC<ProductPageProps> = ({ productId, product }) => {
  const [selectedIdx, setIndex] = useState(0)

  // Lấy default từ backend (nếu có), fallback về mảng tĩnh
  const colorOptions = useMemo(() => COLOR_OPTIONS_DEFAULT, [])
  const sizeOptions = useMemo(() => SIZE_OPTIONS_DEFAULT, [])
  const [pickedColor, setPickedColor] = useState<string>(product.color || colorOptions[0]?.value)
  const [pickedSize, setPickedSize] = useState<string>(product.size || sizeOptions[0])

  return (
    <div className="mt-12 grid md:grid-cols-6 grid-cols-1 text-center items-start">
      {/* GALLERY + PREVIEW */}
      <div className="md:col-start-2 md:col-span-3 flex flex-col items-center">
        <ProductCarousel product={product} setIndex={setIndex} selectedIdx={selectedIdx} />
        <ProductPreview product={product} setIndex={setIndex} selectedIdx={selectedIdx} />
      </div>

      {/* INFO PANEL */}
      <div className="mt-12 text-[1.5rem] md:text-[2rem] md:col-start-5 self-start md:text-start">
        <p className="font-semibold">{product.title}</p>
        <p className="text-[1.5rem]">${product.price}</p>

        {/* Top description: vẫn dùng data */}
        <p className="font-extralight my-4 text-[1.05rem] leading-7 md:text-base text-neutral-700">
          {product.description}
        </p>

        {/* COLOR PILLS */}
        <div className="mt-4 text-left">
          <div className="mb-2 text-sm font-medium">
            Select Your Color <span className="text-rose-600">*</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => {
              const active = pickedColor === c.value
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setPickedColor(c.value)}
                  className={`group inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition
                    hover:bg-neutral-50 focus:outline-none
                    ${active ? 'ring-2 ring-black border-black' : 'border-neutral-300'}`}
                  aria-pressed={active}
                  title={c.label}
                >
                  <span
                    className="h-4 w-4 rounded-full border"
                    style={{ backgroundColor: c.hex }}
                    aria-hidden
                  />
                  <span className="font-medium">{c.label}</span>
                  {active && (
                    <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded border text-[10px]">
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* SIZE PILLS */}
        <div className="mt-5 text-left">
          <div className="mb-2 text-sm font-medium">
            Size <span className="text-rose-600">*</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((s) => {
              const active = pickedSize === s
              const disabled = false // tuỳ biến nếu có stock theo biến thể
              return (
                <button
                  key={s}
                  type="button"
                  disabled={disabled}
                  onClick={() => !disabled && setPickedSize(s)}
                  className={`min-w-12 rounded-xl border px-3 py-2 text-sm transition
                    hover:bg-neutral-50 focus:outline-none
                    ${active ? 'ring-2 ring-black border-black' : 'border-neutral-300'}
                    ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                  aria-pressed={active}
                  title={s}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </div>

        {/* Quantity + Add to cart */}
        <p className="mt-5 text-[1.05rem] md:text-base">Quantity: {product.quantity}</p>

        {/* Nếu muốn gửi size/color vào giỏ: mở comment attrs */}
         <div className="mt-4 flex flex-wrap gap-3">
  <AddToCartBtn product={product} />
  <ViewToBuyBtn
    product={product}
    attrs={{ size: pickedSize, color: pickedColor }}
    label="View to Buy"
  />
</div>

        {/* ===== Accordion: Description (static) & Additional information (static) ===== */}
        <Accordion type="single" collapsible className="mt-6 w-full max-w-xl text-left">
          {/* Description - dùng nội dung tĩnh */}
          <AccordionItem value="desc">
            <AccordionTrigger className="text-base font-medium">
              Description
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none whitespace-pre-line leading-6 text-neutral-700">
                {STATIC_DESC}
              </div>

              {/* Key Features */}
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold">Key Features</h4>
                <ul className="list-disc pl-5 text-sm leading-6 text-neutral-700">
                  {KEY_FEATURES.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>

              {/* Perfect for */}
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-semibold">Perfect for</h4>
                <ul className="list-disc pl-5 text-sm leading-6 text-neutral-700">
                  {PERFECT_FOR.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Additional information - dùng bảng tĩnh + tổng hợp size/color */}
          <AccordionItem value="addi">
            <AccordionTrigger className="text-base font-medium">
              Additional information
            </AccordionTrigger>
            <AccordionContent>
              <div className="divide-y">
                {ADDITIONAL_INFO.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-6 py-2">
                    <span className="min-w-24 font-semibold tracking-wide">{row.label.toUpperCase()}</span>
                    <span className="text-neutral-700">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 divide-y">
                <div className="flex items-start justify-between gap-6 py-2">
                  <span className="min-w-24 font-semibold tracking-wide">SIZE</span>
                  <span className="text-neutral-700">
                    {SIZE_OPTIONS_DEFAULT.join(', ')}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-6 py-2">
                  <span className="min-w-24 font-semibold tracking-wide">COLOR</span>
                  <span className="text-neutral-700">
                    {COLOR_OPTIONS_DEFAULT.map(c => c.label).join(', ')}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default ProductPage

/* -------------------- GALLERY & PREVIEW (giữ nguyên) -------------------- */

interface CarouselProps {
  product: productType
  setIndex: React.Dispatch<React.SetStateAction<number>>
  selectedIdx: number
}

const ProductCarousel: React.FC<CarouselProps> = ({ product, setIndex, selectedIdx }) => {
  const previousClick = () => {
    if (selectedIdx > 0) setIndex((prev) => prev - 1)
  }
  const nextClick = () => {
    if (selectedIdx < product.images.length - 1) setIndex((prev) => prev + 1)
  }
  return (
    <Carousel className="mt-6 w-[280px] md:w-[480px]">
      <CarouselContent>
        {product.images.map((imgUrl: string, i: number) => (
          <CarouselItem key={`product-${imgUrl}-${i}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-2">
                  <img
                    src={imgUrl}
                    alt={'Product detail'}
                    className="h-[320px] md:h-[480px] relative rounded-xl object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div onClick={previousClick}>
        <CarouselPrevious />
      </div>
      <div onClick={nextClick}>
        <CarouselNext />
      </div>
    </Carousel>
  )
}

const ProductPreview: React.FC<CarouselProps> = ({ product, setIndex, selectedIdx }) => {
  return (
    <div className="mt-8 flex">
      {product.images.map((imgUrl: string, idx: number) => {
        return (
          <div key={`preview-${imgUrl}-${idx}`} className="cursor-pointer" onClick={() => setIndex(idx)}>
            <img
              src={imgUrl}
              alt={'Product preview'}
              className={`${idx == selectedIdx ? 'blur-none' : 'blur-sm'} object-cover w-[120px] h-[120px] md:w-[200px] md:h-[200px] relative rounded-xl`}
            />
          </div>
        )
      })}
    </div>
  )
}
