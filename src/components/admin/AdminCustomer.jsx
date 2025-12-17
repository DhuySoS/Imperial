import React, { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import api from "@/services/api";

const AdminCustomer = () => {
  const [customerSummary, setCustomerSummary] = useState([
    { title: "Tổng số khách hàng", value: "5,820" },
    { title: "Khách hàng mới ( Tháng này )", value: "310" },
    { title: "Khách hàng thân thiết", value: "1,200" },
    { title: "Khách hàng vip", value: "25%" },
  ]);

  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filterGender, setFilterGender] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const itemsPerPage = 8;

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/guests");
      // Xử lý trường hợp API trả về mảng hoặc object phân trang (content)
      const data = Array.isArray(response.data) ? response.data : (response.data.content || []);
      
      const mappedData = data.map((customer) => {
        // Tính toán hạng dựa trên chi tiêu (nếu có) hoặc mặc định
        const totalSpent = customer.totalSpending || 0;
        let rank = "Thường";
        if (totalSpent >= 40000000) rank = "VIP";
        else if (totalSpent >= 20000000) rank = "Thân thiết";

        return {
          id: customer.id,
          name: customer.fullName || "Chưa cập nhật",
          gender: customer.gender || "Khác",
          dob: customer.dateOfBirth ? new Date(customer.dateOfBirth).toLocaleDateString('vi-VN') : "Chưa cập nhật",
          phone: customer.phoneNumber || "Chưa cập nhật",
          address: customer.address || "Chưa cập nhật",
          email: customer.email || "Chưa cập nhật",
          totalSpent: totalSpent,
          rank: rank,
        };
      });

      setCustomers(mappedData);
      setFilteredCustomers(mappedData);
      
      // Cập nhật số lượng khách hàng trong summary
      setCustomerSummary(prev => [
        { ...prev[0], value: mappedData.length.toLocaleString() },
        ...prev.slice(1)
      ]);
    } catch (error) {
      console.error("Lỗi khi tải danh sách khách hàng:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Logic lọc
  const handleFilter = () => {
    let result = [...customers];
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((c) => 
        c.name.toLowerCase().includes(lowerTerm) || 
        c.phone.includes(searchTerm) ||
        String(c.id).toLowerCase().includes(lowerTerm)
      );
    }
    if (filterGender) {
      result = result.filter((c) => c.gender === filterGender);
    }
    if (filterYear) {
      result = result.filter((c) => c.dob.endsWith(filterYear));
    }
    if (filterRank) {
      result = result.filter((c) => c.rank === filterRank);
    }
    setFilteredCustomers(result);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setFilterGender("");
    setFilterYear("");
    setFilterRank("");
    setSearchTerm("");
    setFilteredCustomers(customers);
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Logic chọn checkbox
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedCustomers(currentItems.map((customer) => customer.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter((customerId) => customerId !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };
  const getRankClass = (rank) => {
    if (rank === "VIP") return "bg-yellow-500 text-white";
    if (rank === "Thân thiết") return "bg-cyan-500 text-white";
    return "bg-gray-500 text-white";
  };

  const tableHeaders = [
    "Mã khách hàng",
    "Họ và tên",
    "Giới tính",
    "Ngày sinh",
    "Số điện thoại",
    "Địa chỉ",
    "Email",
    "Tổng chi tiêu",
    "Hạng",
    "Thao tác",
  ];

  return (
    <div className="space-y-12 p-6">
      <p className="text-white font-medium text-2xl">Quản lý khách hàng</p>
      <div className="grid grid-cols-4 gap-20 ">
        {customerSummary.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} />
        ))}
      </div>
      <div className="bg-[#273142] rounded-2xl h-fit p-8 text-white font-sans space-y-6">
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
              placeholder="Tìm kiếm (Tên, SĐT, Mã)"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
          <div className="flex space-x-4">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Thêm khách hàng
            </button>
            <button onClick={fetchCustomers} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Làm mới
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <select 
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Giới tính</option>
            {[...new Set(customers.map(c => c.gender).filter(Boolean))].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <select 
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Năm sinh</option>
            {[...new Set(customers.map(c => c.dob !== "Chưa cập nhật" ? c.dob.split('/').pop() : null).filter(Boolean))].sort().map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select 
            value={filterRank}
            onChange={(e) => setFilterRank(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Loại khách hàng</option>
            <option value="Thường">Thường</option>
            <option value="Thân thiết">Thân thiết</option>
            <option value="VIP">VIP</option>
          </select>
          
          <button onClick={handleFilter} className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Lọc
          </button>
          <button onClick={handleClearFilter} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Xóa lọc
          </button>
        </div>
        {/* 3. Table */}
        <div className="bg-[#273142] rounded-lg overflow-hidden border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1f2937] text-gray-300 text-sm border-b border-gray-600">
                  <th className="py-4 px-4 text-center border-r border-gray-600 w-12">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-offset-gray-800"
                    />
                  </th>
                  {tableHeaders.map((header, index) => (
                    <th
                      key={index}
                      className={`py-4 px-4 font-medium whitespace-nowrap ${
                        index !== tableHeaders.length - 1
                          ? "border-r border-gray-600"
                          : ""
                      } ${
                        header === "Thao tác" ? "text-center" : "text-left"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-200 text-sm">
                {currentItems.map((customer, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-600 hover:bg-gray-700 transition duration-150"
                  >
                    <td className="py-4 px-4 text-center border-r border-gray-600">
                      <input
                        type="checkbox"
                        checked={selectedCustomers.includes(customer.id)}
                        onChange={() => handleSelectCustomer(customer.id)}
                        className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-500 rounded focus:ring-offset-gray-800"
                      />
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.id}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap font-medium">
                      {customer.name}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.gender}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.dob}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.phone}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.address}
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {customer.email}
                    </td>
                    
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      {parseInt(customer.totalSpent).toLocaleString("vi-VN")} đ
                    </td>
                    <td className="py-4 px-4 border-r border-gray-600 whitespace-nowrap">
                      <span
                        className={`py-1 px-3 rounded-full text-xs font-semibold ${getRankClass(
                          customer.rank
                        )}`}
                      >
                        {customer.rank}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-gray-300 hover:text-white font-medium text-xs">
                          [Sửa]
                        </button>
                        <button className="text-gray-300 hover:text-white font-medium text-xs">
                          [Xóa]
                        </button>
                        <button className="text-gray-300 hover:text-white font-medium text-xs">
                          [Xem chi tiết]
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* 4. Footer / Pagination */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
          <span>
            Hiển thị {indexOfFirstItem + 1} đến{" "}
            {Math.min(indexOfLastItem, filteredCustomers.length)} của {filteredCustomers.length}{" "}
            mục
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded ${
                    currentPage === page
                      ? "bg-cyan-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomer;
      