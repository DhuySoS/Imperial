import OrderDetail from "../order/OrderDetail";


const ConfirmationStep = ({ discount }) => {
  
  return (
    <div className=" space-y-4">
      <OrderDetail isConfirmationView={true} discount={discount} />
    </div>
  );
};

export default ConfirmationStep;
