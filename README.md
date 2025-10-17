# 🛍️ Mallzii – Next.js + OneEntry Headless CMS

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-^3-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

**Mallzii** là website e-commerce xây dựng bằng **Next.js + React + TypeScript + Tailwind + shadcn/ui**, dùng **OneEntry (Headless CMS)** làm nguồn dữ liệu (Products, Pages, Categories, Menus, Forms).

---


## 1. Tính năng chính
- Trang chủ, danh mục (men/women/featured…), sản phẩm chi tiết.
- Tìm kiếm, lọc (category, sort).
- Giỏ hàng cơ bản (UI) + trang checkout (mở rộng được).
- Tích hợp **OneEntry CMS**: Pages, Products, Categories, Menus, Forms.
- **SEO**: metadata động, robots, sitemap.
- UI hiện đại với **Tailwind + shadcn/ui**.

---

## 2. Kiến trúc & Công nghệ
- **Next.js (App Router)**: ưu tiên **Server Components** để gọi API an toàn; **Client Components** cho UI tương tác.
- **TypeScript**: type an toàn.
- **Tailwind + shadcn/ui**: nhanh, thống nhất, dễ mở rộng.
- **OneEntry Headless CMS**: nguồn dữ liệu duy nhất (SSOT).
- **Fetch**/Axios phía server (không lộ token).

---

## 3. Yêu cầu hệ thống
- **Node.js >= 18**
- **npm / yarn / pnpm / bun** (một trong các package managers)
- Tài khoản & token **OneEntry**

---

## 4. Cấu trúc thư mục
```bash
mallzii-app/
├─ app/
│  ├─ api/
│  │  ├─ contact/route.ts            # Proxy POST form -> OneEntry (server)
│  │  └─ revalidate/route.ts         # (optional) ISR revalidate
│  ├─ product/[id]/page.tsx
│  ├─ featured/page.tsx
│  ├─ mens-clothing/page.tsx
│  ├─ womens-clothing/page.tsx
│  ├─ contact-us/page.tsx
│  ├─ about/page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  ├─ globals.css
│  ├─ hooks/useFetchData.tsx         #   (client) nếu cần
│  └─ action.ts                      #   use server
├─ components/
│  ├─ LandingPage/{Hero,Categories,Featured,Footer}.tsx
│  ├─ Menu/Menu.tsx
│  ├─ ProductPage/page.tsx
│  ├─ CategoryPage/CategoryPage.tsx
│  ├─ Search/ProductSearch.tsx
│  ├─ ShoppingCart/{Cart,CartProviders}.tsx
│  ├─ Button/{AddToCartBtn,Loading}.tsx
│  └─ ui/{button,card,input,accordion,dialog,sheet,radio-group,separator,carousel}.tsx
├─ lib/
│  ├─ oneentry.ts                     # oeFetch<T>() – server-only
│  ├─ interface.ts                    # types/interfaces
│  ├─ utils.ts                        # helpers/formatters
│  └─ seo.ts                          # build metadata/OG tags
├─ public/
│  ├─ logo.svg
│  ├─ payments/{visa,mastercard,paypal,applepay,amex}.png
│  └─ og/default.png
├─ styles/
├─ tests/{unit,e2e}/                  # optional
├─ .env.example
├─ .gitattributes
├─ .gitignore
├─ components.json
├─ next.config.mjs
├─ package.json
├─ postcss.config.mjs
├─ tailwind.config.ts
└─ tsconfig.json

## 5. Cài đặt & Chạy dev
```bash
# 1) Cài phụ thuộc
npm install

# 2) Tạo biến môi trường
cp .env 
# điền giá trị thật cho MY_EMAIL=... & MY_PASSWORD=...&  ONEENTRY_TOKEN để kết nối với BE

# 3) Chạy dev
npm run dev
# mở http://localhost:3000
