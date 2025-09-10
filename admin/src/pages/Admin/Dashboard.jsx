import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {
  const { adminToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (adminToken) {
      getDashData()
    }
  }, [adminToken])

  return (
    dashData && (
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Doctors */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md">
            <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.doctors}</p>
              <p className="text-gray-500">Doctors</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md">
            <img src={assets.appointments_icon} alt="Appointments" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.appointments}</p>
              <p className="text-gray-500">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-md">
            <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashData.patients}</p>
              <p className="text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4 border-b pb-2">
            <img src={assets.list_icon} alt="List" className="w-6 h-6" />
            <p className="font-semibold text-lg text-gray-700">Latest Bookings</p>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border rounded-xl hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.docData.image}
                    alt={item.docData.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.docData.name}</p>
                    <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 font-semibold">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt="Cancel"
                    className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboard
