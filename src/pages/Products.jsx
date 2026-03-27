import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Grid, List, Filter, X, ChevronDown, Star, ShoppingCart, Heart } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brands: [],
    storage: [],
    priceRange: [0, 5000],
  });
  const [activeFilters, setActiveFilters] = useState([]);

  const brandOptions = ['Apple', 'Samsung', 'Huawei', 'Sony', 'Canon'];
  const storageOptions = ['64GB', '128GB', '256GB', '512GB', '1TB'];
  const categoryTabs = ['Tablets', 'Phones', 'iPads', 'iPod', 'Accessories', 'Smartwatches'];

  const filterProducts = () => {
    let filtered = [...products];
    
    if (categoryParam) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase().includes(categoryParam.toLowerCase())
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter(p => 
        filters.brands.some(b => p.name.toLowerCase().includes(b.toLowerCase()))
      );
    }

    filtered = filtered.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = filterProducts();

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });

    setActiveFilters(prev => {
      const key = `${type}-${value}`;
      return prev.includes(key)
        ? prev.filter(f => f !== key)
        : [...prev, key];
    });
  };

  const clearAllFilters = () => {
    setFilters({ brands: [], storage: [], priceRange: [0, 5000] });
    setActiveFilters([]);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#0A84FF]">Home</Link>
        <span>/</span>
        <span className="text-gray-800">Products</span>
      </nav>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {categoryTabs.map(tab => (
          <button
            key={tab}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm whitespace-nowrap hover:border-[#0A84FF] hover:text-[#0A84FF] transition-colors"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{filteredProducts.length} results</span>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 h-9 px-4 bg-white border border-gray-200 rounded-lg text-sm hover:border-[#0A84FF]"
          >
            <Filter className="w-4 h-4" />
            Filter
            {activeFilters.length > 0 && (
              <span className="w-5 h-5 bg-[#0A84FF] text-white text-xs rounded-full flex items-center justify-center">
                {activeFilters.length}
              </span>
            )}
          </button>
          <div className="flex border border-gray-200 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#0A84FF] text-white' : 'bg-white text-gray-600'} rounded-l-lg`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#0A84FF] text-white' : 'bg-white text-gray-600'} rounded-r-lg`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeFilters.map(filter => {
            const [type, value] = filter.split('-');
            return (
              <span
                key={filter}
                className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#0A84FF] text-sm rounded-full"
              >
                {value}
                <button onClick={() => toggleFilter(type, value)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-500 hover:text-[#0A84FF]"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Sidebar (Mobile) */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Brand</h3>
              <div className="space-y-2">
                {brandOptions.map(brand => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleFilter('brands', brand)}
                      className="w-4 h-4 text-[#0A84FF] rounded border-gray-300 focus:ring-[#0A84FF]"
                    />
                    <span className="text-sm text-gray-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Storage</h3>
              <div className="space-y-2">
                {storageOptions.map(storage => (
                  <label key={storage} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.storage.includes(storage)}
                      onChange={() => toggleFilter('storage', storage)}
                      className="w-4 h-4 text-[#0A84FF] rounded border-gray-300 focus:ring-[#0A84FF]"
                    />
                    <span className="text-sm text-gray-600">{storage}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">Price Range</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1] ]})}
                  className="w-20 h-9 px-2 border border-gray-200 rounded text-sm"
                  placeholder="Min"
                />
                <span className="self-center text-gray-400">-</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value) || 5000] })}
                  className="w-20 h-9 px-2 border border-gray-200 rounded text-sm"
                  placeholder="Max"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full h-10 bg-[#0A84FF] text-white rounded-lg font-medium hover:bg-[#0766CC]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                </div>
                {product.freeShipping && (
                  <span className="text-xs bg-blue-50 text-[#0A84FF] px-2 py-1 rounded">Free Shipping</span>
                )}
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-[#0A84FF]">${product.price.toFixed(2)}</div>
                {product.originalPrice && (
                  <div className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
          <button
            onClick={clearAllFilters}
            className="mt-4 text-[#0A84FF] hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}