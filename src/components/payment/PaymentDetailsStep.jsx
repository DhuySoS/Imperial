import React, { useState } from "react";
import { Ticket, CreditCard, Landmark, CircleDollarSign } from "lucide-react";

const fakeVouchers = [
  {
    id: 1,
    code: "IMPERIAL10",
    title: "Giảm 10% cho đơn hàng",
    description: "Áp dụng cho đơn hàng từ 2.000.000 VNĐ",
  },
  {
    id: 2,
    code: "HELLO2025",
    title: "Giảm 100.000 VNĐ",
    description: "Dành cho khách hàng mới",
  },
  {
    id: 3,
    code: "FREESHIP",
    title: "Miễn phí bữa sáng",
    description: "Áp dụng cho 2 người",
  },
];

const paymentMethods = [
  { id: "banktransfer", name: "Chuyển khoản ngân hàng", icon: <Landmark /> },
  { id: "cash", name: "Thanh toán tại quầy", icon: <CircleDollarSign /> },
];

const PaymentDetailsStep = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  return (
    <div className="text-left space-y-8">
      {/* Order Summary */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Tóm tắt đơn hàng
        </h3>
        <div className="bg-gray-50 p-4 rounded-xl space-y-3 border">
          <div className="flex justify-between">
            <span className="text-gray-600">Phòng The Imperia (x1 đêm)</span>
            <span className="font-medium">1.175.000 VNĐ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phụ phí tầng cao</span>
            <span className="font-medium">250.000 VNĐ</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thuế & phí dịch vụ</span>
            <span className="font-medium">142.500 VNĐ</span>
          </div>
          <div className="border-t pt-3 mt-3 flex justify-between text-lg">
            <span className="font-bold text-gray-800">Tổng cộng</span>
            <span className="font-bold text-cyan-600">1.567.500 VNĐ</span>
          </div>
        </div>
      </div>

      {/* Voucher */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Mã giảm giá</h3>
        <div className="space-y-3">
          {fakeVouchers.map((voucher) => (
            <label
              key={voucher.id}
              className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-cyan-50 has-[:checked]:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="voucher"
                value={voucher.id}
                checked={selectedVoucher === voucher.id}
                onChange={() => setSelectedVoucher(voucher.id)}
                className="w-5 h-5 mt-0.5 accent-cyan-600"
              />
              <div>
                <p className="font-semibold text-gray-800">{voucher.title}</p>
                <p className="text-sm text-gray-500">{voucher.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Chọn phương thức thanh toán
        </h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-[:checked]:bg-cyan-50 has-[:checked]:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                className="w-5 h-5 accent-cyan-600"
              />
              <div className="text-cyan-700">{method.icon}</div>
              <span className="font-medium text-gray-700">{method.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsStep;