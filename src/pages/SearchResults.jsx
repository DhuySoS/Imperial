import React, { useState, useEffect } from "react";
import HotelCard from "@/components/card/HotelCard";

const fakeHotels = [
  {
    id: 1,
    name: "Khách sạn Colline",
    location: "Phường 1, Đà Lạt",
    image: "/assets/Rooms/daLat/5.jpg",
    rating: 4.5,
    price: "1.200.000",
  },
  {
    id: 2,
    name: "Dalat Palace Heritage Hotel",
    location: "Phường 1, Đà Lạt",
    image: "/assets/Rooms/daLat/6.jpg",
    rating: 4.8,
    price: "2.500.000",
  },
  {
    id: 3,
    name: "Ana Mandara Villas Dalat",
    location: "Phường 5, Đà Lạt",
    image: "/assets/Rooms/daLat/7.jpg",
    rating: 4.7,
    price: "3.000.000",
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

// Hàm chuyển đổi chuỗi giá thành số để so sánh
const parsePrice = (priceString) => {
  return parseInt(priceString.replace(/\./g, ""), 10);
};

const priceRanges = [
  { id: "all", label: "Tất cả" },
  { id: "under1m", label: "Dưới 1.000.000" },
  { id: "1m-2m", label: "1.000.000 - 2.000.000" },
  { id: "over2m", label: "Trên 2.000.000" },
];

const SearchResults = () => {
  const [priceFilter, setPriceFilter] = useState("all");
  const [filteredHotels, setFilteredHotels] = useState(fakeHotels);

  useEffect(() => {
    let hotelsToFilter = [...fakeHotels];

    if (priceFilter !== "all") {
      hotelsToFilter = hotelsToFilter.filter((hotel) => {
        const price = parsePrice(hotel.price);
        if (priceFilter === "under1m") {
          return price < 1000000;
        }
        if (priceFilter === "1m-2m") {
          return price >= 1000000 && price <= 2000000;
        }
        if (priceFilter === "over2m") {
          return price > 2000000;
        }
        return true;
      });
    }

    setFilteredHotels(hotelsToFilter);
  }, [priceFilter]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>

      {/* Price Filter */}
      <div className="flex flex-wrap gap-3 mb-8 h-min-full">
        {priceRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setPriceFilter(range.id)}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
              priceFilter === range.id
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;