import React, { useState, useEffect } from 'react';
import { Search, Eye, Package, Clock, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { getAllOrders, updateOrderStatus } from '../../services/orderService';

const App = () => {
  const [currentPage, setCurrentPage] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage('details');
  };

  const handleBackToOrders = () => {
    setCurrentPage('orders');
    setSelectedOrder(null);
  };

  return (
    <>
      {currentPage === 'orders' && <AdminOrders onViewOrder={handleViewOrder} />}
      {currentPage === 'details' && <OrderDetailsPage order={selectedOrder} onBack={handleBackToOrders} />}
    </>
  );
};


const AdminOrders = ({ onViewOrder }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Orders');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = ['All Orders', 'Pending', 'Shipping', 'Processing', 'Delivered', 'Cancelled'];

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== 'All Orders') {
        params.status = statusFilter;
      }
      
      const response = await getAllOrders(params);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      Shipping: 'bg-blue-100 text-blue-700',
      Processing: 'bg-yellow-100 text-yellow-700',
      Delivered: 'bg-green-100 text-green-700',
      Cancelled: 'bg-red-100 text-red-700',
      Pending: 'bg-gray-100 text-gray-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Shipping: <Package className="w-3.5 h-3.5" />,
      Processing: <Clock className="w-3.5 h-3.5" />,
      Delivered: <CheckCircle className="w-3.5 h-3.5" />,
      Cancelled: <XCircle className="w-3.5 h-3.5" />,
      Pending: <Clock className="w-3.5 h-3.5" />
    };
    return icons[status] || null;
  };

  const filteredOrders = orders.filter(order => {
    const searchTerm = searchQuery.toLowerCase();
    const matchesSearch = 
      order.orderNumber?.toLowerCase().includes(searchTerm) ||
      order.userId?.name?.toLowerCase().includes(searchTerm) ||
      order.userId?.email?.toLowerCase().includes(searchTerm);
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white-500 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">Orders Management</h1>
          <p className="text-black-800 text-sm">Manage and track all customer orders</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">All Orders</h2>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by order number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-orange-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 border border-orange-500 rounded-full text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {statusFilter}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      {statusOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setStatusFilter(option);
                            setIsDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading orders...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : filteredOrders.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{order.userId?.name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{order.userId?.email || ''}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{order.orderItems?.length || 0}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">${order.total?.toFixed(2) || '0.00'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => onViewOrder(order)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">No orders found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Order Details Page Component (placeholder - you can enhance this later)
const OrderDetailsPage = ({ order, onBack }) => {
  return (
    <div className="min-h-screen bg-white-500 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50"
        >
          ← Back to Orders
        </button>
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Order Number:</span> {order.orderNumber}
            </div>
            <div>
              <span className="font-semibold">Customer:</span> {order.userId?.name || 'Unknown'}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {order.status}
            </div>
            <div>
              <span className="font-semibold">Total:</span> ${order.total?.toFixed(2) || '0.00'}
            </div>
            <div>
              <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
