import React from "react";

const SummaryCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`text-white   bg-[#273142] rounded-2xl p-8 h-[150px] ${
        icon ? "flex gap-6 justify-between items-center" : "text-center block"
      }`}
    >
      <div className="space-y-8">
        <p className="text-gray-400 text-sm font-medium  uppercase tracking-wide">
          {title}
        </p>
        <p className="text-white text-3xl font-bold">{value}</p>
      </div>
      {icon && (
        <div
          className="p-4 border-none rounded-2xl h-fit"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      )}
    </div>
  );
};

export default SummaryCard;
