import React from 'react'
import { useNavigate } from 'react-router-dom'
import Title from './Title'
import { assets, exclusiveOffers } from '../assets/assets'

const ExclusiveOffers = () => {
  const navigate = useNavigate();
  const openRooms = () => {
    navigate('/rooms');
    scrollTo(0, 0);
  };
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30">
        <div className='flex flex-col md:flex-row items-center justify-between w-full'>
            <Title align="left" title="Exclusive Offers" subTitle="Take advatage of our limited-time offers and special packages to enhance your stay and
              create unforgettable memories"
            />

            <button onClick={openRooms} className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
               View all Offers
               <img src={assets.arrowIcon} alt='arrow-icon'
                 className='group-hover:translate-x-1 transition-all'  
               />
            </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
           {exclusiveOffers.map((item) => (
            <div key ={item._id} onClick={openRooms} className='group relative flex min-h-72 cursor-pointer flex-col items-start justify-between
              gap-1 pt-12 md:pt-18 px-4 rounded-2xl text-white bg-no-repeat bg-cover bg-center overflow-hidden shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl'style ={{backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.55)), url(${item.image})`}} >
               
               <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded full'>
                 {item.priceOff}% OFF
               </p>

               <div>
                  <p className='text-2xl font-medium font-playfair'>{item.title}</p>
                  <p>{item.description}</p>
                  <p className='text-xs text-white/70 mt-3'>Expires {item.expiryDate}</p>
               </div>

                <button className='mb-5 invert group-hover:translate-x-1 transition-all'>
                   View Offers 
                   <img 
                     className='invert group-hover:translate-x-1 transition-all'
                     src= {assets.arrowIcon} alt="arrow-icon" />
               </button>

            </div>    
           ) )}  
        </div>

    </div>
  )
}

export default ExclusiveOffers