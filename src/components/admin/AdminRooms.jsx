import React, { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard"; // Giả sử bạn vẫn giữ component này
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";

const AdminRooms = () => {
  const [hotelSummary, setHotelSummary] = useState([
    { title: "Tổng số khách sạn", value: "0" },
    { title: "Khách sạn 5 sao", value: "0" },
    { title: "Giá trung bình", value: "0" },
    { title: "Tổng đánh giá", value: "0" },
  ]);

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filterAddress, setFilterAddress] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 8; // Số lượng dòng hiển thị giống trong ảnh (khoảng 8 dòng)
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({
    name: "",
    city: "",
    address: "",
    description: "",
    basicPrice: "",
  });

  const locations = ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Đà Lạt", "Nha Trang", "Phú Quốc", "Vũng Tàu"];
  
  const priceRanges = [
    { id: "under1m", label: "Dưới 1 triệu", min: 0, max: 999999 },
    { id: "1m-2m", label: "1 - 2 triệu", min: 1000000, max: 1999999 },
    { id: "2m-3m", label: "2 - 3 triệu", min: 2000000, max: 2999999 },
    { id: "3m-5m", label: "3 - 5 triệu", min: 3000000, max: 4999999 },
    { id: "over5m", label: "Trên 5 triệu", min: 5000000, max: Infinity },
  ];

  const fetchHotels = async () => {
    try {
      const response = await api.get("/hotels");
      const data = Array.isArray(response.data) ? response.data : (response.data.content || []);

      const mappedData = data.map((item) => ({
        id: item.hotel.id,
        name: item.hotel.name,
        address: item.hotel.address,
        city: item.hotel.city || "", // Đảm bảo luôn là chuỗi để tránh lỗi
        price: item.hotel.basicPrice || 0,
        rating: item.averageRating || 0,
        reviewCount: item.reviews?.length || 0,
        description: item.hotel.description || "",
      }));

      console.log("Dữ liệu khách sạn (Check trường city):", mappedData);
      setHotels(mappedData);
      setFilteredHotels(mappedData);

      // Tính toán summary
      const total = mappedData.length;
      const fiveStar = mappedData.filter((h) => h.rating >= 4.5).length;
      const avgPrice = total > 0 ? mappedData.reduce((acc, h) => acc + h.price, 0) / total : 0;
      const totalReviews = mappedData.reduce((acc, h) => acc + h.reviewCount, 0);

      setHotelSummary([
        { title: "Tổng số khách sạn", value: total.toString() },
        { title: "Khách sạn 5 sao", value: fiveStar.toString() },
        { title: "Giá trung bình", value: formatCurrency(avgPrice) },
        { title: "Tổng đánh giá", value: totalReviews.toString() },
      ]);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách sạn:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Logic lọc
  const handleFilter = () => {
    let result = [...hotels];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(lowerTerm) ||
          h.address.toLowerCase().includes(lowerTerm)
      );
    }

    if (filterAddress) {
      const keyword = filterAddress.toLowerCase();
      // Lọc theo city HOẶC address để đảm bảo tìm thấy kết quả
      result = result.filter((h) => 
        (h.city && h.city.toLowerCase().includes(keyword)) || 
        (h.address && h.address.toLowerCase().includes(keyword))
      );
    }
    if (filterPrice) {
      const range = priceRanges.find((r) => r.id === filterPrice);
      if (range) {
        result = result.filter((h) => h.price >= range.min && h.price <= range.max);
      }
    }
    if (filterRating) {
      result = result.filter((h) => h.rating.toString() === filterRating);
    }

    setFilteredHotels(result);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setFilterAddress("");
    setFilterPrice("");
    setFilterRating("");
    setSearchTerm("");
    setFilteredHotels(hotels);
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredHotels.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Logic chọn checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedHotels(currentItems.map((hotel) => hotel.id));
    } else {
      setSelectedHotels([]);
    }
  };

  const handleSelectHotel = (id) => {
    if (selectedHotels.includes(id)) {
      setSelectedHotels(selectedHotels.filter((hotelId) => hotelId !== id));
    } else {
      setSelectedHotels([...selectedHotels, id]);
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentHotel({
      name: "",
      city: "",
      address: "",
      description: "",
      basicPrice: "",
    });
    setShowModal(true);
  };

  const handleEdit = (hotel) => {
    setIsEditing(true);
    setCurrentHotel({
      id: hotel.id,
      name: hotel.name,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      basicPrice: hotel.price,
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/hotels/${currentHotel.id}`, currentHotel);
        alert("Cập nhật thành công!");
      } else {
        await api.post("/hotels", currentHotel);
        alert("Thêm mới thành công!");
      }
      setShowModal(false);
      fetchHotels();
    } catch (error) {
      console.error("Lỗi lưu khách sạn:", error);
      alert("Có lỗi xảy ra!");
    }
  };

  const tableHeaders = [
    "Mã KS",
    "Tên khách sạn",
    "Địa chỉ",
    "Giá cơ bản",
    "Đánh giá",
    "Thao tác",
  ];

  return (
    <div className="space-y-12 p-6 min-h-screen">
      {/* Header Text */}
      <p className="text-white font-medium text-2xl">Quản lý khách sạn</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-20">
        {hotelSummary.map((info, index) => (
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
              placeholder="Tìm kiếm khách sạn"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAddNew}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Thêm khách sạn
            </button>
            <button
              onClick={fetchHotels}
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Làm mới
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <select
            value={filterAddress}
            onChange={(e) => setFilterAddress(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Khu vực</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Khoảng giá</option>
            {priceRanges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Đánh giá</option>
            {[...new Set(hotels.map((h) => h.rating))]
              .sort((a, b) => b - a)
              .map((rating) => (
                <option key={rating} value={rating}>
                  {rating.toFixed(1)}
                </option>
              ))}
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
                    className={`py-4 px-6 font-medium ${
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
              {currentItems.map((hotel, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-600 hover:bg-gray-700 transition duration-150"
                >
                  {/* Checkbox Cell */}
                  <td className="py-4 px-4 text-center border-r border-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedHotels.includes(hotel.id)}
                      onChange={() => handleSelectHotel(hotel.id)}
                      className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-offset-gray-800"
                    />
                  </td>

                  {/* Data Cells */}
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {hotel.id}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {hotel.name}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {hotel.address}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {formatCurrency(hotel.price)}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {hotel.rating.toFixed(1)}{" "}
                    <span className="text-yellow-400">★</span>
                  </td>

                  {/* Actions Cell */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(hotel)}
                        className="text-gray-300 hover:text-white font-medium text-sm"
                      >
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

        {/* Footer / Pagination (Giữ nguyên logic cũ nhưng style tối hơn cho hợp) */}
        {/* Nếu hình ảnh không có pagination thì bạn có thể comment phần này lại */}
        <div className="flex justify-between items-center p-4 bg-[#1f2937] text-sm border-t border-gray-600">
          <span className="text-gray-400">
            Hiển thị {indexOfFirstItem + 1} đến{" "}
            {Math.min(indexOfLastItem, filteredHotels.length)} của{" "}
            {filteredHotels.length} mục
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa Khách sạn */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md text-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {isEditing ? "Cập nhật khách sạn" : "Thêm khách sạn mới"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tên khách sạn
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentHotel.name}
                  onChange={(e) =>
                    setCurrentHotel({ ...currentHotel, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Thành phố
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentHotel.city}
                  onChange={(e) =>
                    setCurrentHotel({ ...currentHotel, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentHotel.address}
                  onChange={(e) =>
                    setCurrentHotel({
                      ...currentHotel,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Giá cơ bản
                </label>
                <input
                  type="number"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentHotel.basicPrice}
                  onChange={(e) =>
                    setCurrentHotel({
                      ...currentHotel,
                      basicPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mô tả</label>
                <textarea
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  rows="3"
                  value={currentHotel.description}
                  onChange={(e) =>
                    setCurrentHotel({
                      ...currentHotel,
                      description: e.target.value,
                    })
                  }
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
                  className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition font-medium"
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

export default AdminRooms;
