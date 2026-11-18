import HotelCard from './HotelCard'
import { useAppContext } from '../context/AppContext'

const FeatureDestination = () => {
  const { rooms, navigate } = useAppContext();
  const featured = rooms.slice(0, 4);
  if (!featured.length) return null;

  const openAll = () => {
    navigate('/rooms');
    scrollTo(0, 0);
  };

  return (
    <section className="px-6 py-20 md:px-16 lg:px-24">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Featured destinations</p>
          <h2 className="mt-2 font-playfair text-4xl text-gray-900 md:text-5xl">Stays guests book first</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base">
            Four rooms from the hotels already listed on QuickStay. Open one to check dates, amenities, and the nightly price.
          </p>
        </div>
        <button onClick={openAll} className="cursor-pointer rounded-full bg-gray-900 px-6 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:bg-black">
          View all hotels
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {featured.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </section>
  );
};

export default FeatureDestination;
