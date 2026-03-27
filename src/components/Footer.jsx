import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#0A84FF] rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#0A84FF]">Brand</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Your trusted marketplace for electronics, clothing, home goods and more.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@brand.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Commerce St, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-8 h-8 bg-[#0A84FF] rounded-full flex items-center justify-center text-white hover:bg-[#0766CC] text-sm">f</a>
              <a href="#" className="w-8 h-8 bg-[#0A84FF] rounded-full flex items-center justify-center text-white hover:bg-[#0766CC] text-sm">X</a>
              <a href="#" className="w-8 h-8 bg-[#0A84FF] rounded-full flex items-center justify-center text-white hover:bg-[#0766CC] text-sm">in</a>
              <a href="#" className="w-8 h-8 bg-[#0A84FF] rounded-full flex items-center justify-center text-white hover:bg-[#0766CC] text-sm">IG</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/profile" className="hover:text-[#0A84FF]">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-[#0A84FF]">Orders</Link></li>
              <li><Link to="/cart" className="hover:text-[#0A84FF]">Shopping Cart</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#0A84FF]">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/products" className="hover:text-[#0A84FF]">All Products</Link></li>
              <li><Link to="/about" className="hover:text-[#0A84FF]">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#0A84FF]">Contact</Link></li>
              <li><Link to="/help" className="hover:text-[#0A84FF]">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Subscribe</h3>
            <p className="text-sm text-gray-600 mb-3">Get updates on new products and offers.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 h-10 px-3 border border-gray-200 rounded-l-lg outline-none text-sm focus:border-[#0A84FF]"
              />
              <button className="h-10 px-4 bg-[#0A84FF] text-white rounded-r-lg hover:bg-[#0766CC]">
                Join
              </button>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.807 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2023 Ecommerce.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#0A84FF]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#0A84FF]">Terms of Use</Link>
            <Link to="/refunds" className="hover:text-[#0A84FF]">Refunds</Link>
          </div>
          <div className="flex gap-2">
            <span className="text-2xl">💳</span>
            <span className="text-2xl">💳</span>
            <span className="text-2xl">💳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}