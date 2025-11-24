import { useState } from "react";
const PersonalInfor = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="w-full flex gap-6">
      <div className=" space-y-6 p-8 border rounded-2xl shadow-lg  ">
        <div>
          <img
            src="/assets/avatar.jpg"
            alt="avatar"
            className="h-48 w-48 object-cover overflow-hidden rounded-full"
          />
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Họ và tên</p>
          <p className="col-span-1 font-semibold">Nguyễn Văn A</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Tuổi</p>
          <p className="col-span-1 font-semibold">21</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Giới tính</p>
          <p className="col-span-1 font-semibold">Nam</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Hạng</p>
          <p className="col-span-1 font-semibold">Kim cương</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Số lần đặt</p>
          <p className="col-span-1 font-semibold">22</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Số tiền đã đặt</p>
          <p className="col-span-1 font-semibold">55.000.000 đ</p>
        </div>
      </div>
      <div className="flex-1 space-y-6 p-8 border rounded-2xl shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
          <button
            className={`px-4 py-3 bg-blue-500 text-white rounded-2xl transition-all ${isEditing? 'bg-green-500':''}`}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Họ và tên
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Đào Duy Khánh"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Nick Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Đào Duy Khánh"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Giới tính
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Đào Duy Khánh"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Ngày sinh
              </label>
              <input
                type="Date"
                value={"2004-04-04"}
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Số điện thoại
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Đào Duy Khánh"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Quốc gia
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Đào Duy Khánh"
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6 items-center">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl">Địa chỉ email</p>
              <p className="text-gray-600">Duykhanh@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfor;
