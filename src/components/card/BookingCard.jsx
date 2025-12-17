import { useEffect } from "react";

const BookingCard = ({ item }) => {
  const orderStatus = [
    {
      id: 1,
      title: "Đã xác nhận",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 1024 1024"
          className="text-green-400"
        >
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Chờ xác nhận",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-yellow-400"
        >
          <path
            fill="currentColor"
            d="M17 22q-2.075 0-3.537-1.463T12 17t1.463-3.537T17 12t3.538 1.463T22 17t-1.463 3.538T17 22m1.675-2.625l.7-.7L17.5 16.8V14h-1v3.2zM3 21V3h6.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H21v8.25q-.45-.325-.95-.55T19 10.3V5h-2v3H7V5H5v14h5.3q.175.55.4 1.05t.55.95zm9-16q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Đã hủy",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          className="text-red-400"
        >
          <g fill="none">
            <path
              fill="url(#IconifyId19ab699229f774ca00)"
              d="M10 2a8 8 0 1 1 0 16a8 8 0 0 1 0-16"
            />
            <path
              fill="url(#IconifyId19ab699229f774ca01)"
              fillRule="evenodd"
              d="M7.146 7.146a.5.5 0 0 1 .708 0L10 9.293l2.146-2.147a.5.5 0 0 1 .708.708L10.707 10l2.147 2.146a.5.5 0 0 1-.708.708L10 10.707l-2.146 2.147a.5.5 0 0 1-.708-.708L9.293 10L7.146 7.854a.5.5 0 0 1 0-.708"
              clipRule="evenodd"
            />
            <defs>
              <linearGradient
                id="IconifyId19ab699229f774ca00"
                x1="4.5"
                x2="15"
                y1="3"
                y2="18.5"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F83F54" />
                <stop offset="1" stopColor="#CA2134" />
              </linearGradient>
              <linearGradient
                id="IconifyId19ab699229f774ca01"
                x1="7.348"
                x2="10.473"
                y1="10.265"
                y2="13.514"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FDFDFD" />
                <stop offset="1" stopColor="#FECBE6" />
              </linearGradient>
            </defs>
          </g>
        </svg>
      ),
    },
  ];
  const currentStatu = orderStatus.filter((i) => i.title === item.status)

  return (
    <div className="flex gap-4 p-4 border rounded-xl bg-white shadow-sm mb-3 last:mb-0">
      <img
        src="/assets/Rooms/daLat/2.jpg"
        alt=""
        className="w-28 h-24 object-cover rounded-lg"
      />
      <div className="flex-1 space-y-1">
        <h4 className="font-bold">{item.hotelName}</h4>
        <p className="text-sm text-gray-500 font-medium">
          Check in: {item.checkIn} - {item.checkOut}
        </p>
        <p className="text-sm text-gray-500 font-medium">
          Số khách: <span className="">{item.guests}</span>
        </p>
        <p className="font-semibold mt-1">
          Tổng tiền: <span>{item.totalPrice}</span>
        </p>
      </div>
      
    </div>
  );
};

export default BookingCard;
