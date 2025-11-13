import React from "react";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  const hideRightSide = ["/auth/login", "/auth/register"].includes(
    location.pathname
  );
  return (
    <div className="sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 ">
        <div className="shrink-0">
          <Link to={"/"}>
            <img src="/assets/logo.svg" alt="" className="h-12 w-auto" />
          </Link>
        </div>
        {!hideRightSide ? (
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
        ) : null}
      </div>
    </div>
  );
}

export default Header;
