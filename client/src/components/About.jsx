import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-32 bg-gradient-to-b from-blue-50 via-white to-blue-100 py-30">
      

      <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 text-center drop-shadow-sm">
        About <span className="text-gray-900">QuickStay</span>
      </h1>


      <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl text-center mb-10">
        Welcome to <span className="font-semibold text-blue-700">QuickStay</span> — 
        your modern hotel booking companion. We make it effortless to discover, 
        compare, and book hotels that perfectly fit your journey, whether it’s 
        a short escape, a family holiday, or a business trip.  
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">⚡ Fast & Easy</h2>
          <p className="text-gray-600">
            Book your stay in just a few clicks with our smooth, user-friendly 
            interface. Say goodbye to long forms & complicated steps.
          </p>
        </div>

        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🛎️ Trusted Hotels</h2>
          <p className="text-gray-600">
            Verified properties, honest reviews, and safe stays. We ensure your 
            booking is secure and reliable, always.
          </p>
        </div>

        <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">💰 Best Deals</h2>
          <p className="text-gray-600">
            From budget-friendly rooms to luxury resorts, enjoy unbeatable 
            offers and seasonal discounts tailored for you.
          </p>
        </div>
      </div>


      <div className="mt-16 bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-3xl shadow-lg p-10 text-center max-w-4xl">
        <h2 className="text-3xl font-bold mb-4">🛏️ Explore Our Rooms</h2>
        <p className="text-lg opacity-90 mb-6">
          Every room is designed to provide comfort, safety, and a touch of luxury. 
          Choose from cozy budget rooms, premium business suites, or family-friendly 
          spaces — all just a click away.
        </p>

        <Link
          to="/rooms"
          className="inline-block px-8 py-3 rounded-full bg-white text-blue-700 font-semibold text-lg shadow-md hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-xl duration-300"
        >
        Discover Rooms →
       </Link>
      </div>
    </div>
  );
};

export default About;
