import React, { useEffect, useState } from "react";
import CheckGroup from "./components/CheckGroup";
import QuantityItem from "./components/QuantityItem";
import FloorOption from "./components/FloorOption";

const FilterOptions = ({ onDataChange }) => {
  const [filters, setFilters] = useState({
    roomTypes: [],
    locations: [],
    views: [],
    lighting: [],
    floor: null, 
  });
  const [counts, setCounts] = useState({
    adults: 0,
    childrenUnder3: 0,
    children3to5: 0,
    children6to12: 0,
    rooms: 1,
  });
  const roomOptions = [
    { label: "Deluxe", value: "deluxe" },
    { label: "Luxury", value: "luxury" },
  ];

  const locationOptions = [
    { label: "Gần thang máy", value: "near_elevator" },
    { label: "Trong góc", value: "in_corner" },
    { label: "Xa thang máy", value: "far_elevator" },
  ];

  const viewOptions = [
    { label: "Hướng Vườn/Núi", value: "garden_view" },
    { label: "Hướng Hồ", value: "lake_view" },
    { label: "Hướng Thành phố", value: "city_view" },
  ];

  const lightOptions = [
    { label: "Nhiều ánh sáng ban ngày", value: "daylight" },
    { label: "Ánh sáng Bắc/Đông dịu mát", value: "cool_light" },
  ];
  const floorOptions = [
    { label: "Tầng thấp (3-6)", value: "3-6", view: "Gần hồ, gần sảnh", extraFee: 0 , available : 1 },
    { label: "Tầng trung (7-10)", value: "7-10", view: "Gần sảnh", extraFee: 250, available: 1},
    { label: "Tầng cao (11-14)", value: "11-14", view: "Gần trung tâm", extraFee: 350, available: 1},
    { label: "Tầng vip(15-20)", value: "15-20", view: "Gần trung tâm", extraFee: 500, available: 0},
  ];
  const [openMoreFloors, setOpenMoreFloors] = useState(false);
  const handleFilterChange = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: val }));

  const handleFloorSelect = (floorValue) => {
    const selectedOption = floorOptions.find(opt => opt.value === floorValue);
    if (selectedOption && selectedOption.available) {
      handleFilterChange("floor", floorValue);
      setOpenMoreFloors(false); // Tự động đóng khi chọn
    }
  };

  const handleCountChange = (key, val) =>
    setCounts((prev) => ({ ...prev, [key]: val }));
  useEffect(() => {
    const finalData = {
      ...filters, // Gộp các lựa chọn checkbox
      ...counts, // Gộp số lượng người/phòng
    };

    if (onDataChange) {
      onDataChange(finalData);
    }
  }, [filters, counts]);
  return (
    <div className="space-y-4">
      <CheckGroup
        title="Loại phòng"
        options={roomOptions}
        selectedValues={filters.roomTypes}
        onChange={(vals) => handleFilterChange("roomTypes", vals)}
      />

      <CheckGroup
        title="Vị trí phòng"
        options={locationOptions}
        selectedValues={filters.locations}
        onChange={(vals) => handleFilterChange("locations", vals)}
      />
      <CheckGroup
        title="Hướng nhìn"
        options={viewOptions}
        selectedValues={filters.views}
        onChange={(vals) => handleFilterChange("views", vals)}
      />
      <CheckGroup
        title="Ánh sáng"
        options={lightOptions}
        selectedValues={filters.lighting}
        onChange={(vals) => handleFilterChange("lighting", vals)}
      />
      <hr className="border-gray-200" />
      <div className="space-y-1">
        <QuantityItem
          label="Người lớn"
          value={counts.adults}
          onChange={(val) => handleCountChange("adults", val)}
        />

        <QuantityItem
          label="Trẻ em ( < 3 tuổi )"
          value={counts.childrenUnder3}
          onChange={(val) => handleCountChange("childrenUnder3", val)}
        />

        <QuantityItem
          label="Trẻ em ( 3-5 tuổi )"
          value={counts.children3to5}
          onChange={(val) => handleCountChange("children3to5", val)}
        />

        <QuantityItem
          label="Trẻ em ( 6-12 tuổi )"
          value={counts.children6to12}
          onChange={(val) => handleCountChange("children6to12", val)}
        />

        <QuantityItem
          label="Số phòng"
          value={counts.rooms}
          onChange={(val) => handleCountChange("rooms", val)}
        />
      </div>
      <div className="w-full flex justify-center">
        <div className=" w-[90%] relative  ">
          <button
            className="w-full border py-4 text-blue-400 cursor-pointer font-medium"
            onClick={() => setOpenMoreFloors(!openMoreFloors)}
          >
            {filters.floor
              ? floorOptions.find((opt) => opt.value === filters.floor)?.label
              : "Chọn tầng ưu tiên"}
          </button>
          {openMoreFloors && (
            <div className="absolute w-full bg-white shadow-lg rounded-b-lg border border-t-0 z-10">
              {floorOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleFloorSelect(option.value)}
                  className={`flex items-center justify-between p-4 border-b last:border-0 transition-colors ${
                    option.available
                      ? "cursor-pointer hover:bg-gray-100"
                      : "cursor-not-allowed bg-gray-50 text-gray-400"
                  } ${
                    filters.floor === option.value && option.available
                      ? "bg-cyan-50"
                      : ""
                  }`}
                >
                  <div>
                    <p
                      className={`font-semibold ${
                        filters.floor === option.value && option.available
                          ? "text-cyan-600"
                          : "text-gray-800"
                      } ${!option.available && "text-gray-400"}`}
                    >
                      {option.label}
                    </p>
                    <p className="text-sm text-gray-500">{option.view}</p>
                  </div>
                  <div className="text-right">
                    {option.available ? (
                      <p className="text-sm font-medium text-green-600">
                        {option.extraFee === 0
                          ? "Miễn phí"
                          : `+ ${option.extraFee.toLocaleString()}K`}
                      </p>
                    ) : (
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20"
                          />
                        </svg>
                        Hết phòng
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
