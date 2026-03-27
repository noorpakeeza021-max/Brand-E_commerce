import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Plus, Minus, ShoppingCart, Heart, Search, Filter, Star, Clock, Flame, Leaf, ChevronRight } from 'lucide-react';

export default function MenuItem() {
  const [category, setCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState({});

  const menuItems = [
    {
      id: 1,
      name: 'Classic Beef Burger',
      description: 'Juicy beef patty with fresh lettuce, tomato, and special sauce',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      category: 'burgers',
      rating: 4.7,
      time: '15-20 min',
      calories: 520,
      popular: true,
      dietary: []
    },
    {
      id: 2,
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomatoes, and basil on classic crust',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1604382345074-af4b05b05cf7?w=400',
      category: 'pizza',
      rating: 4.8,
      time: '20-25 min',
      calories: 780,
      popular: true,
      dietary: ['vegetarian']
    },
    {
      id: 3,
      name: 'Grilled Salmon',
      description: 'Fresh Atlantic salmon with seasonal vegetables',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
      category: 'mains',
      rating: 4.9,
      time: '25-30 min',
      calories: 420,
      popular: false,
      dietary: ['healthy']
    },
    {
      id: 4,
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan and croutons',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400',
      category: 'salads',
      rating: 4.5,
      time: '10-15 min',
      calories: 280,
      popular: false,
      dietary: ['vegetarian', 'healthy']
    },
    {
      id: 5,
      name: 'Spicy Chicken Wings',
      description: 'Crispy wings with our signature spicy sauce',
      price: 11.99,
      image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400',
      category: 'appetizers',
      rating: 4.6,
      time: '15-20 min',
      calories: 450,
      popular: true,
      dietary: ['spicy']
    },
    {
      id: 6,
      name: 'Mushroom Risotto',
      description: 'Creamy arborio rice with wild mushrooms',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
      category: 'mains',
      rating: 4.7,
      time: '25-30 min',
      calories: 520,
      popular: false,
      dietary: ['vegetarian']
    },
    {
      id: 7,
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400',
      category: 'desserts',
      rating: 4.9,
      time: '10-15 min',
      calories: 380,
      popular: true,
      dietary: []
    },
    {
      id: 8,
      name: 'Fresh Orange Juice',
      description: ' freshly squeezed orange juice',
      price: 4.99,
      image: 'https://images.unsplash.com/photo-1600271886742-f04cd1b25ccb?w=400',
      category: 'drinks',
      rating: 4.4,
      time: '5 min',
      calories: 120,
      popular: false,
      dietary: ['vegan', 'healthy']
    },
  ];

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'appetizers', label: 'Appetizers' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'pizza', label: 'Pizza' },
    { id: 'salads', label: 'Salads' },
    { id: 'mains', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', category: 'drinks', label: 'Drinks' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = category === 'all' || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 1) + delta)
    }));
  };

  const getDietaryIcon = (type) => {
    switch (type) {
      case 'vegetarian': return <Leaf className="w-4 h-4 text-green-500" />;
      case 'vegan': return <Leaf className="w-4 h-4 text-green-600" />;
      case 'healthy': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'spicy': return <Flame className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center md:justify-start gap-2">
              <Menu className="w-8 h-8 text-orange-500" />
              Our Menu
            </h1>
            <p className="text-gray-600">Delicious meals prepared with love</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-600">4.7+ Rating</span>
            </div>
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
                ? 'bg-orange-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-orange-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Popular Items */}
      {category === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
            Popular Items
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.filter(item => item.popular).map(item => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              {item.popular && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Popular
                </span>
              )}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
                  <Heart className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1 mb-2">
                {item.dietary.map(type => (
                  <span key={type} className="p-1 bg-gray-100 rounded" title={type}>
                    {getDietaryIcon(type)}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">{item.description}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </span>
                <span>•</span>
                <span>{item.calories} cal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantities[item.id] || 1}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center hover:bg-orange-600"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button className="w-full mt-3 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Menu className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">No items found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or category</p>
        </div>
      )}
    </div>
  );
}
