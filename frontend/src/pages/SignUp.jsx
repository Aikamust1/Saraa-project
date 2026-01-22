import { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await api.post("register/", {
        username,
        email,
        password,
      });

      alert("Бүртгэл амжилттай! Одоо нэвтэрнэ үү 😊");
      navigate("/login");
    } catch (err) {
      alert("Бүртгүүлэхэд алдаа гарлаа");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-xl text-purple-500 font-bold">
            AIKA's BRACELET
          </h1>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create <span className="text-purple-500">account</span>
        </h2>
        <p className="text-center text-gray-500 mb-6">Sign up</p>

        {/* FORM */}
        <form onSubmit={handleSignUp}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
          >
            Sign up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log in →
          </Link>
        </p>

        <div className="text-center text-sm text-gray-400 mt-4">
          <p className="hover:underline cursor-pointer">Contact support</p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
