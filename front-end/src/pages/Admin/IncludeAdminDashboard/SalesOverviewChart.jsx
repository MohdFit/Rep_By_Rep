import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { getSalesOverview } from '../../../services/statsService';

export default function SalesOverviewChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await getSalesOverview(year);
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching sales overview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [year]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl border h-full ">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-800">Sales Overview</h3>
          <p className="text-xs text-gray-500">Monthly sales performance ({year})</p>
        </div>
      </div>
      {loading ? (
        <div className="h-[280px] flex items-center justify-center">
          <p className="text-gray-500">Loading chart data...</p>
        </div>
      ) : (
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
      )}
    </div>
  );
}

