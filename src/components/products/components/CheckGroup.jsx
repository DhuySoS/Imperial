import React from 'react'

const CheckGroup = ({title, options, onChange, selectedValues}) => {
    const handleToggle = (value) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter(item => item !== value))
        } else {
            onChange([...selectedValues, value])
        }
    }
  return (
    <div className="mb-4">
      {title && (
        <h4 className="text-gray-500 font-bold text-xs mb-2 uppercase tracking-wide">
          {title}
        </h4>
      )}

      {/* Danh sách Checkbox */}
      <div className="grid grid-cols-2 gap-y-2 gap-x-1">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-2 cursor-pointer group"
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

            {/* Label (Chữ đậm) */}
            <span className="text-sm font-bold text-gray-800 group-hover:text-black leading-tight mt-0.5">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CheckGroup