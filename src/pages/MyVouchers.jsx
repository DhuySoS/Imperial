import React from "react";
import VoucherCard from "@/components/card/VoucherCard";

const fakeVouchers = [
  {
    id: 1,
    code: "IMPERIAL10",
    title: "Giảm 10% cho đơn hàng từ 2.000.000 VNĐ",
    expiry: "31/12/2025",
  },
  {
    id: 2,
    code: "HELLO2025",
    title: "Giảm 100.000 VNĐ cho khách hàng mới",
    expiry: "30/11/2025",
  },
  {
    id: 3,
    code: "FREESHIP",
    title: "Miễn phí bữa sáng cho 2 người",
    expiry: "15/12/2025",
  },
];

const MyVouchers = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Voucher của bạn</h1>
      <div className="space-y-4">
        {fakeVouchers.length > 0 ? (
          fakeVouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))
        ) : (
          <p className="text-center text-gray-500">Bạn chưa có voucher nào.</p>
        )}
      </div>
    </div>
  );
};

export default MyVouchers;