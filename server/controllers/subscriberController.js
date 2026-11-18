import Subscriber from "../models/Subscriber.js";

export const createSubscriber = async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.json({ success: true, message: "You are already subscribed" });
    }

    await Subscriber.create({ email });
    res.json({ success: true, message: "Subscribed. We saved your email." });
  } catch (error) {
    res.json({ success: false, message: error.message || "Could not save your email" });
  }
};
