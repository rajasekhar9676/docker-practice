import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { Link } from 'react-router-dom';


const Products = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(limit || 16);
  const [loading, setLoading] = useState(false);

  const loader = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/products/getProducts`);
        setProducts(response.data);
      } catch (error) {
        console.log('error', error.message);
        alert(error.message);
      }
    };
    getProducts();
  }, []);

  const loadMore = useCallback(() => {
    if (!limit && visibleCount < products.length) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 8); // Load 8 more items per scroll
        setLoading(false);
      }, 1000); // Simulate network delay
    }
  }, [visibleCount, products.length, limit]);

  // useEffect(() => {
  //   if (limit) return; // disable infinite scroll when limit is passed (e.g. on Home page)

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMore();
  //       }
  //     },
  //     { threshold: 1 }
  //   );

  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }

  //   return () => {
  //     if (loader.current) observer.unobserve(loader.current);
  //   };
  // }, [loadMore, limit]);


  useEffect(() => {
  if (limit) return; // disable infinite scroll when limit is passed (e.g. on Home page)

  const element = loader.current; // ✅ store in a local variable

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    },
    { threshold: 1 }
  );

  if (element) {
    observer.observe(element);
  }

  return () => {
    if (element) observer.unobserve(element); // ✅ using the same element
  };
}, [loadMore, limit]);

  const displayedProducts = limit ? products.slice(0, limit) : products.slice(0, visibleCount);

  return (
    <div className="container mx-auto p-4 mb-20 pt-20">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-green-500 font-bold">Rs. {product.price}</p>
            <p className="text-gray-500">Available: {product.quantity}</p>
            
<Link to={`/product/${product._id}`}>
  <button className="bg-[#005225] text-white px-4 py-2 mt-4 rounded-md">
    Buy Now
  </button>
</Link>

          </div>
        ))}
      </div>

      {/* Loader for Infinite Scroll */}
      {!limit && (
        <div ref={loader} className="flex justify-center items-center mt-6 h-20">
          {loading && (
            <div className="text-green-500 font-medium animate-pulse">
              Loading more products...
            </div>
          )}
          
        </div>
      )}
     
    </div>
    
  );
  
};


export default Products;
