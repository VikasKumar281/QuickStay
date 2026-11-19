import React, { useMemo, useState } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
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
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Hotels</p>
            <h1 className='mt-2 font-playfair text-4xl md:text-5xl'>Hotel rooms</h1>
            <p className='mt-3 max-w-xl text-sm text-gray-500 md:text-base'>
                {filteredRooms.length} room{filteredRooms.length === 1 ? "" : "s"}
                {searchParams.get("destination") ? ` in ${searchParams.get("destination")}` : ""}.
                {searchParams.get("checkIn") && searchParams.get("checkOut")
                  ? ` ${searchParams.get("checkIn")} to ${searchParams.get("checkOut")}.`
                  : " Open a room to choose dates."}
            </p>
          </div>

          {rooms.length > 0 && filteredRooms.length === 0 && (
            <p className='mt-10 rounded-2xl bg-white px-5 py-4 text-gray-500'>
              No rooms match these filters.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-5">
          {filteredRooms.map((room) => (
            <article key={room._id} className='grid overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-[280px_1fr]'>

                <img onClick={() => openRoom(room._id)}
                    src={room.images?.[0]} alt=''
                    className='h-56 w-full cursor-pointer object-cover md:h-full'
                />

                <div className='flex flex-col p-5'>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className='cursor-pointer font-playfair text-3xl text-gray-900' onClick={() => openRoom(room._id)}>
                          {room.hotel?.name || "Hotel"}
                      </p>
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">{room.roomType}</span>
                    </div>

                    <div className='mt-2 flex items-center gap-1 text-sm text-gray-500'>
                        <img src={assets.locationIcon} alt=''/>
                        <span>{room.hotel?.city}{room.hotel?.address ? ` · ${room.hotel.address}` : ""}</span>
                    </div>

                    <div className='mt-4 flex flex-wrap gap-2'>
                       {(room.amenities || []).map((item, index) => (
                        <div key={index} className='flex items-center gap-2 rounded-full bg-[#f7f6f3] px-3 py-1.5'>
                            {facilityIcons[item] && <img src={facilityIcons[item]} alt='' className='h-4 w-4'/>}
                            <p className='text-xs'>{item}</p>
                        </div>
                       ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-5">
                      <p className='text-xl font-medium text-gray-900'>{currency}{room.pricePerNight}<span className="text-sm font-normal text-gray-500"> / night</span></p>
                      <button type="button" onClick={() => openRoom(room._id)} className="cursor-pointer rounded-full bg-gray-900 px-5 py-2 text-sm text-white">View room</button>
                    </div>
                </div>
            </article>
          ))}
          </div>
        </div>


        {/* Filters */}
        <aside className='w-full shrink-0 rounded-3xl border border-gray-200 bg-white text-gray-600 shadow-sm lg:sticky lg:top-28 lg:w-80'>
            
            <div className={` flex items-center justify-between px-5 py-2.5 min-lg:border-b
                 border-gray-300 ${openFilters && "border-b" }`}>
                <p className='text-base font-medium text-gray-800'>Filters</p>
                <div className='text-xs cursor-pointer'>
                    
                    <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>
                        {openFilters ? 'HIDE' : 'SHOW'}
                    </span>
                    
                    <span
                      className="hidden cursor-pointer text-sm text-gray-900 underline lg:block"
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