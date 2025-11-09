import React from 'react'
import { Button } from '../ui/button';
import { User } from 'lucide-react';
function Header() { 
  return (
    <div className="flex items-center justify-between p-4 ">
      <div><img src="/assets/logo.svg" alt="" className='h-12'/></div>
      <div className="space-x-2 flex justify-between w-60 ">
        <Button
          variant="outline"
          size="sm"
          color="#22d6ff"
          className="flex-1 py-5"
        >
          <User color="#22d6ff" />
          Đăng nhập
        </Button>
        <Button variant="blue" size="sm" className="flex-1 py-5">
          Đăng ký
        </Button>
      </div>
    </div>
  );
}

export default Header   