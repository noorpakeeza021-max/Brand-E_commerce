import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Heart, ShoppingBag, LogOut, Edit2, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    avatar: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      country: ''
    }
  });

  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || user.name?.split(' ')[0] || 'User',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || 'user'}`,
        address: user.address || {
          street: '',
          city: '',
          state: '',
          zip: '',
          country: ''
        }
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'address', label: 'My Address', icon: MapPin },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
  ];

  const orders = [
    { id: 'ORD-001', date: '2024-03-15', status: 'Delivered', total: 299.99, items: 3 },
    { id: 'ORD-002', date: '2024-03-10', status: 'Processing', total: 149.50, items: 1 },
    { id: 'ORD-003', date: '2024-03-05', status: 'Shipped', total: 89.99, items: 2 },
  ];

  const wishlist = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
    { id: 2, name: 'Smart Watch Pro', price: 299.99, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200' },
    { id: 3, name: 'Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <img 
                  src={profile.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mx-auto border-4 border-[#0A84FF]"
                />
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0A84FF] rounded-full flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="font-semibold text-gray-800 mt-3">
                {profile.firstName || 'User'} {profile.lastName}
              </h2>
              <p className="text-sm text-gray-500">{profile.email}</p>
              {user?.isAdmin && (
                <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  Admin
                </span>
              )}
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Log Out</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-[#0A84FF] text-white' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-[#0A84FF] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span className="text-sm">Edit Profile</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">First Name</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] disabled:bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] disabled:bg-gray-50"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Company</label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    disabled={!isEditing}
                    className="w-full h-10 px-4 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0A84FF] disabled:bg-gray-50"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4 mt-6">
                  <button 
                    onClick={handleSave}
                    className="bg-[#0A84FF] text-white px-6 py-2 rounded-lg hover:bg-[#0766CC] transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-100 text-gray-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Address</h2>
                <button className="text-[#0A84FF] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                  + Add New Address
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{profile.firstName} {profile.lastName}</p>
                    <p className="text-gray-600 mt-1">{profile.address.street || 'No street address'}</p>
                    <p className="text-gray-600">{profile.address.city}, {profile.address.state} {profile.address.zip}</p>
                    <p className="text-gray-600">{profile.address.country}</p>
                    <p className="text-gray-600 mt-2">{profile.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[#0A84FF] hover:bg-blue-50 px-3 py-1 rounded">Edit</button>
                    <button className="text-red-500 hover:bg-red-50 px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Date</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-3 text-sm font-medium text-gray-600">Items</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-600">Total</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-gray-100">
                        <td className="py-4 text-[#0A84FF] font-medium">{order.id}</td>
                        <td className="py-4 text-gray-600">{order.date}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-gray-600">{order.items} items</td>
                        <td className="py-4 text-right font-semibold">${order.total.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          <button className="text-[#0A84FF] hover:underline text-sm">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">My Wishlist</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-[#0A84FF] font-semibold mt-2">${item.price.toFixed(2)}</p>
                      <button className="w-full mt-3 bg-[#0A84FF] text-white py-2 rounded-lg hover:bg-[#0766CC] transition-colors text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Payment Methods</h2>
                <button className="text-[#0A84FF] hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
                  + Add New Card
                </button>
              </div>

              <div className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/25</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Default</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
