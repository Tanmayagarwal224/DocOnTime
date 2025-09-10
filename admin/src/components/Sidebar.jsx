import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { adminToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext)
  return (
    <div className="w-60 h-screen bg-green-600 text-white fixed top-0 left-0 p-4 pt-20">
      {adminToken && (
        <ul className="space-y-3">
          <NavLink
            to={"/admin-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-6 h-6" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.add_icon} alt="" className="w-6 h-6" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}


      {dToken && (
        <ul className="space-y-3">
          <NavLink
            to={"/doctor-dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.home_icon} alt="" className="w-6 h-6" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to={"/doctor-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.appointment_icon} alt="" className="w-6 h-6" />
            <p>Appointments</p>
          </NavLink>

         

          <NavLink
            to={"/doctor-profile"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition 
               ${
                 isActive
                   ? "bg-blue-600 text-white"
                   : "text-slate-300 hover:bg-slate-700 hover:text-white"
               }`
            }
          >
            <img src={assets.people_icon} alt="" className="w-6 h-6" />
            <p>profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
