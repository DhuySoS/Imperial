import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import PrintModal from "../Modal/PrintModal";

const PersionalAchieve = () => {

    const [invoiceToPrint, setInvoiceToPrint] = useState(null)

    const paymentHistory = [
      {
        _id :1,
        id: "BK12345",
        date: "22:22, 02/09/2025",
        amount: "1.692.000đ",
        method: "Mã QR",
        status: "success",
        statusLabel: "Thành công",
      },
      {
        _id: 2,
        id: "BK12346",
        date: "10:15, 03/09/2025",
        amount: "5.500.000đ",
        method: "Mã QR",
        status: "pending",
        statusLabel: "Đang xử lý",
      },
      {
        _id: 3,
        id: "BK12347",
        date: "09:30, 03/09/2025",
        amount: "200.000đ",
        method: "Thẻ ATM",
        status: "failed",
        statusLabel: "Thất bại",
      },
      {
        _id: 4,
        id: "BK12339",
        date: "22:22, 11/08/2025",
        amount: "1.692.000đ",
        method: "Mã QR",
        status: "success",
        statusLabel: "Thành công",
      },
    ];
    const getStatusColor = (status) => {
      switch (status) {
        case "success":
          return "text-green-500 ";
        case "pending":
          return "text-yellow-500 ";
        case "failed":
          return "text-red-500 ";
        default:
          return "text-gray-500";
      }
    };

  return (
    <div>
      <div className="flex gap-20 justify-between">
        <div className="flex-1 flex flex-col gap-2 items-center border-2 border-gray-400 rounded-lg p-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 32 32"
            className="text-blue-600"
          >
            <path
              fill="currentColor"
              d="M16 3c-1.645 0-3 1.355-3 3c0 1.125.633 2.113 1.563 2.625L11.624 14.5L7.03 11.219A3 3 0 0 0 8 9c0-1.645-1.355-3-3-3S2 7.355 2 9c0 1.348.926 2.469 2.156 2.844L6 22v5h20v-5l1.844-10.156C29.074 11.469 30 10.348 30 9c0-1.645-1.355-3-3-3s-3 1.355-3 3c0 .871.367 1.668.969 2.219L20.375 14.5l-2.938-5.875A3 3 0 0 0 19 6c0-1.645-1.355-3-3-3m0 2c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1M5 8c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1m22 0c.563 0 1 .438 1 1s-.438 1-1 1s-1-.438-1-1s.438-1 1-1m-11 2.25l3.094 6.188l1.5.375l5-3.563L24.187 21H7.813l-1.406-7.75l5 3.563l1.5-.375zM8 23h16v2H8z"
            />
          </svg>
          <p className="font-bold text-xl">Kim Cương</p>
          <span className="text-gray-500 text-sm font-medium">
            Khách hàng hạng kim cương{" "}
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 items-center border-2 border-gray-400 rounded-lg p-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 48 48"
            className="text-green-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M5 24L24 6l19 18H31v18H17V24z"
            />
          </svg>
          <p className="font-bold text-xl">55.000.000Đ</p>
          <span className="text-gray-500 text-sm font-medium">
            Tổng tiền đã đặt
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-2 items-center border-2 border-gray-400 rounded-lg p-4 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 24 24"
            className="text-yellow-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10.704 4.325a1.5 1.5 0 0 1 2.592 0l1.818 3.12a1.5 1.5 0 0 0 .978.712l3.53.764a1.5 1.5 0 0 1 .8 2.465l-2.405 2.693a1.5 1.5 0 0 0-.374 1.15l.363 3.593a1.5 1.5 0 0 1-2.097 1.524l-3.304-1.456a1.5 1.5 0 0 0-1.21 0l-3.304 1.456a1.5 1.5 0 0 1-2.097-1.524l.363-3.593a1.5 1.5 0 0 0-.373-1.15l-2.406-2.693a1.5 1.5 0 0 1 .8-2.465l3.53-.764a1.5 1.5 0 0 0 .979-.711z"
            />
          </svg>
          <p className="font-bold text-xl">22</p>
          <span className="text-gray-500 text-sm font-medium">
            Số tiền đã đặt
          </span>
        </div>
      </div>
      <div className="my-6 flex items-center justify-between">
        <p className="text-xl font-bold">Lịch sử thanh toán</p>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {["Thời gian", "Số tiền", "Phương thức", "Trạng thái"].map((item) => (
            <button
              key={item}
              className="flex items-center gap-1 px-3 py-1.5 border rounded-full text-sm text-gray-600 hover:bg-gray-50 bg-white whitespace-nowrap"
            >
              {item} <ChevronDown size={14} />
            </button>
          ))}
        </div>
      </div>
      <div className="my-6">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm font-bold uppercase">
              <th className="p-4 border-b border-x ">Mã hóa đơn</th>
              <th className="p-4 border-b border-x">Ngày lập</th>
              <th className="p-4 border-b border-x">Tổng tiền</th>
              <th className="p-4 border-b border-x">Phương thức</th>
              <th className="p-4 border-b border-x">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="p-4 border font-semibold">{item.id}</td>
                <td className="p-4 border font-semibold">{item.date}</td>
                <td className="p-4 border font-semibold">{item.amount}</td>
                <td className="p-4 border font-semibold">{item.method}</td>
                <td className="p-4 border font-semibold relative ">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold  ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.statusLabel}
                  </span>
                  {item.status === "success" && (
                    <span
                      className="absolute right-4 text-gray-500 hover:text-blue-600 cursor-pointer"
                      onClick={() => setInvoiceToPrint(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path d="M22.5 8h-21v9H6v-2h12v2h4.5zM19 3v5H5V3z" />
                          <path d="M18 15v6H6v-6z" />
                          <path
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeWidth="2"
                            d="M19 3v5H5V3zm-1 12v6H6v-6z"
                          />
                          <g
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeWidth="2"
                          >
                            <path d="M18 11.5h.004v-.004H18z" />
                            <path d="M22.5 8h-21v9H6v-2h12v2h4.5z" />
                          </g>
                        </g>
                      </svg>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoiceToPrint && (
          <PrintModal
            data={invoiceToPrint}
            onClose={() => setInvoiceToPrint(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PersionalAchieve;
