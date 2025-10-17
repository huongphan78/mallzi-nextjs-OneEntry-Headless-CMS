import { LabelCardType, productType } from '@/lib/interface'
import Link from 'next/link'
import React, { useState } from 'react'                 // ✅ giữ nguyên: dùng skeleton khi ảnh tải
import AddToCartBtn from '../Button/AddToCartBtn'
import { Button } from '../ui/button'

interface ProductProps {
  product: productType
  custom?: string
}

// ================== ProductCard ==================
export const ProductCard: React.FC<ProductProps> = ({ product, custom }) => {
  const [imgLoaded, setImgLoaded] = useState(false)     // ✅ giữ nguyên

  return (
    <div
      key={product?.id}
      className={`flex flex-col cursor-pointer items-center text-center bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 h-full ${custom ?? ''}`}
    >
      <Link target="_blank" href={`/product/${product.id}`} className="w-full flex-1 flex flex-col">
        {/* ✅ khung vuông cố định ảnh */}
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product?.src}
            alt={product?.title}
            onLoad={() => setImgLoaded(true)}           // ✅ giữ nguyên
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
        </div>

        {/* ✅ text: nhỏ hơn, line-clamp 2 để tránh dài quá */}
        <div className="mt-4 flex-1 flex flex-col justify-between">
          <p className="font-medium text-sm md:text-base line-clamp-2">{product?.title}</p>
          <p className="text-md md:text-lg text-gray-700 mt-2">${product?.price}</p>
        </div>
      </Link>

      {/* ✅ nút giỏ hàng giữ nguyên */}
      <div className="mt-3">
        <AddToCartBtn product={product} />
      </div>
    </div>
  )
}

interface LabelCardProps {
  category: LabelCardType
  custom?: string
  customImage?: string
  customText?: string
  customBtn?: string
  btnLabel: string
}

// ================== LabelCard ==================
export const LabelCard: React.FC<LabelCardProps> = ({
  category,
  customImage,
  customText,
  customBtn,
  custom,
  btnLabel,
}) => {
  return (
    <div key={category.id} className="relative group rounded-xl overflow-hidden">
      <Link href={category.url} target="_blank">
        {/* ✅ khung vuông */}
        <div className="aspect-square w-full">
          <img
            src={category.imgSrc}
            alt="Category item"
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${customImage ?? ''}`}
          />
        </div>

        {/* ✅ overlay text + gradient */}
        <div
          className={`absolute inset-0 flex flex-col justify-end items-center md:items-start p-6 
                      bg-gradient-to-t from-black/60 to-transparent text-white ${custom ?? ''}`}
        >
          <p className={`text-lg md:text-2xl font-semibold mb-3 ${customText ?? ''}`}>
            {category.title}
          </p>
          <Button variant={'secondary'} className={`w-24 md:w-32 ${customBtn ?? ''}`}>
            {btnLabel}
          </Button>
        </div>
      </Link>
    </div>
  )
}
