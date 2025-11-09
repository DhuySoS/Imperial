import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function MasterLayout() {
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Blue Corner Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle 600px at 0% 200px, #bfdbfe, transparent),
        radial-gradient(circle 600px at 100% 200px, #bfdbfe, transparent)
      `,
        }}
      />
      {/* Your Content Here */}
      <div className="container mx-auto pt-8 relative z-10">
        <div className="w-full space-y-10">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MasterLayout;
