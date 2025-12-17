import { useAuth } from "@/context/AuthContext";
import React from "react";

const CustomerInfoStep = () => {
  const {user} = useAuth();
  return (
    <div className="text-left space-y-6">
      <h3 className="text-xl font-bold text-gray-800">Thông tin của bạn</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Họ và tên
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Nguyễn Văn A"
            defaultValue={user?.fullName || ""}
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="123 Đường ABC, Quận X, Thành phố Y"
            defaultValue={user?.address || ""}
          />
        </div>
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Địa chỉ email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="example@email.com"
            defaultValue={user?.email || ""}
          />
        </div>
        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="09xxxxxxxx"
            defaultValue={user?.phoneNumber || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoStep;
