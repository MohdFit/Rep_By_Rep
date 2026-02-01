import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getDashboardStats } from '../../../services/statsService';

export default function OrderStatusChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = {
    Delivered: '#90EE90',
    Shipping: '#D8BFD8',
    Processing: '#F0E68C',
    Cancelled: '#FFB6C1',
    Pending: '#87CEEB'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success && response.data.orderStatusBreakdown) {
          const breakdown = response.data.orderStatusBreakdown;
          const formattedData = Object.entries(breakdown)
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({ name, value }));
          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching order status data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
      
      {loading ? (
        <div className="h-[250px] flex items-center justify-center text-gray-400">
          <p>Loading chart data...</p>
        </div>
      ) : chartData.length > 0 ? (
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[250px] flex items-center justify-center text-gray-400 border border-dashed rounded-md">
          <p>No order data available</p>
        </div>
      )}

      
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm">
        {Object.entries(COLORS).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
