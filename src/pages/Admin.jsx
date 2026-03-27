import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, Eye, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products as initialProducts } from '../data/products';

export default function Admin() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.email === 'admin@brand.com';

  if (!isAdmin) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-500 mb-6">You need admin privileges to access this page.</p>
        <Link to="/login" className="text-[#0A84FF] hover:underline">Login as admin</Link>
      </div>
    );
  }

  const stats = [
    { label: 'Total Sales', value: '$45,231', icon: DollarSign, change: '+12%', color: 'bg-blue-500' },
    { label: 'Orders', value: '1,234', icon: ShoppingCart, change: '+8%', color: 'bg-green-500' },
    { label: 'Products', value: products.length, icon: Package, change: '+3', color: 'bg-purple-500' },
    { label: 'Users', value: '5,678', icon: Users, change: '+15%', color: 'bg-orange-500' },
  ];

  const sampleOrders = [
    { id: 'ORD-001', customer: 'John Doe', total: 299.99, status: 'Pending', date: '2026-03-26' },
    { id: 'ORD-002', customer: 'Jane Smith', total: 149.50, status: 'Shipped', date: '2026-03-25' },
    { id: 'ORD-003', customer: 'Mike Johnson', total: 89.99, status: 'Delivered', date: '2026-03-24' },
  ];

  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Welcome, {user.name}</span>
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:sticky lg:top-24">
            <button
              className="lg:hidden mb-4 p-2 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block space-y-1`}>
              {['dashboard', 'products', 'orders', 'users'].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 rounded-lg capitalize ${activeTab === tab ? 'bg-[#0A84FF] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {activeTab === 'dashboard' && (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm text-green-500">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleOrders.map(order => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 text-sm text-[#0A84FF]">{order.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">{order.customer}</td>
                          <td className="py-3 px-4 text-sm text-gray-800">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Products</h2>
                <button
                  onClick={() => { setEditingProduct(null); setShowProductModal(true); }}
                  className="flex items-center gap-2 px-4 py-2 bg-[#0A84FF] text-white rounded-lg hover:bg-[#0766CC]"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Product</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Stock</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-gray-100">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="text-sm text-gray-800">{product.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">${product.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{product.category}</td>
                        <td className="py-3 px-4 text-sm text-green-500">In Stock</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-400 hover:text-[#0A84FF]">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => { setEditingProduct(product); setShowProductModal(true); }}
                              className="p-2 text-gray-400 hover:text-[#0A84FF]"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleOrders.map(order => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-[#0A84FF]">{order.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{order.customer}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{order.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">${order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <select className="text-sm border border-gray-200 rounded px-2 py-1">
                            <option>Pending</option>
                            <option>Shipped</option>
                            <option>Delivered</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-sm text-[#0A84FF] hover:underline">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Users</h2>
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>User management coming soon</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Product Name</label>
                <input 
                  type="text" 
                  defaultValue={editingProduct?.name}
                  className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Category</label>
                  <select 
                    defaultValue={editingProduct?.category}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF]"
                  >
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Fashion</option>
                    <option>Home</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea 
                  rows={4}
                  defaultValue={editingProduct?.description}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] resize-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="flex-1 h-10 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 h-10 bg-[#0A84FF] text-white rounded-lg hover:bg-[#0766CC]"
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}