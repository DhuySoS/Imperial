import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import InputCustome from "@/common/InputCustome";
import { useEffect, useState } from "react";

import LoginGoogleButton from "@/common/LoginGoogleButton";

function LoginForm() {
  const {login, user, role } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null); // Xóa lỗi khi người dùng bắt đầu nhập lại
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.username, formData.password);
    } catch (err) {
      if (err.response && err.response.data) {
        setError("Sai tên mật khẩu hoặc đăng nhập");
        console.log("loi: ", error);
      } else {
        setError("Lỗi kết nối hoặc server không phản hồi.");
        console.log(err);
      }
    }
  };
  useEffect(()=>{
    if (role == "GUEST"){
      navigate("/")
    }else if (role == "ADMIN"){
      navigate("/admin")
    }
  }, [role])
  return (
    <div className="w-1/2  mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-bold text-3xl">Đăng nhập</h2>
      <form
        onSubmit={handleLoginSubmit}
        className="w-full text-center space-y-8"
      >
        <InputCustome
          id="username"
          name="username"
          type="text"
          label="Tài khoản"
          autoComplete="username"
          onChange={handleChange}
          value={formData.username}
        />
        <InputCustome
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          type="password"
          label="Mật khẩu"
          autoComplete="current-password"
        />
        {error && <p className="text-red-500 text-sm text-left ">{error}</p>}
        <Button
          type="submit"
          size="custom"
          className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-3  hover:shadow-lg transition disabled:opacity-70 "
        >
          Đăng nhập
        </Button>
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Hoặc tiếp tục với</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        {/* <Button
          type="button"
          className="bg-[#868686] w-full h-12 text-white font-semibold text-xl py-3  hover:shadow-lg transition disabled:opacity-70 hover:bg-[#868686]/90"
        >
          Sử dụng mã đăng nhập
        </Button> */}
        <LoginGoogleButton />

        {/* <OtherLogin /> */}
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
        <Link
          to="/auth/forgot-password"
          className="text-sky-500 hover:underline font-medium"
        >
          Quên mật khẩu
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
