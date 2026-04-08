import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const RequirementDetails = () => {
  const { id } = useParams();
  const [requirement, setRequirement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/reqi/getRequirementWithBuyer/${id}`);
        setRequirement(res.data);
      } catch (error) {
        console.error('Error fetching requirement:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequirement();
  }, [id]);

  if (loading)
    return <div className="text-center py-20 text-xl text-green-600 mt-10">Loading requirement details...</div>;
  if (!requirement)
    return <div className="text-center py-20 text-xl text-red-500">Requirement not found</div>;

  const { product, quantity, notes, buyerId } = requirement;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="bg-white shadow-2xl rounded-2xl p-10 space-y-10 border border-gray-200">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-800 mb-2">🛒 Requirement Details</h1>
          <p className="text-gray-500">Get a detailed overview of this buyer's needs</p>
        </div>

        {/* Requirement Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
          <div>
            <p><span className="font-semibold text-gray-900">Product:</span> {product}</p>
          </div>
          <div>
            <p><span className="font-semibold text-gray-900">Quantity:</span> {quantity}</p>
          </div>
          <div className="sm:col-span-2">
            <p><span className="font-semibold text-gray-900">Notes:</span> {notes || 'No additional notes'}</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Buyer Information */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">👤 Buyer Information</h2>

          {buyerId ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700 text-lg">
              <p><strong>Name:</strong> {buyerId.name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${buyerId.email}`} className="text-blue-600 hover:underline">{buyerId.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${buyerId.phoneNumber}`} className="text-blue-600 hover:underline">{buyerId.phoneNumber}</a></p>
              <p><strong>Address:</strong> {buyerId.address}</p>
              <p><strong>Business Type:</strong> {buyerId.businessType?.join(', ') || 'N/A'}</p>
              <p><strong>Preferred Products:</strong> {buyerId.preferredProducts?.join(', ') || 'N/A'}</p>
            </div>
          ) : (
            <p className="text-red-500">Buyer details not available.</p>
          )}

          {/* Contact Button */}
          {buyerId && (
            <div className="mt-8 text-center">
              <a
                href={`tel:${buyerId.phoneNumber}`}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg shadow-md transition"
              >
                📞 Contact Buyer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequirementDetails;
