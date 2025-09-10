import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 md:px-16 lg:px-28 py-12 text-gray-800">

      {/* ABOUT US HEADING */}
      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl font-bold">
          ABOUT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* IMAGE + CONTENT SECTION */}
      <div className="flex flex-col lg:flex-row items-center gap-10 mb-16">
        <img 
          src={assets.about_image} 
          alt="About us" 
          className="w-full lg:w-1/2 rounded-2xl shadow-lg"
        />

        <div className="lg:w-1/2 space-y-6">
          <p className="text-lg leading-relaxed">
            Welcome to our website, your trusted partner in making healthcare more 
            accessible and convenient. We believe that finding the right doctor should 
            be simple, transparent, and stress-free.
          </p>
          <p className="text-lg leading-relaxed">
            Access doctors from multiple fields of expertise.
          </p>
          <b className="block text-xl font-semibold text-gray-900">Our Mission</b>
          <p className="text-lg leading-relaxed">
            Our mission is to bridge the gap between patients and healthcare providers 
            by offering a seamless, reliable, and user-friendly platform for booking doctor appointments.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US HEADING */}
      <div className="text-center mb-12">
        <p className="text-3xl md:text-4xl font-bold">
          WHY <span className="text-blue-600">CHOOSE US</span>
        </p>
      </div>

      {/* FEATURES SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">

        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <b className="block text-xl font-semibold mb-3 text-blue-600">Efficiency</b>
          <p className="text-gray-700">
            At our doctor booking platform, we believe that healthcare should 
            be accessible, reliable, and efficient.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <b className="block text-xl font-semibold mb-3 text-blue-600">Convenience</b>
          <p className="text-gray-700">
            Our platform is designed with your convenience in mind. From searching 
            for the right doctor to booking an appointment at your preferred time, 
            everything is just a few taps away.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-md bg-white hover:shadow-xl transition">
          <b className="block text-xl font-semibold mb-3 text-blue-600">Personalization</b>
          <p className="text-gray-700">
            We understand that every patient is unique, and so are their healthcare 
            needs. That’s why we focus on delivering a personalized experience 
            tailored just for you.
          </p>
        </div>

      </div>

    </div>
  )
}

export default About
