import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesOverviewChart() {
  const data = [
    { month: 'Jan', sales: 80 }, { month: 'Feb', sales: 120 },
    { month: 'Mar', sales: 100 }, { month: 'Apr', sales: 140 },
    { month: 'May', sales: 110 }, { month: 'Jun', sales: 160 },
    { month: 'Jul', sales: 130 }, { month: 'Aug', sales: 170 },
    { month: 'Sep', sales: 140 }, { month: 'Oct', sales: 180 },
    { month: 'Nov', sales: 150 }, { month: 'Dec', sales: 160 },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border h-full ">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Sales Overview</h3>
          <p className="text-xs text-gray-500">Monthly sales performance</p>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af"/>
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af"/>
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
