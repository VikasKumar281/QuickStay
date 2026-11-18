import { useState } from "react";
import { useNavigate } from "react-router-dom";

const replies = [
  { test: /book|room|date|search/i, text: "Open Hotels, pick a room, set check-in and check-out, then pay with Stripe. The stay appears on My Bookings." },
  { test: /pay|stripe|card/i, text: "Payment runs on Stripe from the room page. After it succeeds, the booking is marked Paid under Upcoming." },
  { test: /cancel/i, text: "Paid stays are confirmed. Send the hotel name and dates from the Contact page if you need a change." },
  { test: /owner|list|dashboard/i, text: "Sign in and use Dashboard in the navbar to register a hotel, then add rooms from the owner sidebar." },
  { test: /contact|email|help/i, text: "The Contact page saves your name, email, topic, and message so we can reply." },
];

const HelpBot = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Ask me about booking, payment, cancellations, or listing a hotel." },
  ]);

  const answer = (question) => {
    const found = replies.find((item) => item.test.test(question));
    const textReply = found
      ? found.text
      : "I can help with booking, payment, cancellations, and listing a hotel. You can also open Contact and leave a message.";
    setMessages((current) => [
      ...current,
      { from: "you", text: question },
      { from: "bot", text: textReply },
    ]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const question = text.trim();
    if (!question) return;
    setText("");
    answer(question);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-[min(92vw,22rem)] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gray-900 px-4 py-3 text-white">
            <p className="text-sm font-medium">QuickStay help</p>
            <button type="button" onClick={() => setOpen(false)} className="cursor-pointer text-white/70">Close</button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto bg-[#f7f6f3] p-3">
            {messages.map((message, index) => (
              <p key={index} className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm ${message.from === "bot" ? "bg-white text-gray-700" : "ml-auto bg-gray-900 text-white"}`}>
                {message.text}
              </p>
            ))}
          </div>
          <div className="flex gap-2 border-t border-gray-100 px-3 py-2">
            {["Book a room", "Payment", "Contact"].map((prompt) => (
              <button key={prompt} type="button" onClick={() => answer(prompt)} className="cursor-pointer rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                {prompt}
              </button>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2 p-3">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question" className="w-full rounded-full border border-gray-200 px-3 py-2 text-sm outline-none" />
            <button className="cursor-pointer rounded-full bg-gray-900 px-3 text-sm text-white">Send</button>
          </form>
          <button type="button" onClick={() => navigate("/contact")} className="cursor-pointer pb-3 text-center text-xs text-gray-500 underline">
            Leave a message instead
          </button>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="cursor-pointer rounded-full bg-gray-900 px-5 py-3 text-sm text-white shadow-lg transition hover:-translate-y-0.5">
        Help
      </button>
    </div>
  );
};

export default HelpBot;
