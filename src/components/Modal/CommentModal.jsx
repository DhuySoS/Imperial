import { Star, X } from "lucide-react";
import React, { useState } from "react";
import BookingCard from "../card/BookingCard";

const CommentModal = ({ room, onClose }) => {
  if (!room) return null;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="bg-gray-100  rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b text-center relative">
          <h3 className="text-xl font-bold text-gray-800  gap-2">
            Viết đánh giá của bạn
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors absolute right-4 top-1/2 -translate-y-1/2"
          >
            <X size={24} />
          </button>
        </div>
        {/*  */}
        <div className=" space-y-4 p-4">
          <div className="flex gap-2 border py-4 justify-center rounded-xl bg-white ">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hover || rating);
              return (
                <button
                  key={star}
                  type="button"
                  className="transition-transform hover:scale-110 focus:outline-none"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    size={40} // Sao to như ảnh
                    className={`${
                      isActive
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200 fill-gray-200"
                    } transition-colors duration-200`}
                  />
                </button>
              );
            })}
          </div>
          <BookingCard item={room} />
          <div className="border bg-white p-4 rounded-xl shadow-sm">
            <textarea className="w-full  resize-none outline-none text-gray-700 placeholder:text-gray-400 text-lg leading-relaxed bg-transparent" placeholder="Hãy viết đánh giá..."/>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98]">
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
