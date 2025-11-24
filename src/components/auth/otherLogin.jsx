import React from "react";
const OtherLogin = () => {
    return (
      <div className="flex justify-center gap-4 my-2">
        <button className="px-4 py-3 border  hover:shadow-lg transition">
            <img src="/assets/LogoLog_in/Google.png" alt="Google" className="w-12 h-12 "/>
        </button>
        <button className="px-4 py-3 border  hover:shadow-lg transition">
            <img src="/assets/LogoLog_in/Apple.png" alt="Google" className="w-12 h-12 "/>
        </button>
        <button className="px-4 py-3 border  hover:shadow-lg transition">
            <img src="/assets/LogoLog_in/Facebook.png" alt="Google" className="w-12 h-12 "/>
        </button>
      </div>
    );
}

export default OtherLogin;