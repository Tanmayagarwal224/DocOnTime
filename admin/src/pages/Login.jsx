import React, { useState, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
          toast.success("Admin login successful ✅");
        } else {
          toast.error(data.message); // ✅ fixed
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful ✅");
          console.log(data.token);
        } else {
          toast.error(data.message); // ✅ fixed
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-800">
            <span className="text-blue-600">{state}</span> Login
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Login Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Login
          </button>
        </div>

        {/* Switch Login Type */}
        {state === "Admin" ? (
          <p className="text-center text-sm text-gray-600">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
