export const registerFields = [
  {
    id: "accountName",
    label: "Tên tài khoản",
    type: "text",
    autoComplete: "username",
  },
  { id: "phone", label: "Số điện thoại", type: "tel", autoComplete: "tel" },
  { id: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    id: "password",
    label: "Mật khẩu",
    type: "password",
    autoComplete: "new-password",
  },
  {
    id: "confirmPassword",
    label: "Xác nhận mật khẩu",
    type: "password",
    autoComplete: "new-password",
  },
];

export const nameFields = [
  { id: "lastName", label: "Họ", type: "text", autoComplete: "family-name" },
  { id: "firstName", label: "Tên", type: "text", autoComplete: "given-name" },
];
