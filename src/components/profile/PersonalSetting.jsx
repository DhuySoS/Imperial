import InputCustome from "@/common/InputCustome";
import React from "react";

const PersonalSetting = () => {
  return (
    <div className="w-full">
      <p className="text-3xl font-bold">Cài đặt</p>
      <div className="p-6 border rounded-3xl  mx-auto w-1/2 space-y-4">
        <p className="font-semibold text-xl">Đổi mật khẩu</p>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-4 items-center">
          <label htmlFor="oldPw" className="text-lg font-semibold text-nowrap">
            Mật khẩu cũ:
          </label>
          <InputCustome
            id={"oldPw"}
            type={"password"}
            className={" border-gray-400 rounded-2xl  flex-1"}
          />
          <label htmlFor="newPw" className="text-lg font-semibold text-nowrap">
            Mật khẩu mới:
          </label>
          <InputCustome
            id={"newPw"}
            type={"password"}
            className={" border-gray-400 rounded-2xl  flex-1"}
          />
          <label
            htmlFor="reNewPw"
            className="text-lg font-semibold text-nowrap"
          >
            Xác nhận mật khẩu mới:
          </label>
          <InputCustome
            id={"reNewPw"}
            type={"password"}
            className={" border-gray-400 rounded-2xl  flex-1"}
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
        <button className=" px-4 py-3 bg-blue-400 text-white text-xl font-semibold rounded-2xl ">
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default PersonalSetting;
