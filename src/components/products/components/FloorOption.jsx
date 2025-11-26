import React from "react";

const FloorOption = ({ options, onChange, selectedValues }) => {
  const handleToggle = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };
  return (
    <div className="p-4 space-y-2">
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center gap-6 cursor-pointer group border-b py-2 last:border-0"
        >
          <div className="relative flex items-center">
            <input
              type="checkbox"
              className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-400 checked:bg-gray-800 checked:border-gray-800 transition-all"
              checked={selectedValues.includes(option.value)}
              onChange={() => handleToggle(option.value)}
            />
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-800 group-hover:text-black leading-tight mt-0.5">
              {option.label}
            </p>
            <span>{option.view}</span>
          </div>
          <div>
            {option.available ? (
              <div className="text-green-400 flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 12 12"
                  className="text-white bg-green-400 rounded-full"
                >
                  <path
                    fill="currentColor"
                    d="M8.85 4.85a.5.5 0 0 0-.707-.707l-2.65 2.65l-1.65-1.65a.5.5 0 0 0-.707.707l2 2a.5.5 0 0 0 .707 0l3-3z"
                  />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12 6c0 3.31-2.69 6-6 6S0 9.31 0 6s2.69-6 6-6s6 2.69 6 6m-1 0c0 2.76-2.24 5-5 5S1 8.76 1 6s2.24-5 5-5s5 2.24 5 5"
                    clipRule="evenodd"
                  />
                </svg>
                {option.extraFee === 0
                  ? "Miễn phí"
                  : "+ " + option.extraFee + "đ/đêm"}
              </div>
            ) : (
              <div className="text-red-400 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 24 24"
                  className="bg-red-400 rounded-full text-white "
                >
                  <path
                    fill="currentColor"
                    d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
                Hết phòng
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

export default FloorOption;
