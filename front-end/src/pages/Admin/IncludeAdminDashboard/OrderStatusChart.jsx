// src/components/admin/OrderStatusChart.jsx

export default function OrderStatusChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-2xl h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Status</h3>
      
      {/* Donut chart from your library goes here */}
      <div className="h-[250px] flex items-center justify-center text-gray-400 border border-dashed rounded-md">
        <p>Donut Chart Component Goes Here</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap  justify-center gap-x-6 gap-y-2 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#90EE90]"></span> 
          <span>Delivered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#D8BFD8]"></span>
          <span>Shipping</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F0E68C]"></span>
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FFB6C1]"></span>
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
}