
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from '../constants'
import { useAuth } from '../context/AuthContext';

const BuyerLogin = () => {
  const {  fetchUser } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post(`${BASE_URL}/api/buyers/login`, formData);
             const { token } = response.data;
    localStorage.setItem('buyerToken', token); 
    await fetchUser(); 
            setSuccess('Login successful!');
            console.log(response.data);
            navigate('/buyer-dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-[#8fbf21] flex items-center justify-center px-4 pt-20">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
            <h2 className="text-3xl font-bold text-center text-[#005225] mb-6">Buyer Login</h2>
      
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                  required
                />
              </div>
      
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                  required
                />
              </div>
      
              <button
                type="submit"
                className="w-full bg-[#005225] text-white py-2 rounded-lg font-semibold hover:bg-[#003f1b] transition duration-200"
              >
                Login
              </button>
            </form>
      
            <p className="mt-4 text-sm text-center text-gray-600">
              New to Raithe Raju?{' '}
              <a href="/buyer-register" className="font-bold text-[#005225] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      );
      
};

export default BuyerLogin; 

