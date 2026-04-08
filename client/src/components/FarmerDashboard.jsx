import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

const FarmerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    quantityUnit: '',
    negotiable: false,
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/products/getFarmerProducts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      if (editMode) {
        await axios.put(`${BASE_URL}/api/products/updateProduct/${currentProductId}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Product updated successfully');
      } else {
        await axios.post(`${BASE_URL}/api/products/addProduct`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Product added successfully');
      }
      fetchProducts();
      setEditMode(false);
      setIsFormVisible(false);
      setFormData({ name: '', price: '', quantity: '', quantityUnit: '', negotiable: false, image: null });
    } catch (error) {
      console.error('Error submitting product:', error.message);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      quantityUnit: product.quantityUnit || '',
      negotiable: product.negotiable,
      image: null,
    });
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/products/deleteProduct/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-[#8fbf21] text-white p-6">
        <h2 className="text-xl font-bold mb-6">Farmer Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <a href="#products" className="block py-2 px-4 rounded hover:bg-green-600">
              Manage Products
            </a>
          </li>
          <li>
            <a href="#profile" className="block py-2 px-4 rounded hover:bg-green-600">
              Profile
            </a>
          </li>
          <li>
            <button
              className="w-full text-left block py-2 px-4 rounded hover:bg-green-600"
              onClick={() => {
                setIsFormVisible(true);
                setEditMode(false);
                setFormData({ name: '', price: '', quantity: '', quantityUnit: '', negotiable: false, image: null });
              }}
            >
              Add Product
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Products Table */}
        <section id="products" className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <table className="w-full border-collapse bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Negotiable</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">Rs. {product.price}</td>
                  <td className="border px-4 py-2">{product.quantity} {product.quantityUnit}</td>
                  <td className="border px-4 py-2">{product.negotiable ? 'Yes' : 'No'}</td>
                  <td className="border px-4 py-2 space-x-4">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Add/Edit Form */}
        {isFormVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setIsFormVisible(false)}
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="p-2 border rounded col-span-2"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                  />
                  <select
                    name="quantityUnit"
                    value={formData.quantityUnit}
                    onChange={handleInputChange}
                    className="p-2 border rounded"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="kg">Kg</option>
                    <option value="quintal">Quintal</option>
                    <option value="ton">Ton</option>
                  </select>
                  <label className="col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      name="negotiable"
                      checked={formData.negotiable}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Negotiable
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="p-2 border rounded col-span-2"
                  />
                </div>
                <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded">
                  {editMode ? 'Update Product' : 'Add Product'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;


