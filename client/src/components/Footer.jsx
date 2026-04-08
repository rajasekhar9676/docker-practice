import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#005225] text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        {/* About / Logo */}
        <div>
          <h3 className="text-xl font-bold mb-2">RaitheRaju</h3>
          <p className="text-sm text-gray-300">
            Empowering farmers, connecting buyers — one harvest at a time.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-green-400">Home</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-green-400">Privacy Policy</Link></li>
            <li><Link to="/disclaimer" className="hover:text-green-400">Disclaimer</Link></li>
            {/* <li><Link to="/contact" className="hover:text-green-400">Contact</Link></li> */}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Contact</h4>
          <p className="text-sm text-gray-300">
  Email: <a href="mailto:info@raitheraju.co.in" className=" hover:text-blue-500">
    info@raitheraju.co.in
  </a>
</p>
          {/* <p className="text-sm text-gray-300 mt-1">Phone: +91-98765-43210</p> */}
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RaitheRaju. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

