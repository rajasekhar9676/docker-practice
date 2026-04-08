import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const BuyerDetailsPage = () => {
  const { requirementId } = useParams();
  const [buyer, setBuyer] = useState(null);

const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/reqi/getRequirementWithBuyer/${requirementId}`);
        setBuyer(response.data);
      } catch (error) {
        console.error('Error fetching buyer:', error.message);
        setError('Buyer details not found or requirement is invalid.');
      }
    };

    fetchBuyerDetails();
  }, [requirementId]);

  if (error) return <div className="text-center p-6 text-red-600">{error}</div>;
  if (!buyer) return <div className="text-center p-6 text-gray-600">Loading buyer details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 pt-20">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Buyer Details</h2>
        <div className="space-y-4 text-gray-800 text-lg">
          <p><span className="font-semibold">Name:</span> {buyer.name}</p>
          <p><span className="font-semibold">Email:</span> {buyer.email}</p>
          <p><span className="font-semibold">Phone:</span> {buyer.phoneNumber}</p>
          <p><span className="font-semibold">Address:</span> {buyer.address}</p>
       <p>
  <span className="font-semibold">Business Type:</span>{' '}
  {Array.isArray(buyer?.businessType)
    ? buyer.businessType.join(', ')
    : typeof buyer?.businessType === 'string'
    ? buyer.businessType
    : 'N/A'}
</p>
<p>
  <span className="font-semibold">Preferred Products:</span>{' '}
  {Array.isArray(buyer?.preferredProducts)
    ? buyer.preferredProducts.join(', ')
    : typeof buyer?.preferredProducts === 'string'
    ? buyer.preferredProducts
    : 'N/A'}
</p>


        </div>
        <div className="mt-6 text-center">
          <a href={`tel:${buyer.phoneNumber}`} className="bg-[#8fbf21] text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Call Buyer
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuyerDetailsPage;
