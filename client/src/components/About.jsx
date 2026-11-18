import { useState } from "react";
import { Link } from "react-router-dom";

const pillars = [
  { title: "Straightforward booking", text: "Search by city, open a room, pick dates, and pay. Nothing sits between the listing and checkout." },
  { title: "Listed by hotel owners", text: "Owners add hotels and rooms from the dashboard. Guests see rooms that are marked available." },
  { title: "Payments you can track", text: "Stripe checkout marks a booking paid. Upcoming and past stays stay on My Bookings." },
];

const faqs = [
  { q: "How do I book a room?", a: "Open Hotels, choose a room, set check-in, check-out, and guests, then continue to Stripe. After payment you land on My Bookings." },
  { q: "Where can I see a booking I already paid for?", a: "Sign in and open My Bookings. Current and future stays are under Upcoming. Finished stays are under Past." },
  { q: "Can I list my own hotel?", a: "Yes. Use Dashboard in the navbar and register your hotel. After you are an owner you can add rooms and see bookings." },
  { q: "Which dates can I select?", a: "Check-in cannot be in the past, and check-out must be after check-in. A room already booked for those nights is marked unavailable." },
];

const About = () => {
  const [open, setOpen] = useState(0);

  return (
    <div className="bg-[#f7f6f3] px-6 pt-28 pb-20 md:px-16">
      <div className="mx-auto grid max-w-6xl items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">About QuickStay</p>
          <h1 className="mt-3 font-playfair text-5xl leading-tight text-gray-900 md:text-6xl">A calmer way to book a hotel.</h1>
        </div>
        <p className="text-base leading-relaxed text-gray-600">
          QuickStay is built for finding a room, paying for the stay, and keeping every reservation in one place — for a weekend, a family trip, or a work night.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-6xl rounded-[28px] bg-white p-8 shadow-sm">
        <h2 className="font-playfair text-3xl">What you can do here</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-gray-600 md:grid-cols-2">
          <li>Search a city on the home page and open matching hotels.</li>
          <li>Compare nightly price, photos, and amenities before you book.</li>
          <li>Pay with Stripe and find the stay under Upcoming on My Bookings.</li>
          <li>List your own hotel from the dashboard after you sign in.</li>
        </ul>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((item, index) => (
          <article key={item.title} className="rounded-3xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <p className="text-sm text-gray-400">0{index + 1}</p>
            <h2 className="mt-4 font-playfair text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-sm md:p-8">
          <h2 className="font-playfair text-4xl">Questions guests ask</h2>
          <div className="mt-6">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <button
                  key={item.q}
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  className="w-full border-t border-gray-200 py-4 text-left"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-medium">{item.q}</span>
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-100 text-gray-500">{isOpen ? "–" : "+"}</span>
                  </span>
                  {isOpen && <p className="mt-2 max-w-xl text-sm leading-relaxed text-gray-500">{item.a}</p>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-[28px] bg-gray-900 p-8 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">Next step</p>
            <h2 className="mt-3 font-playfair text-4xl">See the rooms.</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Every public room is on the Hotels page, with amenities, nightly price, and the booking form.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/rooms" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900">Browse hotels</Link>
            <Link to="/experience" className="rounded-full border border-white/20 px-6 py-3 text-sm">The experience</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
