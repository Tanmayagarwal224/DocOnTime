import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData ,backendUrl} =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  
  const updateProfile=async()=>{
     try{
        const updateData={
          address:profileData.address,
          fees:profileData.fees,
          available:profileData.available
        }

        const{data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
        if(data.success){
          toast.success(data.message)
          setIsEdit(false)
          getProfileData()
        }
        else{
          toast.error(data.message)
        }
      }

     catch(error){
      console.log(error)
      toast.error(error.message) 
     }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-2xl">
      <div className="flex items-start gap-6">
        {/* Profile Image */}
        <div>
          <img
            src={profileData.image}
            alt="Doctor"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-200"
          />
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-4">
          <p className="text-2xl font-bold text-gray-800">
            {profileData.name}
          </p>

          <div className="flex items-center gap-4">
            <p className="text-lg text-gray-600">
              {profileData.degree} - {profileData.speciality}
            </p>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {profileData.experience} yrs exp
            </span>
          </div>

          {/* About Section */}
          <div>
            <p className="font-semibold text-gray-700">About</p>
            <p className="text-gray-600">{profileData.about}</p>
          </div>

          {/* Fees */}
          <p className="font-medium text-gray-700">
            Appointment Fee:{" "}
            <span className="text-gray-900">
              {currency}{" "}
              {isEdit ? (
                <input
                  type="number"
                  className="border rounded p-1 w-24 ml-2"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      fees: e.target.value,
                    }))
                  }
                />
              ) : (
                profileData.fees
              )}
            </span>
          </p>

          {/* Address */}
          <div>
            <p className="font-semibold text-gray-700">Address</p>
            <p className="text-gray-600">
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded p-1 w-full my-1"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData.address.line1
              )}
              <br />
              {isEdit ? (
                <input
                  type="text"
                  className="border rounded p-1 w-full my-1"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={profileData.available}
              disabled={!isEdit}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              className="h-4 w-4"
            />
            <label className="text-gray-700">Available</label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
