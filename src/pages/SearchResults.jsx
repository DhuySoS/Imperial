import React, { useState, useEffect } from "react";
import HotelCard from "@/components/card/HotelCard";
import { useSearchParams } from "react-router-dom";
import api from "@/services/api";


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
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");
  const priceRangeParam = searchParams.get("priceRange");
  console.log("City:", city);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        let response;
        if (city) {
          response = await api.get("/hotels/search", { params: { city } });
          console.log("Response data:", response.data);
        } else {
          response = await api.get("/hotels");
        }

        const mappedData = response.data.map((item, index) => ({
          id: item.hotel.id,
          name: item.hotel.name,
          location: item.hotel.address,
          image: `/assets/hotel/featuredApartment${(index % 5) + 1}.jpg`, // Ảnh giả lập
          rating: item.averageRating || 0,
          price: item.hotel.basicPrice.toLocaleString("vi-VN"), // Format giá thành chuỗi có dấu chấm
          reviewCount: item.reviews.length || 0,
        }));

        setAllHotels(mappedData);
        setFilteredHotels(mappedData);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khách sạn:", error);
      }
    };
    fetchHotels();
  }, [city]);

  useEffect(() => {
    let hotelsToFilter = [...allHotels];

    if (priceRangeParam) {
      const match = priceRangeParam.match(/(\d+)\s*triệu/i);
      console.log("priceUrl", match);
      
      if (match) {
        const minPrice = parseInt(match[1], 10) * 1000000;
        hotelsToFilter = hotelsToFilter.filter((hotel) => {
          const price = parsePrice(hotel.price);
          return price >= minPrice;
        });
      }
    }

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
  }, [priceFilter, allHotels, priceRangeParam]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold ">Kết quả tìm kiếm</h1>
      <p className="my-6">Tìm thấy {filteredHotels.length} khách sạn phù hợp</p>

      <div className="grid grid-cols-4 gap-8">
        <div className="col-span-1">
          <div className="p-6 space-y-6 bg-white rounded-2xl ">
            <p className="text-xl font-semibold ">Lọc kết quả</p>
            <div>
              <p className="font-semibold mb-2">Giá</p>
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
            </div>
            <div className="mb-8">
              <h4 className="font-semibold text-foreground mb-4">
                Loại Khách Sạn
              </h4>
              <div className="space-y-2">
                {["5-star", "4-star", "3-star"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedType === type}
                      onChange={() =>
                        setSelectedType(selectedType === type ? null : type)
                      }
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 space-y-6">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
