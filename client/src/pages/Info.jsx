import { useParams, Link } from "react-router-dom";

const pages = {
  privacy: {
    title: "Privacy",
    intro: "QuickStay keeps only what a booking, a message, or a newsletter signup needs.",
    points: [
      ["Account", "Your name, email, and photo come from the sign-in provider. We use them to show My Bookings and the owner dashboard."],
      ["Bookings", "Each reservation stores the room, hotel, dates, guest count, total price, and whether Stripe marked it paid."],
      ["Messages", "The contact form saves your name, email, topic, and message so a reply can be sent to that address."],
      ["Newsletter", "The email you subscribe with is stored once. Subscribing again does not create a second copy."],
    ],
  },
  terms: {
    title: "Terms",
    intro: "A stay on QuickStay is confirmed when payment succeeds. Please check the dates before you pay.",
    points: [
      ["Price", "The room page shows a nightly rate. The charge is that rate multiplied by the number of nights."],
      ["Dates", "Check-in cannot be in the past, and check-out must be later than check-in. A room already booked for those nights cannot be reserved again."],
      ["Payment", "Checkout uses Stripe. Until payment succeeds the booking stays unpaid and can still be paid from My Bookings."],
      ["Changes", "To change a confirmed stay, send the hotel name and dates from the Contact page."],
    ],
  },
  sitemap: {
    title: "Sitemap",
    intro: "Every public page on QuickStay.",
    links: [
      ["Home", "/"],
      ["Hotels", "/rooms"],
      ["Experience", "/experience"],
      ["About", "/about"],
      ["Contact Us", "/contact"],
      ["My Bookings", "/my-bookings"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
};

const Info = () => {
  const { slug } = useParams();
  const page = pages[slug];

  if (!page) {
    return (
      <div className="bg-[#f7f6f3] px-6 pt-32 pb-20 md:px-16">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-10 shadow-sm">
          <h1 className="font-playfair text-4xl">Page not found</h1>
          <Link to="/" className="mt-6 inline-block rounded-full bg-gray-900 px-5 py-2.5 text-sm text-white">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f6f3] px-6 pt-28 pb-20 md:px-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">QuickStay</p>
        <h1 className="mt-3 font-playfair text-5xl">{page.title}</h1>
        {page.intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">{page.intro}</p>}
        {page.points && (
          <div className="mt-8 space-y-4">
            {page.points.map(([title, text]) => (
              <section key={title} className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h2 className="font-playfair text-2xl">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
              </section>
            ))}
          </div>
        )}
        {page.links && (
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {page.links.map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="block rounded-2xl bg-white px-5 py-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">{label}</Link>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
};

export default Info;
