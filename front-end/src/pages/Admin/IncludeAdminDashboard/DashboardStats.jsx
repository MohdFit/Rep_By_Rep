import { ShoppingBag, DollarSign, Users, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../../services/statsService';

const StatCard = ({ icon, label, value, bgColor, loading }) => (
  <div
    className="bg-white p-5 rounded-lg border flex flex-col rounded-2xl shadow-lg items-center justify-center"
    style={{
      width: "250px",
      height: "174px",
    }}
  >
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${bgColor}`}
    >
      {icon}
    </div>
    <p className="text-xs text-gray-500 mb-2 text-center">{label}</p>
    <p className="text-2xl font-bold text-gray-800 text-center">
      {loading ? 'Loading...' : value}
    </p>
  </div>
);




export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: '0.00',
    newUsersThisWeek: 0,
    bestSellingProduct: 'N/A'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-wrap gap-12 justify-center">
      <StatCard
        icon={<ShoppingBag size={24} className="text-orange-500" />}
        label="Total Orders"
        value={stats.totalOrders}
        bgColor="bg-orange-50"
        loading={loading}
      />
      <StatCard
        icon={<DollarSign size={24} className="text-green-500" />}
        label="Total Revenue"
        value={`$${stats.totalRevenue}`}
        bgColor="bg-green-50"
        loading={loading}
      />
      <StatCard
        icon={<Users size={24} className="text-blue-500" />}
        label="New Users (This Week)"
        value={stats.newUsersThisWeek}
        bgColor="bg-blue-50"
        loading={loading}
      />
      <StatCard
        icon={<Award size={24} className="text-yellow-500" />}
        label="Best Selling Product"
        value={stats.bestSellingProduct}
        bgColor="bg-yellow-50"
        loading={loading}
      />
    </div>




  );
}

