// bookingController.js
import Stripe from "stripe";
import Booking from '../models/Booking.js';

import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from '../configs/nodemailer.js';
import { getAuth } from '../middleware/authMiddleware.js';

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
};



// Function to Check Availability of Room ----------------------------------->

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {

    const bookings = await Booking.find({
      room,
      status: { $ne: "cancelled" },
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } 
  
  catch (error) {
    console.error(error.message);
    return false;
  }

};





// API to check availibility of the room --------------------------------------------------->
// POST /api/bookings/check-availability ----------------------------------------------->
  
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};






// API to create a new booking --------------------------------------------------->
// POST /api/bookings/book --------------------------------------------------->

export const createBooking = async (req, res) => {
  try {

    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    

    // Before Booking Check Availability --------------->
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Room is not available" });
    }

    // Get totalPrice from Room
    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    const hotel = roomData.hotel?.name
      ? roomData.hotel
      : await Hotel.findById(roomData.hotel);
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    if (!nights || nights < 1) {
      return res.json({ success: false, message: "Check-out must be after check-in" });
    }

    const pricePerNight = roomData.pricePerNight;
    const totalPrice = pricePerNight * nights;

    const booking = await Booking.create({
        user,
        room,
        hotel: hotel._id.toString(),
        guests: +guests,
        checkInDate,
        checkOutDate,
        totalPrice,
    });

    transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: req.user.email,
        subject: "Hotel Booking Details",
        html: `
          <h2>Your Booking Details</h2>
          <p>Dear ${req.user.username},</p>
          <p>Thank you for your booking! Here are your details:</p>
          <ul>
             <li><strong>Booking ID:</strong> ${booking._id} </li>
             <li><strong>Hotel Name:</strong> ${hotel.name} </li>
             <li><strong>Location:</strong> ${hotel.address} </li>
             <li><strong>Date:</strong> ${booking.checkInDate.toDateString()} </li>
             <li><strong>Booking price:</strong> ${process.env.CURRENCY || '$'} ${pricePerNight} </li>
             <li><strong>Total Booking Amount:</strong> ${process.env.CURRENCY || '$'} ${booking.totalPrice} </li>
          </ul>
          <p>We look forward to welcoming you!</p>
          <p>If you need to make any changes, feel free to contact us.</p>
         `
    }).catch((mailError) => {
      console.log(mailError.message);
    });

    res.json({ success: true , message: "Booking created successfully", booking});

  } catch (error) {
    console.log(error);
    res.json({ success: false , message: error.message || "Failed to create booking"})
  }
};






// API to get all bookings for a user -------------------------------------------------------------->
//GET /api/bookings/user ------------------------------------>

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};




export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: getAuth(req).userId });

    if (!hotel) {
      return res.json({ success: false, message: "No Hotel found" });
    }

    const bookings = await Booking.find({ hotel: hotel._id.toString() }).populate("room hotel user").sort({ createdAt: -1 });

    // Total Bookings
    const totalBookings = bookings.length;

    // Total Revenue
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

    res.json({ success: true, dashboardData: { bookings, totalBookings, totalRevenue }});

  } 
  
  catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings"});
  }
};




export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.body.bookingId);
    if (!booking || booking.user !== req.user._id) {
      return res.json({ success: false, message: "Booking not found" });
    }
    if (booking.status === "cancelled") {
      return res.json({ success: false, message: "Booking is already cancelled" });
    }
    if (new Date(booking.checkInDate) < new Date(new Date().toDateString())) {
      return res.json({ success: false, message: "This stay has already started" });
    }
    booking.status = "cancelled";
    await booking.save();
    res.json({ success: true, message: booking.isPaid ? "Booking cancelled. Payment is not refunded automatically." : "Booking cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const stripePayment = async(req , res) => {
  try{
    const stripe = getStripe();
    if (!stripe) {
      return res.json({ success: false, message: "Stripe is not configured" });
    }

    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user !== req.user._id) {
      return res.json({ success: false, message: "Booking not found" });
    }
    if (booking.isPaid) {
      return res.json({ success: false, message: "Booking is already paid" });
    }

    const roomData = await Room.findById(booking.room).populate("hotel");
    const hotelName = roomData?.hotel?.name || "Hotel room";
    const origin = req.headers.origin || "https://quickstay-one-inky.vercel.app";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/my-bookings?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/my-bookings`,
      metadata: { bookingId: booking._id.toString() },
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(booking.totalPrice * 100),
          product_data: {
            name: hotelName,
            description: roomData?.roomType || "Room booking",
          },
        },
      }],
    });

    res.json({ success: true, url: session.url });
  }
  catch(error){
    res.json({ success: false, message: error.message });
  }
};

export const verifyStripePayment = async (req, res) => {
  try {
    const stripe = getStripe();
    if (!stripe) {
      return res.json({ success: false, message: "Stripe is not configured" });
    }
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    const booking = await Booking.findById(session.metadata.bookingId);
    if (!booking || booking.user !== req.user._id) {
      return res.json({ success: false, message: "Booking not found" });
    }

    const alreadyPaid = booking.isPaid;
    booking.isPaid = true;
    booking.status = "confirmed";
    booking.paymentMetod = "Stripe";
    await booking.save();

    if (!alreadyPaid && req.user.email) {
      const roomData = await Room.findById(booking.room);
      const hotel = await Hotel.findById(booking.hotel);
      const currency = process.env.CURRENCY || "$";
      transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: req.user.email,
        subject: "Your QuickStay booking is confirmed",
        html: `
          <h2>Booking confirmed</h2>
          <p>Dear ${req.user.username || "Guest"},</p>
          <p>Your payment was received. Here are your stay details:</p>
          <ul>
            <li><strong>Booking ID:</strong> ${booking._id}</li>
            <li><strong>Hotel:</strong> ${hotel?.name || "Hotel"}</li>
            <li><strong>Address:</strong> ${hotel?.address || ""}</li>
            <li><strong>Room:</strong> ${roomData?.roomType || "Room"}</li>
            <li><strong>Check-in:</strong> ${new Date(booking.checkInDate).toDateString()}</li>
            <li><strong>Check-out:</strong> ${new Date(booking.checkOutDate).toDateString()}</li>
            <li><strong>Guests:</strong> ${booking.guests}</li>
            <li><strong>Amount paid:</strong> ${currency}${booking.totalPrice}</li>
          </ul>
          <p>We look forward to welcoming you.</p>
        `,
      }).catch((mailError) => {
        console.log(mailError.message);
      });
    }

    res.json({ success: true, message: "Payment successful. A confirmation email is on its way." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};