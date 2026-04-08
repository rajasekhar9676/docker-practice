import React,{useState} from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constants'

const FarmerRegister = () => {
const [name,setName]=useState('')
const [email,setEmail]=useState('');
const [phoneNumber,setPhoneNumber]=useState('');
const [password,setPassword]=useState('');
const [address,setAddress]=useState('');
const [cropsGrown,setCropsGrown]=useState('')
const [organicCertification,setOrganicCertification]=useState('')
const navigate=useNavigate();

const handleRegister= async(e)=>{
    e.preventDefault()
    try{
      const response=await axios.post(`${BASE_URL}/api/users/register`,{name,email,phoneNumber,password,address,cropsGrown,organicCertification, })
      console.log('User Registred succefully',response.data)
    alert('User Registred successfully')
    navigate('/farmer-login') 
    }
    catch(err){
      console.log(err)
      alert(err.message)
    }
    
  }

  return (
    <div className="min-h-screen bg-[#8fbf21] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-[#005225] mb-6">
          Farmer Registration
        </h2>
  
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Row 1: Name & Email */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              />
            </div>
          </div>
  
          {/* Row 2: Phone & Password */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Mobile Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              />
            </div>
          </div>
  
          {/* Address */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
              required
            />
          </div>
  
          {/* Crops Grown & Organic Cert */}
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="cropsGrown">Crops Grown</label>
              <input
                type="text"
                id="cropsGrown"
                value={cropsGrown}
                onChange={(e) => setCropsGrown(e.target.value)}
                placeholder="Types of crops"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              />
            </div>
  
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-1" htmlFor="organicCertification">Organic Certification</label>
              <select
                id="organicCertification"
                value={organicCertification}
                onChange={(e) => setOrganicCertification(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                required
              >
                <option value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-[#005225] hover:bg-[#003f1b] text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
  
          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <a href="/farmer-login" className="text-[#005225] font-bold hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
  
}

export default FarmerRegister

