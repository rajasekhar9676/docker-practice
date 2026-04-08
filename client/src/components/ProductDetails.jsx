import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../constants';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/products/getProduct/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-10 text-green-500 font-semibold">Loading product details...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product not found</div>;

  const { name, price, quantity, image, description, negotiable, farmerId } = product;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20 mt-10">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-full">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">{name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{description}</p>

          <div className="text-2xl font-semibold text-green-600">₹{price}</div>
          <div className="text-gray-500 text-sm">Available Quantity: <span className="font-medium text-black">{quantity}</span></div>
          {negotiable && (
            <div className="text-yellow-600 font-semibold">💬 Price is negotiable</div>
          )}

          <div className="border-t border-gray-200 pt-6 mt-6 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">Farmer Information</h2>
            <p><span className="font-medium text-gray-700">Name:</span> {farmerId.name}</p>
            <p><span className="font-medium text-gray-700">Phone:</span> {farmerId.phoneNumber}</p>
            <p><span className="font-medium text-gray-700">Email:</span> {farmerId.email}</p>
            <p><span className="font-medium text-gray-700">Address:</span> {farmerId.address}</p>

            <button className="bg-green-700 hover:bg-green-800 text-white font-medium px-5 py-2 rounded-lg mt-4 transition duration-300">
              Contact Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
