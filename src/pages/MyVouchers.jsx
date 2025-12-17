import React, { use, useEffect, useState } from "react";
import VoucherCard from "@/components/card/VoucherCard";
import api from "@/services/api";



const MyVouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  useEffect(()=> {
    const fetchVouchers = async () => {
      try {
        const response = await api.get("/discounts");
        setVouchers(response.data);
      } catch (error) {
        console.log("Loi lay du lieu voucher:", error);
      }
    };
    fetchVouchers();  
  } , [])
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Voucher của bạn</h1>
      <div className="space-y-4">
        {vouchers.length > 0 ? (
          vouchers.map((voucher) => (
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