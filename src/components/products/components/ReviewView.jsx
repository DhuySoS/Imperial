import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

const fakeReviews = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "/assets/avatar.jpg",
    rating: 5,
    content:
      "Khách sạn tuyệt vời! Dịch vụ tốt, phòng ốc sạch sẽ và nhân viên thân thiện. Tôi chắc chắn sẽ quay lại.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "/assets/avatar.jpg",
    rating: 4,
    content:
      "Vị trí thuận lợi, gần trung tâm. Phòng có view đẹp nhưng cách âm chưa được tốt lắm. Nhìn chung là một trải nghiệm tốt.",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "/assets/avatar.jpg",
    rating: 5,
    content:
      "Mọi thứ đều hoàn hảo, từ không gian, tiện nghi cho đến thái độ phục vụ của nhân viên. Rất đáng tiền!",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    avatar: "/assets/avatar.jpg",
    rating: 3,
    content:
      "Phòng hơi nhỏ so với mong đợi. Bữa sáng không đa dạng lắm. Được cái nhân viên nhiệt tình.",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    avatar: "/assets/avatar.jpg",
    rating: 4,
    content:
      "Khách sạn có thiết kế đẹp, hiện đại. Hồ bơi sạch sẽ. Sẽ giới thiệu cho bạn bè và người thân.",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }
      />
    ))}
  </div>
);

const ReviewView = () => {
  const [selectedStar, setSelectedStar] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState(fakeReviews);

  useEffect(() => {
    if (selectedStar === null) {
      setFilteredReviews(fakeReviews);
    } else {
      setFilteredReviews(
        fakeReviews.filter((review) => review.rating === selectedStar)
      );
    }
  }, [selectedStar]);

  return (
    <div className="space-y-6 p-8 bg-white rounded-2xl shadow-">
      <h2 className="text-2xl font-bold">Đánh giá từ khách hàng</h2>
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedStar(null)}
          className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
            selectedStar === null
              ? "bg-cyan-500 text-white border-cyan-500"
              : "bg-white hover:bg-gray-100 border-gray-300"
          }`}
        >
          Tất cả
        </button>
        {[5, 4, 3, 2, 1].map((star) => (
          <button
            key={star}
            onClick={() => setSelectedStar(star)}
            className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors ${
              selectedStar === star
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {star} sao
          </button>
        ))}
      </div>

      {/* Review List */}
      <div className="space-y-6 h-100 overflow-auto ">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-6 border-b pb-4 last:border-0 last:pb-0"
          >
            <img
              src={review.avatar}
              alt={review.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-bold text-gray-800">{review.name}</p>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-600 mt-1">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewView;