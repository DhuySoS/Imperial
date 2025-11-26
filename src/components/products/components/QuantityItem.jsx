import React from "react";
import { Minus, Plus } from "lucide-react";

const QuantityItem = ({ label, value, onChange }) => {
  const handleDecrease = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex justify-between items-center py-2">
      {/* Label bên trái */}
      <span className="text-sm font-bold text-gray-800">{label}</span>

      {/* Bộ điều khiển bên phải */}
      <div className="flex items-center gap-3">
        {/* Nút Trừ */}
        <button
          onClick={handleDecrease}
          // Dùng disabled để làm mờ nút khi số về 0
          disabled={value <= 0}
          className={`w-6 h-6 rounded-full flex items-center justify-center text-white transition-colors ${
            value <= 0
              ? "bg-cyan-200 cursor-not-allowed"
              : "bg-cyan-400 hover:bg-cyan-500"
          }`}
        >
          <Minus size={14} strokeWidth={3} />
        </button>

        {/* Số hiển thị */}
        <span className="font-bold text-gray-800 w-4 text-center select-none">
          {value}
        </span>

        {/* Nút Cộng */}
        <button
          onClick={handleIncrease}
          className="w-6 h-6 rounded-full bg-cyan-400 hover:bg-cyan-500 flex items-center justify-center text-white transition-colors"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default QuantityItem;
