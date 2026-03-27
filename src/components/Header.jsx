import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, MessageSquare, ShoppingCart, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [searchCategory, setSearchCategory] = useState('All category');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = ['All category', 'Automobiles', 'Clothes', 'Home interiors', 'Computer & tech', 'Tools & equipment', 'Sports', 'Animal & pets'];

  const navLinks = [
    { label: 'All category', href: '/products' },
    { label: 'Hot offers', href: '/products?filter=hot' },
    { label: 'Gift boxes', href: '/gift' },
    { label: 'Projects', href: '/projects' },
    { label: 'Menu item', href: '/menu' },
    { label: 'Help', href: '/help' },
    { label: 'About', href: '/contact' },
    { label: 'Contact', href: '/contact-us' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between px-4 py-3 gap-4">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-[#0A84FF] rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#0A84FF]">Brand</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <div className="flex w-full border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative">
                <button 
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  className="h-10 px-3 flex items-center gap-2 bg-gray-50 border-r border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
                >
                  {searchCategory}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {categoryDropdown && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setSearchCategory(cat); setCategoryDropdown(false); }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input 
                type="text" 
                placeholder="Search for products..."
                className="flex-1 h-10 px-4 outline-none text-sm"
              />
              <button className="h-10 px-6 bg-[#0A84FF] text-white font-medium hover:bg-[#0766CC] transition-colors">
                Search
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {!user ? (
              <>
                <Link to="/login" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Login</span>
                </Link>
                <Link to="/register" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Register</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Profile</span>
                </Link>
                <Link to="/messages" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs">Message</span>
                </Link>
                <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="text-xs">Orders</span>
                </Link>
                <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-gray-600 hover:text-red-500">
                  <LogOut className="w-5 h-5" />
                  <span className="text-xs">Logout</span>
                </button>
              </>
            )}
            <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#0A84FF]">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#00C853] text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs">My cart</span>
            </Link>
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className="hidden md:flex border-t border-gray-100 px-4 py-2 overflow-x-auto">
          {navLinks.map((link, idx) => (
            <Link 
              key={idx} 
              to={link.href}
              className="whitespace-nowrap px-4 py-1 text-sm text-gray-600 hover:text-[#0A84FF] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4">
            <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-4">
              <select className="h-10 px-2 bg-gray-50 border-r border-gray-200 text-sm">
                {categories.map(cat => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
              <input 
                type="text" 
                placeholder="Search..."
                className="flex-1 h-10 px-3 outline-none text-sm"
              />
              <button className="h-10 px-4 bg-[#0A84FF] text-white">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex justify-around border-t py-3">
            {!user ? (
              <>
                <Link to="/login" className="flex flex-col items-center gap-1 text-gray-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Login</span>
                </Link>
                <Link to="/register" className="flex flex-col items-center gap-1 text-gray-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Register</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600">
                  <User className="w-5 h-5" />
                  <span className="text-xs">Profile</span>
                </Link>
                <Link to="/messages" className="flex flex-col items-center gap-1 text-gray-600">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-xs">Message</span>
                </Link>
                <Link to="/orders" className="flex flex-col items-center gap-1 text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                  <span className="text-xs">Orders</span>
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="flex flex-col items-center gap-1 text-gray-600">
                  <LogOut className="w-5 h-5" />
                  <span className="text-xs">Logout</span>
                </button>
              </>
            )}
            <Link to="/cart" className="flex flex-col items-center gap-1 text-gray-600 relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C853] text-white text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
              <span className="text-xs">Cart</span>
            </Link>
          </div>
          <div className="border-t py-2">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                to={link.href}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}