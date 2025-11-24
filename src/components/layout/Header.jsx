import React, { use, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
function Header() {
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hideRightSide = ["/auth/login", "/auth/register"].includes(
    location.pathname
  );
  const handleLogout = () => {
    logout(); 
    setIsOpen(false); 
  };
  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);
  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 ">
        <div className="shrink-0">
          <Link to={"/"}>
            <img src="/assets/logo.svg" alt="" className="h-12 w-auto" />
          </Link>
        </div>
        {!hideRightSide ? (
          !user ? (
            <div className="space-x-2 flex justify-between w-60 ">
              <Button
                variant="outline"
                size="sm"
                color="#22d6ff"
                className="flex-1 py-5"
              >
                <User color="#22d6ff" />
                <Link to={"/auth/login"}>Đăng nhập</Link>
              </Button>
              <Button variant="blue" size="sm" className="flex-1 py-5">
                <Link to={"/auth/register"}>Đăng ký</Link>
              </Button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
              >
                <img
                  src="/assets/logo.svg" // Hoặc user.avatar nếu có
                  alt="User Avatar"
                  className="object-cover h-10 w-10 rounded-full border border-gray-200 bg-gray-50"
                />
                <div className="text-left hidden md:block">
                  <span className="text-xs text-gray-500 block">Xin chào,</span>
                  <p className="font-bold text-sm text-gray-700 leading-none">
                    {user.name || "Người dùng"}
                  </p>
                </div>
              </button>
              {isOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsOpen(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <p className="font-semibold text-sm">Người dùng</p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.name || "Người dùng"}
                      </p>
                    </div>

                    <div className="p-1">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Hồ sơ cá nhân
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition text-left"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default Header;
