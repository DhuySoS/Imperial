import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import { Currency } from "lucide-react";
import { useEffect, useState } from "react";
const PersonalInfor = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState({
    fullName: user?.fullName || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const [quantityBookings, setQuantityBookings] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  useEffect(() => {
    const fetchUserStatistics = async () => {
      try {
        const response = await api.get(`/bookings/guest/${user.id}`);
        console.log("User statistics:", response.data.length);
        const totalAmount = response.data.reduce(
          (sum, booking) => sum + booking.totalAmount,
          0
        );

        setQuantityBookings(response.data.length);
        setTotalSpending(totalAmount);
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      }
    };

    fetchUserStatistics();
  } , [user.id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };
  const updateUserInfor = async () => {
    try {
              await api.put(`/guests/${user.id}`, userForm);
              console.log("User information updated successfully!");
              // Cập nhật lại thông tin user trong AuthContext nếu cần
              const updatedUser = { ...user, ...userForm };
              setUser(updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));
              setIsEditing(false);
            } catch (error) {
              console.error("Error updating user information:", error);
            }
  }
  useEffect(() => {
    if (
      !isEditing &&
      (userForm.fullName !== user?.fullName ||
        userForm.phoneNumber !== user?.phoneNumber ||
        userForm.address !== user?.address ||
        userForm.gender !== user?.gender ||
        userForm.dateOfBirth !== user?.dateOfBirth)
    ) {
      updateUserInfor();
      
    }
  }, [isEditing]);

  const calculateAge = (birthday) => {
    if (!birthday) return "N/A";
    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    // Nếu chưa đến tháng sinh hoặc cùng tháng nhưng chưa đến ngày sinh thì trừ đi 1 tuổi
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  return (
    <div className="w-full flex gap-6">
      <div className=" space-y-6 p-8 border rounded-2xl shadow-lg  ">
        <div>
          <img
            src="/assets/avatar.jpg"
            alt="avatar"
            className="h-48 w-48 object-cover overflow-hidden rounded-full"
          />
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Họ và tên</p>
          <p className="col-span-1 font-semibold">
            {user?.fullName || "Người dùng"}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Tuổi</p>
          <p className="col-span-1 font-semibold">
            {user?.dateOfBirth
              ? calculateAge(user.dateOfBirth)
              : "Chưa cập nhật"}
          </p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Giới tính</p>
          <p className="col-span-1 font-semibold">{user?.gender || "N/A"}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Hạng</p>
          <p className="col-span-1 font-semibold">{totalSpending <10000000 ? "Thường" : "VIP"}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Số lần đặt</p>
          <p className="col-span-1 font-semibold">{quantityBookings}</p>
        </div>
        <div className="grid grid-cols-2">
          <p className="col-span-1 text-gray-400 font-medium">Số tiền đã đặt</p>
          <p className="col-span-1 font-semibold">{totalSpending}</p>
        </div>
      </div>
      <div className="flex-1 space-y-6 p-8 border rounded-2xl shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Thông tin cá nhân</h2>
          <button
            className={`px-4 py-3 bg-blue-500 text-white rounded-2xl transition-all ${
              isEditing ? "bg-green-500" : ""
            }`}
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            {isEditing ? "Lưu" : "Chỉnh sửa"}
          </button>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Họ và tên
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder={user?.fullName || "Đào Duy Khánh"}
                disabled={!isEditing}
                onChange={handleInputChange}
                name="fullName"
                value={userForm?.fullName}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Nick Name
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder={user?.fullName || "Đào Duy Khánh"}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Giới tính
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder="Nam"
                disabled={!isEditing}
                onChange={handleInputChange}
                name="gender"
                value={userForm?.gender}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Ngày sinh
              </label>
              <input
                type="Date"
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                disabled={!isEditing}
                onChange={handleInputChange}
                name="dateOfBirth"
                value={userForm?.dateOfBirth}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Số điện thoại
              </label>
              <input
                type="text "
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder={user?.phoneNumber || "N/A"}
                disabled={!isEditing}
                onChange={handleInputChange}
                name="phoneNumber"
                value={userForm?.phoneNumber}
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-2 font-semibold text-lg">
                Địa chỉ
              </label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-xl transition-all outline-none ${
                  isEditing
                    ? "bg-white border border-blue-300 focus:ring-4 focus:ring-blue-100 text-gray-900 shadow-sm"
                    : "bg-gray-50 border border-transparent text-gray-800 cursor-default"
                }`}
                placeholder={user?.address || "N/A"}
                disabled={!isEditing}
                onChange={handleInputChange}
                name="address"
                value={userForm?.address}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6 items-center">
            <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold text-xl">Địa chỉ email</p>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonalInfor;
