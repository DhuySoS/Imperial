import React, { useEffect, useState } from "react";
import { Ticket, CreditCard, Landmark, CircleDollarSign } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import api from "@/services/api";

const paymentMethods = [
  { id: "banktransfer", name: "Chuyển khoản ngân hàng", icon: <Landmark /> },
  // { id: "cash", name: "Thanh toán tại quầy", icon: <CircleDollarSign /> },
  {id: "VNPAY", name: "Thanh toán VNPAY", icon: <CreditCard /> },
];

const labelMapping = {
  deluxe: "Deluxe",
  luxury: "Luxury",
  near_elevator: "Gần thang máy",
  in_corner: "Trong góc",
  far_elevator: "Xa thang máy",
  garden_view: "Hướng Vườn/Núi",
  lake_view: "Hướng Hồ",
  city_view: "Hướng Thành phố",
  daylight: "Nhiều ánh sáng ban ngày",
  cool_light: "Ánh sáng Bắc/Đông dịu mát",
};

const PaymentDetailsStep = ({hotel, discount, setDiscount, appliedVoucher, setAppliedVoucher, paymentMethod, setPaymentMethod }) => {
  const [vouchers, setVouchers] = useState([]);
  const [searchParams] = useSearchParams();

  const basicPrice = parseInt(searchParams.get("basicPrice") || "0");
  const totalPrice = parseInt(searchParams.get("totalPrice") || "0");
  const rooms = parseInt(searchParams.get("rooms") || "1");
  const floor = searchParams.get("floor");
  const dateStart = searchParams.get("dateStart");
  const dateEnd = searchParams.get("dateEnd");
  const adults = searchParams.get("adults") || "0";
  const children =
    parseInt(searchParams.get("childrenUnder3") || "0") +
    parseInt(searchParams.get("children3to5") || "0") +
    parseInt(searchParams.get("children6to12") || "0");

  const roomTypes = searchParams.get("roomTypes")
    ? searchParams.get("roomTypes").split(",")
    : [];
  const locations = searchParams.get("locations")
    ? searchParams.get("locations").split(",")
    : [];
  const views = searchParams.get("views")
    ? searchParams.get("views").split(",")
    : [];
  const lighting = searchParams.get("lighting")
    ? searchParams.get("lighting").split(",")
    : [];

  let nights = 1;
  if (dateStart && dateEnd) {
    const start = new Date(dateStart);
    const end = new Date(dateEnd);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    nights = diffDays > 0 ? diffDays : 1;
  }

  const floorFees = {
    "3-6": 0,
    "7-10": 250000,
    "11-14": 350000,
    "15-20": 500000,
  };
  const floorFee = floor ? (floorFees[floor] || 0) : 0;
  const totalBasic = basicPrice * rooms * nights;
  const totalFloor = floorFee * rooms * nights;

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await api.get("/discounts");
        setVouchers(response.data);
      } catch (error) {
        console.log("Lỗi lấy dữ liệu voucher:", error);
      }
    };
    fetchVouchers();
  }, []);

  const handleApplyVoucher = (voucher) => {
    let calcDiscount = 0;

    // value <= 100 => giảm %
    if (voucher.value <= 100) {
      calcDiscount = (totalPrice * voucher.value) / 100;
    }
    // value > 100 => giảm tiền trực tiếp
    else {
      calcDiscount = voucher.value;
    }

    // Không cho giảm quá tổng tiền
    if (calcDiscount > totalPrice) {
      calcDiscount = totalPrice;
    }

    setDiscount(calcDiscount);
    setAppliedVoucher(voucher);
  };


  return (
    <div className="text-left space-y-8">
      {/* Booking Info */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Thông tin đặt phòng
        </h3>
        <div className="bg-white p-4 rounded-xl border space-y-4 text-sm text-gray-700">
          <div >
            <p className="text-gray-500">Tên khách sạn</p>
            <p className="font-semibold">{hotel.hotel.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Thời gian nhận phòng</p>
              <p className="font-semibold">{formatDate(dateStart)}</p>
            </div>
            <div>
              <p className="text-gray-500">Thời gian trả phòng</p>
              <p className="font-semibold">{formatDate(dateEnd)}</p>
            </div>
            <div>
              <p className="text-gray-500">Số lượng khách</p>
              <p className="font-semibold">
                {adults} người lớn, {children} trẻ em
              </p>
            </div>
            <div>
              <p className="text-gray-500">Số phòng</p>
              <p className="font-semibold">{rooms} phòng</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold mb-2">Tiện ích & Yêu cầu:</p>
            <div className="flex flex-wrap gap-2">
              {floor && (
                <span className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded border border-cyan-100">
                  Tầng {floor}
                </span>
              )}
              {[...roomTypes, ...views, ...locations, ...lighting].map(
                (item, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 px-2 py-1 rounded border"
                  >
                    {labelMapping[item] || item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Tóm tắt đơn hàng
        </h3>
        <div className="bg-gray-50 p-4 rounded-xl space-y-3 border">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Giá phòng (x{rooms} phòng, x{nights} đêm)
            </span>
            <span className="font-medium">
              {totalBasic.toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
          {totalFloor > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Phụ phí tầng ({floor})</span>
              <span className="font-medium">
                {totalFloor.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          )}
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Giảm giá (Voucher)</span>
              <span>-{discount.toLocaleString("vi-VN")} VNĐ</span>
            </div>
          )}
          <div className="border-t pt-3 mt-3 flex justify-between text-lg">
            <span className="font-bold text-gray-800">Tổng cộng</span>
            <span className="font-bold text-cyan-600">
              {(totalPrice - discount).toLocaleString("vi-VN")} VNĐ
            </span>
          </div>
        </div>
      </div>

      {/* Voucher */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Mã giảm giá</h3>
        <div className="space-y-3">
          {vouchers.map((voucher) => (
            <label
              key={voucher.id}
              className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer has-checked:bg-cyan-50 has-checked:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="voucher"
                value={voucher.id}
                checked={appliedVoucher?.id === voucher.id}
                onChange={() => handleApplyVoucher(voucher)}
                className="w-5 h-5 mt-0.5 accent-cyan-600"
              />
              <div>
                <p className="font-semibold text-gray-800">{voucher.code}</p>
                <p className="text-sm text-gray-500">{voucher.description} - HSD: {voucher.endDate}</p>
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
              className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer has-checked:bg-cyan-50 has-checked:border-cyan-500 transition-all"
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={() => setPaymentMethod(method.id)}
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