import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";

// Định nghĩa Component con SummaryCard ngay tại đây để tránh lỗi import
const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-[#273142] p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center text-center">
      <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-white text-3xl font-bold">{value}</p>
    </div>
  );
};

const AdminCoupon = () => {
  const [couponSummary, setCouponSummary] = useState([
    { title: "Tổng số mã giảm giá", value: "0" },
    { title: "Đang hoạt động", value: "0" },
    { title: "Sắp hết hạn", value: "0" },
    { title: "Đã hết hạn", value: "0" },
  ]);

  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 8;
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState({
    code: "",
    value: "",
    startDate: "",
    endDate: "",
    guestId: 4,
    isUsed: false,
    quantity: "",
    description: "",
  });

  const valueRanges = [
    { id: "under500k", label: "Dưới 500.000 vnđ", min: 101, max: 499999 },
    { id: "500k-1m", label: "500.000 - 1.000.000 vnđ", min: 500000, max: 1000000 },
    { id: "over1m", label: "Trên 1.000.000 vnđ", min: 1000001, max: Infinity },
  ];

  const fetchCoupons = async () => {
    try {
      const response = await api.get("/discounts");
      const data = response.data;

      const mappedData = data.map((item) => {
        // Giả định logic: <= 100 là phần trăm, > 100 là tiền mặt
        const isPercent = item.value <= 100;
        return {
          id: item.id,
          code: item.code,
          value: isPercent ? item.value : formatCurrency(item.value),
          rawValue: item.value, // Dùng để lọc
          unit: isPercent ? "%" : "vnđ",
          startDate: item.startDate ? new Date(item.startDate).toLocaleDateString('vi-VN') : "",
          rawStartDate: item.startDate,
          endDate: item.endDate ? new Date(item.endDate).toLocaleDateString('vi-VN') : "",
          rawEndDate: item.endDate, // Dùng để tính toán
          description: item.description || "",
          quantity: item.quantity,
          guestId: item.guestId,
          isUsed: item.isUsed,
        };
      });

      setCoupons(mappedData);
      setFilteredCoupons(mappedData);

      // Tính toán Summary
      const total = mappedData.length;
      const now = new Date();
      const active = mappedData.filter(c => new Date(c.rawEndDate) >= now).length;
      const expired = mappedData.filter(c => new Date(c.rawEndDate) < now).length;
      // Sắp hết hạn: còn hạn nhưng nhỏ hơn 7 ngày
      const soon = mappedData.filter(c => {
          const end = new Date(c.rawEndDate);
          const diffTime = end - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
          return diffDays > 0 && diffDays <= 7;
      }).length;

      setCouponSummary([
        { title: "Tổng số mã giảm giá", value: total.toString() },
        { title: "Đang hoạt động", value: active.toString() },
        { title: "Sắp hết hạn", value: soon.toString() },
        { title: "Đã hết hạn", value: expired.toString() },
      ]);

    } catch (error) {
      console.error("Lỗi khi tải danh sách voucher:", error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Logic lọc
  const handleFilter = () => {
    let result = [...coupons];

    if (searchTerm) {
      result = result.filter((c) => c.code.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (filterValue) {
      const range = valueRanges.find((r) => r.id === filterValue);
      if (range) {
        result = result.filter((c) => c.rawValue >= range.min && c.rawValue <= range.max);
      }
    }
    if (filterUnit) {
      result = result.filter((c) => c.unit === filterUnit);
    }
    if (filterMonth) {
      result = result.filter((c) => {
        if (!c.rawStartDate) return false;
        const date = new Date(c.rawStartDate);
        return `${date.getMonth() + 1}/${date.getFullYear()}` === filterMonth;
      });
    }

    setFilteredCoupons(result);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setFilterUnit("");
    setFilterMonth("");
    setSearchTerm("");
    setFilteredCoupons(coupons);
    setCurrentPage(1);
  };

  // 2. Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // 3. Logic Checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedIds(currentItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectId = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentCoupon({
      code: "",
      value: "",
      startDate: "",
      endDate: "",
      guestId: 4,
      isUsed: false,
      quantity: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleEdit = (coupon) => {
    setIsEditing(true);
    setCurrentCoupon({
      id: coupon.id,
      code: coupon.code,
      value: coupon.rawValue,
      startDate: coupon.rawStartDate ? new Date(coupon.rawStartDate).toISOString().split('T')[0] : "",
      endDate: coupon.rawEndDate ? new Date(coupon.rawEndDate).toISOString().split('T')[0] : "",
      description: coupon.description,
      quantity: coupon.quantity,
      guestId: coupon.guestId,
      isUsed: coupon.isUsed,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/discounts/${currentCoupon.id}`, currentCoupon);
        alert("Cập nhật thành công!");
      } else {
        await api.post("/discounts", currentCoupon);
        alert("Thêm mới thành công!");
      }
      setShowModal(false);
      fetchCoupons();
    } catch (error) {
      console.error("Lỗi lưu voucher:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const tableHeaders = [
    "Mã phiếu giảm giá",
    "Giá trị giảm",
    "Đơn vị",
    "Số lượng",
    "Ngày bắt đầu",
    "Ngày kết thúc", // Trong ảnh là 'Ngày bắt đầu' lần 2, nhưng mình sửa lại cho logic
    "Thao tác",
  ];

  return (
    <div className="space-y-12 p-6  min-h-screen">
      {/* Header */}
      <p className="text-white font-medium text-2xl">Quản lý phiếu giảm giá</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-20">
        {couponSummary.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} />
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-[#273142] rounded-2xl p-8 overflow-hidden shadow-xl text-white">
        <div className="flex justify-between items-center mb-6 ">
          <div className="relative w-1/3">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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
              placeholder="Tìm kiếm"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleAddNew} className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Thêm phiếu giảm giá
            </button>
            <button onClick={fetchCoupons} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Làm mới
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <select 
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Khoảng giá trị</option>
            {valueRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
          <select 
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Đơn vị</option>
            <option value="%">%</option>
            <option value="vnđ">vnđ</option>
          </select>
          <select 
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tháng bắt đầu</option>
            {[...new Set(coupons.map(c => {
              if (!c.rawStartDate) return null;
              const d = new Date(c.rawStartDate);
              return `${d.getMonth() + 1}/${d.getFullYear()}`;
            }))].filter(Boolean).sort().map(m => (
              <option key={m} value={m}>Tháng {m}</option>
            ))}
          </select>

          <button onClick={handleFilter} className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Lọc
          </button>
          <button onClick={handleClearFilter} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Xóa lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1f2937] text-gray-300 text-sm border-b border-gray-600">
                {/* Checkbox Header */}
                <th className="py-4 px-4 text-center border-r border-gray-600 w-12">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-offset-gray-800"
                  />
                </th>

                {/* Data Headers */}
                {tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`py-4 px-6 font-medium whitespace-nowrap ${
                      index !== tableHeaders.length - 1
                        ? "border-r border-gray-600"
                        : ""
                    } ${header === "Thao tác" ? "text-center" : "text-left"}`}
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
                  {/* Checkbox Cell */}
                  <td className="py-4 px-4 text-center border-r border-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectId(item.id)}
                      className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-offset-gray-800"
                    />
                  </td>

                  {/* Data Cells */}
                  <td className="py-4 px-6 border-r border-gray-600 text-left">
                    {item.code}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.value}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.unit}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.startDate}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.endDate}
                  </td>

                  {/* Actions Cell */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button onClick={() => handleEdit(item)} className="text-gray-300 hover:text-white font-medium text-sm">
                        [Sửa]
                      </button>
                      <button className="text-gray-300 hover:text-white font-medium text-sm">
                        [Xóa]
                      </button>
                      <button className="text-gray-300 hover:text-white font-medium text-sm">
                        [Xem chi tiết]
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex justify-between items-center p-4 bg-[#1f2937] text-sm border-t border-gray-600 text-gray-400">
          <span>
            Hiển thị {indexOfFirstItem + 1} đến{" "}
            {Math.min(indexOfLastItem, filteredCoupons.length)} của {filteredCoupons.length} mục
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

      {/* Modal Thêm/Sửa Voucher */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md text-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {isEditing ? "Cập nhật mã giảm giá" : "Thêm mã giảm giá mới"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mã giảm giá</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentCoupon.code}
                  onChange={(e) => setCurrentCoupon({ ...currentCoupon, code: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giá trị (VNĐ hoặc %)</label>
                <input
                  type="number"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentCoupon.value}
                  onChange={(e) => setCurrentCoupon({ ...currentCoupon, value: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số lượng</label>
                <input
                  type="number"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentCoupon.quantity}
                  onChange={(e) => setCurrentCoupon({ ...currentCoupon, quantity: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày bắt đầu</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                    value={currentCoupon.startDate}
                    onChange={(e) => setCurrentCoupon({ ...currentCoupon, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày kết thúc</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                    value={currentCoupon.endDate}
                    onChange={(e) => setCurrentCoupon({ ...currentCoupon, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  rows="3"
                  value={currentCoupon.description}
                  onChange={(e) => setCurrentCoupon({ ...currentCoupon, description: e.target.value })}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition font-medium"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoupon;
