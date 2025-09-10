import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const{backendUrl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const navigate=useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try{
         if(state==='Sign Up'){
          const{data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else{
             toast.error(data.message)
          }
        }

        else{
            const{data}=await axios.post(backendUrl+'/api/user/login',{password,email})
          if(data.success){
            localStorage.setItem('token',data.token)
            setToken(data.token)
          }
          else{
             toast.error(data.message)
          }
        }

    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
     if(token){
       navigate('/')
     }
  },[token])

  return (

    <form 
      onSubmit={onSubmitHandler} 
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <p className="text-2xl font-bold text-center text-gray-800 mb-2">
          {state === 'Sign Up' ? "Register" : "Login"}
        </p>
        <p className="text-gray-600 text-center mb-6">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Full name</p>
            <input 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your full name"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-1">Password</p>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        {state === 'Sign Up' ? (
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account? 
            <span 
              onClick={() => setState('Login')} 
              className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm text-gray-600 mt-4">
            Create a new account? 
            <span 
              onClick={() => setState('Sign Up')} 
              className="text-indigo-600 font-medium cursor-pointer hover:underline ml-1"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
