import React, { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import {useHistory} from 'react-router-dom' ;
import {BASE_URL} from '../constants'
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate(); 
  const {  fetchUser } = useAuth();
  
// const history=useHistory()

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${BASE_URL}/api/users/login`, { email, password });
    
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
    await fetchUser(); 
    console.log(response.data);
    alert('User Login Successfully');
    navigate('/farmer-dashboard'); 
  } catch (err) {
    console.error('Error:', err.message);
    alert(err.message);
  }
};


return (
  <div className="min-h-screen bg-[#8fbf21] flex items-center justify-center px-4 pt-20 ">
  
    <div className="w-full max-w-sm bg-white bg-opacity-95 rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl text-center font-bold text-[#005225] mb-6">Farmer Login</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
            Email
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005225]"
            id="username"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#005225]"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#005225] hover:bg-[#003f1b] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005225]"
          >
            Sign In
          </button>
          <a
            className="text-sm text-[#005225] font-bold hover:underline"
            href="/farmer-register"
          >
            Register
          </a>
        </div>
      </form>

      <p className="text-center text-gray-500 text-xs mt-6">
        &copy; {new Date().getFullYear()} Raithe Raju. All rights reserved.
      </p>
    </div>
  </div>
);

}

export default Login




























