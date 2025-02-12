import React, { useState } from 'react'
import {useAuthStore} from '../store/UseAuthstore'
import { User, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Signin() {
  const [showpassword,setshowPassword] = useState(false);

  const [formdata,setformdata] = useState({
    email:"",
    password:""
  })

  const {signin,isSigningIn} = useAuthStore();

  const validateFormData = ()=>{
    if(!formdata.email.trim()) return toast.error("Email is required")
    const pass = formdata.password.replace(/\s+/g, "");
    if(pass.length<6) return toast.error("Password must atleast 6 characters long")
    return true
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(validateFormData()===true){
      signin(formdata); 
    }
  }
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md py-5 px-10 bg-base-200  rounded-lg shadow-xl border border-base-content/30">
        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="p-4 bg-primary/95 rounded-md">
            <User size={40} strokeWidth={2.25} className="text-primary-content" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl text-center text-base-content font-semibold mb-1">
          Sign In
        </h1>
        <p className="text-center text-base-content font-medium mb-3">
          Sign In to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-primary/90 font-semibold mb-2 " >
              Email
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow " placeholder="Email" value={formdata.email}
                onChange={(e) => {
                  setformdata({
                    ...formdata,
                    email: e.target.value
                  })
                }} />
            </label>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-primary/90 mb-2 font-semibold ">
              Password
            </label>
            <div className="relative">
              <label className="input input-bordered flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showpassword?'text':'password'}
                  className="grow pr-10"
                  placeholder="Password"
                  value={formdata.password}
                  onChange={(e)=>{
                    setformdata({
                      ...formdata,
                      password:e.target.value
                    })
                  }}
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setshowPassword(!showpassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  {showpassword ? (
                    <EyeOff size={20} className="text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye size={20} className="text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </label>
            </div>
          </div>
                    
          {/* Submit Button */}
           <button type="submit" className="btn btn-primary w-full" disabled={isSigningIn}>
            
              {isSigningIn ? (
                <>
                  <span className="loading loading-spinner text-primary"></span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
        </form>

        {/* Sign in link */}
        <p className="mt-2 text-center text-base-content">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signin
