import React, { useState } from "react";
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";
import { Search, LogOut, User, Calendar, MapPin, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const StaffSearchBooking = () => {
  const [bookingCode, setBookingCode] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!bookingCode.trim()) return;

    setLoading(true);
    setBookingData(null);

    try {
      // Lấy danh sách booking (hoặc gọi API search nếu backend hỗ trợ)
      const res = await api.get("/bookings");
      const bookings = Array.isArray(res.data) ? res.data : res.data.content || [];

      // Tìm booking theo mã hoặc ID
      const foundBooking = bookings.find(
        (b) => String(b.bookingCode) === bookingCode || String(b.id) === bookingCode
      );

      if (foundBooking) {
        // Lấy thêm thông tin khách hàng và khách sạn để hiển thị chi tiết
        const [guestsRes, hotelsRes] = await Promise.all([
          api.get("/guests"),
          api.get("/hotels"),
        ]);

        const guests = Array.isArray(guestsRes.data) ? guestsRes.data : guestsRes.data.content || [];
        const hotels = Array.isArray(hotelsRes.data) ? hotelsRes.data : hotelsRes.data.content || [];

        const guest = guests.find((g) => g.id === foundBooking.guestId);
        const hotelData = hotels.find((h) => (h.hotel?.id || h.id) === foundBooking.hotelId);
        const hotel = hotelData?.hotel || hotelData;

        setBookingData({
          ...foundBooking,
          guestName: guest?.fullName || "Khách vãng lai",
          guestPhone: guest?.phoneNumber || "N/A",
          hotelName: hotel?.name || "Unknown Hotel",
          hotelAddress: hotel?.address || "",
        });
      } else {
        alert("Không tìm thấy đơn đặt phòng với mã này!");
      }
    } catch (error) {
      console.error("Lỗi tra cứu:", error);
      alert("Có lỗi xảy ra khi tra cứu thông tin.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <h1 className="text-xl font-bold text-slate-800">Tra cứu đặt phòng (Staff)</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Đăng xuất
          </button>
        </div>

        {/* Search Box */}
        <div className="bg-white p-8 rounded-xl shadow-md">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Nhập mã đặt phòng..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-900 transition-colors disabled:opacity-70"
            >
              {loading ? "Đang tìm..." : "Tra cứu"}
            </button>
          </form>
        </div>

        {/* Result */}
        {bookingData && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-slate-800 p-4 text-white flex justify-between items-center">
              <span className="font-bold text-lg">Mã đơn: {bookingData.bookingCode || bookingData.id}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{bookingData.status}</span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-500 uppercase text-sm">Thông tin khách hàng</h3>
                <p className="flex items-center gap-2"><User size={18} className="text-slate-600"/> {bookingData.guestName}</p>
                <p className="flex items-center gap-2 text-gray-600">SĐT: {bookingData.guestPhone}</p>
                <div className="bg-slate-50 p-3 rounded-lg mt-2 text-sm">
                  <p className="text-gray-700"><span className="font-medium">Người lớn:</span> {bookingData.adults}</p>
                  <p className="text-gray-700"><span className="font-medium">Trẻ em:</span> {(bookingData.childrenUnder3 || 0) + (bookingData.children3To5 || 0) + (bookingData.children6To12 || 0)}</p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-500 uppercase text-sm">Thông tin phòng</h3>
                <p className="flex items-center gap-2 font-medium"><MapPin size={18} className="text-slate-600"/> {bookingData.hotelName}</p>
                <p className="flex items-center gap-2"><Calendar size={18} className="text-slate-600"/> {new Date(bookingData.checkInDate).toLocaleDateString('vi-VN')} - {new Date(bookingData.checkOutDate).toLocaleDateString('vi-VN')}</p>
                <p className="flex items-center gap-2 font-bold text-lg text-slate-800"><CreditCard size={18}/> {formatCurrency(bookingData.totalAmount)}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-2 text-sm bg-slate-50 p-3 rounded-lg">
                  <div>
                    <p className="text-gray-500 text-xs">Loại phòng</p>
                    <p className="font-medium text-gray-800">{bookingData.roomType || "---"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Hướng nhìn</p>
                    <p className="font-medium text-gray-800">{bookingData.viewType || "---"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Vị trí</p>
                    <p className="font-medium text-gray-800">{bookingData.position || "---"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Ánh sáng</p>
                    <p className="font-medium text-gray-800">{bookingData.lightType || "---"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffSearchBooking;
