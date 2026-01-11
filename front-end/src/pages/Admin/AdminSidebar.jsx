import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Package, Users, MessageSquare, Settings, LogOut, UserCircle } from 'lucide-react';

export default function AdminSidebar() {
  // We no longer need useState for activeItem

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
    { name: "Orders", icon: <ShoppingBag size={18} />, path: "/admin/orders" },
    { name: "Products & Courses", icon: <Package size={18} />, path: "/admin/products" },
    { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
    { name: "Reviews & Feedback", icon: <MessageSquare size={18} />, path: "/admin/reviews" },
    { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" },
  ];

  return (
    <aside className="w-64 mt-[70px] bg-white flex flex-col border-r h-screen">
      <div className="p-6 border-b">
        <div className="text-center">
          <h2 className="text-sm text-gray-500 mb-3">Welcome back!</h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-orange-50 flex items-center justify-center mb-2">
              <UserCircle className="text-orange-400" size={40} />
            </div>
            <p className="text-sm font-medium text-gray-700">Admin name</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            // NavLink gives us 'isActive' for free
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-6 py-2.5 text-sm transition ${
                isActive
                  ? "text-orange-500 bg-orange-50 border-r-2 border-orange-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t">
        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 transition">
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}
