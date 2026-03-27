import { Link } from 'react-router-dom';
import { Trash2, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeItem, updateQuantity, cartTotal } = useCart();

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet.</p>
          <Link to="/products" className="inline-block bg-[#0A84FF] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0766CC]">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({cart.length} items)</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
              <div className="col-span-5">Product</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            {cart.map(item => (
              <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 items-center">
                <div className="col-span-5 flex gap-4">
                  <Link to={`/product/${item.id}`} className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div>
                    <Link to={`/product/${item.id}`} className="font-medium text-gray-800 hover:text-[#0A84FF] line-clamp-2">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-[#0A84FF] font-semibold">${item.price.toFixed(2)}</span>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center border-x border-gray-200 text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-right">
                  <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Saved for later */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Saved for later (0 items)</h2>
            <p className="text-gray-500 text-sm">Items you save will appear here</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-80">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                <span className="text-gray-800">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">
                  {shipping === 0 ? <span className="text-[#00C853]">Free</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="text-gray-800">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-xl font-bold text-[#0A84FF]">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {cartTotal < 50 && (
              <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg mb-4">
                Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}

            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
              />
            </div>

            <Link
              to="/checkout"
              className="block w-full h-12 bg-[#00C853] text-white text-center font-medium rounded-lg hover:bg-[#00a843] transition-colors flex items-center justify-center"
            >
              Proceed to Checkout
            </Link>

            <div className="mt-4 flex justify-center gap-2">
              <span className="text-2xl">💳</span>
              <span className="text-2xl">💳</span>
              <span className="text-2xl">💳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}