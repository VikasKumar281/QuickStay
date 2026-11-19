import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'

const MyBookings = () => {

  const { axios , getToken , user, currency} = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [bookings , setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post('/api/bookings/cancel', { bookingId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        toast.success(data.message);
        fetchUserBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const payNow = async (bookingId) => {
    try {
      const { data } = await axios.post('/api/bookings/stripe-payment', { bookingId }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserBookings = async () => {
    try{
       const { data } = await axios.get('/api/bookings/user' , {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }});
        if(data.success){
          setBookings(data.bookings)
        }
        else{
          toast.error(data.message)
        }
    }
    catch(error){
          toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      setLoading(true);
      const sessionId = searchParams.get('session_id');

      const verifyPayment = async () => {
        try {
          const { data } = await axios.post('/api/bookings/verify-stripe', { sessionId }, {
            headers: { Authorization: `Bearer ${await getToken()}` }
          });
          if (data.success) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

      await fetchUserBookings();
      setLoading(false);

      if (sessionId) {
        await verifyPayment();
        await fetchUserBookings();
        setSearchParams({}, { replace: true });
      }
    };

    load();
  }, [user]);

  return (
    <div className='bg-[#f7f6f3] py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        
        <Title title='My Bookings' subTitle='Effortlessly manage all your hotel reservations — past, present, and upcoming — from one convenient location. 
          Plan your journeys with confidence and make changes with just a few clicks' align ='left' />

        {loading && (
          <p className='mt-10 text-gray-500'>Loading your bookings...</p>
        )}

        {!loading && bookings.length === 0 && (
          <p className='mt-10 text-gray-500'>You have no bookings yet.</p>
        )}

        {!loading && ['Upcoming', 'Past'].map((section) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const list = bookings.filter((booking) => {
            const ended = new Date(booking.checkOutDate) < today;
            return section === 'Past' ? ended : !ended;
          });
          if (!list.length) return null;
          return (
            <section key={section} className='mt-10'>
              <h2 className='text-lg font-medium text-gray-800'>{section}</h2>
              <BookingList bookings={list} currency={currency} payNow={payNow} cancelBooking={cancelBooking} />
            </section>
          );
        })}
    </div>
  )
}

const BookingList = ({ bookings, currency, payNow, cancelBooking }) => (
        <div className='mt-4 flex max-w-5xl flex-col gap-5'>
          {bookings.map((booking) => {
            const nights = Math.max(1, Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 3600 * 24)));
            return (
            <article key={booking._id} className='grid grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:grid-cols-[220px_1fr_180px]'>
               <img src={booking.room?.images?.[0]} alt='' className='h-48 w-full object-cover md:h-full' />

               <div className='flex flex-col gap-2 p-5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <p className='font-playfair text-2xl'>{booking.hotel?.name || 'Hotel'}</p>
                      <span className='rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600'>{booking.room?.roomType}</span>
                    </div>
                    
                    <div className='flex items-center gap-1 text-sm text-gray-500'>
                      <img src={assets.locationIcon} alt=''/>
                      <span>{booking.hotel?.address}</span>
                    </div>

                    <div className='mt-2 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3'>
                      <div>
                        <p className='text-gray-400'>Check-in</p>
                        <p>{new Date(booking.checkInDate).toDateString()}</p>
                      </div>
                      <div>
                        <p className='text-gray-400'>Check-out</p>
                        <p>{new Date(booking.checkOutDate).toDateString()}</p>
                      </div>
                      <div>
                        <p className='text-gray-400'>Stay</p>
                        <p>{nights} night{nights > 1 ? 's' : ''} · {booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <p className='mt-1 text-sm text-gray-500'>{currency}{booking.room?.pricePerNight} / night</p>
               </div>

               <div className='flex flex-col items-start justify-between border-t border-gray-100 p-5 md:border-t-0 md:border-l'>
                 <div>
                   <p className='text-xs uppercase tracking-wide text-gray-400'>{booking.status}</p>
                   <p className='mt-1 text-xl font-medium'>{currency}{booking.totalPrice}</p>
                   <p className={`mt-2 text-sm ${booking.isPaid ? 'text-green-600' : 'text-red-500'}`}>
                     {booking.isPaid ? 'Paid' : 'Unpaid'}
                   </p>
                 </div>

                 <div className="mt-4 flex flex-wrap gap-2">
                   {!booking.isPaid && booking.status !== "cancelled" && (
                    <button onClick={() => payNow(booking._id)} className='cursor-pointer rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-green-900'>
                       Pay Now
                    </button>
                   )}
                   {booking.status !== "cancelled" && new Date(booking.checkInDate) >= new Date(new Date().toDateString()) && (
                    <button onClick={() => cancelBooking(booking._id)} className='cursor-pointer rounded-full border border-gray-300 px-5 py-2 text-sm'>
                       Cancel
                    </button>
                   )}
                 </div>
               </div>
            </article>
            );
          })}
        </div>
);

export default MyBookings;