import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Hotel, Ticket, UserCog, LogOut, Settings, CalendarCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/admin/login");
  }

  const mainMenuItems = [
    { label: "Bảng điều khiển", link: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Quản lý nhân viên", link: "/admin/employee", icon: <UserCog size={20} /> },
    { label: "Quản lý đặt phòng", link: "/admin/bookings", icon: <CalendarCheck size={20} /> },
    { label: "Quản lý khách sạn", link: "/admin/rooms", icon: <Hotel size={20} /> },
    { label: "Quản lý khách hàng", link: "/admin/customers", icon: <Users size={20} /> },
    { label: "Quản lý Voucher", link: "/admin/coupons", icon: <Ticket size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1f2937] text-white w-64 shadow-xl border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 flex items-center justify-center border-b border-gray-700">
        <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {mainMenuItems.map((item) => {
          const isActive = location.pathname === item.link;
          return (
            <Link to={item.link} key={item.link}>
              <div
                className={`flex items-center mb-2 gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
          <Settings size={20} />
          <span className="font-medium text-sm">Cài đặt</span>
        </button>
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 mt-1">
          <LogOut size={20} />
          <span className="font-medium text-sm">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
