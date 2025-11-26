import React from "react";
import { User, FileText, CheckCircle } from "lucide-react";

const steps = [
  { id: 1, name: "Thông tin khách hàng", icon: <User /> },
  { id: 2, name: "Chi tiết thanh toán", icon: <FileText /> },
  { id: 3, name: "Xác nhận đặt chỗ", icon: <CheckCircle /> },
];
const progressWidths = [25, 75, 100];
const PaymentStepper = ({ currentStep }) => {
  return (
    <div className="w-full px-4 sm:px-8">
      <div className="relative flex items-center justify-between">
        {/* Progress line */}
        <div className="absolute left-0 top-5 w-full h-0.5 bg-gray-200">
          <div
            className="absolute  left-0 top-0 h-full bg-cyan-500 transition-all duration-500"
            style={{
              width: `${progressWidths[currentStep - 1] || 100}%`,
            }}
          ></div>
        </div>

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 border-2 ${
                  isActive
                    ? "bg-cyan-500 text-white border-cyan-500"
                    : isCompleted
                    ? "bg-cyan-500 text-white border-cyan-500"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {React.cloneElement(step.icon, { size: 20 })}
              </div>
              <p
                className={`mt-2 text-xs sm:text-sm text-center font-semibold transition-colors duration-300 ${
                  isActive || isCompleted ? "text-cyan-600" : "text-gray-500"
                }`}
              >
                {step.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentStepper;