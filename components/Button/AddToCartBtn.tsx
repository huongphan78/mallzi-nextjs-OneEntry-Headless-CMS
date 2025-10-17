import React from 'react'
import { Button } from '../ui/button'
import { productType } from '@/lib/interface'
import { useShoppingCart } from 'use-shopping-cart'

interface CartProps {
  product: productType
  quantity?: number
  attrs?: {
    size?: string
    color?: string
  }
  onAdded?: () => void // optional callback sau khi thêm
}

const AddToCartBtn: React.FC<CartProps> = ({ product, quantity = 1, attrs, onAdded }) => {
  const { addItem, handleCartClick } = useShoppingCart()

  // item shape vẫn tương thích với code cũ, chỉ thêm fields mới
  const newProduct: any = {
    name: product?.title ?? '',
    description: product?.description ?? '',
    id: product?.id,
    price: parseFloat(String(product?.price ?? 0)),
    currency: 'USD',
    image: product?.images?.[0] ?? '',
    // ➕ Lưu lựa chọn để hiện trong giỏ/checkout/email
    attributes: attrs,              // bạn có thể đọc lại ở cartDetails[key].attributes
    metadata: attrs,                // nếu sau này dùng Stripe Checkout
    product_data: { metadata: attrs } // đề phòng trường hợp dùng mode checkout
  }

  const handleAdd = () => {
    // Nếu có truyền attrs & muốn bắt buộc chọn, bật check nhẹ (không phá luồng cũ)
    if (attrs && (!attrs.size || !attrs.color)) {
      // bạn có thể thay bằng toast của bạn
      console.warn('Chưa chọn size/color')
    }

    // add với số lượng (use-shopping-cart hỗ trợ { count })
    addItem(newProduct, { count: quantity })
    onAdded?.()
    handleCartClick()
  }

  return (
    <Button
      onClick={handleAdd}
      aria-label="Add to cart"
      className="font-normal mt-4 md:text-[1.25rem] rounded-2xl shadow-sm hover:shadow-md hover:translate-y-[1px] active:scale-[.99]"
    >
      {/* bạn có thể thêm icon nếu muốn */}
      {/* <ShoppingCart className="mr-2 h-5 w-5" /> */}
      Add to cart
    </Button>
  )
}

export default AddToCartBtn
