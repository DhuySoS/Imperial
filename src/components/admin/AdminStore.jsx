import React, { useState } from "react";
import SummaryCard from "./components/SummaryCard";



const AdminStore = () => {
  // 1. Mock Data: Cập nhật theo hình ảnh Quản lý Kho
  const initialWarehouses = [
    {
      id: 1,
      name: "Kho chăn",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 2,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 3,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 4,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 5,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 6,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 7,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    {
      id: 8,
      name: "Kho gối",
      type: "Đồ dùng",
      stock: 300,
      location: "Số 4, Khu E SunRise",
    },
    // Data ảo phân trang
    ...Array.from({ length: 12 }, (_, i) => ({
      id: 9 + i,
      name: `Kho thực phẩm ${i + 1}`,
      type: "Thực phẩm",
      stock: Math.floor(Math.random() * 500),
      location: "Khu Bếp Chính",
    })),
  ];

  const [warehouses] = useState(initialWarehouses);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 8;

  // 2. Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = warehouses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(warehouses.length / itemsPerPage);

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

  // Summary Data (Có thể giữ nguyên hoặc sửa lại cho hợp với Kho)
  const storeSummary = [
    { title: "Tổng số kho", value: "24" },

    { title: "Tổng số mặt hàng", value: "1250" },

    { title: "Phiếu tồn kho", value: "34" },

    { title: "Phiếu xuất kho", value: "45" },
  ];

  const tableHeaders = [
    "Mã kho",
    "Tên kho",
    "Loại Kho",
    "Số lượng tồn",
    "Vị trí",
    "Thao tác",
  ];

  return (
    <div className="space-y-12 p-6 min-h-screen">
      {/* Header */}
      <p className="text-white font-medium text-2xl">Quản lý kho</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-20">
        {storeSummary.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} />
        ))}
      </div>

      {/* Main Table Container */}
      <div className="bg-[#273142] rounded-2xl p-8 overflow-hidden shadow-xl  text-white">
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
            />
          </div>
          <div className="flex space-x-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Thêm kho
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Nhập excel
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Xuất excel
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              In báo cáo
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <select className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Loại kho</option>
          </select>
          <select className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tên kho</option>
          </select>
          <select className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Vị trí</option>
          </select>

          <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Lọc
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
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
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.id}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {item.name}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {item.type}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600 text-center">
                    {item.stock}
                  </td>
                  <td className="py-4 px-6 border-r border-gray-600">
                    {item.location}
                  </td>

                  {/* Actions Cell */}
                  <td className="py-4 px-6 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-gray-300 hover:text-white font-medium text-sm">
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
            {Math.min(indexOfLastItem, warehouses.length)} của{" "}
            {warehouses.length} mục
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

export default AdminStore;
