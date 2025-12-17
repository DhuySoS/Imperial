import { ChevronLeftIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Highlights from "./Highlights";
import AboutUs from "./AboutUs";
import Map from "./Map";
import CommentModal from "../Modal/CommentModal";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
const labelMapping = {
  deluxe: "Deluxe",
  luxury: "Luxury",
  near_elevator: "Gần thang máy",
  in_corner: "Trong góc",
  far_elevator: "Xa thang máy",
  garden_view: "Hướng Vườn/Núi",
  lake_view: "Hướng Hồ",
  city_view: "Hướng Thành phố",
  daylight: "Nhiều ánh sáng ban ngày",
  cool_light: "Ánh sáng Bắc/Đông dịu mát",
};
const fakeRoomData = {
  id: 1,
  hotelName: "Deluxe The Imperial Đà Lạt 1",
  checkIn: "2024-07-01",
  checkOut: "2024-07-05",
  guests: "2 người lớn, 1 trẻ em (0-2 tuổi)",
  totalPrice: "4.500.000 đ",
  status: "Đã xác nhận",
  paymentStatus: "Đã thanh toán",
  isPaid: true,
};
const OrderDetail = ({ room, isConfirmationView = false, discount = 0 }) => {
  const {user} = useAuth();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [writeComment, setWriteComment] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  useEffect(() => {
    const hotelId = searchParams.get("hotelId");
    if (!hotelId) return;

    const fetchHotelDetails = async () => {
      try {
        const response = await api.get(`/hotels/${parseInt(hotelId)}`);
        setHotelDetails(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phòng:", error);
      }
    };

    fetchHotelDetails();
  }, [searchParams]);
  const displayRoom = useMemo(() => {
    if (room) return room;
    if (location.state?.room) return location.state.room;

    // Lấy thông tin từ URL nếu không có props room
    const dateStart = searchParams.get("dateStart");
    const dateEnd = searchParams.get("dateEnd");

    if (dateStart && dateEnd) {
      const adults = searchParams.get("adults") || "0";
      const children =
        parseInt(searchParams.get("childrenUnder3") || "0") +
        parseInt(searchParams.get("children3to5") || "0") +
        parseInt(searchParams.get("children6to12") || "0");
      const rooms = searchParams.get("rooms") || "1";
      const totalPrice = parseInt(searchParams.get("totalPrice") || "0") - discount;

      const floor = searchParams.get("floor");
      const roomTypes = searchParams.get("roomTypes")
        ? searchParams.get("roomTypes").split(",")
        : [];
      const locations = searchParams.get("locations")
        ? searchParams.get("locations").split(",")
        : [];
      const views = searchParams.get("views")
        ? searchParams.get("views").split(",")
        : [];
      const lighting = searchParams.get("lighting")
        ? searchParams.get("lighting").split(",")
        : [];

      const features = [
        floor ? `Tầng ${floor}` : null,
        ...roomTypes.map((item) => labelMapping[item] || item),
        ...locations.map((item) => labelMapping[item] || item),
        ...views.map((item) => labelMapping[item] || item),
        ...lighting.map((item) => labelMapping[item] || item),
      ]
        .filter(Boolean)
        .join(", ");

      return {
        hotelId: searchParams.get("hotelId") ? parseInt(searchParams.get("hotelId")) : null,
        hotelName: hotelDetails?.name || "The Imperial Đà Lạt", // Tên mặc định hoặc lấy từ params nếu có
        checkIn: dateStart,
        checkOut: dateEnd,
        guests: `${adults} người lớn, ${children} trẻ em`,
        totalPrice: totalPrice.toLocaleString("vi-VN") + " VNĐ",
        rooms: rooms,
        features: features,
        bookingDate: new Date().toISOString(),
        status: "Đang chờ xác nhận",
      };
    }

    return fakeRoomData;
  }, [room, searchParams, hotelDetails, discount, location.state]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full space-y-6">
      {!isConfirmationView && (
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-medium text-blue-600 hover:text-blue-800 
                   px-3 py-1.5 rounded-full hover:bg-blue-50 transition"
        >
          <ChevronLeftIcon className="h-5 w-5 " />
          Trở về
        </button>
      )}

      <div className="px-10 py-6 border space-y-4 w-full shadow relative">
        {!isConfirmationView && (
          <div
            className="border p-6 absolute right-0 space-y-2 top-6 bg-white rounded-xl 
               shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 
               transition-all duration-300 ease-in-out cursor-pointer group z-10"
            onClick={() => setWriteComment(displayRoom)}
          >
            <p className="font-bold text-gray-700">
              Bạn thấy dịch vụ Imperial thế nào?
            </p>

            <div className="flex items-center gap-2 text-lg font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
              <span>Đánh giá ngay</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Thông tin chi tiết</p>
        </div>
        <div className="space-y-4 ">
          <p className="text-xl font-bold mb-4">Phòng</p>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Khách sạn</p>
            <p className="text-lg font-semibold">{displayRoom.hotelName}</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số lượng phòng</p>
            <p className="text-lg font-semibold">{displayRoom.rooms}</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số lượng khách</p>
            <p className="text-lg font-semibold">{displayRoom.guests}</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày nhận phòng:</p>
            <p className="text-lg font-semibold">
              {formatDate(displayRoom.checkIn)}
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày trả phòng:</p>
            <p className="text-lg font-semibold">
              {formatDate(displayRoom.checkOut)}
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Tổng tiền:</p>
            <p className="text-lg font-semibold text-cyan-600">
              {displayRoom.totalPrice}
            </p>
          </div>
          {displayRoom.bookingDate && (
            <div className="flex ">
              <p className="text-lg font-semibold w-1/3">Ngày đặt phòng:</p>
              <p className="text-lg font-semibold">
                {formatDate(displayRoom.bookingDate)}
              </p>
            </div>
          )}
        </div>
        <div className="space-y-4">
          <p className="text-xl font-bold mb-4">Thông tin khách hàng</p>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Họ và tên:</p>
            <p className="text-lg font-semibold">{user?.fullName || "không"}</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Địa chỉ email:</p>
            <p className="text-lg font-semibold">{user?.email || "không"}</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số điện thoại:</p>
            <p className="text-lg font-semibold">
              {user?.phoneNumber || "không"}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xl font-bold mb-4">Thông tin chi tiết phòng</p>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Vị trí & Tiện ích:</p>
            <p className="text-lg font-semibold">
              {displayRoom.features || "không"}
            </p>
          </div>
        </div>
        <div className="w-full   text-gray-800 space-y-3">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Chi tiết</h2>

          {/* Diện tích */}
          <div className="flex">
            <p className="text-lg font-semibold w-1/3">Diện tích:</p>
            <p className="text-lg">40m²</p>
          </div>

          {/* Số giường */}
          <div className="flex">
            <p className="text-lg font-semibold w-1/3">Số giường:</p>
            <p className="text-lg">1 giường đôi lớn</p>
          </div>

          {/* Tặng kèm */}
          <div className="flex items-start">
            <p className="text-lg font-semibold w-1/3">Tặng kèm:</p>
            <div className="text-lg space-y-1">
              <p>1. Cũi cho bé</p>
              <p>2. Chăn + gối + đệm lót chống thấm</p>
              <p>3. Bộ 10 bỉm Huggies/Merries size phù hợp</p>
              <p>4. Ấm đun nước nóng + bình tiệt trùng</p>
              <p>5. Ghế ăn dặm gấp gọn</p>
              <p>6. Đồ chơi xúc xắc + thú bông an toàn</p>
            </div>
          </div>

          {/* Dịch vụ sẵn */}
          <div className="flex items-start">
            <p className="text-lg font-semibold w-1/3">Dịch vụ sẵn:</p>
            <div className="text-lg space-y-1">
              <p>1. Wi-Fi 6 siêu tốc (500–800 Mbps)</p>
              <p>2. Chăn + gối + đệm lót chống thấm</p>
              <p>3. Máy sấy tóc Dyson Supersonic 1600W</p>
              <p>4. Máy pha cà phê Nespresso + 6 viên/ngày</p>
              <p>5. Tủ lạnh mini + nước suối, bia, snack</p>
              <p>6. TV OLED 55–65 inch + Netflix, YouTube 4K</p>
              <p>7. Điều hòa 2 chiều + máy lọc không khí</p>
              <p>8. Bàn là + bàn ủi quần áo</p>
              <p>9. Đèn ngủ cảm ứng + đèn đọc sách</p>
              <p>10. Vòi sen + bồn tắm chuẩn 5 sao</p>
            </div>
          </div>
        </div>
      </div>
      {!isConfirmationView && (
        <>
          <Highlights />
          <AboutUs />
          <Map />
          {writeComment && (
            <CommentModal
              room={displayRoom}
              onClose={() => setWriteComment(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetail;
