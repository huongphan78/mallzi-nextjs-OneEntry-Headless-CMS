import { MenuItemType } from '@/lib/interface'
import React from 'react'
import { DesktopMenu, MobileMenu } from '../Menu/Menu'

const NavBar = () => {
  const navLinks: MenuItemType[] = [
    { id: 'link0', title: 'Home', url: '/' },
    { id: 'link4', title: 'About Us', url: '/about' },
    { id: 'link1', title: 'Man', url: '/mens-clothing' },
    { id: 'link2', title: 'Woman', url: '/womens-clothing' },
    { id: 'link3', title: 'Featured', url: '/featured' },
    { id: 'link5', title: 'Contact Us', url: '/contact-us' },
    { id: 'link6', title: 'Order Tracking', url: '/order-tracking' }
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        {/* Desktop */}
        <nav className="hidden md:grid grid-cols-3 gap-4 items-center px-6 py-2 border-b border-gray-200">
          <DesktopMenu links={navLinks} />
        </nav>

        {/* Mobile */}
        <nav className="md:hidden flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <MobileMenu links={navLinks} />
        </nav>
      </div>

      {/* padding-top nhỏ hơn vì navbar thấp hơn */}
      <div className="pt-[80px]" />
    </>
  )
}

export default NavBar
