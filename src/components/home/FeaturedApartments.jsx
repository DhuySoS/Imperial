import React from 'react'

function FeaturedApartments() {
  return (
    <div className="w-full px-6 pb-10 rounded-2xl shadow-md transition-shadow duration-300 p-4 bg-white inline-block">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center ">
        Những căn hộ nhận được nhiều sự chú ý nhất ✨
      </h2>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide">
        {/* Card 1 */}
        <div className="flex flex-col min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Ảnh */}
          <img
            src="/assets/hotel/featuredApartment.jpg"
            alt="The Imperial Đà Lạt"
            className="w-full h-[180px] object-cover rounded-t-2xl"
          />

          {/* Nội dung */}
          <div className="p-4">
            {/* Tên */}
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              The Imperial Đà Lạt
            </h3>

            {/* Đánh giá */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="text-yellow-400 mr-1">⭐</span>
              <span className="font-semibold text-gray-800 mr-1">4.85</span>
              <span>(780 đánh giá)</span>
            </div>

            {/* Giá & khuyến mãi */}
            <div className="flex flex-col">
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold rounded px-2 py-1 w-fit mb-1">
                Tiết kiệm 29%
              </span>
              <span className="text-gray-400 text-sm line-through">
                2,500,000 VND
              </span>
              <span className="text-lg font-bold text-[#ff6b00]">
                1,775,000 VND/đêm
              </span>
            </div>
          </div>
        </div>
        {/* Card 1 */}
        <div className="flex flex-col min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
          {/* Ảnh */}
          <img
            src="/assets/hotel/featuredApartment.jpg"
            alt="The Imperial Đà Lạt"
            className="w-full h-[180px] object-cover rounded-t-2xl"
          />

          {/* Nội dung */}
          <div className="p-4">
            {/* Tên */}
            <h3 className="font-semibold text-lg text-gray-800 mb-1">
              The Imperial Đà Lạt
            </h3>

            {/* Đánh giá */}
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="text-yellow-400 mr-1">⭐</span>
              <span className="font-semibold text-gray-800 mr-1">4.85</span>
              <span>(780 đánh giá)</span>
            </div>

            {/* Giá & khuyến mãi */}
            <div className="flex flex-col">
              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold rounded px-2 py-1 w-fit mb-1">
                Tiết kiệm 29%
              </span>
              <span className="text-gray-400 text-sm line-through">
                2,500,000 VND
              </span>
              <span className="text-lg font-bold text-[#ff6b00]">
                1,775,000 VND/đêm
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedApartments   