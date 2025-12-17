import { formatCurrency } from '@/lib/currency';
import { Calendar, MapPin, User } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
const MyOrderCard = ({item}) => {
    const navigate = useNavigate();
    const orderStatus = [
      {
        id: 1,
        title: "Đã xác nhận",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            className="text-green-400"
          >
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
            />
          </svg>
        ),
      },
      {
        id: 2,
        title: "Chờ xác nhận",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="text-yellow-400"
          >
            <path
              fill="currentColor"
              d="M17 22q-2.075 0-3.537-1.463T12 17t1.463-3.537T17 12t3.538 1.463T22 17t-1.463 3.538T17 22m1.675-2.625l.7-.7L17.5 16.8V14h-1v3.2zM3 21V3h6.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H21v8.25q-.45-.325-.95-.55T19 10.3V5h-2v3H7V5H5v14h5.3q.175.55.4 1.05t.55.95zm9-16q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
            />
          </svg>
        ),
      },
      {
        id: 3,
        title: "Đã hủy",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            className="text-red-400"
          >
            <g fill="none">
              <path
                fill="url(#IconifyId19ab699229f774ca00)"
                d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16"
              />
              <path
                fill="url(#IconifyId19ab699229f774ca01)"
                fillRule="evenodd"
                d="M7.146 7.146a.5.5 0 0 1 .708 0L10 9.293l2.146-2.147a.5.5 0 0 1 .708.708L10.707 10l2.147 2.146a.5.5 0 0 1-.708.708L10 10.707l-2.146 2.147a.5.5 0 0 1-.708-.708L9.293 10L7.146 7.854a.5.5 0 0 1 0-.708"
                clipRule="evenodd"
              />
              <defs>
                <linearGradient
                  id="IconifyId19ab699229f774ca00"
                  x1="4.5"
                  x2="15"
                  y1="3"
                  y2="18.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F83F54" />
                  <stop offset="1" stopColor="#CA2134" />
                </linearGradient>
                <linearGradient
                  id="IconifyId19ab699229f774ca01"
                  x1="7.348"
                  x2="10.473"
                  y1="10.265"
                  y2="13.514"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FDFDFD" />
                  <stop offset="1" stopColor="#FECBE6" />
                </linearGradient>
              </defs>
            </g>
          </svg>
        ),
      },
    ];
    const currentStatus = orderStatus.filter((i) => i.title === item.status);

    const nights =
    item.checkInDate && item.checkOutDate
      ? Math.max(0, Math.ceil(
          (new Date(item.checkOutDate) - new Date(item.checkInDate)) /
            (1000 * 60 * 60 * 24)
        ))
      : 0;

    const totalChildren = (item.childrenUnder3 || 0) + (item.children3To5 || 0) + (item.children6To12 || 0);

    const handleViewDetail = () => {
      const features = [
        item.floor ? `Tầng ${item.floor}` : null,
        ...[item.roomType, item.viewType, item.position, item.lightType].map(
          (k) => labelMapping[k] || k
        ),
      ]
        .filter(Boolean)
        .join(", ");

      const roomData = {
        hotelId: item.hotel.id,
        hotelName: item.hotel.name,
        checkIn: item.checkInDate,
        checkOut: item.checkOutDate,
        guests: `${item.adults} người lớn, ${totalChildren} trẻ em`,
        totalPrice: formatCurrency(item.totalAmount),
        status: item.status,
        bookingCode: item.bookingCode,
        bookingDate: item.createdDate,
        features: features,
        rooms: item.rooms || 1,
      };

      navigate("/order_detail", { state: { room: roomData } });
    };

  return (
    <div className="grid grid-cols-4 gap-6 p-6 border rounded-xl shadow-sm hover:shadow-lg transition-shadow ">
      <div className="col-span-1">
        <img
          src={`/assets/hotel/featuredApartment${(item.hotel?.id || item.hotelId) % 7}.jpg`}
          alt=""
          className=" h-40 object-cover rounded-lg"
        />
      </div>
      <div className="col-span-2">
        <div className="flex justify-between">
          <div>
            <p className="text-xl font-bold">{item.hotel?.name}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{item.hotel?.address}</span>
            </div>
          </div>
          {/* <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              {currentStatus[0].icon}
              <span>{currentStatus[0].title}</span>
            </div>
            
          </div> */}
        </div>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className=" text-sm text-gray-500 mt-1">
              <span>Ngày nhận phòng</span>
              <div className="flex items-center font-bold text-gray-700">
                <Calendar size={14} className="mr-1" />
                <span>{item.checkInDate}</span>
              </div>
            </div>
            <div className=" text-sm text-gray-500 mt-1">
              <span>Ngày trả phòng</span>
              <div className="flex items-center font-bold text-gray-700">
                <Calendar size={14} className="mr-1" />
                <span>{item.checkOutDate}</span>
              </div>
            </div>
            <div className=" text-sm text-gray-500 mt-1">
              <span>Số đêm</span>
              <div className="flex items-center font-bold text-gray-700">
                <span>{nights} đêm</span>
              </div>
            </div>
            <div className=" text-sm text-gray-500 mt-1">
              <span>Khách</span>
              <div className="flex items-center font-bold text-gray-700">
                <div className="flex items-center font-bold text-gray-700">
                  <User size={14} className="mr-1" />
                  <span>
                    {item.adults || 0} người lớn, {totalChildren} trẻ em
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-700">
            <p>Mã đặt phòng:</p>
            <span className="font-bold">{item.bookingCode}</span>
          </div>
        </div>
      </div>
      <div className="col-span-1  flex flex-col justify-center items-center gap-2">
        <div>
          <p className="font-medium">Tổng tiền</p>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(item.totalAmount)}
          </span>
        </div>
        <button onClick={handleViewDetail} className="p-2 bg-blue-500 text-white rounded-md">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

export default MyOrderCard