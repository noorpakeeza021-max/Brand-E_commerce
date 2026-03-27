import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const { orders } = useOrders();
  const [order, setOrder] = useState(null);
  const orderId = searchParams.get('id');

  useEffect(() => {
    if (orderId && orders.length > 0) {
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [orderId, orders]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-20 h-20 bg-[#00C853] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. Your order has been placed and is being processed.
          You will receive a confirmation email shortly.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center gap-2 text-[#0A84FF] mb-4">
            <Package className="w-6 h-6" />
            <span className="font-semibold">Order #{orderId || 'BRD-2026-0326'}</span>
          </div>
          {order && (
            <div className="text-left space-y-2 mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Items:</span> {order.items?.length || 0} products
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total:</span> ${order.total?.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Shipping to:</span> {order.shipping?.city}, {order.shipping?.country}
              </p>
            </div>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Estimated delivery: 5-7 business days
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/orders"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#0A84FF] text-white rounded-lg font-medium hover:bg-[#0766CC] transition-colors"
          >
            View Orders
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
