import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function MasterLayout() {
  return (
      <div className="container mx-auto pt-8 ">
        <div className="w-full space-y-10">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
  );
}

export default MasterLayout;
