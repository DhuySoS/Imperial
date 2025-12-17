import { formatCurrency } from "@/lib/currency";
import api from "@/services/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function FeaturedApartments() {
  const [featuredApartments, setFeaturedApartments] = useState([]);
  const { user } = useAuth();
  const [likedHotels, setLikedHotels] = useState([]);

  useEffect(() =>{
    const fetchFeaturedApartments = async () => {
      try {
        const response = await api.get(`/hotels`);
        setFeaturedApartments(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Loi lay du lieu phong:", error);
      }
    };
    fetchFeaturedApartments();
  }, [])

  useEffect(() => {
    const fetchUserFavorites = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/favorites/${user.id}`);
          console.log("fav", response);
          
          const ids = response.data.map((item) =>  item.hotelId);
          setLikedHotels(ids);
        } catch (error) {
          console.error("Lỗi khi tải danh sách yêu thích:", error);
        }
      }
    };
    fetchUserFavorites();
  }, [user]);

  const handleToggleFavorite = async (e, hotelId) => {
    e.preventDefault(); // Ngăn chặn chuyển trang khi bấm vào nút tim
    e.stopPropagation(); // Ngăn sự kiện nổi bọt

    if (!user) {
      alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
      return;
    }

    try {
      // Cập nhật UI ngay lập tức (Optimistic update)
      if (likedHotels.includes(hotelId)) {
        setLikedHotels((prev) => prev.filter((id) => id !== hotelId));
        // Gọi API xóa (nếu backend hỗ trợ delete)
        await api.delete(`/favorites?guestId=${user.id}&hotelId=${hotelId}`);
      } else {
        setLikedHotels((prev) => [...prev, hotelId]);
        // Gọi API thêm yêu thích
        await api.post("/favorites", { guestId: user.id, hotelId });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật yêu thích:", error);
    }
  };

  return (
    <div className="w-full px-6 p-4 bg-white inline-block">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        Những căn hộ nhận được nhiều sự chú ý nhất ✨
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto scrollbar-hide pb-4">
        {/* Card 1 */}
        {featuredApartments.map((apartment, index) => (
          <Link key={index} to={`/room_detail/${apartment.hotel.id}`} className="col-span-1 w-full">
            <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Ảnh & Badge */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={`/assets/hotel/featuredApartment${index % 7}.jpg`}
                  alt="The Imperial Đà Lạt"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />

                <div
                  onClick={(e) => handleToggleFavorite(e, apartment.hotel.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all backdrop-blur-sm shadow-sm z-10 ${
                    likedHotels.includes(apartment.hotel.id)
                      ? "bg-red-50 text-red-500"
                      : "bg-white/70 hover:bg-white text-gray-600 hover:text-red-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill={likedHotels.includes(apartment.hotel.id) ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col gap-2">
                {/* Tên & Đánh giá */}
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {apartment.hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded">
                    <span className="text-yellow-400">★</span>{" "}
                    {apartment.averageRating.toFixed(1) || "N/A"}
                  </div>
                </div>

                {/* Địa điểm (Mock) */}
                <div className="flex items-center text-gray-500 text-sm gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="truncate">{apartment.hotel.address}</span>
                </div>

                {/* Giá & khuyến mãi */}
                <div className="mt-2 pt-3 border-t border-gray-100 flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-orange-600">
                        {formatCurrency(apartment.hotel.basicPrice)}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        /đêm
                      </span>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FeaturedApartments;
