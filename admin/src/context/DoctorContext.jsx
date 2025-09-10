import axios from "axios";
import { createContext,useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext=createContext()

const DoctorContextProvider=(props)=>{
  
   const backendUrl=import.meta.env.VITE_BACKEND_URL
   const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
   const[dashData,setDashData]=useState(false)
   const[appointments,setAppointments]=useState([])
   const[profileData,setProfileData]=useState(false)

   const getAllAppointments=async()=>{
     try{
       const {data}= await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}})
       if(data.success){
          setAppointments(data.appointments.reverse())
          console.log(data.appointments)
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


const completeAppointment=async(appointmentId)=>{
    try{
       const {data}=await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
       if(data.success){
        toast.success(data.message)
        getAllAppointments()
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



const cancelAppointment=async(appointmentId)=>{
    try{
       const {data}=await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
       if(data.success){
        toast.success(data.message)
        getAllAppointments()
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

const getDashData=async()=>{
  try{
    const{data}=await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})

    if(data.success){
      setDashData(data.dashData)
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

const getProfileData=async()=>{
  try{
    const{data}=await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
    if(data.success){
      setProfileData(data.profileData)
      console.log(data.profileData)
    }
  }
  catch(error){
    console.log(error)
        toast.error(error.message)
  }
}

const logoutDoctor = () => {
  localStorage.removeItem("dToken");
  setDToken("");
  setProfileData(false);
  setAppointments([]);
  setDashData(false);
};


    const value={
       dToken,setDToken,backendUrl,
       appointments,setAppointments,
       getAllAppointments,cancelAppointment
       ,completeAppointment,dashData,setDashData,
       getDashData,profileData,setProfileData,getProfileData
       ,logoutDoctor
    }
    return(
        <DoctorContext.Provider value={value}>
               {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider