import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className="px-6 md:px-12 py-12 bg-gray-50">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Browse by Medical Field
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-center text-lg">
          Easily explore doctors from different medical fields and find the right specialist for your healthcare needs.
        </p>

        {/* Horizontal scroll menu */}
        <div className="flex gap-6 pl-12 overflow-x-auto scrollbar-hide">
            {specialityData.map((item, index) => (
              <Link onClick={()=>scrollTo(0,0)}
                key={index} 
                to={`/doctors/${item.speciality}`}
                className="flex flex-col items-center min-w-[140px] bg-white rounded-xl shadow-md hover:shadow-lg p-4 transition-all duration-300 hover:scale-105"
              >
                 <img 
                   src={item.image} 
                   alt={item.speciality} 
                   className="w-20 h-20 object-contain mb-3"
                 />
                 <p className="text-gray-700 font-medium">{item.speciality}</p>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu
