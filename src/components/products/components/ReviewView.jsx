import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import api from "@/services/api";

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

const ReviewView = ({ hotelId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [selectedStar, setSelectedStar] = useState(null);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!hotelId) return;
      try {
        const reviewsResponse = await api.get(`/reviews/hotel/${hotelId.id}`);
        const reviewsData = reviewsResponse.data;
        console.log(reviewsData);
        
        const reviewsWithGuestInfo = await Promise.all(
          reviewsData.map(async (review) => {
            try {
              const guestResponse = await api.get(`/guests/user/${review.guestId}`);
              const guestData = guestResponse.data;
              return {
                id: review.id,
                name: guestData.fullName,
                avatar: "/assets/avatar.jpg", // Giữ nguyên avatar theo yêu cầu
                rating: review.rating,
                content: review.comment,
              };
            } catch (error) {
              console.error(`Không thể tải thông tin khách hàng ${review.guestId}`, error);
              return { id: review.id, name: "Anonymous", avatar: "/assets/avatar.jpg", rating: review.rating, content: review.comment };
            }
          })
        );
        setAllReviews(reviewsWithGuestInfo);
      } catch (error) {
        console.error("Không thể tải danh sách đánh giá:", error);
      }
    };

    fetchReviews();
  }, [hotelId]);

  useEffect(() => {
    if (selectedStar === null) {
      setFilteredReviews(allReviews);
    } else {
      setFilteredReviews(
        allReviews.filter((review) => review.rating === selectedStar)
      );
    }
  }, [selectedStar, allReviews]);

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