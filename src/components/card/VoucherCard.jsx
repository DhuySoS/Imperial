import React from "react";
import { Copy, Ticket } from "lucide-react";
import { toast } from "sonner";

const VoucherCard = ({ voucher }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(voucher.code);
    toast.success(`Đã sao chép mã: ${voucher.code}`);
  };

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5 bg-cyan-500 text-white flex items-center justify-center">
        <Ticket size={40} />
      </div>
      <div className="p-4 flex-1">
        <p className="font-bold text-gray-800">{voucher.title}</p>
        <p className="text-sm text-gray-500 mt-1">
          Hết hạn: {voucher.expiry}
        </p>
      </div>
      <div className="p-4 border-l border-dashed flex flex-col items-center justify-center gap-2">
        <p className="text-cyan-600 font-bold text-lg">{voucher.code}</p>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
        >
          <Copy size={12} />
          SAO CHÉP
        </button>
      </div>
    </div>
  );
};

export default VoucherCard;