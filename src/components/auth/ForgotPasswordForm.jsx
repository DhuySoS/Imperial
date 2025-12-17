import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import api from "@/services/api";
import InputCustome from "@/common/InputCustome";
import { Button } from "../ui/button";

// Schemas for each step
const emailSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

const codeSchema = z.object({
  code: z
    .string()
    .length(4, "Mã xác nhận phải có 4 chữ số.")
    .regex(/^\d+$/, "Mã xác nhận chỉ được chứa số."),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export default function ForgotPasswordForm() {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [backendCode, setBackendCode] = useState(""); // State to hold code from backend
  const navigate = useNavigate();

  const emailForm = useForm({ resolver: zodResolver(emailSchema) });
  const codeForm = useForm({ resolver: zodResolver(codeSchema) });
  const passwordForm = useForm({ resolver: zodResolver(passwordSchema) });

  const onEmailSubmit = async (data) => {
    try {
      const res = await api.post("/auth/forgot-password", { email: data.email });
      // Assuming backend returns the code in the response
      setBackendCode(res.data);
      console.log("code: ", res.data);
      
      setEmail(data.email);
      setStep(2);
      emailForm.reset();
    } catch (error) {
      console.log(error);
      
    }
  };

  const onCodeSubmit = (data) => {
    console.log("Oncodesubmit: ", data.code, backendCode);
    
    if (data.code == backendCode) {
      setToken(data.code);
      setStep(3);
      codeForm.reset();
    } else {
      codeForm.setError("code", {
        type: "manual",
        message: "Mã xác nhận không hợp lệ.",
      });
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      await api.post("/auth/reset-password", {
        email,
        token,
        newPassword: data.password,
      });
      navigate("/auth/login");
    } catch (error) {
      console.log(error);

    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <form
            onSubmit={emailForm.handleSubmit(onEmailSubmit)}
            className="w-full text-center space-y-8"
          >
            <p className="text-gray-500">
              Nhập email của bạn để bắt đầu quá trình đặt lại mật khẩu.
            </p>
            <InputCustome
              id="email"
              type="email"
              label="Email"
              autoComplete="email"
              {...emailForm.register("email")}
              error={emailForm.formState.errors.email?.message}
            />
            <Button
              type="submit"
              disabled={emailForm.formState.isSubmitting}
              size="custom"
              className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-3 hover:shadow-lg transition disabled:opacity-70"
            >
              {emailForm.formState.isSubmitting ? "Đang gửi..." : "Gửi"}
            </Button>
          </form>
        );
      case 2:
        return (
          <form
            onSubmit={codeForm.handleSubmit(onCodeSubmit)}
            className="w-full text-center space-y-8"
          >
            <p className="text-gray-500">
              Một mã xác nhận đã được gửi đến {email}.
            </p>
            <InputCustome
              id="code"
              type="tel"
              label="Mã xác nhận"
              autoComplete="one-time-code"
              maxLength={6}
              {...codeForm.register("code")}
              error={codeForm.formState.errors.code?.message}
              inputClassName="text-center text-2xl tracking-[0.5em] font-mono"
            />
            <Button
              type="submit"
              disabled={codeForm.formState.isSubmitting}
              size="custom"
              className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-3 hover:shadow-lg transition disabled:opacity-70"
            >
              {codeForm.formState.isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
            </Button>
          </form>
        );
      case 3:
        return (
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="w-full text-center space-y-6"
          >
            <p className="text-gray-500">Vui lòng nhập mật khẩu mới của bạn.</p>
            <InputCustome
              id="password"
              type="password"
              label="Mật khẩu mới"
              {...passwordForm.register("password")}
              error={passwordForm.formState.errors.password?.message}
            />
            <InputCustome
              id="confirmPassword"
              type="password"
              label="Xác nhận mật khẩu mới"
              {...passwordForm.register("confirmPassword")}
              error={passwordForm.formState.errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              disabled={passwordForm.formState.isSubmitting}
              size="custom"
              className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xl py-3 hover:shadow-lg transition disabled:opacity-70"
            >
              {passwordForm.formState.isSubmitting
                ? "Đang lưu..."
                : "Lưu mật khẩu"}
            </Button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-1/2 mx-auto p-8 border rounded-2xl shadow-lg space-y-6">
      <h2 className="text-center font-bold text-3xl">Quên mật khẩu</h2>
      {renderStep()}
      <div className="text-center mt-4">
        <Link
          to="/auth/login"
          className="text-sky-500 hover:underline font-medium text-sm"
        >
          Quay lại đăng nhập
        </Link>
      </div>
    </div>
  );
}