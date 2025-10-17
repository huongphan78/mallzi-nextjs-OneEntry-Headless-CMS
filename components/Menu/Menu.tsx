'use client'
import { MenuItemType } from '@/lib/interface'
import Link from 'next/link'
import React, { useState } from 'react'
import Cart from '../ShoppingCart/Cart'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoIosArrowForward, IoIosCloseCircleOutline } from 'react-icons/io'
import { Separator } from '@radix-ui/react-separator'
import ProductSearch from '@/components/Search/ProdutSearch'

interface MenuProps {
  links: MenuItemType[]
}

export const DesktopMenu: React.FC<MenuProps> = ({ links }) => {
  return (
    <>
      {/* Logo trái */}
      <Link href="/" className="flex items-center">
        {/* logo nhỏ hơn */}
        <img src="/logo.svg" alt="Mallzii Logo" className="h-12 md:h-14 w-auto" />
      </Link>

      {/* Search bar giữa */}
      <div className="flex w-[90%] max-w-[900px] h-[40px] items-center border border-gray-300 rounded-full shadow-sm focus-within:border-blue-500 overflow-hidden">
  <ProductSearch
    type="text"
    placeholder="What are you looking for?"
    className="flex-1 px-3 py-1 outline-none text-sm text-gray-700 placeholder-gray-400 rounded-l-full"
  />
  <button className="px-6 py-2 bg-blue-900 text-white text-sm font-semibold hover:bg-blue-800 transition rounded-full ml-2">
    Search
  </button>
</div>

      {/* Cart phải */}
      <div className="justify-self-end col-start-3">
        <Cart />
      </div>

      {/* Menu dưới */}
      <nav className="col-span-3 mt-2 flex justify-center gap-6 text-gray-700 text-[0.95rem]">
        {links.map((link) => {
          if (['Man', 'Woman', 'Featured'].includes(link.title)) return null
          return (
            <Link
              key={link.id}
              href={link.url}
              className="hover:font-semibold hover:underline"
            >
              {link.title}
            </Link>
          )
        })}

        {/* Dropdown Products */}
        <div className="relative group inline-block">
          <button className="hover:font-semibold hover:underline">Products</button>
          <div className="absolute left-0 top-full w-full h-3 bg-transparent"></div>
          <div className="absolute left-0 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-40 text-sm 
                          opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                          transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50">
            {links
              .filter((l) => ['Man', 'Woman', 'Featured'].includes(l.title))
              .map((sub) => (
                <Link key={sub.id} href={sub.url} className="block px-4 py-2 hover:bg-gray-100">
                  {sub.title}
                </Link>
              ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export const MobileMenu: React.FC<MenuProps> = ({ links }) => {
  const [isOpened, setOpen] = useState(false)

  return (
    <>
      {/* Nút menu */}
      <ul>
        {isOpened ? (
          <div className="overlay">
            <div className="p-6 fixed left-0 top-0 w-[80%] h-screen z-[20] flex flex-col text-[1rem] bg-white text-black shadow-md">
              {links.map((link: MenuItemType) => (
                <React.Fragment key={link.id}>
                  <li className="flex items-center justify-between">
                    <Link href={link.url}>{link.title}</Link>
                    <IoIosArrowForward />
                  </li>
                  <Separator className="my-1" />
                </React.Fragment>
              ))}
            </div>
            <IoIosCloseCircleOutline
              onClick={() => setOpen(false)}
              size={40}
              color="white"
              className="cursor-pointer fixed top-4 right-4 z-[30]"
            />
          </div>
        ) : (
          <AiOutlineMenu onClick={() => setOpen(true)} className="cursor-pointer" size={24} />
        )}
      </ul>

      {/* Logo giữa */}
      <Link href="/" className="justify-self-center">
        <img src="/logo.svg" alt="Logo" className="w-24 md:w-28" />
      </Link>

      {/* Cart phải */}
      <Cart />
    </>
  )
}
