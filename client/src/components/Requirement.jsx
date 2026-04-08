import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BASE_URL} from '../constants'
import { useNavigate } from 'react-router-dom';

const Requirement = () => {
  const [requirements, setRequirements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getRequirement = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reqi/getAllRequirements`);
        setRequirements(response.data);
      } catch (err) {
        console.log('err', err.message);
        alert(err.message);
      }
    };
    getRequirement();
  }, []);

 
  return (
    <div className="bg-gray-100 min-h-screen py-8 pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Buyer Requirements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requirements.map((requirement) => (
            <div
              key={requirement._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{requirement.product}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  <span className="font-medium">Quantity:</span> {requirement.quantity}
                </p>
                <p className="text-gray-500 text-sm mb-4">{requirement.notes}</p>
               <button
  className="border border-[#005225]  hover:bg-[#005225] hover:text-white
  px-4 py-2 rounded-md text-sm transition-colors duration-300"
  onClick={() => navigate(`/requirement/${requirement._id}`)}
>
  Contact Buyer
</button>

              </div>
            </div>
         ))}
        </div>
      </div>
    </div>
  );
};

export default Requirement;
