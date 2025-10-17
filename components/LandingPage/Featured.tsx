"use client"
import { productType } from '@/lib/interface'
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../CustomCard/CustomCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Link from 'next/link'

interface FeaturedProps {
  featuredProducts: productType[]
  variant?: "home" | "collection" // 👈 phân biệt Home và Men/Women/Featured
}

const Featured: React.FC<FeaturedProps> = ({ featuredProducts, variant = "home" }) => {
  // title khác nhau tuỳ variant
  const sectionTitle = variant === "home" ? "Featured" : "Our Collection"

  return (
    <section className="flex flex-col items-center mt-12 font-Outfit w-full">
      <p className="text-[1.5rem] md:text-[3rem] font-normal">{sectionTitle}</p>
      <div className="w-full max-w-7xl">
        <ProductList products={featuredProducts} variant={variant} />
      </div>

      {/* chỉ Home có "Shop more" */}
      {variant === "home" && (
        <Link href={'/featured'} className="my-16 font-light text-[1.5rem]">
          Shop more
        </Link>
      )}
    </section>
  )
}

export default Featured

// ================= ProductList =================
interface ProductListProps {
  products: productType[]
  variant?: "home" | "collection"
}

export const ProductList: React.FC<ProductListProps> = ({ products, variant = "home" }) => {
  const [current, setCurrent] = useState(0)

  // auto slide 4s/lần (chỉ dùng cho home)
  useEffect(() => {
    if (variant !== "home") return
    if (!products || products.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [products, variant])

  // ================== nếu variant = "collection" ==================
  if (variant === "collection") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {products.map((product: productType) => (
          <div key={product.id} className="w-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    )
  }

  // ================== nếu variant = "home" (carousel) ==================
  return (
    <>
      {/* Desktop: 4 item/slide */}
      <div className="hidden md:block mt-8">
        <Carousel className="w-full">
          <CarouselContent className="gap-6">
            {products.map((product: productType, index) => (
              <CarouselItem
                key={product.id}
                className="basis-1/4"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Mobile: 1 item/slide */}
      <div className="md:hidden mt-8">
        <Carousel className="w-full max-w-sm mx-auto">
          <CarouselContent>
            {products.map((product: productType) => (
              <CarouselItem key={product.id} className="basis-full">
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  )
}
