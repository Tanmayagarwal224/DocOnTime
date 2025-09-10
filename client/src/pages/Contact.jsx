import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-6 md:px-16 lg:px-28 py-12 text-gray-800">

      {/* HEADING */}
      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl font-bold">
          CONTACT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* IMAGE */}
        <img 
          src={assets.contact_image} 
          alt="Contact us" 
          className="w-full lg:w-1/2 rounded-2xl shadow-lg"
        />

        {/* OFFICE INFO */}
        <div className="lg:w-1/2 space-y-6 bg-white shadow-md p-8 rounded-2xl">
          <div>
            <p className="text-xl font-semibold text-gray-900 mb-2">Our Office</p>
            <p className="text-gray-700 leading-relaxed">
              71/55 Mansarove Plaza <br /> 
              302020 Jaipur, Rajasthan
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-900 mb-2">Get in Touch</p>
            <p className="text-gray-700">
              Phone: <span className="font-medium">+0141-27645613</span> <br />
              Email: <span className="font-medium">doctorsonline@gmail.com</span>
            </p>
          </div>

          <div>
            <p className="text-xl font-semibold text-gray-900 mb-2">Careers</p>
            <p className="text-gray-700 mb-4">
              Learn more about our teams and current openings.
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Explore Careers
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
