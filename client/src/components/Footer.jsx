import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const explore = [
  ["Hotels", "/rooms"],
  ["Experience", "/experience"],
  ["About", "/about"],
  ["Contact Us", "/contact"],
];

const Footer = () => {
  const { axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const subscribe = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post("/api/subscribe", { email });
      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="mt-16 bg-gray-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.3fr_0.7fr_1fr] md:px-10">
        <div>
          <img src={assets.logo} alt="QuickStay" className="mb-5 h-9 transition duration-300 hover:-translate-y-1 hover:scale-105" />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            Find a room, check the dates, and pay on QuickStay. Upcoming and past stays stay on My Bookings.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {[
              [assets.instagramIcon, "https://www.instagram.com/vikas_ish?gwpx=czRzM29xMGkwNzN1", "Instagram"],
              [assets.twitterIcon, "https://x.com/Vikaskumar281", "X"],
              [assets.linkendinIcon, "https://www.linkedin.com/in/vikaskumar-fullstack/", "LinkedIn"],
            ].map(([icon, href, label]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="group grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <img src={icon} alt="" className="w-5 invert transition duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Explore</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {explore.map(([label, path]) => (
              <li key={path}>
                <Link to={path} className="text-white/80 transition hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Stay updated</p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">Save your email for new stays and offers.</p>
          <form onSubmit={subscribe} className="mt-4 flex">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-l-full bg-white/10 px-4 text-sm text-white outline-none placeholder:text-white/40"
              placeholder="Your email"
            />
            <button disabled={sending} className="h-11 cursor-pointer rounded-r-full bg-white px-5 text-sm font-medium text-gray-900 disabled:opacity-60">
              {sending ? "..." : "Join"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-white/50 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} QuickStay. All rights reserved.</p>
          <ul className="flex items-center gap-5">
            <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
            <li><Link to="/sitemap" className="hover:text-white">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
