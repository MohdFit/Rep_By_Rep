import { MoreHorizontal } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    Delivered: { bg: 'bg-green-50', text: 'text-green-600', dot: 'bg-green-500' },
    Shipping: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-500' },
    Processing: { bg: 'bg-yellow-50', text: 'text-yellow-600', dot: 'bg-yellow-500' },
    Cancelled: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500' },
  };
  const style = styles[status] || styles.Delivered;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
};

export default function RecentOrdersTable() {
  const orders = [
    { id: '#ORD-2024-001', customer: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Shipping', amount: '$40' },
    { id: '#ORD-2024-002', customer: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Processing', amount: '$50' },
    { id: '#ORD-2024-003', customer: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Shipping', amount: '$50' },
    { id: '#ORD-2024-004', customer: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Cancelled', amount: '$50' },
    { id: '#ORD-2024-005', customer: 'Sarah Johnson', date: 'Jan 15, 2024', status: 'Delivered', amount: '$50' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">Recent Orders</h3>
        <p className="text-xs text-gray-500">Latest customer orders</p>
      </div>
      <div className="overflow-x-auto">
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
      </div>
    </div>
  );
}
