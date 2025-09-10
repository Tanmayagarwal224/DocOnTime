import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment=async(appointmentId)=>{
    try{
       const{data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
       if(data.success){
        toast.success(data.message)
        getUserAppointments()
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

  const initPay=(order)=>{
     const options={
       key:import.meta.env.VITE_RAZORPAY_KEY_ID,
       amount:order.amount,
       currency:order.currency,
       name:'Appointment Payment',
       description:'Appoinment Payment',
       order_id:order.id,
       receipt:order.receipt,
       handler:async(response)=>{
           console.log(response)
           toast.success("payment Successful")
       }
     }
     const rzp=new window.Razorpay(options)
     rzp.open()
  }

  const appointmentRazorpay=async(appointmentId)=>{
      try{
        const{data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
        if(data.success){
          initPay(data.order)
        }
      }
      catch(error){
         console.log(error)
      toast.error(error.message)
      }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <p className="text-2xl font-bold text-gray-800 mb-6 text-center">
        My Appointments
      </p>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 border border-gray-200"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              {item.docData?.image ? (
                <img
                  src={item.docData.image}
                  alt={item.docData.name || 'Doctor'}
                  className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 shadow-md"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Doctor Details */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg font-semibold text-gray-800">
                {item.docData?.name || "Unknown Doctor"}
              </p>
              <p className="text-sm text-indigo-600 font-medium">
                {item.docData?.speciality || "Speciality Not Provided"}
              </p>
              <p className="mt-2 text-sm text-gray-500">Address:</p>
              <p className="text-gray-700">{item.docData?.address?.line1}</p>
              <p className="text-gray-700">{item.docData?.address?.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{' '}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
             {!item.cancelled && <button onClick={()=>appointmentRazorpay(item._id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                Pay Online
              </button>} 

             {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                Cancel Appointment
              </button>} 

              {item.cancelled && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
