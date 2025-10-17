import React from "react"

const AboutUs = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-center font-DMSans">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">About Us</h1>
      <div className="w-16 h-[2px] bg-gray-300 mx-auto mb-6"></div>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg">
        Mallzii Store is inspired by the concept of a <span className="font-semibold">Drop Pod</span> — 
        compact, efficient, and designed to land exactly where it’s needed. 
        Our fashion follows the same philosophy: purposeful, minimal, and ready-to-wear.
      </p>

      <p className="text-gray-700 leading-relaxed text-base md:text-lg mt-4">
        We believe style should adapt seamlessly to your lifestyle. 
        Every Mallzii piece is crafted to be modern, functional, and timeless. 
        Our mission is simple: <span className="font-semibold">“Style that drops right where you are.”</span>
      </p>
    </section>
  )
}

export default AboutUs
