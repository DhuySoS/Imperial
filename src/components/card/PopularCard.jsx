import React from "react";
import { Link } from "react-router-dom";

function PopularCard() {
  const locations = [
    {
      id: 1,
      name: "Nha Trang",
      image: "/assets/popularLocation/nhaTrang.jpg",
    },
    {
      id: 2,
      name: "Đà Lạt",
      image: "/assets/popularLocation/daLat.jpg",
    },
    {
      id: 3,
      name: "Đà Nẵng",
      image: "/assets/popularLocation/daNang.jpg",
    },
    {
      id: 4,
      name: "Ninh Bình",
      image: "/assets/popularLocation/ninhBinh.jpg",
    },
  ];
  return (
    <div className="w-full px-6 pb-10 rounded-2xl  transition-shadow duration-300 p-4 bg-white inline-block">
      <h2 className="text-2xl font-bold text-gray-800 mb-14 text-center ">
        Top những địa điểm đang thịnh hành nhất
      </h2>
      <div className="grid grid-cols-4 gap-14 w-full overflow-x-auto scrollbar-hide  justify-between">
        {locations.map((location) => (
          <Link to={`/search?city=${location.name}`} key={location.id} className="col-span-1 w-full ">
            <div className="flex flex-col w-full  bg-white  cursor-pointer">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-[200px] object-cover rounded-2xl"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {location.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularCard;
