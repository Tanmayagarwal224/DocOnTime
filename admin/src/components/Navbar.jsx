import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { adminToken, logoutAdmin } = useContext(AdminContext);
  const { dToken, logoutDoctor } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (adminToken) {
      logoutAdmin();
      navigate("/"); // redirect after logout
    } else if (dToken) {
      logoutDoctor();
      navigate("/"); // redirect after logout
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left: Logo + Role */}
        <div className="flex items-center space-x-4">
          <img
            src={assets.admin_logo}
            alt="Admin Logo"
            className="h-15 w-15 bg-amber-50 rounded-full shadow-md border-2 border-white object-cover"
          />
          <p className="text-xl font-bold text-white tracking-wide">
            {adminToken ? "Admin Dashboard" : dToken ? "Doctor Panel" : "Panel"}
          </p>
        </div>

        {/* Right: Logout Button */}
        {(adminToken || dToken) && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md transform hover:scale-105 transition duration-200 ease-in-out"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
