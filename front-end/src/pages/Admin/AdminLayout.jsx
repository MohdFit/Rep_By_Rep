import AdminSidebar from "./AdminSidebar";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-white-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
