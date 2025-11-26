import React from "react";
import { ChevronRight } from "lucide-react";

const fakeSimilarHotels = [
  {
    id: 1,
    name: "Khách sạn Colline",
    location: "Phường 1, Đà Lạt",
    image: "/assets/Rooms/daLat/5.jpg",
  },
  {
    id: 2,
    name: "Dalat Palace Heritage Hotel",
    location: "Phường 1, Đà Lạt",
    image: "/assets/Rooms/daLat/6.jpg",
  },
  {
    id: 3,
    name: "Ana Mandara Villas Dalat",
    location: "Phường 5, Đà Lạt",
    image: "/assets/Rooms/daLat/7.jpg",
  },
];

const SimilarHotels = () => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-bold">Khách sạn tương tự</h2>
      <div className="space-y-4">
        {fakeSimilarHotels.map((hotel) => (
          <div key={hotel.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 transition-colors border-b last:border-0">
            <img src={hotel.image} alt={hotel.name} className="w-28 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <p className="font-bold text-gray-800">{hotel.name}</p>
              <p className="text-sm text-gray-500">{hotel.location}</p>
            </div>
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Xem chi tiết
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarHotels;