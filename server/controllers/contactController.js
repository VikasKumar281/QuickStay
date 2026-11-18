import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim();
    const subject = String(req.body.subject || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !subject || !message) {
      return res.json({ success: false, message: "Please fill in every field" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (message.length < 10) {
      return res.json({ success: false, message: "Message should be at least 10 characters" });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.json({ success: true, message: "Message saved. We will reply by email.", contact });
  } catch (error) {
    res.json({ success: false, message: error.message || "Could not save your message" });
  }
};
