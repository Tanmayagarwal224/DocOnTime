import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData ,backendUrl,loadUserProfileData,token} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(true);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    // API call for saving user profile can go here
      try{
        const formData=new FormData()
         formData.append('name',userData.name)
          formData.append('phone',userData.phone)
         formData.append('address',JSON.stringify(userData.address))
          formData.append('gender',userData.gender)
         formData.append('dob',userData.dob)

         image && formData.append('image',image)

         const {data}=await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
          
         if(data.success){
           toast.success(data.message)
           await  loadUserProfileData()
            setIsEdit(false)
            setImage(false)
          }
          else{
            toast.error(data.message)
          }
     
        }
      catch(error){
         console.log(error)
         toast.error(error.message)
      }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Profile Picture Section */}
      {isEdit ? (
        <label htmlFor="image" className="cursor-pointer relative">
          <div className="w-32 h-32 flex items-center justify-center rounded-full border-4 border-indigo-500 shadow-md overflow-hidden bg-gray-50 relative">
            <img
              src={image ? URL.createObjectURL(image) : userData?.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {!image && (
              <img
                src={assets.upload_icon}
                alt="Upload Icon"
                className="absolute bottom-2 right-2 w-6 h-6 opacity-80"
              />
            )}
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          src={userData?.image}
          alt="Profile"
          className="w-32 h-32 rounded-full shadow-lg mb-4 border-4 border-indigo-500 object-cover"
        />
      )}

      {/* Card Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg mt-6">
        {/* Name */}
        {isEdit ? (
          <input
            type="text"
            value={userData?.name || ""}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full text-xl font-semibold text-center border-b-2 border-gray-300 focus:outline-none focus:border-indigo-500 pb-1"
          />
        ) : (
          <p className="text-2xl font-bold text-center text-gray-800">
            {userData?.name}
          </p>
        )}

        <hr className="my-6 border-gray-300" />

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Contact Information
          </h2>

          <p className="text-sm text-gray-500">Email ID:</p>
          <p className="mb-3 text-gray-800">{userData?.email}</p>

          <p className="text-sm text-gray-500">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData?.phone || ""}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="mb-3 text-gray-800">{userData?.phone}</p>
          )}

          {/* Address */}
          <p className="text-sm text-gray-500">Address:</p>
          {isEdit ? (
            <div className="mb-3">
              <input
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData?.address?.line1 || ""}
                type="text"
                placeholder="Address line 1"
                className="w-full mb-2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData?.address?.line2 || ""}
                type="text"
                placeholder="Address line 2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <p className="mb-3 text-gray-800">
              {userData?.address?.line1}
              <br />
              {userData?.address?.line2}
            </p>
          )}
        </div>

        {/* Basic Information */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Basic Information
          </h2>

          {/* Gender */}
          <p className="text-sm text-gray-500">Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData?.gender || ""}
              className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="mb-3 text-gray-800">{userData?.gender}</p>
          )}

          {/* Birthday */}
          <p className="text-sm text-gray-500">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData?.dob || ""}
              className="w-full mb-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ) : (
            <p className="mb-3 text-gray-800">{userData?.dob}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center">
          {isEdit ? (
            <button
              onClick={ updateUserProfileData}
              className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
