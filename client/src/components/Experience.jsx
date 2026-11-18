import { Link } from "react-router-dom";
import StarRatings from "./StarRatings";
import { testimonials } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const steps = [
  { title: "Search a stay", text: "Pick a city, dates, and guests. Results come from hotels listed on QuickStay." },
  { title: "Choose a room", text: "Compare price, amenities, and photos, then check that the dates are free." },
  { title: "Pay with Stripe", text: "Confirm the booking and pay securely. The stay shows up under My Bookings." },
];

const Experience = () => {
  const { rooms, currency } = useAppContext();
  const cities = new Set(rooms.map((room) => room.hotel?.city).filter(Boolean));
  const lowest = rooms.reduce((min, room) => Math.min(min, room.pricePerNight || min), rooms[0]?.pricePerNight || 0);
  const cover = rooms.find((room) => room.images?.[0])?.images?.[0];

  return (
    <div className="bg-[#f7f6f3] pt-20">
      <section className="relative mx-4 overflow-hidden rounded-[28px] md:mx-10 lg:mx-16">
        <div
          className="flex min-h-[420px] flex-col justify-end bg-gray-900 bg-cover bg-center px-6 py-12 text-white md:px-14"
          style={cover ? { backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.72)), url(${cover})` } : undefined}
        >
          <p className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs tracking-wide backdrop-blur">The QuickStay Experience</p>
          <h1 className="mt-4 max-w-2xl font-playfair text-4xl leading-tight md:text-6xl">Stays that are easy to find and simple to book.</h1>
          <p className="mt-3 max-w-xl text-sm text-white/80 md:text-base">Search the same hotels shown on the home page, compare the nightly price, check the dates, and pay with Stripe. Past stays stay on My Bookings after checkout.</p>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 grid max-w-5xl grid-cols-2 gap-3 px-6 md:grid-cols-4 md:px-0">
        {[
          [rooms.length || "—", "Rooms listed"],
          [cities.size || "—", "Cities"],
          [lowest ? `${currency}${lowest}` : "—", "From / night"],
          ["Stripe", "Secure checkout"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border border-black/5 bg-white px-5 py-6 shadow-sm">
            <p className="font-playfair text-3xl text-gray-900">{value}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-6 pt-16 md:grid-cols-2 md:px-10">
        {[
          ["Verified listings", "Each room is added by a hotel owner, with photos, nightly price, and amenities you can compare before you book."],
          ["Dates that stay honest", "Check-in cannot be in the past. If those nights are already reserved, the room is marked unavailable."],
          ["Payment you can see", "Stripe confirms the charge, then My Bookings splits the stay into Upcoming and Past."],
          ["Help when you need it", "Use the Contact page for a booking, a payment, or to list your own hotel. Messages are saved for a reply."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-3xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="font-playfair text-2xl">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">How it works</p>
        <h2 className="mt-2 font-playfair text-4xl">Three steps, then you are booked.</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gray-900 text-sm text-white">0{index + 1}</span>
              <h3 className="mt-5 font-playfair text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-8 md:px-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Guests</p>
        <h2 className="mt-2 font-playfair text-4xl">Notes from recent travellers</h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.id} className="rounded-3xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <StarRatings />
              <p className="mt-4 text-sm leading-relaxed text-gray-700">"{item.review}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={item.image} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.address}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-16 mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-gray-900 px-8 py-10 text-white md:mx-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-playfair text-4xl">Find your next room.</h2>
          <p className="mt-2 max-w-lg text-sm text-white/70">Open the full list, compare nightly prices, and finish checkout on the room page.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/rooms" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900">Browse hotels</Link>
          <Link to="/contact" className="rounded-full border border-white/20 px-6 py-3 text-sm">Contact us</Link>
        </div>
      </section>
    </div>
  );
};

export default Experience;
