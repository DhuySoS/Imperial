import React, { useEffect, useState } from "react";
import MyOrderCard from "../card/MyOrderCard";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const PersonalOrder = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.id) return;
      try {
        const response = await api.get(`/bookings/guest/${user.id}`);
        // Sắp xếp đơn hàng mới nhất lên đầu
        setBookings(response.data.reverse());
      } catch (error) {
        console.error("Lỗi khi tải danh sách đặt phòng:", error);
      }
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">Danh sách đặt phòng của tôi</h2>
      <div className="space-y-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <MyOrderCard key={booking.id} item={booking} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            Chưa có dữ liệu đặt phòng
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalOrder;
