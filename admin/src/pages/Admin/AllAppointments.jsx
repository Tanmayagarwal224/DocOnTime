import React from 'react'
import { useContext,useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllAppointments = () => {

  const{adminToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
  const {calculateAge,slotDateFormat,currency}=useContext(AppContext)

  useEffect(()=>{
    if(adminToken){
      getAllAppointments()
    }
  },[adminToken])
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <p className="text-2xl font-bold mb-6 text-gray-800">All Appointments</p>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Data Rows */}
        {appointments.map((item,index)=>(
          <div key={index} className="grid grid-cols-7 gap-4 items-center px-4 py-3 border-b hover:bg-gray-50">
              <p className="text-gray-600">{index+1}</p>
              
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p className="text-gray-800">{item.userData.name}</p>
              </div>

              <p className="text-gray-600">{calculateAge(item.userData.dob)}</p>

              <p className="text-gray-600">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className="flex items-center gap-2">
                <img src={item.docData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p className="text-gray-800">{item.docData.name}</p>
              </div>

              <p className="text-gray-800 font-medium">{currency} {item.amount}</p>

              {item.cancelled 
                ? <p className="text-red-500 font-semibold">Cancelled</p> 
                : <img 
                    onClick={()=>cancelAppointment(item._id)} 
                    src={assets.cancel_icon} 
                    alt="Cancel" 
                    className="w-6 h-6 cursor-pointer hover:opacity-70 transition"
                  />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
