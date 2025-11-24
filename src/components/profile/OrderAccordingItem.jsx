import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const OrderAccordingItem = ({ title, children, length }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4"
      >
        <p className="text-2xl font-bold">{title}</p>
        {length != 0 && (
          <ChevronDown
            className={`text-gray-400 w-5 h-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>
      {length != 0 ? (
        <>
          {isOpen && (
            <div className="p-4 animate-in slide-in-from-top-1 duration-200 fade-in">
              {children}
            </div>
          )}
        </>
      ) : (
        <div className="w-full text-center text-gray-400 font-bold text-2xl  ">
          Chưa có dữ liệu
        </div>
      )}
    </div>
  );
};

export default OrderAccordingItem;
