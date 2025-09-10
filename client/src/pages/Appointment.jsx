import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

      

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  return (
    docInfo && (
      <div className="px-6 py-10 bg-gray-50 min-h-screen">
        {/* Doctor Card Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl w-full mx-auto flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0 flex justify-center">
            <img
              src={docInfo.image}
              alt=""
              className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-green-100 shadow-md"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 flex flex-col justify-center">
            <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} alt="" className="w-5 h-5" />
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="text-gray-600 font-medium">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-5">
              <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                About
                <img src={assets.info_icon} alt="" className="w-4 h-4" />
              </p>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-6 text-gray-700 font-medium">
              Appointment fee:{' '}
              <span className="font-bold text-green-700">
                {currencySymbol}{docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots Section */}
        <div className="max-w-3xl mx-auto mt-10">
          <p className="text-xl font-semibold text-gray-800 mb-4">Booking Slots</p>

          {/* Dates */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`cursor-pointer px-4 py-2 rounded-lg border text-center min-w-[70px] 
                  ${slotIndex === index ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  <p className="font-semibold">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p className="text-sm">{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Times */}
          <div className="flex flex-wrap gap-3 mt-6">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border text-sm 
                  ${slotTime === item.time ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="mt-8 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Book an appointment
          </button>
        </div>

        {/* Related Doctors Section */}
        <div className="max-w-6xl mx-auto mt-12">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  )
}

export default Appointment
