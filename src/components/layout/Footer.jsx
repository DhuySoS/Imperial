import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" text-slate-900 mt-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo và mô tả */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link to="/" className="inline-block mb-4">
              {/* Bạn nên sử dụng logo phiên bản trắng ở đây */}
              <img
                src="/assets/logo.svg"
                alt="Imperial Logo"
                className="h-12"
              />
            </Link>
            <p className="text-sm max-w-md">
              Imperial.com là công ty cung cấp dịch vụ du lịch trực tuyến hàng
              đầu tại Việt Nam, mang đến cho bạn những trải nghiệm tuyệt vời với
              giá tốt nhất.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-gray-800">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-800">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.149-4.771-1.664-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Các cột liên kết */}
          <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Thông tin
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Quy chế
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Điều khoản
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Điểm đến
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Hà Nội
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    TP. Hồ Chí Minh
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Nha Trang
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Đà Nẵng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-800 transition-colors">
                    Đà Lạt
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-4 uppercase tracking-wider">
                Thanh toán
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-white p-1 rounded-md">
                  <img
                    src="/assets/Footer/LogoTPBank.svg"
                    alt="TPBank"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="bg-white p-1 rounded-md">
                  <img
                    src="/assets/Footer/logo_Momo.png"
                    alt="Momo"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div className="bg-white p-1 rounded-md">
                  <img
                    src="/assets/Footer/VIB_logo.png"
                    alt="VIB"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="bg-white p-1 rounded-md">
                  <img
                    src="/assets/Footer/Vietcombank.png"
                    alt="Vietcombank"
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dòng bản quyền */}
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-xs">
          <p>
            Bản quyền © 2025{" "}
            <span className="font-semibold ">Imperial.com</span>. Bảo Lưu Mọi
            Quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
