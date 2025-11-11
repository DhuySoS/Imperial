import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Eye, EyeOff } from "lucide-react";

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-1/2  mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-semibold text-2xl">
        Đăng nhập hoặc tạo tài khoản
      </h2>
      <form className="w-full text-center space-y-4">
        <div className="relative">
          <Input
            id="username"
            type="text"
            placeholder=" "
            className="peer w-full h-12  px-4 mb-4"
          />
          <label
            htmlFor="username"
            className="absolute  left-4  text-gray-500 text-sm duration-200 transform
            scale-100 origin-left
            peer-placeholder-shown:translate-y-3.5 peer-placeholder-shown:scale-100
            peer-focus:translate-y-[-60%] peer-focus:scale-90 peer-focus:text-gray-400 focus:outline-none
            peer-not-placeholder-shown:translate-y-[-60%] peer-not-placeholder-shown:scale-90
            "
          >
            Tài khoản
          </label>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder=" "
            className="peer w-full mb-4 h-12 px-4 outline-none"
          />
          <label
            htmlFor="password"
            className="absolute  left-4  text-gray-500 text-sm duration-200 transform
            scale-100 origin-left
            peer-placeholder-shown:translate-y-3.5 peer-placeholder-shown:scale-100
            peer-focus:translate-y-[-60%] peer-focus:scale-90 peer-focus:text-gray-400 focus:outline-none
            peer-not-placeholder-shown:translate-y-[-60%] peer-not-placeholder-shown:scale-90
            "
          >
            Mật khẩu
          </label>
          <span
            className="absolute right-3 top-1/2 transform -translate-y-[70%] cursor-pointer"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </span>
        </div>
        <Button
          type="Submit"
          variant="outline"
          size="lg"
          className="bg-blue-200 rounded-xl "
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex justify-between ">
        <div className="text-sm space-x-2">
          <span className="">Bạn có tài khoản chưa?</span>
          <Link className="text-sky-500 hover:underline font-medium">
            Đăng ký ngay
          </Link>
        </div>
        <Link className="text-sky-500 hover:underline font-medium">
          Quên mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
