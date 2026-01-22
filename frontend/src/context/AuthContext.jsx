import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // App load хийсэн үед localStorage-д токен байвал user-г сэргээх
  useEffect(() => {
    const access = localStorage.getItem("access");
    const email = localStorage.getItem("email"); // token-аас email авчихсан бол
    if (access && email) {
      setUser({ email });
    }
  }, []);

  const loginUser = (data) => {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("email", data.email); // email-г хадгалах
    setUser({ email: data.email }); // user state шинэчлэх
  };

  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
