import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, MessageCircle, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));
  
  if (!product) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/products" className="text-[#0A84FF] hover:underline mt-4 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const images = [product.image, ...Array(4).fill(product.image)];

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  const priceTiers = [
    { qty: '10-100', price: product.price.toFixed(2) },
    { qty: '101-500', price: (product.price * 0.95).toFixed(2) },
    { qty: '501-1000', price: (product.price * 0.90).toFixed(2) },
    { qty: '1000+', price: (product.price * 0.85).toFixed(2) },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-[#0A84FF]">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-[#0A84FF]">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-800 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === idx ? 'border-[#0A84FF]' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-medium text-gray-800 ml-1">{product.rating}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.reviews} reviews</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{product.sold} sold</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-[#0A84FF]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="bg-[#00C853] text-white text-sm px-2 py-1 rounded">-{discount}%</span>
              </>
            )}
          </div>

          {/* Price Tiers */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-3">Bulk Pricing</p>
            <div className="grid grid-cols-4 gap-2">
              {priceTiers.map((tier, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{tier.qty}</div>
                  <div className="font-semibold text-[#0A84FF]">${tier.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplier Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
            <div className="w-10 h-10 bg-[#0A84FF] rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <p className="font-medium text-gray-800">Supplier: ShopGermany</p>
              <p className="text-sm text-gray-500">Germany · Verified</p>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 text-center border-x border-gray-200 outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addItem({ ...product, quantity })}
              className="flex-1 min-w-[200px] h-10 bg-[#00C853] text-white font-medium rounded-lg hover:bg-[#00a843] transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A84FF]">
              <MessageCircle className="w-4 h-4" />
              Send inquiry
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A84FF]">
              <Heart className="w-4 h-4" />
              Save for later
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#0A84FF]">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Services */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-[#0A84FF]" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="w-5 h-5 text-[#0A84FF]" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <RotateCcw className="w-5 h-5 text-[#0A84FF]" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex border-b border-gray-200">
          {['description', 'reviews', 'shipping', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-medium capitalize ${activeTab === tab ? 'text-[#0A84FF] border-b-2 border-[#0A84FF]' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Product Description</h3>
              <p className="text-gray-600 mb-4">
                {product.name} - High quality {product.category.toLowerCase()} product with excellent features and design.
                Perfect for everyday use with durable construction and premium materials.
              </p>
              <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Premium quality materials</li>
                <li>Modern design and styling</li>
                <li>Durable and long-lasting</li>
                <li>Easy to use and maintain</li>
                <li>1 year warranty included</li>
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Customer Reviews</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                      <span className="font-medium">Customer {i}</span>
                      <div className="flex ml-auto">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Great product! Exactly as described and fast shipping.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Shipping Information</h3>
              <p className="text-gray-600 mb-2">Free shipping on orders over $50.</p>
              <p className="text-gray-600 mb-2">Standard delivery: 5-7 business days.</p>
              <p className="text-gray-600">Express delivery: 2-3 business days (additional cost).</p>
            </div>
          )}
          {activeTab === 'about' && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">About the Seller</h3>
              <p className="text-gray-600 mb-2">ShopGermany - Premium electronics supplier based in Germany.</p>
              <p className="text-gray-600">Member since 2020 · 98% positive feedback · Verified supplier</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}