import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
     <div className="mt-5 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 bg-emerald-200">

   {/* left side div */}
    <div className="flex flex-col gap-6 max-w-lg">
        <p className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
         Book Appointment <br /> with Trusted Doctors
        </p>
      
      <div className="flex items-center gap-4">
        <img src={assets.group_profiles} alt="" className="w-16 h-16 object-cover rounded-full shadow-md" />
        <p className="text-gray-600 text-lg">
          Find the right doctor near you and book your <br /> appointment instantly
        </p>
      </div>
       
       <a 
        href="#speciality" 
        className="inline-flex items-center gap-2 border-y-orange-200 hover:bg-blue-700 text-black font-medium px-6 py-3 rounded-full shadow-md transition-all duration-300 w-fit"
       >
        Book a Visit <img src={assets.arrow_icon} alt="" className="w-5 h-5" />
       </a>
    </div>

   {/* Right side structure */}
    <div className="mt-10 md:mt-0">
      <img src={assets.header_img} alt="" className="w-full max-w-md md:max-w-lg rounded-lg shadow-lg" />
    </div>
    
</div>
      
  )
}

export default Header
