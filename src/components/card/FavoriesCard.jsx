import React from "react";
import { Star, MapPin } from "lucide-react";

const FavoritesCard = ({ hotel }) => {
  return (
    <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold truncate">{hotel.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin size={14} className="mr-1" />
          <span>{hotel.location}</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-bold">{hotel.rating.toFixed(1)}</span>
          </div>
          <div className="text-right flex items-center gap-2">
            <p className="font-bold text-lg text-cyan-500">{hotel.price}</p>
            <p className="text-xs text-gray-500">/đêm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
