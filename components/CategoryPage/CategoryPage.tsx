"use client"
import { BannerDataType, productType } from '@/lib/interface'
import React, { useEffect, useState } from 'react'
import { ProductCard } from '../CustomCard/CustomCard'

interface CategoryPageProps {
  products: productType[]
  banner: BannerDataType
  variant?: "home" | "collection"
}

const CategoryPage: React.FC<CategoryPageProps> = ({ products, banner, variant = "collection" }) => {
  const [sortedProducts, setSortedProducts] = useState<productType[]>(products)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 16 // 👉 4x4 sản phẩm mỗi trang

  useEffect(() => {
    setSortedProducts(products)
    setCurrentPage(1)
  }, [products])

  // Sort handler
  const handleSort = (option: string) => {
    let sorted = [...products]
    if (option === "low-high") sorted.sort((a, b) => a.price - b.price)
    else if (option === "high-low") sorted.sort((a, b) => b.price - a.price)
    else if (option === "az") sorted.sort((a, b) => a.title.localeCompare(b.title))
    else if (option === "za") sorted.sort((a, b) => b.title.localeCompare(a.title))
    setSortedProducts(sorted)
    setCurrentPage(1)
  }

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  // Hàm render số trang kiểu WooCommerce
  const renderPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages)
      } else if (currentPage > totalPages - 4) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }
    return pages
  }

  return (
    <section className="flex flex-col items-center mt-12 font-Outfit w-full">
      {/* Banner */}
      <div className="relative w-full">
        <img
          src={banner.image}
          className="w-full h-[160px] md:h-[320px] object-cover"
          alt="Category banner"
        />
        <p className="absolute inset-0 flex items-center justify-center text-[2rem] md:text-[4rem] font-bold text-white drop-shadow-lg">
          {banner.title}
        </p>
      </div>

      {/* Toolbar */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-between items-center mt-8 px-4">
        <p className="text-sm text-gray-600 mb-4 md:mb-0">
          Showing <span className="font-semibold">{startIndex + 1}–{Math.min(startIndex + itemsPerPage, sortedProducts.length)}</span>
          {" "}of <span className="font-semibold">{sortedProducts.length}</span> results
        </p>
        <select
          onChange={(e) => handleSort(e.target.value)}
          className="border rounded-md px-3 py-2 text-gray-700 text-sm"
        >
          <option value="">Default sorting</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="az">Name: A - Z</option>
          <option value="za">Name: Z - A</option>
        </select>
      </div>

      {/* Grid Products */}
      <div className="w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 px-4">
        {currentProducts.map((product: productType) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">
        {/* Prev */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          &lt;
        </button>

        {/* Page numbers */}
        {renderPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2">...</span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(Number(page))}
              className={`px-3 py-1 rounded-full ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </section>
  )
}

export default CategoryPage
