import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BASE_URL = `https://farming-jl2u.onrender.com/api`; 
// const BASE_URL='http://localhost:5000/api' ;

const BuyerDashboard = () => {
  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    notes: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentRequirementId, setCurrentRequirementId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reqi/getBuyerRequirements`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('buyerToken')}` },
      });
      setRequirements(response.data);
    } catch (error) {
      console.error('Error fetching requirements:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/reqi/update/${currentRequirementId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('buyerToken')}` },
        });
        alert('Requirement updated successfully');
      } else {
        await axios.post(`${BASE_URL}/reqi/create`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('buyerToken')}` },
        });
        alert('Requirement added successfully');
      }

      fetchRequirements();
      setEditMode(false);
      setIsFormVisible(false);
      setFormData({ product: '', quantity: '', notes: '' });
    } catch (error) {
      console.error('Error submitting requirement:', error.message);
    }
  };

  const handleEdit = (requirement) => {
    setEditMode(true);
    setCurrentRequirementId(requirement._id);
    setFormData({
      product: requirement.product,
      quantity: requirement.quantity,
      notes: requirement.notes || '',
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/reqi/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('buyerToken')}` },
      });
      alert('Requirement deleted successfully');
      fetchRequirements();
    } catch (error) {
      console.error('Error deleting requirement:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8fbf21] text-white p-6">
        <h2 className="text-xl font-bold mb-6">Buyer Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#requirements" className="block py-2 px-4 rounded hover:bg-blue-600">
              Manage Requirements
            </a>
          </li>
          <li>
            <a href="#profile" className="block py-2 px-4 rounded hover:bg-blue-600">
              Profile
            </a>
          </li>
          <li>
            <button
              className="w-full text-left block py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => {
                setIsFormVisible(true);
                setEditMode(false);
                setFormData({ product: '', quantity: '', notes: '' });
              }}
            >
              Add Requirement
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <section id="requirements" className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Requirements</h2>
          <table className="w-full border-collapse bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Notes</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req) => (
                <tr key={req._id}>
                  <td className="border px-4 py-2">{req.product}</td>
                  <td className="border px-4 py-2">{req.quantity}</td>
                  <td className="border px-4 py-2">{req.notes}</td>
                  <td className="border px-4 py-2 space-x-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(req)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {isFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setIsFormVisible(false)}
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Requirement' : 'Add Requirement'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="product"
                    placeholder="Product"
                    value={formData.product}
                    onChange={handleInputChange}
                    className="p-2 border rounded col-span-2"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="p-2 border rounded col-span-2"
                  />
                  <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="p-2 border rounded col-span-2"
                    rows={3}
                  />
                </div>
                <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded">
                  {editMode ? 'Update Requirement' : 'Add Requirement'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;
