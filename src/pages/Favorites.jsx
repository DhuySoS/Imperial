import React from "react";
import HotelCard from "@/components/card/HotelCard";
import { Link } from "react-router-dom";

const fakeFavoriteHotels = [
  {
    id: 1,
    name: "Khách sạn Colline",
    location: "Phường 1, Đà Lạt",
    image: "/assets/Rooms/daLat/5.jpg",
    rating: 4.5,
    price: "1.200.000",
  },
  {
    id: 4,
    name: "The Imperia Đà Lạt 1",
    location: "Phường 10, đường Hùng Vương",
    image: "/assets/Rooms/daLat/12.jpg",
    rating: 4.9,
    price: "1.800.000",
  },
];

const Favorites = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Danh sách yêu thích</h1>
      {fakeFavoriteHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fakeFavoriteHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-xl font-semibold text-gray-700">Danh sách yêu thích của bạn đang trống</p>
          <p className="text-gray-500 mt-2 mb-6">Hãy bắt đầu khám phá và lưu lại những nơi ở tuyệt vời nhé!</p>
          <Link to="/" className="bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-cyan-600 transition-colors">
            Bắt đầu tìm kiếm
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;