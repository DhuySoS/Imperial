import React, { useEffect, useState } from "react";
import HotelCard from "@/components/card/HotelCard";
import { Link } from "react-router-dom";
import FavoritesCard from "@/components/card/FavoriesCard";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/currency";
import { Trash2 } from "lucide-react";

const Favorites = () => {
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFavoriteHotels = async () => {
      if (user?.id) {
        try {
          const response = await api.get(`/favorites/${user.id}`);
          const favorites = response.data;

          // Gọi API chi tiết cho từng hotelId
          const detailPromises = favorites.map((item) => {
            const hotelId = item.hotelId;
            return api.get(`/hotels/${hotelId}/details`);
          });

          const detailResponses = await Promise.all(detailPromises);

          // Map dữ liệu từ API chi tiết sang format của Card
          const mappedData = detailResponses.map((res, index) => {
            const detail = res.data;
            const hotel = detail.hotel; // Xử lý tùy theo cấu trúc trả về
            console.log(detail);

            return {
              id: hotel.id,
              name: hotel.name,
              location: hotel.address,
              image: `/assets/hotel/featuredApartment${index % 7}.jpg`, // Ảnh giả lập
              rating: detail.averageRating || hotel.rating || 5,
              price: hotel.basicPrice
                ? formatCurrency(hotel.basicPrice)
                : "Liên hệ",
            };
          });
          setFavoriteHotels(mappedData);
        } catch (error) {
          console.error("Lỗi khi tải danh sách yêu thích:", error);
        }
      }
    };
    fetchFavoriteHotels();
  }, [user]);

  const handleRemoveFavorite = async (hotelId) => {
    if (!user) return;
    try {
      await api.delete(`/favorites?guestId=${user.id}&hotelId=${hotelId}`);
      setFavoriteHotels((prev) => prev.filter((h) => h.id !== hotelId));
    } catch (error) {
      console.error("Lỗi khi xóa yêu thích:", error);
    }
  };

  return (
    <div className="w-full  mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Danh sách yêu thích
      </h1>
      {favoriteHotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteHotels.map((hotel) => (
            <div key={hotel.id} className="relative group">
              <Link to={`/room_detail/${hotel.id}`}>
                <FavoritesCard hotel={hotel} />
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFavorite(hotel.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 shadow-sm transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                title="Bỏ thích"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-xl font-semibold text-gray-700">
            Danh sách yêu thích của bạn đang trống
          </p>
          <p className="text-gray-500 mt-2 mb-6">
            Hãy bắt đầu khám phá và lưu lại những nơi ở tuyệt vời nhé!
          </p>
          <Link
            to="/"
            className="bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Bắt đầu tìm kiếm
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;