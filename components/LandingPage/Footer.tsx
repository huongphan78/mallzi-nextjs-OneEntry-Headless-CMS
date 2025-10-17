import React from "react";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-800 border-t border-gray-200 mt-16">
      {/* Nội dung chính */}
      <div className="py-10 px-6 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
        
        {/* Cột 1 */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Mallzii Store</h2>
          <p className="text-sm mb-1">
            United States: 394 Fee Fee Rd, Maryland Heights, MO 63043
          </p>
          <p className="text-sm mb-1">
            Email:{" "}
            <a href="mailto:support247@mallzii.store" className="underline">
              support247@mallzii.store
            </a>
          </p>
          <p className="text-sm mt-3">Support time: Mon–Sat: 9AM–5PM</p>
          <p className="text-sm mt-3 font-medium">Be Social. Stay Connected!</p>
          <div className="flex gap-4 mt-3">
            <a href="#"><Facebook size={20} /></a>
            <a href="#"><Instagram size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="#"><Mail size={20} /></a>
          </div>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="font-semibold mb-3">Informations</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">All Reviews</a></li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Refund & Replacement</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Payment Method</a></li>
            <li><a href="#">Shipping Information</a></li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">DMCA Report</a></li>
          </ul>
        </div>
      </div>

      {/* Bản quyền + Payment */}

{/* Bản quyền + Payment */}
<div className="w-full border-t border-gray-200 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
  <p>© 2025 Mallzii Store. All rights reserved.</p>
  
  {/* Logo payment */}
  <div className="flex gap-3 mt-4 md:mt-0">
  <div className="h-10 w-16 flex items-center justify-center bg-white border rounded transition-transform duration-200 hover:shadow-lg hover:scale-110 hover:z-10 relative">
    <img 
      src="/visa.png" 
      alt="Visa" 
      title="Visa"
      className="h-full w-full p-1 object-contain"
    />
  </div>
  <div className="h-10 w-16 flex items-center justify-center bg-white border rounded transition-transform duration-200 hover:shadow-lg hover:scale-110 hover:z-10 relative">
    <img 
      src="/paypal.png" 
      alt="PayPal" 
      title="PayPal"
      className="h-full w-full p-1 object-contain"
    />
  </div>
  <div className="h-10 w-16 flex items-center justify-center bg-white border rounded  transition-transform duration-200 hover:shadow-lg hover:scale-110 hover:z-10 relative ">
    <img 
      src="/mastercard.png" 
      alt="Mastercard" 
      title="Mastercard"
      className="h-full w-full p-1 object-contain"
    />
  </div>
  <div className="h-10 w-16 flex items-center justify-center bg-white border rounded transition-transform duration-200 hover:shadow-lg hover:scale-110 hover:z-10 relative">
    <img 
      src="/amex.png" 
      alt="Amex" 
      title="American Express"
      className="h-full w-full p-1 object-contain"
    />
  </div>
  <div className="h-10 w-16 flex items-center justify-center bg-white border rounded transition-transform duration-200 hover:shadow-lg hover:scale-110 hover:z-10 relative">
    <img 
      src="/applepay.png" 
      alt="Apple Pay" 
      title="Apple Pay"
      className="h-full w-full p-1 object-contain"
    />
  </div>
</div>

</div>



    </footer>
  );
};

export default Footer;
