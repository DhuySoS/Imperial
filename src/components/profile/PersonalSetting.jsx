import InputCustome from "@/common/InputCustome";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";

const PersonalSetting = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwords;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Mật khẩu mới nên có ít nhất 6 ký tự.");
    }

    setLoading(true);
    try {
      const payload = {
        userId: user.id,
        oldPassword,
        newPassword,
        confirmPassword,
      };

      // Gọi API đổi mật khẩu
      await api.post("/auth/change-password", payload);
      
      alert("Đổi mật khẩu thành công!");
      setPasswords({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Change password error:", error);
      const message = error.response?.data?.message || error.response?.data || "Đổi mật khẩu thất bại. Vui lòng kiểm tra lại mật khẩu cũ.";
      alert(typeof message === 'object' ? JSON.stringify(message) : String(message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <p className="text-3xl font-bold mb-8">Cài đặt tài khoản</p>
      
      <div className="p-8 border border-gray-200 rounded-3xl mx-auto w-full max-w-3xl space-y-8 shadow-lg bg-white">
        <div>
            <h3 className="font-bold text-2xl text-gray-800 mb-2">Đổi mật khẩu</h3>
            <p className="text-gray-500 text-sm">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.</p>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
          <label htmlFor="oldPassword" className="text-lg font-medium text-gray-700">
            Mật khẩu hiện tại
          </label>
          <InputCustome
            id="oldPassword"
            name="oldPassword"
            type="password"
            placeholder="Nhập mật khẩu cũ"
            className="border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 p-3"
            value={passwords.oldPassword}
            onChange={handleChange}
          />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
          <label htmlFor="newPassword" className="text-lg font-medium text-gray-700">
            Mật khẩu mới
          </label>
          <InputCustome
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Nhập mật khẩu mới"
            className="border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 p-3"
            value={passwords.newPassword}
            onChange={handleChange}
          />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 items-center">
          <label
            htmlFor="confirmPassword"
            className="text-lg font-medium text-gray-700"
          >
            Xác nhận mật khẩu
          </label>
          <InputCustome
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 p-3"
            value={passwords.confirmPassword}
            onChange={handleChange}
          />
          </div>
        </div>

        <div className="w-full flex justify-end pt-4 border-t border-gray-100">
        <button 
          onClick={handleChangePassword}
          disabled={loading}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
        </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalSetting;
