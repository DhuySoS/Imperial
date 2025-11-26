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
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                            >
                              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </g>
                          </svg>
                        </span>
                        Hồ sơ cá nhân
                      </Link>
                      <Link
                        to="/my-vouchers"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                              <path
                                fill="currentColor"
                                d="M19 4a3 3 0 0 1 2.995 2.824L22 7v1.817a1.55 1.55 0 0 1-.776 1.33l-.107.058a2 2 0 0 0-.14 3.515l.14.075c.433.214.82.656.876 1.24l.007.148V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17v-1.817c0-.606.352-1.078.776-1.33l.107-.058a2 2 0 0 0 .14-3.515l-.14-.075c-.433-.214-.82-.656-.876-1.24L2 8.818V7a3 3 0 0 1 2.824-2.995L5 4zm0 2H5a1 1 0 0 0-.993.883L4 7v1.535a4 4 0 0 1 .185 6.816L4 15.465V17a1 1 0 0 0 .883.993L5 18h14a1 1 0 0 0 .993-.883L20 17v-1.535a4 4 0 0 1-.185-6.816L20 8.535V7a1 1 0 0 0-.883-.993zm-9 3a1 1 0 0 1 .993.883L11 10v4a1 1 0 0 1-1.993.117L9 14v-4a1 1 0 0 1 1-1"
                              />
                            </g>
                          </svg>
                        </span>
                        Voucher
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
                            />
                          </svg>
                        </span>
                        Yêu thích
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
