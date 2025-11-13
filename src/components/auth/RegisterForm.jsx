import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "../custome/InputCustome";
import { nameFields, registerFields } from "@/config/forms/registerFields";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const schema = z
  .object({
    accountName: z.string().min(3, "Tên tài khoản ít nhất 3 ký tự"),
    lastName: z.string().min(1, "Họ không được để trống"),
    firstName: z.string().min(1, "Tên không được để trống"),
    phone: z.string().regex(/^\d{10,11}$/, "Số điện thoại 10-11 số"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="w-1/2  mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-semibold text-2xl">
        Đăng ký ngay, ưu đãi trao tay
      </h2>
      <form onSubmit={handleSubmit()} className="w-full space-y-5 text-center">
        {/* Tên tài khoản */}
        <CustomInput
          id="accountName"
          type="text"
          label="Tên tài khoản"
          {...register("accountName")}
          error={errors.accountName?.message}
        />

        {/* Họ và Tên - 2 ô ngang */}
        <div className="grid grid-cols-2 gap-3">
          {nameFields.map((field) => (
            <CustomInput
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              autoComplete={field.autoComplete}
              {...register(field.id)}
              error={errors[field.id]?.message}
            />
          ))}
        </div>

        {/* Các field còn lại */}
        {registerFields
          .filter((f) => f.id != "accountName")
          .map((field) => (
            <CustomInput
              key={field.id}
              id={field.id}
              type={field.type}
              label={field.label}
              autoComplete={field.autoComplete}
              {...register(field.id)}
              error={errors[field.id]?.message}
            />
          ))}

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className=" bg-linear-to-r from-cyan-500 to-blue-500 text-white font-medium  rounded-full hover:shadow-lg transition disabled:opacity-70"
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </Button>
      </form>

      {/* Link đăng nhập */}
      <p className="text-center mt-6 text-sm text-sky-500 font-medium">
        <Link to="/auth/login" className="hover:underline">
          Tôi đã có tài khoản
        </Link>
      </p>
    </div>
  );
}
