import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";
import AdminHeader from "../admin/components/AdminHeader";
function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-900 ">
      <div className="flex h-screen ">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <div className="flex-1 overflow-x-hidden overflow-y-auto  p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
