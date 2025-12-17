import { Calendar, MapPin, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import MyOrderCard from "../card/MyOrderCard";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const MyOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số lượng đơn hàng mỗi trang

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      try {
        // 1. Lấy danh sách booking
        const bookingRes = await api.get(`/bookings/guest/${user.id}`);
        const bookings = bookingRes.data;

        // 2. Lấy danh sách hotelId không trùng
        const hotelIds = [...new Set(bookings.map((b) => b.hotelId))];

        // 3. Gọi API lấy hotel song song
        const hotelResponses = await Promise.all(
          hotelIds.map((id) => api.get(`/hotels/${id}`))
        );

        // 4. Tạo map hotelId -> hotel
        const hotelMap = {};
        hotelResponses.forEach((res) => {
          hotelMap[res.data.id] = res.data;
        });

        // 5. Merge hotel vào booking
        const mergedOrders = bookings.map((booking) => ({
          ...booking,
          hotel: hotelMap[booking.hotelId],
        }));
        
        // Sắp xếp đơn mới nhất lên đầu
        mergedOrders.sort((a, b) =>b.id - a.id);

        setOrderList(mergedOrders);
      } catch (error) {
        console.error("Lỗi khi tải đơn đặt phòng:", error);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const handleCancelBooking = async (bookingId, checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    
    // Reset time để so sánh ngày chính xác
    today.setHours(0, 0, 0, 0);
    checkIn.setHours(0, 0, 0, 0);
    
    if (today >= checkIn) {
      alert("Không thể hủy phòng khi đã đến ngày nhận phòng.");
      return;
    }

    if (!window.confirm("Bạn có chắc chắn muốn hủy đặt phòng này?")) return;

    try {
      await api.put(`/bookings/${bookingId}/cancel`);
      alert("Hủy phòng thành công");
      
      setOrderList((prev) =>
        prev.map((item) =>
          item.id === bookingId ? { ...item, status: "CANCELLED" } : item
        )
      );
    } catch (error) {
      console.error("Lỗi khi hủy phòng:", error);
      alert("Lỗi khi hủy phòng");
    }
  };

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orderList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orderList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Đặt phòng của tôi</h1>
      <p>Quản lý và theo dõi tất cả các phòng đã đặt của bạn</p>
      {/* <div className="flex items-center bg-gray-200 w-fit rounded-xl mt-4">
        {status.map((item) => (
          <span
            key={item.id}
            className={`p-1 m-1  text-sm font-medium rounded-md cursor-pointer ${
              orderStatus === item.value ? "bg-gray-50" : ""
            }`}
            onClick={() => setOrderStatus(item.value)}
          >
            {item.label}
          </span>
        ))}
      </div> */}
      <div className="mt-4 space-y-6">
        {currentItems.map((item) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const checkIn = new Date(item.checkInDate);
          checkIn.setHours(0, 0, 0, 0);
          const isPastCheckIn = today >= checkIn;

          return (
            <div key={item.id} className="relative group">
              <MyOrderCard item={item} />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                  item.status === 'CONFIRMED' ? 'bg-blue-50 text-blue-600 border-blue-200' :
                  item.status === 'PAID' ? 'bg-green-50 text-green-600 border-green-200' :
                  item.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-200' :
                  isPastCheckIn ? 'bg-gray-50 text-gray-600 border-gray-200' :
                  'bg-gray-50 text-gray-600 border-gray-200'
                }`}>
                  {item.status === 'CANCELLED' ? 'Đã hủy' : 
                   isPastCheckIn ? 'Đã hoàn thành' :
                   item.status === 'CONFIRMED' ? 'Đã đặt phòng' : 
                   item.status === 'PAID' ? 'Đã xác nhận' : item.status}
                </span>
              </div>

              {/* Cancel Button */}
              {!isPastCheckIn && (item.status === 'CONFIRMED' || item.status === 'PAID' || item.status === 'PENDING') && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelBooking(item.id, item.checkInDate);
                  }}
                  className="absolute bottom-4 right-4 z-60 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium shadow-sm"
                >
                  Hủy phòng
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {orderList.length > itemsPerPage && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-cyan-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrder;
