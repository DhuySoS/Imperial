import React from "react";
import { Link } from "react-router-dom";
import { PartyPopper } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-6">
      <PartyPopper className="w-20 h-20 text-green-500" />
      <h2 className="text-3xl font-bold text-gray-800">
        Cảm ơn bạn đã thanh toán!
      </h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Đơn đặt phòng của bạn đã được xác nhận thành công. Chúng tôi đã gửi một
        email xác nhận đến địa chỉ của bạn.
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          to="/"
          className="px-8 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;