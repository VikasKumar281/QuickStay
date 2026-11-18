import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const topics = ["Booking help", "Payment", "List a hotel", "Something else"];

const Contact = () => {
  const { axios, user } = useAppContext();
  const [form, setForm] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    subject: "Booking help",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const onChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    try {
      const { data } = await axios.post("/api/contact", form);
      if (data.success) {
        toast.success(data.message);
        setForm((current) => ({ ...current, message: "" }));
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
    <div className="bg-[#f7f6f3] px-6 pt-28 pb-20 md:px-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Contact</p>
          <h1 className="mt-3 font-playfair text-5xl leading-tight">Tell us what you need.</h1>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            Questions about a reservation, a payment, or listing your hotel land here. Your message is saved so we can reply to the email you enter.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-gray-400">Email</p>
              <p className="mt-1 font-medium">vikaskumar280204@gmail.com</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-gray-400">Hours</p>
              <p className="mt-1 font-medium">Every day, 9:00 to 21:00 IST</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-gray-400">For bookings</p>
              <p className="mt-1 font-medium">Include your check-in date and hotel name.</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <p className="text-gray-400">Also see</p>
              <p className="mt-2 flex flex-wrap gap-3 text-sm font-medium">
                <Link to="/rooms" className="underline">Hotels</Link>
                <Link to="/experience" className="underline">Experience</Link>
                <Link to="/about" className="underline">About</Link>
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-[28px] bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm text-gray-500">
              Name
              <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 outline-none" />
            </label>
            <label className="text-sm text-gray-500">
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} required className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 outline-none" />
            </label>
          </div>
          <label className="mt-4 block text-sm text-gray-500">
            Topic
            <select name="subject" value={form.subject} onChange={onChange} className="mt-1 w-full cursor-pointer rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 outline-none">
              {topics.map((topic) => <option key={topic}>{topic}</option>)}
            </select>
          </label>
          <label className="mt-4 block text-sm text-gray-500">
            Message
            <textarea name="message" value={form.message} onChange={onChange} required minLength={10} rows={6} placeholder="How can we help?" className="mt-1 w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-gray-900 outline-none" />
          </label>
          <button disabled={sending} className="mt-6 cursor-pointer rounded-full bg-gray-900 px-6 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-60">
            {sending ? "Saving..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
