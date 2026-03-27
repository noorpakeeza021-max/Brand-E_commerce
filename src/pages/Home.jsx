import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { products, categories, heroProducts, services, regions } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 13, mins: 45, secs: 30 });
  const [inquiryForm, setInquiryForm] = useState({ item: '', details: '', quantity: 1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, mins, secs } = prev;
        secs--;
        if (secs < 0) { secs = 59; mins--; }
        if (mins < 0) { mins = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
        return { days, hours, mins, secs };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.slice(0, 5);
  const homeOutdoorProducts = products.slice(5, 11);
  const electronicsProducts = products.slice(11, 17);
  const recommendedProducts = products.slice(5, 15);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert('Inquiry sent! Suppliers will contact you soon.');
    setInquiryForm({ item: '', details: '', quantity: 1 });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Category</h3>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link 
                    to={`/products?category=${cat.name}`}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A84FF] transition-colors"
                  >
                    <span className="text-lg">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          {/* Hero Banner */}
          <section className="relative bg-gradient-to-r from-[#e8f4ff] to-[#f0f7ff] rounded-xl overflow-hidden mb-8">
            <div className="relative z-10 p-8 md:p-12">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Latest trending<br/>Electronic items
              </h1>
              <button className="inline-flex items-center gap-2 bg-[#0A84FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0766CC] transition-colors">
                Learn more
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:flex gap-4 pr-8">
              {heroProducts.map((prod, idx) => (
                <div key={idx} className="relative">
                  <img 
                    src={prod.image} 
                    alt={prod.name}
                    className="w-40 h-40 object-cover rounded-lg shadow-lg"
                  />
                  <span className="absolute -top-2 -right-2 bg-[#00C853] text-white text-xs px-2 py-1 rounded">
                    {prod.discount}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Deals and Offers */}
          <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Deals and offers</h2>
                <p className="text-sm text-gray-500">Today&apos;s deals</p>
              </div>
              <div className="flex gap-2">
                {['Days', 'Hours', 'Mins', 'Secs'].map((label, idx) => (
                  <div key={label} className="text-center">
                    <div className="bg-[#0A84FF] text-white rounded-lg px-3 py-2 font-bold min-w-[50px]">
                      {Object.values(timeLeft)[idx].toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {dealProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Home and Outdoor */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Home and outdoor</h2>
              <Link to="/products?category=home" className="text-[#0A84FF] text-sm flex items-center gap-1 hover:underline">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {homeOutdoorProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Consumer Electronics */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Consumer electronics and gadgets</h2>
              <Link to="/products?category=electronics" className="text-[#0A84FF] text-sm flex items-center gap-1 hover:underline">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {electronicsProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Inquiry Section */}
          <section className="bg-[#0A84FF] rounded-xl p-8 mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-2">An easy way to send requests to all suppliers</h2>
                <p className="text-blue-100">Connect with suppliers for bulk orders</p>
              </div>
              <form 
                onSubmit={handleInquirySubmit}
                className="bg-white rounded-xl p-6 w-full lg:w-auto min-w-[350px]"
              >
                <h3 className="font-semibold text-gray-800 mb-4">Send quote to suppliers</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="What item you need?"
                    value={inquiryForm.item}
                    onChange={e => setInquiryForm({ ...inquiryForm, item: e.target.value })}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                    required
                  />
                  <textarea
                    placeholder="Details..."
                    value={inquiryForm.details}
                    onChange={e => setInquiryForm({ ...inquiryForm, details: e.target.value })}
                    className="w-full h-20 px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] resize-none"
                  />
                  <div className="flex gap-4">
                    <input
                      type="number"
                      min="1"
                      placeholder="Quantity"
                      value={inquiryForm.quantity}
                      onChange={e => setInquiryForm({ ...inquiryForm, quantity: parseInt(e.target.value) || 1 })}
                      className="w-24 h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                      required
                    />
                    <button 
                      type="submit"
                      className="flex-1 bg-[#0A84FF] text-white font-medium rounded-lg hover:bg-[#0766CC] transition-colors"
                    >
                      Send inquiry
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>

          {/* Recommended Items */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended items</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {recommendedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Extra Services */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our extra services</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-1">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Suppliers by Region */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Suppliers by region</h2>
            <div className="flex flex-wrap gap-4">
              {regions.map((region, idx) => (
                <button 
                  key={idx}
                  className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{region.flag}</span>
                  <span className="text-sm text-gray-700">{region.name}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}