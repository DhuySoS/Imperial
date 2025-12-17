import React, { use, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import SeeMoreImageModal from "../Modal/SeeMoreImageModal";
import FilterOptions from "./FilterOptions";
import Highlights from "../order/Highlights";
import AboutUs from "../order/AboutUs";
import ReviewView from "./components/ReviewView";
import SimilarHotels from "./components/SimilarHotels";
import Map from "../order/Map";
import { is } from "date-fns/locale/is";
import api from "@/services/api";
import DateRangePicker from "@/common/DateRangePicker";
import { useAuth } from "@/context/AuthContext";

const ProductDetail = () => {
  const hotelId = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFavor, setIsFavor] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const fakeImage = [
    "/assets/Rooms/daLat/1.jpg",
    "/assets/Rooms/daLat/2.jpg",
    "/assets/Rooms/daLat/3.jpg",
    "/assets/Rooms/daLat/4.jpg",
    "/assets/Rooms/daLat/5.jpg",
    "/assets/Rooms/daLat/6.jpg",
    "/assets/Rooms/daLat/7.jpg",
    "/assets/Rooms/daLat/8.jpg",
    "/assets/Rooms/daLat/9.jpg",
    "/assets/Rooms/daLat/10.jpg",
  ];
  const [hotel, setHotel] = useState(null);
  const visibleImages = fakeImage.slice(0, 4);
  const remainingCount = fakeImage.length - 4;
  const [seeMoreImage, setSeeMoreImage] = useState(null);
  useEffect(()=>{
    const fetchUserFavorites = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/favorites/${user.id}`);
          console.log("fav", response);
          const ids = response.data.map((item) =>  item.hotelId);
          setIsFavor(ids.includes(parseInt(hotelId.id)));
        } catch (error) {
          console.error("Lỗi khi tải danh sách khách sạn yêu thích:", error);
        }
      }    };
    fetchUserFavorites();
  }, [user, hotelId]);
const toggleFavorite = async () => {
  if (!user) return;

  try {
    if (!isFavor) {
      await api.post("/favorites", {
        guestId: user.id,
        hotelId: Number(hotelId.id),
      });
      setIsFavor(true);
    } else {
      await api.delete("/favorites", {
        params: {
          guestId: user.id,
          hotelId: Number(hotelId.id),
        },
      });
      setIsFavor(false);
    }
  } catch (error) {
    console.error("Favorite error:", error);
  }
};


  useEffect(() => {
    const fetchHotelDetail = async () => {
      try {
        const response = await api.get(`/hotels/${hotelId.id}/details`);
        setHotel(response.data);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết khách sạn:", error);
      }
    };
    fetchHotelDetail();
  }, []);
  useEffect(() => {
    console.log(seeMoreImage);
    console.log(bookingInfo);
  }, [seeMoreImage, bookingInfo]);

  if (!hotel) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  const floorFees = {
    "3-6": 0,
    "7-11": 250000,
    "12-16": 350000,
    "17-18": 500000,
  };

  const calculateTotal = () => {
    if (!hotel?.hotel?.basicPrice) return 0;
    const rooms = bookingInfo?.rooms || 1;
    const floorFee = bookingInfo?.floor ? (floorFees[bookingInfo.floor] || 0) : 0;
    let nights = 1;
    if (dateStart && dateEnd) {
      const start = new Date(dateStart);
      const end = new Date(dateEnd);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      nights = diffDays > 0 ? diffDays : 1;
    }
    return (hotel.hotel.basicPrice + floorFee) * rooms * nights;
  };

  const getPaymentUrl = () => {
    const params = new URLSearchParams();
    if (hotelId?.id) params.append("hotelId", hotelId.id);
    if (dateStart) params.append("dateStart", dateStart instanceof Date ? dateStart.toISOString() : dateStart);
    if (dateEnd) params.append("dateEnd", dateEnd instanceof Date ? dateEnd.toISOString() : dateEnd);

    if (bookingInfo) {
      if (bookingInfo.adults) params.append("adults", bookingInfo.adults);
      if (bookingInfo.childrenUnder3) params.append("childrenUnder3", bookingInfo.childrenUnder3);
      if (bookingInfo.children3to5) params.append("children3to5", bookingInfo.children3to5);
      if (bookingInfo.children6to12) params.append("children6to12", bookingInfo.children6to12);
      if (bookingInfo.rooms) params.append("rooms", bookingInfo.rooms);
      if (bookingInfo.floor) params.append("floor", bookingInfo.floor);
      
      if (bookingInfo.roomTypes?.length) params.append("roomTypes", bookingInfo.roomTypes.join(","));
      if (bookingInfo.locations?.length) params.append("locations", bookingInfo.locations.join(","));
      if (bookingInfo.views?.length) params.append("views", bookingInfo.views.join(","));
      if (bookingInfo.lighting?.length) params.append("lighting", bookingInfo.lighting.join(","));
    }
    if (hotel?.hotel?.basicPrice) params.append("basicPrice", hotel.hotel.basicPrice);
    params.append("totalPrice", calculateTotal());
    return `/payment?${params.toString()}`;
  };

  const handlePayment = () => {
    if (!dateStart || !dateEnd) {
      alert("Vui lòng chọn ngày nhận phòng và trả phòng để tiếp tục!");
      return;
    }
    navigate(getPaymentUrl());
  };

  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <img
          src="/assets/Rooms/daLat/12.jpg"
          alt=""
          className="w-full object-cover h-150 rounded-2xl shadow-2xl"
        />
        <div className="absolute bottom-10 left-10 z-50 shadow-amber-50">
          <p className="text-white text-xl font-bold">{hotel.hotel.name}</p>
          <p className="text-white text-lg font-medium">
            {hotel.hotel.address}
          </p>
        </div>
      </div>
      {/* body */}
      <div className="py-10 space-y-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className=" text-2xl font-bold">{hotel.hotel.name}</p>
                <p className=" text-lg font-medium">{hotel.hotel.address}</p>
              </div>
              <button
                className={`px-3 py-2 border rounded-xl hover:bg-red-100 hover:text-red-400 cursor-pointer
                ${isFavor ? "bg-red-100 text-red-400" : ""}`}
                onClick={toggleFavorite}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
                  />
                </svg>
              </button>
            </div>

            <div className=" flex items-center justify-center">
              <img
                src="/assets/Rooms/daLat/12.jpg"
                alt=""
                className="w-full object-cover rounded-2xl"
              />
            </div>

            {/* 3. Grid 4 ảnh nhỏ (2 dòng, 2 cột) */}
            <div className="grid grid-cols-2 gap-4">
              {visibleImages.map((image, index) => (
                <div key={index} className="relative cursor-pointer group">
                  <img
                    src={image}
                    alt=""
                    className="w-full h-48 object-cover rounded-2xl"
                  />

                  {index === 3 && remainingCount > 0 && (
                    <div
                      className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center hover:bg-black/60 transition-colors"
                      onClick={() => setSeeMoreImage(fakeImage.slice(4))}
                    >
                      <span className="text-white text-2xl font-bold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {seeMoreImage && (
              <SeeMoreImageModal
                images={seeMoreImage}
                onClose={() => setSeeMoreImage(null)}
              />
            )}
            {/* 4. Tình trạng phòng (Footer bên trái) */}
            <div className=" border text-center p-4 rounded-2xl shadow">
              <p className="text-2xl font-semibold">Tình trạng phòng</p>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 space-y-4">
                  <p className="text-xl font-semibold">Tầng (3-6)</p>
                  <p className="flex items-center justify-center gap-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 12 12"
                        className="text-white bg-green-400 rounded-full"
                      >
                        <path
                          fill="currentColor"
                          d="M8.85 4.85a.5.5 0 0 0-.707-.707l-2.65 2.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l3-3z"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 6c0 3.31-2.69 6-6 6S0 9.31 0 6s2.69-6 6-6s6 2.69 6 6m-1 0c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5s5 2.24 5 5"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Còn trống 9 phòng
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-xl font-semibold">Tầng (7-11)</p>
                  <p className="flex items-center justify-center gap-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 12 12"
                        className="text-white bg-green-400 rounded-full"
                      >
                        <path
                          fill="currentColor"
                          d="M8.85 4.85a.5.5 0 0 0-.707-.707l-2.65 2.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l3-3z"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 6c0 3.31-2.69 6-6 6S0 9.31 0 6s2.69-6 6-6s6 2.69 6 6m-1 0c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5s5 2.24 5 5"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Còn trống 8 phòng
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-xl font-semibold">Tầng (12-16)</p>
                  <p className="flex items-center justify-center gap-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 12 12"
                        className="text-white bg-green-400 rounded-full"
                      >
                        <path
                          fill="currentColor"
                          d="M8.85 4.85a.5.5 0 0 0-.707-.707l-2.65 2.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l3-3z"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 6c0 3.31-2.69 6-6 6S0 9.31 0 6s2.69-6 6-6s6 2.69 6 6m-1 0c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5s5 2.24 5 5"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Còn trống 5 phòng
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  <p className="text-xl font-semibold">Tầng (17-18)</p>
                  <p className="flex items-center justify-center gap-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 12 12"
                        className="text-white bg-green-400 rounded-full"
                      >
                        <path
                          fill="currentColor"
                          d="M8.85 4.85a.5.5 0 0 0-.707-.707l-2.65 2.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l3-3z"
                        />
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M12 6c0 3.31-2.69 6-6 6S0 9.31 0 6s2.69-6 6-6s6 2.69 6 6m-1 0c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5s5 2.24 5 5"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Còn trống 7 phòng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === PHẦN BÊN PHẢI (Chiếm 1/3) === */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="border p-6 rounded-2xl shadow bg-white space-y-4">
              <p className="text-xl font-semibold">Thời gian lưu trú</p>
              <div className="flex flex-col gap-4">
                <div className="border rounded-lg p-3 bg-gray-50">
                  <DateRangePicker
                    label="Ngày nhận phòng"
                    value={dateStart}
                    onChange={setDateStart}
                  />
                </div>
                <div className="border rounded-lg p-3 bg-gray-50">
                  <DateRangePicker
                    label="Ngày trả phòng"
                    value={dateEnd}
                    onChange={setDateEnd}
                  />
                </div>
              </div>
            </div>
            <div className=" border p-6 rounded-2xl shadow">
              <FilterOptions onDataChange={(data) => setBookingInfo(data)} />
            </div>

            {/* 3. Box Giá tiền */}
            <div className="bg-white border-2 border-gray-300 flex rounded-2xl items-center justify-between shadow py-4 px-6">
              <span className="text-xl font-bold">Tạm tính:</span>
              <span className="text-lg font-black">
                {calculateTotal().toLocaleString("vi-VN")} VNĐ
              </span>
            </div>

            {/* 4. Nút Thanh toán */}
            <button
              onClick={handlePayment}
              className="w-full bg-cyan-400 h-14 flex items-center justify-center text-white rounded-2xl cursor-pointer font-medium hover:bg-cyan-500 transition-colors"
            >
              Thanh toán ngay
            </button>
          </div>
        </div>
        {/* description */}
        <div dangerouslySetInnerHTML={{ __html: hotel.hotel.description }} />

        {/* Highlights */}
        <Highlights />
        {/* Aboutus */}
        <AboutUs />
        {/* Similar Hotels */}
        {/* <SimilarHotels /> */}
        {/* Review */}
        <ReviewView hotelId={hotelId} />
        {/* map */}
        <Map />
      </div>
    </div>
  );
};

export default ProductDetail;
