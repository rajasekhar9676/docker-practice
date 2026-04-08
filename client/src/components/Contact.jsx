import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[#8fbf21] flex items-center justify-center p-4 pt-20">
      <div className="max-w-4xl w-full bg-transparent rounded-lg p-4">
        <h1 className="text-4xl font-semibold text-white mb-3">Contact Us</h1>
        <p className="text-lg text-white mb-3">
          We're here to help! Feel free to reach out to us with any questions, comments, or feedback.
        </p>

        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-semibold text-white">Email</h2>
            <p className="text-lg text-white">
              You can reach us at: <a href="mailto:info@farmconnect.com" className="text-white">info@farmconnect.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">Phone</h2>
            <p className="text-lg text-white">
              Call us at: <a href="tel:+123456789" className="text-white">+1 234-567-890</a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">Our Location</h2>
            <p className="text-lg text-white">123 Farm Street, Green City, NatureLand</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


