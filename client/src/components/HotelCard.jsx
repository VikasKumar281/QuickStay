import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const HotelCard = ({ room , index }) => {
  const { currency } = useAppContext();
  return (
    <Link to ={'/rooms/' + room._id } onClick = {() => scrollTo(0,0)} key = {room._id} 
        className='group relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white 
        text-gray-500/90 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl'
    >
       
       <img src ={room.images[0]} alt = "" className='h-52 w-full object-cover transition duration-500 group-hover:scale-105' />

       {index % 2 == 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>}
       
       <div className='flex flex-1 flex-col p-5'>
           <div className='flex items-center justify-between'>

              <p className='font-playfair text-xl font-medium text-gray-800'>
                  {room.hotel.name}
              </p>

              <div className='flex items-center gap-1'>
                <img src ={assets.starIconFilled} alt ="star-icon" /> 4.5
              </div> 
           </div>

           <div className='mt-1 flex items-center gap-1 text-sm'>
                <img src ={assets.locationIcon} alt ="location-icon" />
                <span className="line-clamp-1">{room.hotel.city}</span>
           </div>

           <div className='mt-auto flex items-center justify-between pt-5'>
              <p><span className='text-xl text-gray-800'>{currency}{room.pricePerNight}</span>/night</p>

              <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white transition-all cursor-pointer'>
                Book Now 
              </button>
           </div>
       </div>
    </Link>
  )
}

export default HotelCard