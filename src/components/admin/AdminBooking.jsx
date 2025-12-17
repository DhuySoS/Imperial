import React, { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";

const AdminBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [bookingSummary, setBookingSummary] = useState([
    { title: "Tổng số đơn", value: "0" },
    { title: "Đã xác nhận", value: "0" },
    { title: "Đã thanh toán", value: "0" },
    { title: "Đã hủy", value: "0" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch dữ liệu bookings, guests và hotels để hiển thị đầy đủ thông tin
  const fetchData = async () => {
    try {
      const [bookingsRes, guestsRes, hotelsRes] = await Promise.all([
        api.get("/bookings"),
        api.get("/guests"),
        api.get("/hotels"),
      ]);

      const rawBookings = Array.isArray(bookingsRes.data)
        ? bookingsRes.data
        : bookingsRes.data.content || [];
      const guests = Array.isArray(guestsRes.data)
        ? guestsRes.data
        : guestsRes.data.content || [];
      const hotels = Array.isArray(hotelsRes.data)
        ? hotelsRes.data
        : hotelsRes.data.content || [];

      // Tạo map để tra cứu nhanh
      const guestMap = {};
      guests.forEach((g) => (guestMap[g.id] = g));

      const hotelMap = {};
      hotels.forEach((h) => {
        // Xử lý cấu trúc dữ liệu hotel có thể khác nhau
        const hotelData = h.hotel || h;
        hotelMap[hotelData.id] = hotelData;
      });

      const mappedData = rawBookings.map((b) => ({
        id: b.id,
        guestName: guestMap[b.guestId]?.fullName || `Khách ${b.guestId}`,
        guestPhone: guestMap[b.guestId]?.phoneNumber || "",
        hotelName: hotelMap[b.hotelId]?.name || `Khách sạn ${b.hotelId}`,
        checkIn: b.checkInDate,
        checkOut: b.checkOutDate,
        totalAmount: b.totalAmount,
        status: b.status,
        createdDate: b.createdDate,
        rawBooking: b, // Lưu lại object gốc để dùng khi update
      }));

      // Sắp xếp mới nhất lên đầu
      mappedData.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );

      setBookings(mappedData);
      setFilteredBookings(mappedData);
      updateSummary(mappedData);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu đặt phòng:", error);
    }
  };

  const updateSummary = (data) => {
    const total = data.length;
    const confirmed = data.filter((b) => b.status === "CONFIRMED").length;
    const paid = data.filter((b) => b.status === "PAID").length;
    const cancelled = data.filter((b) => b.status === "CANCELLED").length;

    setBookingSummary([
      { title: "Tổng số đơn", value: total.toString() },
      { title: "Đã xác nhận", value: confirmed.toString() },
      { title: "Đã thanh toán", value: paid.toString() },
      { title: "Đã hủy", value: cancelled.toString() },
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Xử lý cập nhật trạng thái
  const handleStatusChange = async (id, newStatus) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn chuyển trạng thái sang ${newStatus}?`
      )
    )
      return;

    try {
      // Gọi API cập nhật. Tùy vào backend của bạn, có thể là PUT /bookings/{id} với body mới
      // Hoặc một endpoint riêng. Ở đây giả định update toàn bộ object với status mới.
      //   const updatePayload = {
      //     ...currentBooking.rawBooking,
      //     status: newStatus,
      //   };

      // Nếu backend hỗ trợ PATCH hoặc endpoint riêng thì sửa lại dòng này
      await api.patch(`/bookings/${id}/status`, null, {
        params: {
          status: newStatus,
        },
      });

      alert("Cập nhật trạng thái thành công!");
      fetchData(); // Tải lại dữ liệu
    } catch (error) {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  // Logic lọc
  const handleFilter = () => {
    let result = [...bookings];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.guestName.toLowerCase().includes(lowerTerm) ||
          b.hotelName.toLowerCase().includes(lowerTerm) ||
          String(b.id).includes(lowerTerm)
      );
    }

    if (filterStatus) {
      result = result.filter((b) => b.status === filterStatus);
    }

    setFilteredBookings(result);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setFilterStatus("");
    setFilteredBookings(bookings);
    setCurrentPage(1);
  };

  // Phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 text-white";
      case "CONFIRMED":
        return "bg-blue-500 text-white";
      case "PAID":
        return "bg-green-500 text-white";
      case "CANCELLED":
        return "bg-red-500 text-white";
      case "COMPLETED":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const tableHeaders = [
    "Mã đơn",
    "Khách hàng",
    "Khách sạn",
    "Ngày nhận/Trả",
    "Tổng tiền",
    "Trạng thái",
    "Thao tác",
  ];

  return (
    <div className="space-y-12 p-6 min-h-screen">
      <p className="text-white font-medium text-2xl">Quản lý đặt phòng</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-20">
        {bookingSummary.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} />
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-[#273142] rounded-2xl p-8 overflow-hidden shadow-xl text-white">
        {/* Toolbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-1/3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm (Tên khách, KS, Mã đơn)"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={fetchData}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Làm mới
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="CONFIRMED">Đã xác nhận (CONFIRMED)</option>
            <option value="PAID">Đã thanh toán (PAID)</option>
            <option value="CANCELLED">Đã hủy (CANCELLED)</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Lọc
          </button>
          <button
            onClick={handleClearFilter}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Xóa lọc
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1f2937] text-gray-300 text-sm border-b border-gray-600">
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="py-4 px-6 font-medium whitespace-nowrap border-r border-gray-600 last:border-r-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm">
              {currentItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 hover:bg-gray-700 transition duration-150"
                >
                  <td className="py-4 px-6 border-r border-gray-600">
                    {item.id}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    <div className="font-medium">{item.guestName}</div>
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {item.hotelName}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center flex gap-2">
                    <div>
                      {new Date(item.checkIn).toLocaleDateString("vi-VN")}
                    </div>
                    <div className="text-xs text-gray-400">-</div>
                    <div>
                      {new Date(item.checkOut).toLocaleDateString("vi-VN")}
                    </div>
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 font-bold text-cyan-400">
                    {formatCurrency(item.totalAmount)}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.status === "CONFIRMED" ? (
                      <button
                        onClick={() =>
                          handleStatusChange(item.id, "PAID", item)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white text-xs py-1 px-3 rounded transition-colors"
                      >
                        Đã đặt phòng
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs">--</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 bg-[#1f2937] text-sm border-t border-gray-600 text-gray-400">
          <span>
            Hiển thị {indexOfFirstItem + 1} đến{" "}
            {Math.min(indexOfLastItem, filteredBookings.length)} của{" "}
            {filteredBookings.length} mục
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-300"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBooking;
