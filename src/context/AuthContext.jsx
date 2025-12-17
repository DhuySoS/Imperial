import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      // Chuyển chuỗi JSON trở lại thành object
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
    }
  }, []);
  const login = async (username, password) => {
    try {
      const res1 = await api.post("/auth/login", { username, password });
      const userID = res1.data.id;
      const userRole = res1.data.role;
      console.log("res1: ",res1.data);
      
      let userData;
      if (userRole === "ADMIN" || userRole === "STAFF") {
        userData = res1.data;
      } else {
        const res2 = await api.get(`/guests/user/${userID}`);
        userData = res2.data;
        console.log("res2: ", res2.data);
      }

      setUser(userData);
      setRole(userRole);

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userRole);
      
      return { success: true, role: userRole }; // Trả về object chứa role để kiểm tra
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      const res = await api.post("/auth/google-login", {
        credential,
      });
      const userID = res.data.id;
      const res2 = await api.get(`/guests/user/${userID}`);

      const userData = res2.data;
      const userRole = res.data.role;
      setUser(userData);
      setRole(userRole);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", userRole);
      return true;
    } catch (error) {
      console.log("Lỗi đăng nhập gg: ", error);
    }
  }
  useEffect(() => {
    console.log("user: ",user);
  }, [user]);
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, role, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
