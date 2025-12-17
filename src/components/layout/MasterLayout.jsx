import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "@/common/BackToTopButton";

function MasterLayout() {
  return (
    <div className="w-[80%] mx-auto px-8 ">
      <div className="w-full space-y-10 min-h-screen ">
        <Header />
        <Outlet />
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
}

export default MasterLayout;
