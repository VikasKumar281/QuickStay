import { useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const Newsletter = () => {
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
    <div className="mx-4 my-24 flex max-w-5xl flex-col items-center rounded-[28px] bg-gray-900 px-4 py-12 text-white md:py-16 lg:mx-auto lg:w-full">
      <Title light title="Stay Inspired" subTitle="Join the list and we will save your email for new destinations and offers." />
      <form onSubmit={subscribe} className="mt-6 flex w-full max-w-md flex-col items-center justify-center gap-4 md:flex-row">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 outline-none" placeholder="Enter your email" />
        <button disabled={sending} className="group flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-gray-900 transition active:scale-95 disabled:opacity-60">
          {sending ? "Saving..." : "Subscribe"}
          <img src={assets.arrowIcon} alt="" className="w-3.5 transition group-hover:translate-x-1" />
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-white/50">By subscribing, you agree to the privacy note and consent to receive updates.</p>
    </div>
  );
};

export default Newsletter;
