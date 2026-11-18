import React, { useState } from 'react';
import { assets, cities } from "../assets/assets"
import { useAppContext } from '../context/AppContext';


const Hero = () => {
  
  const {navigate , getToken , axios , setSearchedCities, user, rooms} = useAppContext();  
  const [ destination , setDestination] = useState("");
  const destinationOptions = [...new Set(rooms.map((room) => room.hotel?.city).filter(Boolean))];  


  const onSearch = async (e) => {
    e.preventDefault();
    navigate(`/rooms?destination=${destination}`)
    if (!user) return;
    try {
      await axios.post('/api/user/store-recent-search', {recentSearchedCity:
          destination} , { headers: {Authorization: `Bearer ${await getToken()}`}});

      setSearchedCities((prevSearchedCities) => {
          const updatedSearchedCities = [...prevSearchedCities, destination];
          if(updatedSearchedCities.length > 3){
              updatedSearchedCities.shift();
          }
          return updatedSearchedCities;
      })
    } catch (error) {
      // Destination search already navigated; saving the recent city is optional.
    }
  }

  return (
    <div className='relative flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white
      bg-[url("/src/assets/Home.jpg")] bg-no-repeat bg-cover bg-center h-screen before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/70 before:to-black/20'>
        
        <p className='relative z-10 bg-white/15 backdrop-blur px-3.5 py-1 rounded-full mt-20 text-sm'>The Ultimate Hotel Experience</p>
        <h1 className='relative z-10 font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
        
        <p className='relative z-10 max-w-130 mt-2 text-sm md:text-base'>Unparalleled luxury and comfort await at the world's most exclusive hotels 
            and resorts. Start your journey today.
        </p>


        <form onSubmit={onSearch} className='relative z-10 bg-white text-gray-500 rounded-2xl px-6 py-4 mt-6 shadow-xl flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-2'>
                    
                    <img src={assets.calenderIcon} alt ='' className='h-4'/>

                    <label htmlFor="destinationInput">Destination</label>
                </div>

                <input onChange={e => setDestination(e.target.value)} value={destination}
                    list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 cursor-pointer
                    px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required 
                />

                <datalist id ='destinations' >
                   {(destinationOptions.length ? destinationOptions : cities).map((city,index) => (
                    <option value = {city} key ={index} />
                   ))}    
                </datalist> 
            </div>


            <div>
                <div className='flex items-center gap-2'>
                    
                    <img src={assets.calenderIcon} alt ='' className='h-4'/>  

                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" cursor-pointer rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                  
                    <img src={assets.calenderIcon} alt ='' className='h-4'/>  

                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" cursor-pointer rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center hover:bg-green-900 justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                
                <img src={assets.searchIcon} alt ='searchIcon' className='h-7'/>  
  
                <span>Search</span>

            </button>
        </form>

    </div>
  )
}

export default Hero;