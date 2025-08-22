import React from "react";
import { Link } from "react-router-dom";

const Experience = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-indigo-100 px-6 md:px-16 lg:px-32 py-20">
      

      <h1 className="text-5xl md:text-6xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow-md">
        🌍 The <span className="text-blue-600">QuickStay Experience</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed mb-16">
        At <span className="font-semibold text-indigo-700">QuickStay</span>, 
        we believe booking a hotel should be more than just a transaction — 
        it should be the beginning of a wonderful journey. 
        With seamless booking, verified hotels, and world-class customer support, 
        we create experiences that last a lifetime.
      </p>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
        <div className="bg-white shadow-2xl rounded-3xl p-10 hover:shadow-3xl hover:-translate-y-2 transition duration-300 border-t-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">✨ Effortless Booking</h2>
          <p className="text-gray-600 leading-relaxed">
            From search to payment, our process is smooth, intuitive, 
            and lightning fast. Spend less time booking and more time enjoying your trip.
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl p-10 hover:shadow-3xl hover:-translate-y-2 transition duration-300 border-t-4 border-blue-500">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🏨 Comfort Assured</h2>
          <p className="text-gray-600 leading-relaxed">
            Every hotel listed is verified for safety, hygiene, and quality. 
            You deserve a stay that feels like home — or better!
          </p>
        </div>

        <div className="bg-white shadow-2xl rounded-3xl p-10 hover:shadow-3xl hover:-translate-y-2 transition duration-300 border-t-4 border-green-500">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">🌟 Premium Support</h2>
          <p className="text-gray-600 leading-relaxed">
            Our 24/7 support team is always ready to assist, ensuring 
            your travel experience is smooth from start to finish.
          </p>
        </div>
      </div>


      <div className="bg-gradient-to-r from-green-600 to-gray-600 text-white rounded-3xl shadow-xl p-12 mb-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">💬 Hear From Our Guests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="italic text-lg mb-4">
              "QuickStay made my vacation hassle-free! Booking was instant, 
              and the hotel matched the description perfectly."
            </p>
            <h4 className="font-semibold text-indigo-700">— Priya Sharma</h4>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <p className="italic text-lg mb-4">
              "I booked a last-minute business trip and QuickStay helped me 
              find a reliable hotel within minutes. Highly recommended!"
            </p>
            <h4 className="font-semibold text-indigo-700">— Rohan Mehta</h4>
          </div>
        </div>
      </div>


      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Ready to Create Your Own Experience?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Explore our wide range of hotels — from cozy budget rooms to 
          luxurious suites. Your next unforgettable stay is just a click away.
        </p>
        <Link
          to="/rooms"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-lg shadow-md hover:shadow-2xl transform hover:scale-110 transition duration-300"
        >
          Discover Rooms →
        </Link>
      </div>
    </div>
  );
};

export default Experience;
