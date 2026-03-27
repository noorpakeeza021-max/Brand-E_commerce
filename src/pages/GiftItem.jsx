import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, Share2, ShoppingCart, Star, Filter, Search, Package, Truck, Shield } from 'lucide-react';

export default function GiftItem() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const gifts = [
    {
      id: 1,
      name: 'Premium Gift Box Set',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400',
      rating: 4.8,
      reviews: 124,
      category: 'boxes',
      featured: true
    },
    {
      id: 2,
      name: 'Wireless Earbuds Gift',
      price: 149.99,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
      rating: 4.5,
      reviews: 89,
      category: 'electronics'
    },
    {
      id: 3,
      name: 'Luxury Perfume Set',
      price: 199.99,
      originalPrice: 250.00,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400',
      rating: 4.9,
      reviews: 256,
      category: 'beauty',
      featured: true
    },
    {
      id: 4,
      name: 'Gourmet Chocolate Box',
      price: 45.99,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400',
      rating: 4.7,
      reviews: 178,
      category: 'food'
    },
    {
      id: 5,
      name: 'Smart Watch Bundle',
      price: 299.99,
      originalPrice: 350.00,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.6,
      reviews: 312,
      category: 'electronics'
    },
    {
      id: 6,
      name: 'Spa Gift Set',
      price: 89.99,
      originalPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400',
      rating: 4.4,
      reviews: 98,
      category: 'beauty'
    },
    {
      id: 7,
      name: 'Wine Gift Basket',
      price: 129.99,
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
      rating: 4.3,
      reviews: 67,
      category: 'food',
      featured: true
    },
    {
      id: 8,
      name: 'Teddy Bear Plush',
      price: 34.99,
      originalPrice: 45.00,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      rating: 4.8,
      reviews: 445,
      category: 'toys'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Gifts' },
    { id: 'boxes', label: 'Gift Boxes' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'beauty', label: 'Beauty & Spa' },
    { id: 'food', label: 'Gourmet' },
    { id: 'toys', label: 'Toys & Games' },
  ];

  const filteredGifts = gifts.filter(gift => {
    const matchesCategory = category === 'all' || gift.category === category;
    const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders above $50' },
    { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: Package, title: 'Gift Wrapping', desc: 'Free premium wrapping' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#e8f4ff] to-[#f0f7ff] rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              <Gift className="inline w-8 h-8 text-[#0A84FF] mr-2" />
              Perfect Gifts for Every Occasion
            </h1>
            <p className="text-gray-600">Find the perfect gift for your loved ones</p>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                <feature.icon className="w-5 h-5 text-[#0A84FF]" />
                <div>
                  <p className="text-sm font-medium text-gray-800">{feature.title}</p>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              category === cat.id
                ? 'bg-[#0A84FF] text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search gifts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
        />
      </div>

      {/* Featured Banner */}
      {category === 'all' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Gifts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gifts.filter(g => g.featured).map(gift => (
              <div key={gift.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <img src={gift.image} alt={gift.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="font-medium text-gray-800">{gift.name}</h3>
                  <p className="text-[#0A84FF] font-semibold">${gift.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gift Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGifts.map(gift => (
          <div key={gift.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover" />
              {gift.originalPrice && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {Math.round((1 - gift.price / gift.originalPrice) * 100)}% OFF
                </span>
              )}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 line-clamp-2 mb-2">{gift.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600">{gift.rating}</span>
                <span className="text-sm text-gray-400">({gift.reviews})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#0A84FF]">${gift.price.toFixed(2)}</span>
                {gift.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">${gift.originalPrice.toFixed(2)}</span>
                )}
              </div>
              <button className="w-full mt-3 bg-[#0A84FF] text-white py-2 rounded-lg hover:bg-[#0766CC] transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">No gifts found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or category</p>
        </div>
      )}
    </div>
  );
}
