import { createContext } from "react";

import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'
export const AppContext=createContext()

const AppContextprovider=(props)=>{
     const currencySymbol='$'
     const backendUrl=import.meta.env.VITE_BACKEND_URL
    const[doctors,setDoctors]=useState([])
     const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
     
      const [userData, setUserData] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "Male",
    dob: ""
  });


    const getDoctorData=async()=>{
        try{
           const{data}=await axios.get(backendUrl+'/api/doctor/list')
          if(data.success){
               setDoctors(data.doctors)
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

    const loadUserProfileData=async()=>{
        try{
         const {data}=await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
           if(data.success){  
         setUserData(data.userData)
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

    const value={
        doctors,getDoctorData,currencySymbol
        ,token,setToken,backendUrl
        ,userData,setUserData
        ,loadUserProfileData
    }


    useEffect(()=>{
        getDoctorData()
    },[])

    useEffect(()=>{
       if(token){
        loadUserProfileData()
       }
       else{
        setUserData(false)
       }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextprovider