import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  console.log("hotelcard" , hotel);
  
  return (
    <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white ">
      <div className="grid grid-cols-3 p-6 gap-6">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="col-span-1 h-48 object-cover rounded-xl"
        />
        <div className="p-4 col-span-1">
          <h3 className="text-xl font-bold truncate">{hotel.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{hotel.location}</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={`mr-1 ${
                    hotel.rating > index
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="font-bold mx-2">{hotel.rating.toFixed(1)}</span>
              <span>({hotel.reviewCount || 0})</span>
            </div>
          </div>
          {/* Tiện ích */}
          <div className="flex items-center gap-2 mt-2">
            <div className="px-2 py-1 bg-gray-300 text-xs">Wifi</div>
            <div className="px-2 py-1 bg-gray-300 text-xs">Wifi</div>
            <div className="px-2 py-1 bg-gray-300 text-xs">Wifi</div>
          </div>
        </div>
        <div className="col-span-1 ">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <p className="text-sm">Giá mỗi đêm từ</p>
              <p className="font-bold text-xl text-blue-600">
                {hotel.price} VNĐ
              </p>
            </div>
            <Link to={`/room_detail/${hotel.id}`} className="w-full py-2 bg-blue-500 text-white rounded-2xl block text-center">
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
