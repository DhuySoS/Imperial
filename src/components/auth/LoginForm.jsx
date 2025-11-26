import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import OtherLogin from "./otherLogin";
import { useAuth } from "@/context/AuthContext";
import InputCustome from "@/common/InputCustome";

function LoginForm() {
  const {login } = useAuth();
  const navigate = useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const fakeUserData = { id: 1, name: "Nguyen Van A", role: "admin" };
    login(fakeUserData); 
    
    navigate("/"); 
  };
  return (
    <div className="w-1/2  mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-bold text-3xl">Đăng nhập</h2>
      <form className="w-full text-center space-y-8">
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
          size="custom"
          className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-3  hover:shadow-lg transition disabled:opacity-70 "
          onClick= {handleLoginSubmit}
        >
          Đăng nhập
        </Button>
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Hoặc tiếp tục với</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <Button
          type="submit"
          className="bg-[#868686] w-full h-12 text-white font-semibold text-xl py-3  hover:shadow-lg transition disabled:opacity-70 hover:bg-[#868686]/90"
        >
          Sử dụng mã đăng nhập
        </Button>
        <OtherLogin />
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
