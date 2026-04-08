import React from 'react';

const About = () => {
  return (
    <div className=" bg-gray-100 mb-20 p-8 pt-20">
      <div className="max-w-6xl mx-auto   rounded-lg p-8">
        <h1 className="text-4xl font-bold  mb-6">About Us</h1>
        <p className="text-lg  mb-6">
          We are dedicated to bridging the gap between farmers and buyers through a seamless, digital platform.
          Our goal is to empower local farmers and provide fresh, quality produce to buyers directly from the source.
        </p>
        
        <h2 className="text-3xl font-semibold  mb-4">Our Mission</h2>
        <p className="text-lg  mb-6">
          Our mission is to help farmers increase their reach and profitability by directly connecting them with buyers, ensuring fair prices and fresh produce every time.
        </p>
        
        <h2 className="text-3xl font-semibold  mb-4">Our Vision</h2>
        <p className="text-lg">
          We envision a sustainable ecosystem where technology empowers farmers, and buyers have a direct line to fresh, local produce.
        </p>
      </div>
    </div>
  );
};

export default About;
