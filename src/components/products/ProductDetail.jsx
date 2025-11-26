import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SeeMoreImageModal from "../Modal/SeeMoreImageModal";
import FilterOptions from "./FilterOptions";
import Highlights from "../order/Highlights";
import AboutUs from "../order/AboutUs";
import ReviewView from "./components/ReviewView";
import SimilarHotels from "./components/SimilarHotels";
import Map from "../order/Map";

const ProductDetail = () => {
  const [isFavor, setIsFavor] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
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
  ]
  const visibleImages = fakeImage.slice(0, 4);
  const remainingCount = fakeImage.length - 4;
  const [seeMoreImage, setSeeMoreImage] = useState(null);
  useEffect(() => {
    console.log(seeMoreImage);
    console.log(bookingInfo);
    
  },[seeMoreImage, bookingInfo])
  return (
    <div className="w-full space-y-6">
      <div className="relative">
        <img
          src="/assets/Rooms/daLat/12.jpg"
          alt=""
          className="w-full object-cover h-150 rounded-2xl shadow-2xl"
        />
        <div className="absolute bottom-10 left-10 z-50 shadow-amber-50">
          <p className="text-white text-xl font-bold">The Imperia Đà Lạt 1</p>
          <p className="text-white text-lg font-medium">
            Phường 10, đường Hùng Vương
          </p>
        </div>
      </div>
      {/* body */}
      <div className="py-10 space-y-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <p className=" text-2xl font-bold">The Imperia Đà Lạt 1</p>
                <p className=" text-lg font-medium">
                  Phường 10, đường Hùng Vương
                </p>
              </div>
              <button
                className={`px-3 py-2 border rounded-xl hover:bg-red-100 hover:text-red-400 cursor-pointer
                ${isFavor ? "bg-red-100 text-red-400" : ""}`}
                onClick={() => setIsFavor(!isFavor)}
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
                  <p className="text-xl font-semibold">Tầng (3-6)</p>
                  <p className="flex items-center justify-center gap-2">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 24 24"
                        className="bg-red-400 rounded-full text-white "
                      >
                        <path
                          fill="currentColor"
                          d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                        />
                      </svg>
                    </span>
                    Hết phòng
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* === PHẦN BÊN PHẢI (Chiếm 1/3) === */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className=" border p-6 rounded-2xl shadow">
              <FilterOptions onDataChange={(data) => setBookingInfo(data)} />
            </div>

            {/* 3. Box Giá tiền */}
            <div className="bg-white border-2 border-gray-300 flex rounded-2xl items-center justify-between shadow py-4 px-6">
              <span className="text-xl font-bold">Tạm tính:</span>
              <span className="text-lg font-black">1.175.000Đ</span>
            </div>

            {/* 4. Nút Thanh toán */}
            <Link to="/payment" className="bg-cyan-400 h-14 flex items-center justify-center text-white rounded-2xl cursor-pointer font-medium hover:bg-cyan-500 transition-colors">
              Thanh toán ngay
            </Link>
          </div>
        </div>
        {/* description */}
        <div className="text-xl font-medium space-y-4">
          <p>
            Imperial Đà Lạt 1 là định nghĩa của sự nghỉ dưỡng sang trọng giữa
            cao nguyên. Với diện tích 65m² và thiết kế lấy cảm hứng từ kiến trúc
            biệt thự cổ điển Pháp, căn suite mang đến sự ấm áp, lãng mạn đặc
            trưng của "Thành phố Ngàn hoa".
          </p>
          <p>
            Imperial Đà Lạt 1 là định nghĩa của sự nghỉ dưỡng sang trọng giữa
            cao nguyên. Với diện tích 65m² và thiết kế lấy cảm hứng từ kiến trúc
            biệt thự cổ điển Pháp, căn suite mang đến sự ấm áp, lãng mạn đặc
            trưng của "Thành phố Ngàn hoa".
          </p>
          <p>
            Imperial Đà Lạt 1 là định nghĩa của sự nghỉ dưỡng sang trọng giữa
            cao nguyên. Với diện tích 65m² và thiết kế lấy cảm hứng từ kiến trúc
            biệt thự cổ điển Pháp, căn suite mang đến sự ấm áp, lãng mạn đặc
            trưng của "Thành phố Ngàn hoa".
          </p>
        </div>
        {/* Highlights */}
        <Highlights/>
        {/* Aboutus */}
        <AboutUs/>
        {/* Similar Hotels */}
        <SimilarHotels />
        {/* Review */}
        <ReviewView />
        {/* map */}
        <Map/>
      </div>
    </div>
  );
};

export default ProductDetail;
