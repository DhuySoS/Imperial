import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import InputCustome from "../custome/InputCustome";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="w-1/2  mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-semibold text-2xl">
        Đăng nhập hoặc tạo tài khoản
      </h2>
      <form className="w-full text-center space-y-4">
        <InputCustome
          id="username"
          type="text"
          label="Tài khoản"
          autoComplete="username"
        />
        <InputCustome
          id="password"
          type="password"
          label="Mật khẩu"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          size="lg"
          className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-medium py-3 rounded-full hover:shadow-lg transition disabled:opacity-70 "
        >
          Đăng nhập
        </Button>
      </form>
      <div className="flex justify-between ">
        <div className="text-sm space-x-2">
          <span className="">Bạn có tài khoản chưa?</span>
          <Link
            to={"/auth/register"}
            className="text-sky-500 hover:underline font-medium"
          >
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
