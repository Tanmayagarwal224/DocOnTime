import React, { useContext } from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllAppointments from './pages/Admin/AllAppointments'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
import Login from './pages/Login'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'

const App = () => {
  const { adminToken } = useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)
  
  return adminToken || dToken ? (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      {/* Navbar fixed on top */}
      <Navbar />

      <div className="flex flex-1 pt-16">
        {/* Sidebar fixed on left */}
        <Sidebar />

        {/* Main content to the right of sidebar */}
        <div className="flex-1 ml-60 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
           
           <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
           <Route path="/doctor-appointments" element={<DoctorAppointments />} />
           <Route path='doctor-profile' element={<DoctorProfile/>}/>

          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Login/>
      <ToastContainer />
    </>
  )
}

export default App
