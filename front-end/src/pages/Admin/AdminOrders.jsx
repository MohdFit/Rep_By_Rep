import React, { useEffect, useState } from 'react';
import { Search, Eye, Package, Clock, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import { getAllOrders } from '../../services/orderService';


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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getAllOrders();
        if (res.success) {
          setOrders(res.data || []);
        }
      } catch (_) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusOptions = ['All Orders', 'Shipping', 'Processing', 'Delivered', 'Canceled'];

  const getStatusStyle = (status) => {
    const styles = {
      Shipping: 'bg-blue-100 text-blue-700',
      Processing: 'bg-yellow-100 text-yellow-700',
      Delivered: 'bg-green-100 text-green-700',
      Canceled: 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      Shipping: <Package className="w-3.5 h-3.5" />,
      Processing: <Clock className="w-3.5 h-3.5" />,
      Delivered: <CheckCircle className="w-3.5 h-3.5" />,
      Canceled: <XCircle className="w-3.5 h-3.5" />
    };
    return icons[status] || null;
  };

  const filteredOrders = orders
    .map(o => {
      // userId is populated as { _id, name, email } or just an id string
      let customerName = '—';
      if (o.userId && typeof o.userId === 'object') {
        customerName = o.userId.name || o.userId.email || o.userId._id || '—';
      } else if (o.userId) {
        customerName = o.userId;
      }
      return {
        _raw: o,
        id: o.orderNumber || o._id || 'N/A',
        customer: customerName,
        date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: o.orderItems?.length || 0,
        status: o.status || 'Pending',
        amount: typeof o.total === 'number' ? o.total : Number(o.total || 0)
      };
    })
    .filter(order => {
      const matchesSearch = String(order.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(order.customer).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Orders' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
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
                {loading && (
                  <tr><td className="px-6 py-4" colSpan={7}>Loading orders...</td></tr>
                )}
                {!loading && filteredOrders.length === 0 && (
                  <tr><td className="px-6 py-4" colSpan={7}>No orders found.</td></tr>
                )}
                {!loading && filteredOrders.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 leading-tight">
                        {order.id.split('-').slice(0, 2).join('-')}
                        <br />
                        {order.id.split('-').slice(2).join('-')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 leading-tight">
                        {order.date.split(',')[0]},
                        <br />
                        {order.date.split(',')[1]}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{order.items}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.amount}</td>
                    <td className="px-6 py-4">
                      <div className="inline-block p-0.5 border border-gray-300 rounded-lg shadow-sm bg-white">
                        <button
                          onClick={() => onViewOrder(order._raw)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetailsPage = ({ order, onBack }) => {
  const [currentStatus, setCurrentStatus] = useState(order?.status?.toLowerCase() || 'pending');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const orderData = {
    orderId: order?.orderNumber || order?._id || 'N/A',
    items: (order?.orderItems || []).map((it, idx) => ({
      id: it._id || idx,
      image: it.product?.image || '',
      name: it.product?.title || 'Training Plan',
      price: it.unitPrice || 0,
      quantity: it.quantity || 1
    })),
    customer: {
      name: order?.user?.name || '—',
      email: order?.user?.email || '—',
      phone: order?.user?.phone || '—',
      address: order?.shippingAddress || '—',
      paymentMethod: order?.paymentMethod || '—',
      orderDate: order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—',
      totalAmount: typeof order?.total === 'number' ? order.total : Number(order?.total || 0)
    }
  };

  const statuses = [
    { id: 'pending', label: 'pending', number: 1 },
    { id: 'processing', label: 'processing', number: 2 },
    { id: 'shipped', label: 'shipped', number: 3 },
    { id: 'delivered', label: 'delivered', number: 4 }
  ];

  const statusOptions = ['pending', 'processing', 'shipped', 'delivered', 'canceled'];

  const getStatusIndex = (status) => {
    return statuses.findIndex(s => s.id === status);
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  const activeCircleUrls = [
    '/assets/images/admin/adminPage/1.png', // This will be used when index is 0
    '/assets/images/admin/adminPage/2.png', // This will be used when index is 1
    '/assets/images/admin/adminPage/3.png',  // This will be used when index is 2
    '/assets/images/admin/adminPage/4.png'  // This will be used when index is 3
    
  ];


  return (
    <div className="min-h-screen bg-white-50 p-8">
      <div className="">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">
            Order Details
          </h1>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 border border-orange-500 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Back to Orders
          </button>
        </div>


        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-8">Order {orderData.orderId}</h2>

          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {statuses.map((status, index) => (
                <div
                  key={status.id}
                  className="flex flex-col items-center relative"
                  style={{ zIndex: 1 }}
                >
                  <div
                    style={
                      index === currentStatusIndex
                        ? {
                          backgroundImage: `url(${activeCircleUrls[index]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                        : {}
                    }
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm mb-3 transition-all duration-300 ${
                      index < currentStatusIndex
                        ? 'bg-orange-500 text-white'
                        : index === currentStatusIndex
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                  >
                    {status.number}
                  </div>
                  <span
                    className={`font-poppins font-light text-2xl leading-none text-center ${
                      // This logic was already correct
                      index <= currentStatusIndex
                        ? 'text-[#0E1830]'
                        : 'text-gray-400'
                      }`}
                  >
                    {status.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between shadow-lg p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Size: {item.size} • {item.color}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{item.price} $</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Update Status</h3>
            <div className="relative inline-block">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-orange-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px] justify-between"
              >
                {currentStatus}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-orange-200 rounded-lg shadow-lg z-10">
                  {statusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setCurrentStatus(option);
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

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>

          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Name</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.email}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Phone</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.phone}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Address</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.address}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Payment Method</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.paymentMethod}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Order Date</p>
              <p className="text-sm font-medium text-gray-900">{orderData.customer.orderDate}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Total Amount</p>
              <p className="text-xl font-semibold text-orange-500">{orderData.customer.totalAmount}$</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

