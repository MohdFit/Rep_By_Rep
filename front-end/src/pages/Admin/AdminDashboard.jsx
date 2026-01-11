import DashboardStats from './IncludeAdminDashboard/DashboardStats';
import SalesOverviewChart from './IncludeAdminDashboard/SalesOverviewChart';
import OrderStatusChart from './IncludeAdminDashboard/OrderStatusChart';
import RecentOrdersTable from './IncludeAdminDashboard/RecentOrdersTable';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-6 bg-white">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">
              Dashboard Overview
            </h1>
            <p className="text-sm text-black-500 pb-1">
              Welcome back! Here's what's happening with your store.
            </p>
          </div>

          <DashboardStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <SalesOverviewChart />
            </div>
            <div className="lg:col-span-1">
              <OrderStatusChart />
            </div>
          </div>

          <div className="mt-6">
            <RecentOrdersTable />
          </div>
        </main>
      </div>
    </div>
  );
}
