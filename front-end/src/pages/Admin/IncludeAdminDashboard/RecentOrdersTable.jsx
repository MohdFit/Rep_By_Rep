import { MoreHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getOrderStats } from '../../../services/orderService';

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    Shipping: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
    Processing: { bg: 'bg-yellow-50', text: 'text-yellow-600', dot: 'bg-yellow-500' },
    Cancelled: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
    Pending: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-500' },
  };
  const style = styles[status] || styles.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
};

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await getOrderStats();
        if (response.success && response.data.recentOrders) {
          const formattedOrders = response.data.recentOrders.map(order => ({
            id: order.orderNumber,
            customer: order.userId?.name || 'Unknown',
            date: new Date(order.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            status: order.status,
            amount: `$${order.total.toFixed(2)}`
          }));
          setOrders(formattedOrders);
        }
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">Recent Orders</h3>
        <p className="text-xs text-gray-500">Latest customer orders</p>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading orders...</div>
        ) : orders.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b ">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Order ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{order.date}</td>
                  <td className="py-3 px-4"><StatusBadge status={order.status} /></td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.amount}</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        )}
      </div>
    </div>
  );
}

