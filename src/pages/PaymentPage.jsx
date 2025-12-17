import PaymentStepper from "@/components/payment/PaymentStepper";
import React, { useEffect, useState } from "react";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import CustomerInfoStep from "@/components/payment/CustomerInfoStep";
import PaymentDetailsStep from "@/components/payment/PaymentDetailsStep";
import ConfirmationStep from "@/components/payment/ConfirmationStep";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";


const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // Bắt đầu ở bước 1
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [discount, setDiscount] = useState(0);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("banktransfer");
  const hotelId = searchParams.get("hotelId") ? parseInt(searchParams.get("hotelId")) : null;
  const handleBooking = async () => {
    const originalTotal = searchParams.get("totalPrice") ? parseFloat(searchParams.get("totalPrice")) : 0;
    let finalDiscount = 0;

    if (appliedVoucher) {
      if (appliedVoucher.value <= 100) {
        finalDiscount = (originalTotal * appliedVoucher.value) / 100;
      } else {
        finalDiscount = appliedVoucher.value;
      }
      if (finalDiscount > originalTotal) finalDiscount = originalTotal;
    }

    try {
      // Gọi API apply voucher để trừ số lượng hoặc validate lần cuối
      if (appliedVoucher) {
        await api.post("/discounts/apply", null, {
          params: {
            code: appliedVoucher.code,
            guestId: user?.id,
          },
        });
      }

    const bookingRequest = {
      guestId: user?.id,
      roomId: searchParams.get("roomId") ? parseInt(searchParams.get("roomId")) : null,
      hotelId: searchParams.get("hotelId") ? parseInt(searchParams.get("hotelId")) : null,
      checkInDate: searchParams.get("dateStart"),
      checkOutDate: searchParams.get("dateEnd"),
      totalAmount: originalTotal - finalDiscount,
      discountId: appliedVoucher?.id || null,
      status: "PENDING",
      adults: parseInt(searchParams.get("adults") || "0"),
      childrenUnder3: parseInt(searchParams.get("childrenUnder3") || "0"),
      children3To5: parseInt(searchParams.get("children3to5") || "0"),
      children6To12: parseInt(searchParams.get("children6to12") || "0"),
      roomType: searchParams.get("roomTypes"),
      viewType: searchParams.get("views"),
      position: searchParams.get("locations"),
      lightType: searchParams.get("lighting"),
    };

    console.log("Booking Request Data:", bookingRequest);

      // Gọi API đặt phòng tại đây
      const response = await api.post("/bookings", bookingRequest);

      const bookingId = response.data.id;

      // 2. Nếu thanh toán VNPAY
      if (paymentMethod === "VNPAY") {
        const paymentRes = await api.post(
          `/vnpay/${bookingId}`
        );

        // Redirect sang VNPay
        window.open(paymentRes.data, "_blank", "noopener,noreferrer");
        setIsPaymentSuccessful(true);
        return;
      }

      setIsPaymentSuccessful(true); 
    } catch (error) {
      console.error("Lỗi khi đặt phòng:", error);
      alert("Đặt phòng thất bại hoặc voucher không hợp lệ");
    }
  };
  useEffect(() => {
    if (!hotelId) return;
    console.log("Hotel ID:", hotelId);
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${hotelId}/details`);
        setHotel(response.data);
      }
      catch (error) {
        console.error("Lỗi khi lấy thông tin khách sạn:", error);
      }
    }
    
    fetchHotel();
  }, [hotelId]);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Đây là bước cuối cùng, khi nhấn "Xác nhận đặt chỗ"
      handleBooking();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col">
      {isPaymentSuccessful ? (
        <PaymentSuccess />
      ) : (
        <>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
            <PaymentStepper currentStep={currentStep} />
          </div>

          {/* Nội dung cho từng bước */}
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            {/* Render Step Content */}
            <div className="min-h-[300px]">
              {currentStep === 1 && <CustomerInfoStep />}
              {currentStep === 2 && <PaymentDetailsStep 
                hotel={hotel}
                discount={discount}
                setDiscount={setDiscount}
                appliedVoucher={appliedVoucher}
                setAppliedVoucher={setAppliedVoucher}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />}
              {currentStep === 3 && <ConfirmationStep discount={discount} />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Quay lại
              </button>
              <button
                onClick={handleNextStep}
                className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition-colors"
              >
                {currentStep === 3 ? "Xác nhận đặt phòng" : "Tiếp theo"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;