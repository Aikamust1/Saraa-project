import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("token/", {
        username: email, // Django SimpleJWT username авдаг
        password,
      });
    // ✅ LOGIN амжилттай бол token-г localStorage-д хадгалах
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    localStorage.setItem("email", email); // user-ийг context-д дамжуулахад хэрэгтэй

      loginUser({ 
      access: res.data.access, 
      refresh: res.data.refresh, 
      email // энэ email-г context-д дамжуулж байна
    });

    
      navigate("/");
    } catch (err) {
      alert("Нэвтрэх нэр эсвэл нууц үг буруу");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <h1 className="text-xl text-purple-500 font-bold">
            AIKA's BRACELET
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome <span className="text-purple-500">back</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">Login</p>

        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">User name</label>
            <input
              type="text"
              placeholder="Enter your email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <label className="font-medium">Password</label>
              <button
                type="button"
                className="text-teal-500 hover:underline"
              >
                Forgot your password?
              </button>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          New to AIKA's BRACELET?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign up →
          </Link>
        </p>

        <div className="text-center text-sm text-gray-400 mt-4 space-y-1">
          <p className="hover:underline cursor-pointer">Contact support</p>
          <p className="hover:underline cursor-pointer">
            Log in to the v1 dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
