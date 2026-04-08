import React from 'react';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'John Doe',
    role: 'Farmer',
    message: 'This platform has helped me connect directly with buyers. I am able to sell my produce faster and at better prices!',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 5,
  },
  {
    name: 'Sarah Lee',
    role: 'Buyer',
    message: 'A fantastic experience! I found exactly what I was looking for and got fresh products delivered straight to my doorstep.',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    rating: 4,
  },
  {
    name: 'Mike Johnson',
    role: 'Farmer',
    message: 'I’ve been able to expand my business and reach new customers through this platform. It’s simple to use and very effective.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[#f5fdf6] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-[#005225] mb-4">What Our Users Say</h1>
        <p className="text-center text-gray-600 text-lg mb-10">
          Farmers and buyers love our platform. Here’s what a few of them have to say!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full border-4 border-[#005225] object-cover mb-4"
              />
              <h2 className="text-xl font-bold text-[#005225]">{testimonial.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{testimonial.role}</p>

              {/* Star Ratings */}
              <div className="flex justify-center mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 mr-1" />
                ))}
              </div>

              <p className="text-gray-700 italic text-sm">"{testimonial.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
