import React from 'react'
import Hero from '../components/Hero';
import FeatureDestination from '../components/FeatureDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import RecommendedHotels from '../components/RecommendedHotel';

const Home = () => {
  return (
    <div className="bg-[#f7f6f3]">
        <Hero/>
        <RecommendedHotels />
        <FeatureDestination />
        <ExclusiveOffers />
        <Testimonial/>
        <Newsletter/>
    </div>
  )
}

export default Home;