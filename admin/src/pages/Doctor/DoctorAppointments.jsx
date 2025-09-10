import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAllAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAllAppointments()
    }
  }, [dToken])

  return (
    <div className="p-6">
      <p className="text-2xl font-semibold mb-6 text-gray-800">All Appointments</p>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 gap-4 bg-gray-100 p-3 text-sm font-semibold text-gray-700 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Data Rows */}
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 items-center p-3 border-b hover:bg-gray-50 text-sm"
          >
            <p className="font-medium">{index + 1}</p>

            <div className="flex items-center space-x-2">
              <img
                src={item.userData.image}
                alt=""
                className="w-8 h-8 rounded-full object-cover border"
              />
              <p className="text-gray-800">{item.userData.name}</p>
            </div>

            <div>
              <p
                className={`px-2 py-1 rounded text-xs font-medium w-fit ${
                  item.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {item.payment ? 'Online' : 'Cash'}
              </p>
            </div>

            <p>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p className="font-semibold">{currency} {item.amount}</p>

            {item.cancelled ? (
              <p className="text-red-500 font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-600 font-medium">Completed</p>
            ) : (
              <div className="flex space-x-3">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  alt="Complete"
                  className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
