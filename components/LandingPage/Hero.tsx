import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { BannerDataType } from '@/lib/interface'

interface HeroProps {
  bannerData: BannerDataType
}

const Hero: React.FC<HeroProps> = ({ bannerData }) => {
  return (
    <div className="relative mt-[80px] font-DMSans">
      {/* Banner image */}
      <img
        src={bannerData.image}
        alt={bannerData.title}
        className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
      />

      {/* Overlay text & button */}
      <div className="absolute bottom-10 left-10 text-white">
        {/* Title */}
        <p
          className="
            text-3xl md:text-5xl font-extrabold uppercase tracking-widest
            bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
            bg-clip-text text-transparent
            drop-shadow-[2px_2px_6px_rgba(0,0,0,0.4)]
          "
        >
          {bannerData.title || 'New Collection'}
        </p>

        {/* Button */}
        <Link href="/mens-clothing">
          <Button
            variant="secondary"
            className="
              mt-4 px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg
              font-semibold rounded-full
              bg-orange-500 hover:bg-orange-600
              shadow-lg hover:shadow-xl
              transition-all duration-300
            "
          >
            Buy Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default Hero
