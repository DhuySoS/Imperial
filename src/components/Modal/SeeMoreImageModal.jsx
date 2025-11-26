import { X } from "lucide-react";
import React from "react";

const SeeMoreImageModal = ({ images, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/2 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <p className="text-2xl font-bold">Ảnh chi tiết</p>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 m-6">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="w-full h-48 object-cover rounded-2xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeMoreImageModal;
