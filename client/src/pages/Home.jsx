import React from 'react'
import Hero from '../components/Hero';
import FeatureDestination from '../components/FeatureDestination';
import ExclusiveOffers from '../components/ExclusiveOffers';
import Testimonial from '../components/Testimonial';
import Newsletter from '../components/Newsletter';
import RecommendedHotels from '../components/RecommendedHotel';

const Home = () => {
  return (
    <>
        <Hero/>
        <RecommendedHotels />
        <FeatureDestination />
        <ExclusiveOffers />
        <Testimonial/>
        <Newsletter/>
    </>
  )
}

export default Home;