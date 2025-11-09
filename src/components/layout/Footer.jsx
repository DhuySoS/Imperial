import React from 'react'

function Footer() {
  return (
    <footer className="  mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">
        {/* Cột 1 */}
        <div>
          <h3 className="font-bold mb-3 text-gray-900">
            Liên hệ với chúng tôi
          </h3>
          <ul className="space-y-2">
            <li>Trợ giúp</li>
            <li>Hotline: 0374801034</li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="font-bold mb-3 text-gray-900">
            Thông tin và chính sách
          </h3>
          <ul className="space-y-2">
            <li>Tin tức</li>
            <li>Tuyển dụng</li>
            <li>Quy chế hoạt động</li>
            <li>Điều khoản và điều kiện</li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="font-bold mb-3 text-gray-900">Khách sạn</h3>
          <ul className="space-y-2">
            <li>Hà Nội</li>
            <li>Thành Phố Hồ Chí Minh</li>
            <li>Nhà Trang</li>
            <li>Đà Nẵng</li>
            <li>Ninh Bình</li>
            <li>Đà Lạt</li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="font-bold mb-3 text-gray-900">Hình thức thanh toán</h3>
          <div className="flex flex-wrap items-center gap-3">
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="border-t text-center text-gray-600 text-xs py-4">
        <p>
          Bản quyền © 2025{" "}
          <span className="font-semibold text-gray-800">Imperial.com</span>. Bảo
          Lưu Mọi Quyền
        </p>
        <p className="mt-1">
          Imperial.com là công ty cung cấp dịch vụ du lịch trực tuyến hàng đầu
          tại Việt Nam.
        </p>
      </div>
    </footer>
  );
}

export default Footer