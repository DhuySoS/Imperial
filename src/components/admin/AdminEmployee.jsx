import React, { useState, useEffect } from "react";
import SummaryCard from "./components/SummaryCard";
import api from "@/services/api";
import { formatCurrency } from "@/lib/currency";

const AdminEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employeeSummary, setEmployeeSummary] = useState([
    { title: "Tổng số nhân viên", value: "0" },
    { title: "Nhân viên đang làm việc", value: "0" },
    { title: "Nhân viên nghỉ phép", value: "0" },
    { title: "Nhân viên nghỉ việc", value: "0" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPosition, setFilterPosition] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    fullName: "",
    phoneNumber: "",
    position: "",
    salary: "",
    username: "",
    password: "",
    email: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      const data = response.data;
      
      const mappedData = data.map((emp) => ({
        id: emp.id,
        name: emp.fullName,
        phone: emp.phoneNumber,
        position: emp.position,
        salary: emp.salary,
        startDate: "Chưa cập nhật",
        endDate: "None",
        status: "Đang làm việc",
      }));

      setEmployees(mappedData);
      setFilteredEmployees(mappedData);
      setEmployeeSummary([
        { title: "Tổng số nhân viên", value: mappedData.length.toString() },
        { title: "Nhân viên đang làm việc", value: mappedData.length.toString() },
        { title: "Nhân viên nghỉ phép", value: "0" },
        { title: "Nhân viên nghỉ việc", value: "0" },
      ]);
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleFilter = () => {
    let result = [...employees];
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter((e) => 
        e.name.toLowerCase().includes(lowerTerm) || 
        e.phone.includes(searchTerm)
      );
    }
    if (filterPosition) {
      result = result.filter((e) => e.position === filterPosition);
    }
    setFilteredEmployees(result);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setFilterPosition("");
    setFilteredEmployees(employees);
    setCurrentPage(1);
  };

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setCurrentEmployee({
      fullName: "",
      phoneNumber: "",
      position: "",
      salary: "",
      username: "",
      password: "",
    });
    setShowModal(true);
  };

  const handleEdit = (emp) => {
    setIsEditing(true);
    setCurrentEmployee({
      id: emp.id,
      fullName: emp.name,
      phoneNumber: emp.phone,
      position: emp.position,
      salary: emp.salary,
      username: "",
      password: "",
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/employees/${currentEmployee.id}`, currentEmployee);
        alert("Cập nhật thành công!");
      } else {
        // 1. Đăng ký tài khoản STAFF
        await api.post("/auth/register", {
          username: currentEmployee.username,
          password: currentEmployee.password,
          role: "STAFF",
        });
        alert("Thêm mới thành công! Vui lòng cập nhật thông tin chi tiết.");
      }
      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Lỗi lưu nhân viên:", error);
      alert("Có lỗi xảy ra!");
    }
  };


  return (
    <div className="space-y-12 p-6">
      <p className="text-white font-medium text-2xl">Quản lý nhân viên</p>
      <div className="grid grid-cols-4 gap-20 ">
        {employeeSummary.map((info, index) => (
          <SummaryCard key={index} title={info.title} value={info.value} />
        ))}
      </div>
      <div className="bg-[#273142] rounded-2xl h-fit p-8 text-white ">
        {/* Thanh công cụ phía trên: Tìm kiếm và các nút chức năng */}
        <div className="flex justify-between items-center mb-6">
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
              placeholder="Tìm kiếm nhân viên"
              className="w-full py-2 pl-10 pr-4 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleFilter()}
            />
          </div>
          <div className="flex space-x-4">
            <button onClick={handleAddNew} className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Thêm nhân viên
            </button>
            <button onClick={fetchEmployees} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
              Làm mới
            </button>
          </div>
        </div>

        {/* Thanh bộ lọc và nút Lọc */}
        <div className="flex space-x-4 mb-6">
          <select 
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chức vụ</option>
            {[...new Set(employees.map(e => e.position))].map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>
          <select className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Phòng ban</option>
          </select>
          <select className="bg-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Giới tính</option>
          </select>
          
          <button onClick={handleFilter} className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Lọc
          </button>
          <button onClick={handleClearFilter} className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Xóa lọc
          </button>
        </div>

        {/* Bảng danh sách nhân viên */}
        <div className="overflow-x-auto bg-gray-800 rounded-md shadow-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-sm leading-normal">
                <th className="py-3 px-4 text-left">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                  />
                </th>
                <th className="py-3 px-4 text-left">Mã nhân viên</th>
                <th className="py-3 px-4 text-left">Họ và tên</th>
                <th className="py-3 px-4 text-left">Số điện thoại</th>
                <th className="py-3 px-4 text-left">Chức vụ</th>
                <th className="py-3 px-4 text-left">Lương</th>
                <th className="py-3 px-4 text-left">Ngày vào làm</th>
                <th className="py-3 px-4 text-left">Ngày kết thúc</th>
                <th className="py-3 px-4 text-left">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {currentEmployees.map((employee, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700 transition duration-200"
                >
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
                    />
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap font-medium">
                    {employee.id}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {employee.name}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {employee.phone}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {employee.position}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {formatCurrency(employee.salary)}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {employee.startDate}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    {employee.endDate}
                  </td>
                  <td className="py-3 px-4 text-left whitespace-nowrap">
                    <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <div className="flex item-center justify-center space-x-2">
                      <button onClick={() => handleEdit(employee)} className="text-cyan-400 hover:text-cyan-300 font-medium">
                        [Sửa]
                      </button>
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="flex justify-between items-center mt-6 text-sm">
          <span className="text-gray-400">
            Hiển thị {indexOfFirstItem + 1} đến{" "}
            {Math.min(indexOfLastItem, filteredEmployees.length)} của {filteredEmployees.length}{" "}
            mục
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition"
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md transition ${
                    currentPage === page
                      ? "bg-cyan-500 text-white font-medium"
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
              className="px-3 py-1 rounded-md bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition"
            >
              Sau
            </button>
          </div>
        </div>
        {/* Footer: Chọn tất cả và nút Xóa nhiều */}
        <div className="flex items-center mt-4 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500"
            />
            <span className="ml-2 text-gray-400">Chọn tất cả</span>
          </label>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
            [Xóa nhiều]
          </button>
        </div>
      </div>

      {/* Modal Thêm/Sửa Nhân viên */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md text-gray-800 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">
              {isEditing ? "Cập nhật nhân viên" : "Thêm nhân viên mới"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              {!isEditing && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">Tên đăng nhập</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                      value={currentEmployee.username}
                      onChange={(e) =>
                        setCurrentEmployee({ ...currentEmployee, username: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Mật khẩu</label>
                    <input
                      type="password"
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                      value={currentEmployee.password}
                      onChange={(e) =>
                        setCurrentEmployee({ ...currentEmployee, password: e.target.value })
                      }
                    />
                  </div>
                  
                </>
              )}
              {isEditing && (
                <>
              <div>
                <label className="block text-sm font-medium mb-1">Họ và tên</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentEmployee.fullName}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, fullName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentEmployee.phoneNumber}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Chức vụ</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentEmployee.position}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, position: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lương cơ bản</label>
                <input
                  type="number"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                  value={currentEmployee.salary}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, salary: e.target.value })
                  }
                />
              </div>
                </>
              )}
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

export default AdminEmployee;