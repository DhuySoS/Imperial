import PaymentStepper from "@/components/payment/PaymentStepper";
import React, { useState } from "react";
import PaymentSuccess from "@/components/payment/PaymentSuccess";
import CustomerInfoStep from "@/components/payment/CustomerInfoStep";
import PaymentDetailsStep from "@/components/payment/PaymentDetailsStep";
import ConfirmationStep from "@/components/payment/ConfirmationStep";

const PaymentPage = () => {
  const [currentStep, setCurrentStep] = useState(1); // Bắt đầu ở bước 1
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Đây là bước cuối cùng, khi nhấn "Xác nhận đặt chỗ"
      setIsPaymentSuccessful(true);
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
              {currentStep === 2 && <PaymentDetailsStep />}
              {currentStep === 3 && <ConfirmationStep />}
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
                {currentStep === 3 ? "Xác nhận đặt chỗ" : "Tiếp theo"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;