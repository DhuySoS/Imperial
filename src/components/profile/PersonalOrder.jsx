import { id } from "date-fns/locale/id";
import { ro } from "date-fns/locale/ro";
import { check } from "zod";
import OrderAccordingItem from "./OrderAccordingItem";
import BookingCard from "./BookingCard";
import { useState } from "react";

const PersonalOrder = () => {
  const [showHistory, setShowHistory] = useState(false);
  const bookingData = {
    currentBooking: [
      {
        id: 1,
        hotelName: "Deluxe The Imperial Đà Lạt 1",
        checkIn: "2024-07-01",
        checkOut: "2024-07-05",
        guests: "2 người lớn, 1 trẻ em (0-2 tuổi)",
        totalPrice: "4.500.000 đ",
        status: "Đã xác nhận",
        paymentStatus: "Đã thanh toán",
        isPaid: true,
      },
      {
        id: 2,
        hotelName: "Luxury Hotel Sài Gòn",
        checkIn: "2024-08-10",
        checkOut: "2024-08-15",
        guests: "1 người lớn",
        totalPrice: "3.200.000 đ",
        status: "Chờ xác nhận",
        paymentStatus: "Chưa thanh toán",
        isPaid: false,
      },
    ],
    historyBooking: [
      {
        id: 1,
        hotelName: "Ocean View Resort Nha Trang",
        checkIn: "2024-05-01",
        checkOut: "2024-05-05",
        guests: "2 người lớn",
        totalPrice: "5.000.000 đ",
        status: "Đã xác nhận",
        paymentStatus: "Đã thanh toán",
        isPaid: true,
      },
      {
        id: 2,
        hotelName: "Mountain Retreat Đà Nẵng",
        checkIn: "2024-04-10",
        checkOut: "2024-04-15",
        guests: "1 người lớn, 1 trẻ em (3-12 tuổi)",
        totalPrice: "4.200.000 đ",
        status: "Đã xác nhận",
        paymentStatus: "Đã thanh toán",
        isPaid: true,
      },
    ],
    rejectBoonking: [],
  };
  return (
    <div>
      <div className="mb-8">
        <OrderAccordingItem title={"Phòng đang đặt"} length={bookingData.currentBooking.length}>
          {bookingData.currentBooking.map((item) => (
            <BookingCard key={item.id} item={item} />
          ))}
        </OrderAccordingItem>
        <OrderAccordingItem title={"Phòng đã đặt"} length={bookingData.historyBooking.length}>
          {bookingData.historyBooking.map((item) => (
            <BookingCard key={item.id} item={item} />
          ))}
        </OrderAccordingItem>
        <OrderAccordingItem title={"Phòng đã hủy"} length={bookingData.rejectBoonking.length}>
          {bookingData.rejectBoonking.map((item) => (
            <BookingCard key={item.id} item={item} />
          ))}
        </OrderAccordingItem>
      </div>
    </div>
  );
};

export default PersonalOrder;
