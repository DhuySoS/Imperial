import React from 'react'
import Header from './Header';
import { Outlet } from 'react-router';
import Footer from './Footer';

function AuthLayout() {
  return (
    <div className="container mx-auto pt-8 w-full space-y-10 flex flex-col min-h-screen justify-between">
        <Header />
        <Outlet />
        <Footer />
    </div>
  );
}

export default AuthLayout