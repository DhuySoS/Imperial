import OrderDetail from "../order/OrderDetail";
import React from "react";

const ConfirmationStep = () => {
  return (
    <div className=" space-y-4">
      <OrderDetail isConfirmationView={true} />
    </div>
  );
};

export default ConfirmationStep;
