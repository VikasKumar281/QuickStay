import React, { useMemo, useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import StarRatings from '../components/StarRatings';
import { useAppContext } from '../context/AppContext';


const CheckBox = ({ label , selected = false , onChange = () => { }}) => {

    return(
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            
            <input type='checkbox' checked = { selected } onChange = {( e ) => onChange( e.target.checked , label )}/>
            
            <span className='font-light select-none'>
                {label}
            </span>

        </label>
    );
}; 

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
      <span className="font-light select-none">{label}</span>
    </label>
  );
};





const AllRooms = () => {

  const [ searchParams , setSearchParams ] = useSearchParams()
  const { rooms , navigate , currency} = useAppContext()


  const [openFilters , setOpenFilters ] = useState(false);
  const [ selectedFilters , setSelectedFilters ] = useState({
     roomType: [],
     priceRange: [],
  })

  const [ selectedSort , setSelectedSort ] = useState('')



  const roomTypes = [

    "Single Bed",
    "Double Bed",
    "Luxury Room",
    "Family Suite" 

  ];

  const priceRanges = [

    "0 to 500",
    '500 to 1000',
    '1000 to 2000',
    '2000 to 3000',

  ]

  const sortOptions = [

    "Price Low to High",
    "Price High to Low",
    'Newest First',

  ]


  // Handle Changes for Filters and Sorting =>
  const handleFilterChange = (checked , value , type ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [type]: checked
          ? [...prevFilters[type], value]
          : prevFilters[type].filter((item) => item !== value),
      };
      return updatedFilters;
    })
  } 
  
  const handleSortChange = (sortOption ) => {
    setSelectedSort(sortOption);
  } 

  // Function to check if a room matches the selected room types =>
  const matchesRoomType = (room) => {
    return selectedFilters.roomType.length === 0 || selectedFilters.
      roomType.includes(room.roomType);
  }


  // Function to check if a room matches the selected price ranges =>
  const matchesPriceRange = (room) => {
    return selectedFilters.priceRange.length === 0 || selectedFilters.
      priceRange.some(range => {
        const [min , max ] = range.split(' to ').map(Number);
        return room.pricePerNight >=min && room.pricePerNight <= max;
   })
  }


  // Function to sort rooms based on the selected sort option =>
    const sortRooms = (a , b) => {
      if(selectedSort === 'Price Low to High'){
        return a.pricePerNight - b.pricePerNight;
      }
      if(selectedSort === 'Price High to Low'){
        return b.pricePerNight - a.pricePerNight;
      }
      if(selectedSort === 'Newest First'){
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    }

    

  // Filter Destination =>
  const filterDestination = (room) => {
    const destination = searchParams.get('destination');
    if(!destination){
      return true;
    }
    const query = destination.toLowerCase();
    const city = room.hotel?.city?.toLowerCase() || '';
    const hotelName = room.hotel?.name?.toLowerCase() || '';
    const roomType = room.roomType?.toLowerCase() || '';
    return city.includes(query) || hotelName.includes(query) || roomType.includes(query);
  } 


  //Filter and sort rooms based on the selected filters and sort option =>
 const filteredRooms = useMemo(() => {
  return rooms
    .filter(
      (room) =>
        matchesRoomType(room) &&
        matchesPriceRange(room) &&
        filterDestination(room)
    )
    .sort(sortRooms);
}, [rooms, selectedFilters, selectedSort, searchParams]);
  

  
  // Clear all filters => 
  const openRoom = (id) => {
    const query = new URLSearchParams();
    ["checkIn", "checkOut", "guests"].forEach((key) => {
      const value = searchParams.get(key);
      if (value) query.set(key, value);
    });
    const search = query.toString();
    navigate(`/rooms/${id}${search ? `?${search}` : ""}`);
    scrollTo(0, 0);
  };

  const clearFilters = () => {
    setSelectedFilters({
      roomType: [],
      priceRange: [],
    });
    setSelectedSort('');
    setSearchParams({});
  }  

  return (
    <div className='flex flex-col-reverse items-start gap-10 bg-[#f7f6f3] px-4 pt-28 pb-16 md:px-16 md:pt-35 lg:flex-row lg:gap-16 lg:px-24 xl:px-32'>
        
        
        <div className="min-w-0 flex-1">
          <div>
            <h1 className='font-playfair text-4xl md:text-[40px]'>
                Hotel Rooms
            </h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                {filteredRooms.length} room{filteredRooms.length === 1 ? "" : "s"} available
                {searchParams.get("destination") ? ` for “${searchParams.get("destination")}”` : ""}. Filter by type or price, then open a room to check dates.
            </p>
          </div>

          {rooms.length > 0 && filteredRooms.length === 0 && (
            <p className='text-gray-500 mt-10'>
              No rooms found{searchParams.get('destination') ? ` for ${searchParams.get('destination')}` : ''}.
            </p>
          )}

          {filteredRooms.map((room) => (
            <div key={room._id} className='mt-6 flex flex-col md:flex-row items-start gap-6 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg'>

                <img onClick={() => openRoom(room._id)} 
                    src={room.images[0]} alt='hotel-img' title='View Room Details'
                    className='h-56 w-full md:w-1/2 rounded-2xl object-cover cursor-pointer transition duration-500 hover:scale-[1.02]'
                /> 

                <div className='md:w-1/2 flex flex-col gap-2'>
                    
                    <p className='text-gray-500'>
                        {room.hotel.city}
                    </p>

                    <p className='text-gray-800 text-3xl font-playfair cursor-pointer'
                       onClick={() => openRoom(room._id)}
                    >
                        {room.hotel.name}
                    </p>

                    <div className='flex items-center'>
                        <StarRatings />
                        <p className='ml-2'>
                            200+ reviews
                        </p>
                    </div>

                    <div className='mt-2 flex items-center gap-1 text-sm text-gray-500'>
                        <img src={assets.locationIcon} alt='location-icon'/>
                        <span>
                            {room.hotel.address}
                        </span>
                    </div>

                    {/* Room Amenities */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                       {room.amenities.map((item , index) => (
                        <div key ={ index } className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                            <img src={facilityIcons[item]} alt={item} 
                              className='w-5 h-5'/>

                            <p className='text-xs'>
                               {item}     
                            </p>

                        </div>
                       ))}
                    </div>

                    {/* Room Price Per Night */}
                    <p className='text-xl font-medium text-gray-700'>
                        {currency}{room.pricePerNight} /night
                    </p>

                </div>

            </div>    
          ))}
        </div>


        {/* Filters */}
        <aside className='w-full shrink-0 rounded-3xl border border-gray-200 bg-white text-gray-600 shadow-sm lg:sticky lg:top-28 lg:w-80'>
            
            <div className={` flex items-center justify-between px-5 py-2.5 min-lg:border-b
                 border-gray-300 ${openFilters && "border-b" }`}>
                <p className='text-base font-medium text-gray-800'>FILTERS</p>
                <div className='text-xs cursor-pointer'>
                    
                    <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                        {openFilters ? 'HIDE' : 'SHOW'}
                    </span>
                    
                    <span
                      className="hidden lg:block cursor-pointer text-blue-600 hover:underline"
                      onClick={clearFilters}
                    >
                      CLEAR
                    </span>

                </div>
            </div>

            <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden 
                transition-all duration-700 `}>
               
               <div className='px-5 pt-5'>
                  
                  <p className='font-medium text-gray-800 pb-2'>
                    Popular Filters
                  </p>

                  {roomTypes.map((room, index) => (
                    <CheckBox
                      key={index}
                      label={room}
                      selected={selectedFilters.roomType.includes(room)}
                      onChange={(checked) => handleFilterChange(checked , room , 'roomType')}
                    />
                  ))}


               </div>

                <div className='px-5 pt-5'>
                  
                  <p className='font-medium text-gray-800 pb-2'>
                    Price Range
                  </p>

                  {priceRanges.map((range, index) => (
                    <CheckBox
                      key={index}
                      label={`${currency} ${range}`}
                      selected={selectedFilters.priceRange.includes(range)}
                      onChange={(checked) => handleFilterChange(checked , range , 'priceRange')}/>
                  ))}


                </div>

                <div className="px-5 pt-5 pb-7">
                   <p className="font-medium text-gray-800 pb-2">Sort By</p>
                   {sortOptions.map((option, index) => (
                     <RadioButton
                       key={index}
                       label={option}
                       selected={selectedSort === option}
                       onChange={() => handleSortChange(option)}
                     />
                    ))}
                </div>


            </div>

        </aside>


    </div>
  )
};

export default AllRooms;