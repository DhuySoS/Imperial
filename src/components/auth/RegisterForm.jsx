import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { nameFields, registerFields } from "@/config/forms/registerFields";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import InputCustome from "@/common/InputCustome";
import api from "@/services/api";
const schema = z
  .object({
    accountName: z.string().min(3, "Tên tài khoản ít nhất 3 ký tự"),
    lastName: z.string().min(1, "Họ không được để trống"),
    firstName: z.string().min(1, "Tên không được để trống"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      accountName: "",
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    // Đây là nơi bạn sẽ xử lý logic gửi dữ liệu đăng ký lên server.
    // `data` chứa tất cả các giá trị từ form đã được xác thực.
    console.log("Dữ liệu form:", data);
    try {
      // Ví dụ gọi API:
      await api.post('/auth/register', {
        email: data.email,
        username: data.accountName,
        password: data.password,
      });
      // Sau khi đăng ký thành công, bạn có thể chuyển hướng người dùng.
      navigate('/auth/login');
      // Tạm thời dùng Promise để giả lập thời gian chờ mạng, bạn hãy thay thế bằng logic thực tế.
      // await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  const onError = (errors) => {
    // Log này sẽ hiển thị trong console nếu có lỗi validation
    console.error("Lỗi validation của form:", errors);
  };

  return (
    <div className="flex border rounded-2xl shadow-lg ">
      <div className="w-1/2 hidden md:block h-full ">
        <img
          src="/assets/LogoLog_in/register.jpg"
          alt="Logo"
          className="h-full object-cover rounded-l-2xl  "
        />
      </div>
      <div className="w-1/2 h-full">
        <div className="mx-12 mt-12 flex flex-col justify-center h-full">
          <div className="space-y-2 mb-4">
            <h2 className=" font-bold text-2xl">Đăng ký liền tay</h2>
            <span className="text-gray-400">Nhận ngay ưu đãi</span>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className=" space-y-8 text-center"
          >
            {/* Họ và Tên - 2 ô ngang */}
            <div className="grid grid-cols-2 gap-3">
              {nameFields.map((field) => (
                <InputCustome
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
            {registerFields.map((field) => (
              <InputCustome
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
              size="custom"
              className=" bg-linear-to-r from-cyan-500 to-blue-500 font-semibold text-xl py-3  rounded-full hover:shadow-lg transition disabled:opacity-70"
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
      </div>
    </div>
  );
}
