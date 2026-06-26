import { createContext, useContext, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  /* ================= LOGIN ================= */

  const login = async (data) => {
    const res = await API.post("/login", data);

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    setUser(res.data.user);

    return res.data.user;
  };

  /* ================= REGISTER ================= */

  const register = async (data) => {
    const res = await API.post("/register", data);

    return res.data;
  };

  /* ================= VERIFY OTP ================= */

  const verifyOtp = async (phone, code) => {
    const res = await API.post("/verify-otp", {
      phone,
      code,
    });

    return res.data;
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  const isAuthenticated =
    !!localStorage.getItem("token");

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyOtp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);