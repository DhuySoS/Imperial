import React from 'react'

function PopularCard() {
  return (
    <div className="w-full px-6 pb-10 rounded-2xl shadow-md transition-shadow duration-300 p-4 bg-white inline-block">
      <h2 className="text-2xl font-bold text-gray-800 mb-14 text-center ">
        Top những địa điểm đang thịnh hành nhất
      </h2>
      <div className="flex gap-14 w-full overflow-x-auto scrollbar-hide h-60">
        <div className="flex flex-col min-w-[250px] max-w-[250px]  bg-white  cursor-pointer">
          <img
            src="/assets/popularLocation/nhaTrang.jpg"
            alt="Nha Trang"
            className="w-full h-[200px] object-cover rounded-2xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Nha Trang</h3>
          </div>
        </div>

        {/* Ví dụ thêm vài địa điểm khác */}
        <div className="flex flex-col min-w-[250px] max-w-[250px] bg-white  cursor-pointer">
          <img
            src="/assets/popularLocation/daLat.jpg"
            alt="Đà Lạt"
            className="w-full h-[200px] object-cover rounded-2xl"
          />
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Đà Lạt</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCard