import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "./img/logo_aika.png";
import logoNameImg from "./img/logoN_aika.png";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setOpen(!open);
    }
  };

  return (
    <header className="flex items-center justify-between px-5 py-3 bg-purple-100">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 group">
        <img src={logo} className="h-12  w-auto cursor-pointer" />
        <img
          src={logoNameImg}
          className="
            h-12
            opacity-0
            -translate-x-3
            group-hover:opacity-100
            group-hover:translate-x-0
            transition-all
            duration-300
            ease-out
            pointer-events-none
            select-none"
        />
      </Link>

      {/* Nav */}
      <nav className="flex space-x-4">
        <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
        <Link to="/about" className="text-gray-800 hover:text-gray-600">About</Link>
        <Link to="/contact" className="text-gray-800 hover:text-gray-600">Contact</Link>
        {user && <Link to="/account" className="text-gray-800 hover:text-gray-600">Account</Link>}
      </nav>

    {/* Profile */}
<div className="relative flex items-center gap-2 ml-5">
  <img
    src="/img/profile.png"
    className="w-10 h-10 rounded-full cursor-pointer"
    onClick={handleProfileClick}
  />

  {open && user && (
    <div
      className="
        absolute
        right-0
        top-12
        bg-white
        shadow-lg
        rounded-lg
        p-3
        min-w-[140px]
        z-50
      "
    >
      <p className="text-sm text-gray-700 truncate">
        {user.username || user.email}
      </p>

      <hr className="my-2" />

      <button
        onClick={logout}
        className="text-red-500 text-sm hover:text-red-600"
      >
        Logout
      </button>
    </div>
  )}
</div>
    </header>
  );
}

export default Header;
