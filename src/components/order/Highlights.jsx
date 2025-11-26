import React from 'react'

const Highlights = () => {
  return (
    <div className="px-10 py-6 border space-y-6 w-full shadow">
      <p className="text-2xl font-bold">Highlights</p>
      <div className="grid grid-cols-4 gap-6 ">
        <div className="flex flex-col items-center p-6 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 24 24"
            className="text-blue-400"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M5 2h11a3 3 0 0 1 3 3v14a1 1 0 0 1-1 1h-3" />
              <path d="m5 2l7.588 1.518A3 3 0 0 1 15 6.459V20.78a1 1 0 0 1-1.196.98l-7.196-1.438A2 2 0 0 1 5 18.36zm7 10v2" />
            </g>
          </svg>
          <p className="text-xl font-medium">Check in 24 hours</p>
        </div>
        <div className="flex flex-col items-center p-6 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 24 24"
            className="text-green-400"
          >
            <path
              fill="currentColor"
              d="M12 21q-1.05 0-1.775-.725T9.5 18.5t.725-1.775T12 16t1.775.725t.725 1.775t-.725 1.775T12 21m-5.65-5.65l-2.1-2.15q1.475-1.475 3.463-2.337T12 10t4.288.875t3.462 2.375l-2.1 2.1q-1.1-1.1-2.55-1.725T12 13t-3.1.625t-2.55 1.725M2.1 11.1L0 9q2.3-2.35 5.375-3.675T12 4t6.625 1.325T24 9l-2.1 2.1q-1.925-1.925-4.462-3.012T12 7T6.563 8.088T2.1 11.1"
            />
          </svg>
          <p className="text-xl font-medium">Free Wi-Fi in all rooms </p>
        </div>
        <div className="flex flex-col items-center p-6 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 24 24"
            className="text-green-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M22 3.6V11H2V3.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6M18 7h1M2 11l.79 2.584A2 2 0 0 0 4.702 15H6m16-4l-.79 2.584A2 2 0 0 1 19.298 15H18m-8.5-.5s0 7-3.5 7m8.5-7s0 7 3.5 7m-6-7v7"
            />
          </svg>
          <p className="text-xl font-medium">Air conditioning</p>
        </div>
        <div className="flex flex-col items-center p-6 space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4em"
            height="4em"
            viewBox="0 0 24 24"
            className="text-green-400"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m12 7l6.632-4m-7.106 4L5.368 3M3 9.154C3 7.964 3.895 7 5 7h14c1.105 0 2 .964 2 2.154v9.692c0 1.19-.895 2.154-2 2.154H5c-1.105 0-2-.964-2-2.154z"
            />
          </svg>
          <p className="text-xl font-medium">Safety deposit boxes</p>
        </div>
      </div>
    </div>
  );
}

export default Highlights