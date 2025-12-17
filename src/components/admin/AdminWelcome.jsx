import React from "react";
import { Link } from "react-router-dom";

const AdminWelcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="z-10 text-center space-y-8 p-4">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Welcome Admin
          </h1>
          <p className="text-xl text-slate-400">
            Hệ thống quản lý đặt phòng khách sạn
          </p>
        </div>

        <Link
          to="/admin/login"
          className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
        >
          Truy cập hệ thống
        </Link>
      </div>
      
      <div className="absolute bottom-8 text-slate-500 text-sm">
        &copy; 2025 Hotel Management System
      </div>
    </div>
  );
};

export default AdminWelcome;
