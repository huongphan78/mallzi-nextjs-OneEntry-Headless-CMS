import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/LandingPage/NavBar";
import Footer from "@/components/LandingPage/Footer";
import CartProviders from "@/components/ShoppingCart/CartProviders";
import { CartModal } from "@/components/ShoppingCart/Cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ember & Oak",
  description: "Fashion Ecommerce Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Outfit bg-gray-50">
        <CartProviders>
          <NavBar />
          <CartModal />

          {/* Nội dung chính trong box */}
          <main className="my-4 mx-12 bg-white rounded-xl shadow-sm">
            {children}
          </main>

          {/* Footer full width */}
          <Footer />
        </CartProviders>
      </body>
    </html>
  );
}
