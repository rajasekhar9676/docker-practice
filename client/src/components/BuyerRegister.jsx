// BuyerRegister.js
import React, { useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants'

const BuyerRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        address: '',
        businessType: '',
        preferredProducts: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post(`${BASE_URL}/api/buyers/register`, formData);
            setSuccess('Registration successful!');
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="min-h-screen bg-[#8fbf21] flex items-center justify-center px-4 pt-20">
          <form
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl mt-7"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold text-center text-[#005225] mb-6">
              Buyer Registration
            </h2>
      
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}
            {success && <div className="text-green-600 text-center mb-4">{success}</div>}
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                  required
                />
              </div>
      
              <div>
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
      
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                  required
                />
              </div>
      
              <div>
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
      
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                  required
                />
              </div>
      
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="businessType">
                  Business Type
                </label>
                <input
                  type="text"
                  id="businessType"
                  name="businessType"
                  placeholder="E.g., Retail, Wholesale"
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                />
              </div>
      
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="preferredProducts">
                  Preferred Products
                </label>
                <input
                  type="text"
                  id="preferredProducts"
                  name="preferredProducts"
                  placeholder="E.g., Vegetables, Fruits"
                  value={formData.preferredProducts}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#005225]"
                />
              </div>
            </div>
      
            <button
              type="submit"
              className="w-full mt-6 bg-[#005225] text-white py-2 rounded-lg font-semibold hover:bg-[#003f1b] transition duration-200"
            >
              Register
            </button>
      
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{' '}
              <a href="/buyer-login" className="text-[#005225] font-bold hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      );
      
};

export default BuyerRegister;





