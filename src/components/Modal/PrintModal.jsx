import React from "react";
import { X, Printer, CheckCircle } from "lucide-react";

const PrintModal = ({ data, onClose }) => {
  if (!data) return null; 
  const handlePrint = () => {
    window.print();
    alert("Đang gửi lệnh in cho hóa đơn: " + data.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Printer size={20} className="text-blue-600" />
            Xác nhận in hóa đơn
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body: Thông tin hóa đơn */}
        <div className="p-6 space-y-4">
          <div className="text-center mb-6">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-gray-500">Bạn đang chuẩn bị in hóa đơn</p>
            <p className="text-2xl font-bold text-gray-800">{data.id}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Ngày lập:</span>
              <span className="font-medium">{data.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phương thức:</span>
              <span className="font-medium">{data.method}</span>
            </div>
            <div className="border-t border-dashed border-gray-300 my-2 pt-2 flex justify-between text-base">
              <span className="font-bold text-gray-700">Tổng tiền:</span>
              <span className="font-bold text-blue-600">{data.amount}</span>
            </div>
          </div>
        </div>

        {/* Footer: Các nút bấm */}
        <div className="p-6 pt-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-200 transition-all flex justify-center items-center gap-2"
          >
            <Printer size={18} />
            In ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
