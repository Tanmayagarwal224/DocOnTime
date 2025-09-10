import React from 'react'
import {useNavigate} from 'react-router-dom'
const Banner = () => {
  const navigate=useNavigate()
  return (
    <div className="bg-gradient-to-r bg-green-200 text-white py-16 px-6 flex flex-col items-center justify-center rounded-2xl shadow-lg">
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">Book Appointment</p>
        <p className="text-lg opacity-90">With 100+ Trusted Doctors</p>
      </div>
      <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="mt-6 bg-white text-purple-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-purple-100 transition">
        Register
      </button>
    </div>
  )
}

export default Banner
