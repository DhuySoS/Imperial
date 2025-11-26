import { ChevronLeftIcon } from "lucide-react";
import React, { useState } from "react";
import Highlights from "./Highlights";
import AboutUs from "./AboutUs";
import Map from "./Map";
import CommentModal from "../Modal/CommentModal";
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
const OrderDetail = ({ room = fakeRoomData, isConfirmationView = false }) => {
  const [writeComment, setWriteComment] = useState(null);
  return (
    <div className="w-full space-y-6">
      {!isConfirmationView && (
        <button
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
            onClick={() => setWriteComment(room)}
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
            <p className="text-lg font-semibold">The Imperial Đà Lạt 1</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số phòng</p>
            <p className="text-lg font-semibold">301</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày nhận phòng:</p>
            <p className="text-lg font-semibold">
              00:00, Chủ nhật, Ngày 7 tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày trả phòng:</p>
            <p className="text-lg font-semibold">
              23:59, Thứ Ba, Ngày 9 Tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Mã đặt phòng:</p>
            <p className="text-lg font-semibold">I12345</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày đặt phòng:</p>
            <p className="text-lg font-semibold">
              22:22, Thứ Ba , Ngày 2 Tháng 9 Năm 2025{" "}
            </p>
          </div>
        </div>
        <hr />
        <div className="space-y-4 ">
          <p className="text-xl font-bold mb-4">Phòng</p>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Khách sạn</p>
            <p className="text-lg font-semibold">The Imperial Đà Lạt 1</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số phòng</p>
            <p className="text-lg font-semibold">301</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày nhận phòng:</p>
            <p className="text-lg font-semibold">
              00:00, Chủ nhật, Ngày 7 tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày trả phòng:</p>
            <p className="text-lg font-semibold">
              23:59, Thứ Ba, Ngày 9 Tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Mã đặt phòng:</p>
            <p className="text-lg font-semibold">I12345</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày đặt phòng:</p>
            <p className="text-lg font-semibold">
              22:22, Thứ Ba , Ngày 2 Tháng 9 Năm 2025{" "}
            </p>
          </div>
        </div>
        <hr />
        <div className="space-y-4 ">
          <p className="text-xl font-bold mb-4">Phòng</p>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Khách sạn</p>
            <p className="text-lg font-semibold">The Imperial Đà Lạt 1</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Số phòng</p>
            <p className="text-lg font-semibold">301</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày nhận phòng:</p>
            <p className="text-lg font-semibold">
              00:00, Chủ nhật, Ngày 7 tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày trả phòng:</p>
            <p className="text-lg font-semibold">
              23:59, Thứ Ba, Ngày 9 Tháng 9 Năm 2025
            </p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Mã đặt phòng:</p>
            <p className="text-lg font-semibold">I12345</p>
          </div>
          <div className="flex ">
            <p className="text-lg font-semibold w-1/3">Ngày đặt phòng:</p>
            <p className="text-lg font-semibold">
              22:22, Thứ Ba , Ngày 2 Tháng 9 Năm 2025{" "}
            </p>
          </div>
        </div>
      </div>
      {!isConfirmationView && (
        <>
          <Highlights />
          <AboutUs />
          <Map />
          {writeComment && (
            <CommentModal room={room} onClose={() => setWriteComment(null)} />
          )}
        </>
      )}
    </div>
  );
};

export default OrderDetail;
