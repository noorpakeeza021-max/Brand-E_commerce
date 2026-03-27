import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow group">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-[#00C853] text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
          {product.freeShipping && (
            <span className="absolute bottom-2 left-2 bg-[#0A84FF] text-white text-xs px-2 py-1 rounded">
              Free Shipping
            </span>
          )}
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-[#0A84FF] mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-[#0A84FF]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex gap-1">
            <button 
              onClick={(e) => { e.preventDefault(); addItem(product); }}
              className="p-2 text-gray-400 hover:text-[#0A84FF] hover:bg-blue-50 rounded transition-colors"
              title="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}