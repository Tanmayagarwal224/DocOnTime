import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate=useNavigate()
    const {doctors}=useContext(AppContext)
  return (
    <div className="px-6 md:px-12 py-12 bg-gray-50 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Consult with Leading Specialists
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
          Connect with highly rated doctors and get the right care at the right time.
        </p>
    
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
            {doctors.slice(0,10).map((item,index)=>( 
                 <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className="bg-green-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center">
                    <img 
                      src={item.image} 
                      alt="" 
                      className="w-24 h-24 object-cover rounded-full mb-4"
                    />
                  
                   <div>
                     <p className="font-semibold text-gray-800">{item.name}</p>
                     <p className="text-gray-500 text-sm">{item.speciality}</p>
                   </div>
                 </div>
            ))}
       </div>

         <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className="px-6 py-3 bg-amber-700 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 shadow-md">
            See All
         </button>
    </div>
  )
}

export default TopDoctors
