import { ShoppingBag, DollarSign, Users, Award } from 'lucide-react';

const StatCard = ({ icon, label, value, bgColor }) => (
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
    <p className="text-2xl font-bold text-gray-800 text-center">{value}</p>
  </div>
);




export default function DashboardStats() {
  return (
    <div className="flex flex-wrap gap-12 justify-center">
      <StatCard
        icon={<ShoppingBag size={24} className="text-orange-500" />}
        label="Total Orders"
        value="150"
        bgColor="bg-orange-50"
      />
      <StatCard
        icon={<DollarSign size={24} className="text-green-500" />}
        label="Total Revenue"
        value="$540.93"
        bgColor="bg-green-50"
      />
      <StatCard
        icon={<Users size={24} className="text-blue-500" />}
        label="New Users (This Week)"
        value="30"
        bgColor="bg-blue-50"
      />
      <StatCard
        icon={<Award size={24} className="text-yellow-500" />}
        label="Best Selling Product"
        value="T-Shirt"
        bgColor="bg-yellow-50"
      />
    </div>




  );
}
