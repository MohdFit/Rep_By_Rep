import AdminSidebar from "./AdminSidebar";
import HeaderAdmin from "./HeaderAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-6 bg-white-100">
          {children}
        </main>
      </div>
    </div>
  );
}
