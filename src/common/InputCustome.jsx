import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

const InputCustome = ({
  id,
  type,
  placeholder = "",
  label,
  className,
  error,
  name,
  value,
  onChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={inputType}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={`peer w-full  h-12 px-4 outline-none ${className}`}
      />
      <label
        htmlFor={id}
        className="absolute  left-4  text-gray-500 text-sm duration-200 transform
                scale-100 origin-left
                peer-placeholder-shown:translate-y-3.5 peer-placeholder-shown:scale-100
                peer-focus:translate-y-[-60%] peer-focus:scale-90 peer-focus:text-gray-400 focus:outline-none
                peer-not-placeholder-shown:translate-y-[-60%] peer-not-placeholder-shown:scale-90
                "
      >
        {label}
      </label>
      {isPassword && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-[70%] cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </span>
      )}
      {error && (
        <p className="text-red-500 text-xs ml-1  absolute -bottom-5 left-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputCustome;
