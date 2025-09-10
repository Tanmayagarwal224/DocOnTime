import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <p className="text-2xl font-bold text-center text-gray-800 mb-6">
        Find the Best Specialist Doctors
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <p
          onClick={() =>
            speciality === 'General physician'
              ? navigate('/doctors')
              : navigate('/doctors/General physician')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'General physician'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          General physician
        </p>
        <p
          onClick={() =>
            speciality === 'Gynecologist'
              ? navigate('/doctors')
              : navigate('/doctors/Gynecologist')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'Gynecologist'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          Gynecologist
        </p>
        <p
          onClick={() =>
            speciality === 'Dermatologist'
              ? navigate('/doctors')
              : navigate('/doctors/Dermatologist')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'Dermatologist'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          Dermatologist
        </p>
        <p
          onClick={() =>
            speciality === 'Pediatricians'
              ? navigate('/doctors')
              : navigate('/doctors/Pediatricians')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'Pediatricians'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          Pediatricians
        </p>
        <p
          onClick={() =>
            speciality === 'Neurologist'
              ? navigate('/doctors')
              : navigate('/doctors/Neurologist')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'Neurologist'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          Neurologist
        </p>
        <p
          onClick={() =>
            speciality === 'Gastroenterologist'
              ? navigate('/doctors')
              : navigate('/doctors/Gastroenterologist')
          }
          className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-all ${
            speciality === 'Gastroenterologist'
              ? 'bg-green-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-green-100'
          }`}
        >
          Gastroenterologist
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filterDoc.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center cursor-pointer"
          >
            <img
              src={item.image}
              alt=""
              className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-green-100"
            />
            <div className="text-center">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-500 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors
