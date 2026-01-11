// src/components/AdminLayout.jsx

import AdminSidebar from "./AdminSidebar";
import HeaderAdmin from "./HeaderAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      {/* Right content */}
      <div className="flex-1 flex flex-col">
        {/* Header - scrolls naturally */}
        <HeaderAdmin />

        {/* Main content */}
        <main className="flex-1 p-6 bg-white-100">
          {children}
        </main>
      </div>
    </div>
  );
}