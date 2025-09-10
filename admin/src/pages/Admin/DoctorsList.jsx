import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, adminToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (adminToken) {
      getAllDoctors()
    }
  }, [adminToken])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
              />

              <div>
                <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                <p className="text-sm text-gray-500 mb-3">{item.speciality}</p>

                <div className="flex items-center justify-center gap-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="w-5 h-5 accent-green-600 cursor-pointer"
                  />
                  <p className="text-sm text-gray-600">Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList
