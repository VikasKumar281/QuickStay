# 🏨 QuickStay

<p align="center">
  <strong>A Full-Stack Hotel Booking and Hotel Management Platform</strong>
</p>

<p align="center">
  Discover hotels, compare rooms, check availability, book your stay, and manage hotel listings — all in one place.
</p>

<p align="center">
  <a href="https://github.com/VikasKumar281/QuickStay">📂 GitHub Repository</a>
  ·
  <a href="https://github.com/VikasKumar281/QuickStay/issues">🐛 Report an Issue</a>
</p>

---

## 📑 Table of Contents

1. [🌟 Project Overview](#-1-project-overview)
2. [✨ Features](#-2-features)
3. [👥 User Roles](#-3-user-roles)
4. [🧭 Application Pages](#-4-application-pages)
5. [🔄 How QuickStay Works](#-5-how-quickstay-works)
6. [🛠️ Technology Stack](#️-6-technology-stack)
7. [🏗️ Project Architecture](#️-7-project-architecture)
8. [📁 Project Structure](#-8-project-structure)
9. [🗄️ Database Design](#️-9-database-design)
10. [🔐 Authentication and Authorization](#-10-authentication-and-authorization)
11. [🛏️ Hotel and Room Management](#️-11-hotel-and-room-management)
12. [📅 Booking and Availability Flow](#-12-booking-and-availability-flow)
13. [💳 Stripe Payment Integration](#-13-stripe-payment-integration)
14. [📧 Email Notifications](#-14-email-notifications)
15. [☁️ Cloudinary Image Uploads](#️-15-cloudinary-image-uploads)
16. [📮 Contact and Newsletter](#-16-contact-and-newsletter)
17. [🔌 API Documentation](#-17-api-documentation)
18. [⚙️ Prerequisites](#️-18-prerequisites)
19. [🚀 Local Installation — Step by Step](#-19-local-installation--step-by-step)
20. [🔑 Environment Variables](#-20-environment-variables)
21. [▶️ Run the Application](#️-21-run-the-application)
22. [🧪 Test the Main Workflows](#-22-test-the-main-workflows)
23. [☁️ Deployment](#️-23-deployment)
24. [🐳 Run the Backend with Docker](#-24-run-the-backend-with-docker)
25. [🧰 Troubleshooting](#-25-troubleshooting)
26. [🔒 Security and Important Implementation Notes](#-26-security-and-important-implementation-notes)
27. [🚧 Future Improvements](#-27-future-improvements)
28. [👨‍💻 Author](#-28-author)

---

## 🌟 1. Project Overview

**QuickStay** is a full-stack hotel booking application where customers can discover available rooms, compare room prices and facilities, check dates, create bookings, and complete payments online.

It also provides a separate dashboard for hotel owners. A signed-in user can register a hotel, add rooms, upload room images, manage room availability, and view booking information.

The application has two main parts:

- **Frontend (`client/`)** — React application that customers and hotel owners use in their browsers.
- **Backend (`server/`)** — Express API that handles authentication, hotel and room data, bookings, payment sessions, image uploads, contact messages, and newsletter subscriptions.

MongoDB stores application data. Clerk handles user authentication, Cloudinary stores uploaded room images, Stripe provides checkout, and Nodemailer sends booking confirmation emails through Brevo SMTP.

### 🎯 Main goal

Make the hotel booking process simple:

1. Search for a destination.
2. Explore available rooms.
3. Compare photos, facilities, and nightly prices.
4. Select check-in and check-out dates.
5. Check room availability.
6. Create a booking.
7. Pay through Stripe.
8. View the reservation in **My Bookings**.

Hotel owners have a separate process:

1. Sign in.
2. Register a hotel.
3. Open the owner dashboard.
4. Add rooms and images.
5. Manage room availability.
6. Review customer bookings and booking totals.

---

## ✨ 2. Features

### 🙋 Customer Features

| Feature | Description |
| --- | --- |
| 🔐 User Authentication | Sign up, sign in, and manage the account using Clerk. |
| 🔎 Hotel Search | Search rooms by destination, hotel name, or room type. |
| 📅 Date Selection | Select check-in and check-out dates and the number of guests. |
| 🏨 Room Listings | Browse available rooms with photos, amenities, hotel location, and nightly prices. |
| 🎛️ Filters | Filter rooms by room type and price range. |
| ↕️ Sorting | Sort rooms by price or newest listing. |
| 🛏️ Room Details | View room photos, facilities, hotel information, and booking form. |
| ✅ Availability Check | Check whether a room is free for the selected date range. |
| 📆 My Bookings | View upcoming and past reservations. |
| 💳 Online Payment | Pay for a booking through Stripe Checkout. |
| ❌ Booking Cancellation | Cancel an eligible booking from the booking page. |
| 📩 Contact Form | Submit a message about a booking, payment, or other question. |
| 📰 Newsletter | Save an email address for newsletter updates. |
| 💬 Help Bot | Get predefined help for common booking, payment, cancellation, and owner questions. |

### 🏢 Hotel Owner Features

| Feature | Description |
| --- | --- |
| 📝 Hotel Registration | Register a hotel with its name, address, contact number, and city. |
| 📊 Owner Dashboard | View booking totals, paid/unpaid counts, and booking records. |
| ➕ Add Room | Create a room with room type, nightly price, amenities, and images. |
| 🖼️ Image Upload | Upload up to four room images through Cloudinary. |
| 📋 Room Listings | View rooms associated with the registered hotel. |
| 🔁 Availability Toggle | Mark a room available or unavailable. |
| 📈 Booking Overview | View guest, room, amount, and payment status information. |

### 🌐 Public Website Sections

- 🏠 Home page with a hero section and hotel search.
- ⭐ Recommended hotels based on a signed-in user's recent searches.
- 📍 Featured destinations.
- 🎁 Exclusive offers.
- 💬 Testimonials.
- 📰 Newsletter subscription.
- 🌴 Experience page.
- ℹ️ About page with common questions.
- 📞 Contact page.
- 📄 Privacy, Terms, and Sitemap information pages.

> **Note:** The Help Bot uses predefined keyword-based responses in the frontend. It is not an AI or LLM-powered chatbot.

---

## 👥 3. User Roles

QuickStay stores a user role in the MongoDB `User` model.

### 1. Customer (`user`)

A normal signed-in user can:

- Browse rooms.
- Search by destination.
- Check availability.
- Create bookings.
- Pay for bookings.
- View their own bookings.
- Cancel eligible bookings.
- Save recent searched cities.
- Submit contact messages and subscribe to the newsletter.

### 2. Hotel Owner (`hotelOwner`)

A customer becomes a hotel owner after successfully registering a hotel.

A hotel owner can:

- Open the owner dashboard.
- Add rooms to the registered hotel.
- Upload room photos.
- View their hotel's rooms.
- Change room availability.
- View bookings associated with the hotel.

The role is stored in MongoDB and is read by the frontend to decide whether to show the owner dashboard option.

---

## 🧭 4. Application Pages

The frontend uses React Router for navigation.

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Home | Main landing page and destination search. |
| `/rooms` | All Rooms | Browse, filter, and sort available rooms. |
| `/rooms/:id` | Room Details | View a selected room and check its availability. |
| `/my-bookings` | My Bookings | View upcoming/past bookings, pay, or cancel. |
| `/experience` | Experience | Explain the QuickStay booking experience. |
| `/about` | About | About information and FAQs. |
| `/contact` | Contact | Submit a contact message. |
| `/privacy` | Privacy | Privacy information. |
| `/terms` | Terms | Booking and payment information. |
| `/sitemap` | Sitemap | Links to public pages. |
| `/owner` | Owner Dashboard | View hotel booking information. |
| `/owner/add-room` | Add Room | Create a room listing. |
| `/owner/list-room` | List Rooms | View rooms and change availability. |

The `/:slug` route is used for the simple information pages such as Privacy, Terms, and Sitemap. An unknown slug displays a Page Not Found view.

---

## 🔄 5. How QuickStay Works

### 🧱 High-Level Application Flow

```text
                         CUSTOMER / HOTEL OWNER
                                   |
                                   v
                          REACT FRONTEND
                           (client/)
                                   |
                         Axios HTTP Requests
                                   |
                                   v
                          EXPRESS BACKEND
                           (server/)
                                   |
          +------------------------+------------------------+
          |                        |                        |
          v                        v                        v
    CLERK AUTH                HOTEL / ROOM              BOOKING API
          |                    APIs                       |
          v                        |                        v
    User identity                 v                    Availability
                           MONGODB DATABASE                  |
          |                        |                         v
          |                        |                    Booking Record
          |                        |                         |
          |                        |                         v
          |                        |                   STRIPE CHECKOUT
          |                        |                         |
          |                        |                         v
          |                        |                  Payment Verification
          |                        |                         |
          +------------------------+-------------------------+
                                   |
                   +---------------+---------------+
                   |               |               |
                   v               v               v
               CLOUDINARY       BREVO SMTP       MONGODB
              Room Images     Booking Emails    App Records
```

### 🔍 Step-by-Step Request Flow

1. The user opens the QuickStay frontend.
2. React renders the requested page.
3. Clerk checks the current authentication state.
4. The frontend sends API requests to the Express backend using Axios.
5. The backend receives the request and runs the required middleware.
6. Protected routes verify the Clerk user identity and load the matching MongoDB user record.
7. Controllers execute the required business logic.
8. Mongoose reads or updates MongoDB documents.
9. External services are used when required, such as Cloudinary for images, Stripe for payment, and Brevo SMTP for email.
10. The backend returns a JSON response.
11. The frontend updates the page and displays the result using React state and toast notifications.

---

## 🛠️ 6. Technology Stack

### 🎨 Frontend

| Technology | Why it is used |
| --- | --- |
| ⚛️ React 19 | Builds the user interface using reusable components. |
| ⚡ Vite 6 | Runs the frontend development server and creates production builds. |
| 🧭 React Router 7 | Handles navigation between application pages. |
| 🎨 Tailwind CSS 4 | Styles the application with utility classes. |
| 🔐 Clerk React | Provides sign-in, sign-up, user state, and authentication tokens. |
| 🌐 Axios | Sends HTTP requests from the frontend to the backend. |
| 🔔 React Hot Toast | Shows success and error notifications. |
| 🧹 ESLint | Checks code quality and common JavaScript/React issues. |

### ⚙️ Backend

| Technology | Why it is used |
| --- | --- |
| 🟢 Node.js | Runs the backend JavaScript application. |
| 🚂 Express 5 | Creates the backend server and REST API routes. |
| 🍃 MongoDB | Stores users, hotels, rooms, bookings, contact messages, and subscribers. |
| 🦫 Mongoose | Defines database schemas and communicates with MongoDB. |
| 🔐 Clerk Express | Makes Clerk authentication information available to backend routes. |
| 🖼️ Cloudinary | Stores uploaded room images. |
| 📤 Multer | Receives image files from multipart form requests. |
| 💳 Stripe | Creates Checkout Sessions and verifies completed payments. |
| 📧 Nodemailer | Sends booking confirmation emails through SMTP. |
| 🪝 Svix | Verifies Clerk webhook signatures. |
| 🔄 Nodemon | Restarts the backend automatically during development. |
| 🌍 dotenv | Loads backend environment variables. |
| 🔀 CORS | Controls which browser origins can call the backend. |

### ☁️ External Services

| Service | Responsibility |
| --- | --- |
| Clerk | Authentication and user identity. |
| MongoDB Atlas / MongoDB | Database storage. |
| Cloudinary | Room image hosting. |
| Stripe | Online payment checkout. |
| Brevo SMTP Relay | Sending booking confirmation email. |
| Vercel | Deployment configuration for the client and server folders. |

---

## 🏗️ 7. Project Architecture

QuickStay uses a **separate frontend and backend architecture**.

### 🎨 Frontend Architecture

The React application is inside the `client/` directory.

Its main responsibilities are:

- Display pages and reusable components.
- Handle navigation.
- Collect search and booking information.
- Read the signed-in Clerk user.
- Request a Clerk session token when a protected API is called.
- Send API requests using Axios.
- Display API results and notifications.
- Keep shared application information in React Context.

### ⚙️ Backend Architecture

The Express API is inside the `server/` directory.

Its main responsibilities are:

- Connect to MongoDB.
- Configure Cloudinary.
- Configure CORS.
- Add Clerk middleware.
- Verify webhook requests.
- Protect private API endpoints.
- Execute controller logic.
- Store and retrieve database records.
- Create Stripe Checkout Sessions.
- Send booking confirmation emails.

### 🧩 Backend Request Pattern

```text
Frontend Component
        |
        v
Axios API Request
        |
        v
Express Route
        |
        v
Authentication Middleware (for protected routes)
        |
        v
Controller Function
        |
        v
Mongoose Model
        |
        v
MongoDB
        |
        v
JSON Response
        |
        v
Frontend UI
```

For example, when a hotel owner adds a room:

1. `AddRoom.jsx` collects the room details.
2. It creates a `FormData` object.
3. It adds the room fields, amenities, and image files.
4. Axios sends the request to `POST /api/rooms/`.
5. Multer receives the uploaded images.
6. The `createRoom` controller finds the authenticated owner's hotel.
7. Cloudinary uploads the images.
8. The returned image URLs are saved in the `Room` document.
9. The frontend displays the API response.

---

## 📁 8. Project Structure

The following structure is based on the repository's main folders and files.

```text
QuickStay/
│
├── README.md
│
├── client/
│   ├── public/
│   │   └── hotel1.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── assets.js
│   │   │   ├── Home.jpg
│   │   │   ├── logo.svg
│   │   │   ├── heroImage.png
│   │   │   ├── roomImg1.png
│   │   │   ├── roomImg2.png
│   │   │   └── other icons and images
│   │   │
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── ExclusiveOffers.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── FeatureDestination.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HelpBot.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HotelCard.jsx
│   │   │   ├── HotelRegistration.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Newsletter.jsx
│   │   │   ├── RecommendedHotel.jsx
│   │   │   ├── StarRatings.jsx
│   │   │   ├── Testimonial.jsx
│   │   │   ├── Title.jsx
│   │   │   └── hotelOwner/
│   │   │       ├── Navbar.jsx
│   │   │       └── SideBar.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AllRooms.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Info.jsx
│   │   │   ├── MyBookings.jsx
│   │   │   ├── RoomDetails.jsx
│   │   │   └── hotelOwner/
│   │   │       ├── AddRoom.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Layout.jsx
│   │   │       └── ListRoom.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json
│   └── vite.config.js
│
└── server/
    ├── configs/
    │   ├── cloudinary.js
    │   ├── db.js
    │   └── nodemailer.js
    │
    ├── controllers/
    │   ├── bookingController.js
    │   ├── clerkWebhooks.js
    │   ├── contactController.js
    │   ├── hotelController.js
    │   ├── roomController.js
    │   ├── subscriberController.js
    │   └── userController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── uploadMiddleware.js
    │
    ├── models/
    │   ├── Booking.js
    │   ├── Contact.js
    │   ├── Hotel.js
    │   ├── Room.js
    │   ├── Subscriber.js
    │   └── User.js
    │
    ├── routes/
    │   ├── bookingRoutes.js
    │   ├── contactRoutes.js
    │   ├── hotelRoutes.js
    │   ├── roomRoutes.js
    │   ├── subscriberRoutes.js
    │   └── userRoutes.js
    │
    ├── .dockerignore
    ├── .gitignore
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── server.js
    └── vercel.json
```

### 📌 Important Frontend Files

| File | Responsibility |
| --- | --- |
| `client/src/main.jsx` | Starts React and wraps the application with Clerk, BrowserRouter, and AppProvider. |
| `client/src/App.jsx` | Defines the application routes and shared layout. |
| `client/src/context/AppContext.jsx` | Stores shared user, room, currency, navigation, and owner state. |
| `client/src/components/Navbar.jsx` | Main navigation, search, login, profile, and hotel registration entry point. |
| `client/src/components/Hero.jsx` | Home page search form with destination, dates, and guests. |
| `client/src/pages/AllRooms.jsx` | Room listing, destination matching, filtering, and sorting. |
| `client/src/pages/RoomDetails.jsx` | Room information, availability check, booking, and Stripe redirect. |
| `client/src/pages/MyBookings.jsx` | Customer reservation history, payment, and cancellation actions. |
| `client/src/components/HotelRegistration.jsx` | Hotel registration form. |
| `client/src/pages/hotelOwner/AddRoom.jsx` | Room creation and image upload form. |
| `client/src/pages/hotelOwner/ListRoom.jsx` | Owner room list and availability toggle. |
| `client/src/pages/hotelOwner/Dashboard.jsx` | Hotel booking summary. |

### 📌 Important Backend Files

| File | Responsibility |
| --- | --- |
| `server/server.js` | Creates Express app, configures middleware, mounts API routes, and starts the server. |
| `server/configs/db.js` | Connects Mongoose to MongoDB. |
| `server/configs/cloudinary.js` | Configures Cloudinary. |
| `server/configs/nodemailer.js` | Configures the Brevo SMTP transporter. |
| `server/middleware/authMiddleware.js` | Reads Clerk user identity and loads the application user. |
| `server/middleware/uploadMiddleware.js` | Configures Multer disk storage for uploads. |
| `server/controllers/userController.js` | User synchronization, profile data, and recent searches. |
| `server/controllers/hotelController.js` | Hotel registration. |
| `server/controllers/roomController.js` | Room creation, listing, and availability changes. |
| `server/controllers/bookingController.js` | Availability, booking, Stripe, cancellation, and booking retrieval. |
| `server/controllers/clerkWebhooks.js` | Handles Clerk user-created, updated, and deleted events. |

---

## 🗄️ 9. Database Design

QuickStay uses MongoDB with Mongoose models.

The database name configured in `server/configs/db.js` is:

```text
hotel-booking
```

The application currently has six main models.

### 1. 👤 User Model

File: `server/models/User.js`

Stores application user details.

| Field | Type | Description |
| --- | --- | --- |
| `_id` | String | Clerk user ID. |
| `username` | String | User's name. |
| `email` | String | User email address. |
| `image` | String | User profile image URL. |
| `role` | String | `user` or `hotelOwner`. |
| `recentSearchedCities` | Array | Recently searched cities. |
| `createdAt` | Date | Document creation time. |
| `updatedAt` | Date | Last update time. |

The default role is `user`.

### 2. 🏨 Hotel Model

File: `server/models/Hotel.js`

Stores hotel registration details.

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | Hotel name. |
| `address` | String | Hotel address. |
| `contact` | String | Hotel contact number. |
| `owner` | String | Reference to the owner in the User collection. |
| `city` | String | Hotel city. |
| `createdAt` | Date | Document creation time. |
| `updatedAt` | Date | Last update time. |

### 3. 🛏️ Room Model

File: `server/models/Room.js`

Stores room details.

| Field | Type | Description |
| --- | --- | --- |
| `hotel` | String | Reference to the Hotel document. |
| `roomType` | String | Type of room. |
| `pricePerNight` | Number | Cost of one night. |
| `amenities` | Array | Facilities available in the room. |
| `images` | Array | Cloudinary image URLs. |
| `isAvailable` | Boolean | Whether the room is listed as available. |
| `createdAt` | Date | Document creation time. |
| `updatedAt` | Date | Last update time. |

Room types shown in the current interface:

- Single Bed
- Double Bed
- Luxury Room
- Family Suite

Amenities shown in the current Add Room form:

- Free Wifi
- Free Breakfast
- Room Service
- Mountain View
- Pool Access

### 4. 📅 Booking Model

File: `server/models/Booking.js`

Stores reservation and payment status.

| Field | Type | Description |
| --- | --- | --- |
| `user` | String | Reference to the customer. |
| `room` | String | Reference to the room. |
| `hotel` | String | Reference to the hotel. |
| `checkInDate` | Date | Check-in date. |
| `checkOutDate` | Date | Check-out date. |
| `totalPrice` | Number | Total booking amount. |
| `guests` | Number | Number of guests. |
| `status` | String | `pending`, `confirmed`, or `cancelled`. |
| `paymentMetod` | String | Payment method field; the spelling in the current model is `paymentMetod`. |
| `isPaid` | Boolean | Whether payment has been marked as completed. |
| `createdAt` | Date | Document creation time. |
| `updatedAt` | Date | Last update time. |

The default booking status is `pending`. The default payment method is `Pay At Hotel`.

### 5. ✉️ Contact Model

File: `server/models/Contact.js`

Stores contact form submissions.

| Field | Type | Description |
| --- | --- | --- |
| `name` | String | Sender's name. |
| `email` | String | Sender's email. |
| `subject` | String | Contact topic. |
| `message` | String | Message content. |
| `createdAt` / `updatedAt` | Date | Timestamps. |

### 6. 📰 Subscriber Model

File: `server/models/Subscriber.js`

Stores newsletter email addresses.

| Field | Type | Description |
| --- | --- | --- |
| `email` | String | Subscriber email; unique and lowercase. |
| `createdAt` / `updatedAt` | Date | Timestamps. |

### 🔗 Database Relationships

```text
User
 |
 | one owner can register a hotel
 v
Hotel
 |
 | one hotel can have multiple rooms
 v
Room
 |
 | a room can have multiple bookings over different dates
 v
Booking
 ^
 |
User (customer)
```

`Hotel.owner` points to a User. `Room.hotel` points to a Hotel. `Booking` stores references to its customer, room, and hotel.

Mongoose `populate()` is used in room and booking queries to retrieve related hotel, owner, room, and user information.

---

## 🔐 10. Authentication and Authorization

QuickStay uses **Clerk** for authentication.

Passwords are not stored in the QuickStay MongoDB User model. Clerk manages the sign-in identity, while QuickStay stores application-specific details such as role and recent searches.

### 🔑 Frontend Authentication

Main file: `client/src/main.jsx`

The application reads:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

The React root is wrapped using:

- `ClerkProvider`
- `BrowserRouter`
- `AppProvider`

Clerk provides hooks and components such as:

- `useUser()` — reads the signed-in user.
- `useAuth()` — provides authentication helpers, including `getToken()`.
- `useClerk()` — opens Clerk sign-in.
- `UserButton` — displays the account menu.

### 🛡️ Backend Authentication

Main file: `server/middleware/authMiddleware.js`

The backend uses `clerkMiddleware()` globally in `server/server.js`.

For protected application routes, the custom `protect` middleware:

1. Reads the Clerk user ID from the request authentication information.
2. Returns an unauthenticated response when there is no user ID.
3. Finds the user in MongoDB using that Clerk ID.
4. Returns an error when the application user does not exist.
5. Attaches the MongoDB user document to `req.user`.
6. Calls `next()` so the controller can continue.

The frontend normally sends a Clerk token in the Authorization header:

```js
{
  headers: {
    Authorization: `Bearer ${await getToken()}`
  }
}
```

### 🔄 User Synchronization

There are two user synchronization paths.

**Path A — Clerk Webhook**

The backend exposes:

```text
POST /api/clerk
```

The webhook controller verifies the Svix signature and handles:

| Clerk event | Backend action |
| --- | --- |
| `user.created` | Creates a MongoDB User document. |
| `user.updated` | Updates the MongoDB User document. |
| `user.deleted` | Deletes the MongoDB User document. |

**Path B — Frontend Sync Fallback**

When the frontend fetches `/api/user` and the application user is missing, `AppContext.jsx` calls:

```text
POST /api/user/sync
```

It sends the user's email, username, and image URL with a Clerk token. The backend creates the application user when needed.

### 🧑‍💼 How a User Becomes a Hotel Owner

1. A customer signs in.
2. The navbar displays **List Your Hotel**.
3. The user opens the Hotel Registration form.
4. The frontend sends hotel details to `POST /api/hotels`.
5. The backend creates a Hotel document.
6. The user's role changes from `user` to `hotelOwner`.
7. The frontend updates owner state.
8. The navbar displays **Dashboard**.
9. The owner can open the dashboard and manage rooms.

The current hotel registration controller prevents a user from registering a second hotel when a hotel record already exists for that owner.

---

## 🛏️ 11. Hotel and Room Management

### 📝 Hotel Registration Flow

Frontend file: `client/src/components/HotelRegistration.jsx`

The form collects:

- Hotel name
- Phone/contact number
- Address
- City

It sends a JSON request to:

```text
POST /api/hotels/
```

Backend controller: `server/controllers/hotelController.js`

The controller:

1. Reads hotel data from the request body.
2. Gets the authenticated owner ID.
3. Checks whether the owner already has a registered hotel.
4. Creates the Hotel document.
5. Changes the owner's role to `hotelOwner`.
6. Sends a success or error response.

### ➕ Add Room Flow

Frontend file: `client/src/pages/hotelOwner/AddRoom.jsx`

The Add Room page collects:

- Room type
- Price per night
- Amenities
- Up to four room images

#### How images and room data are submitted

The frontend uses `FormData` because the request contains files.

The form sends these fields:

| Field | Value |
| --- | --- |
| `roomType` | Selected room type. |
| `pricePerNight` | Nightly price. |
| `amenities` | JSON string containing selected amenities. |
| `images` | One or more image files, repeated under the same field name. |

The request is sent to:

```text
POST /api/rooms/
```

The backend route uses:

```js
upload.array("images", 4)
```

This tells Multer to accept up to four files under the `images` field.

The room controller then:

1. Finds the hotel owned by the authenticated user.
2. Uploads each image to Cloudinary.
3. Collects the returned secure image URLs.
4. Parses the amenities JSON string.
5. Creates a Room document.
6. Links the new room to the owner's hotel.
7. Returns a response.

### 🌍 Public Room Listing

Endpoint:

```text
GET /api/rooms
```

The backend returns rooms where:

```js
isAvailable: true
```

The query also populates hotel data and the hotel owner's profile image. Results are sorted by newest creation time first.

The frontend loads these rooms in `AppContext.jsx` and stores them in shared React state.

### 🎛️ Room Filtering and Sorting

Page: `client/src/pages/AllRooms.jsx`

The current interface supports:

**Room type filters**

- Single Bed
- Double Bed
- Luxury Room
- Family Suite

**Price ranges**

- 0 to 500
- 500 to 1000
- 1000 to 2000
- 2000 to 3000

**Sort options**

- Price Low to High
- Price High to Low
- Newest First

The destination filter checks the hotel's city, hotel name, and room type against the `destination` query parameter.

These filters and sorting are performed in the frontend using the room data already fetched from the API.

### 🔁 Room Availability Management

The owner room list displays each room and its current availability.

When the owner changes the availability switch, the frontend sends:

```text
POST /api/rooms/toggle-availability
```

with:

```json
{
  "roomId": "ROOM_DOCUMENT_ID"
}
```

The backend finds the room and flips its `isAvailable` value.

**Important:** The current controller checks that the caller is authenticated, but it does not verify that the room belongs to that caller's hotel before toggling it. Add an ownership check before using this endpoint in a public production environment.

---

## 📅 12. Booking and Availability Flow

The booking system is handled mainly by:

- Frontend: `client/src/pages/RoomDetails.jsx`
- Backend: `server/controllers/bookingController.js`
- Model: `server/models/Booking.js`

### Step 1 — Select a room

The user opens a room from the All Rooms page.

The room page displays:

- Hotel name
- Room type
- Hotel address
- Room images
- Amenities
- Price per night
- Check-in date
- Check-out date
- Number of guests

Search values such as check-in, check-out, and guests can be passed to the room page through URL query parameters.

### Step 2 — Select dates and guests

The current frontend date form:

- Does not allow check-in dates before today.
- Requires a check-in date.
- Requires a check-out date.
- Does not allow selecting check-out before check-in.
- Allows a guest count from 1 to 4 in the user interface.

### Step 3 — Check room availability

The frontend sends:

```text
POST /api/bookings/check-availability
```

Example JSON body:

```json
{
  "room": "ROOM_DOCUMENT_ID",
  "checkInDate": "2026-12-10",
  "checkOutDate": "2026-12-13"
}
```

The backend searches for bookings of that room that overlap the requested dates and are not cancelled.

The overlap condition is:

```js
checkInDate: { $lte: checkOutDate },
checkOutDate: { $gte: checkInDate }
```

In simple words, the room is unavailable when an existing non-cancelled booking overlaps the selected date range.

If no matching booking is found, the API returns:

```json
{
  "success": true,
  "isAvailable": true
}
```

### Step 4 — Calculate the booking price

After availability is confirmed, the frontend sends the booking request.

The backend reads the room price from MongoDB. It does not rely on a total price supplied by the browser.

The calculation is:

```text
Number of Nights = Check-out Date - Check-in Date

Total Price = Price Per Night × Number of Nights
```

Example:

| Detail | Value |
| --- | ---: |
| Price per night | $1,500 |
| Check-in | 10 December |
| Check-out | 13 December |
| Number of nights | 3 |
| Total | $4,500 |

The example is only to explain the calculation; actual values come from the selected room and dates.

### Step 5 — Create the booking

The frontend sends:

```text
POST /api/bookings/book
```

Example JSON body:

```json
{
  "room": "ROOM_DOCUMENT_ID",
  "checkInDate": "2026-12-10",
  "checkOutDate": "2026-12-13",
  "guests": 2
}
```

The backend:

1. Gets the authenticated customer ID.
2. Checks availability again.
3. Finds the room and related hotel.
4. Calculates the number of nights.
5. Calculates the total price.
6. Creates a Booking document.
7. Starts the booking confirmation email process.
8. Returns the new booking.

A newly created booking starts with `pending` status and `isPaid: false`.

### Step 6 — Continue to payment

After booking creation, the frontend requests a Stripe Checkout Session.

The user is redirected to the Stripe-hosted payment page.

### Step 7 — View the booking

After Stripe redirects the customer to `/my-bookings`, the frontend reads the returned `session_id` query parameter and asks the backend to verify the payment.

The customer can then see the reservation under:

- **Upcoming** — check-out date is today or later.
- **Past** — check-out date is before today.

---

## 💳 13. Stripe Payment Integration

QuickStay uses Stripe Checkout for online payments.

The integration is handled in:

```text
server/controllers/bookingController.js
```

### 💰 Stripe Environment Variable

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

The secret key is used only by the backend.

### 🔄 Payment Flow

```text
Customer selects a room
          |
          v
Room availability is checked
          |
          v
Booking is created in MongoDB
(status: pending, isPaid: false)
          |
          v
POST /api/bookings/stripe-payment
          |
          v
Backend creates Stripe Checkout Session
          |
          v
Customer is redirected to Stripe
          |
          +----------------------+
          |                      |
          v                      v
       Payment                Payment
       Success                Cancelled
          |                      |
          v                      v
Return to                    Return to
My Bookings                  My Bookings
          |
          v
Frontend sends session_id
          |
          v
POST /api/bookings/verify-stripe
          |
          v
Backend retrieves Stripe Session
          |
          v
Checks payment_status === "paid"
          |
          v
Updates Booking:
isPaid = true
status = confirmed
paymentMetod = Stripe
```

### 1. Create Stripe Checkout Session

Endpoint:

```text
POST /api/bookings/stripe-payment
```

Request:

```json
{
  "bookingId": "BOOKING_DOCUMENT_ID"
}
```

The backend checks that:

- Stripe is configured.
- The booking exists.
- The booking belongs to the authenticated user.
- The booking has not already been paid.

It then creates a Stripe Checkout Session and returns its URL.

### 2. Redirect to Stripe

The browser opens the returned Stripe Checkout URL.

After the checkout flow, Stripe redirects the user to the configured success or cancel URL.

### 3. Verify the payment

Endpoint:

```text
POST /api/bookings/verify-stripe
```

Request:

```json
{
  "sessionId": "STRIPE_CHECKOUT_SESSION_ID"
}
```

The backend retrieves the session from Stripe and checks its `payment_status`.

When Stripe reports that payment is paid, the backend:

- Sets `isPaid` to `true`.
- Sets booking `status` to `confirmed`.
- Sets `paymentMetod` to `Stripe`.

The frontend then refreshes the user's bookings.

### ⚠️ Payment Notes

- The current Stripe Checkout code uses `usd` as the payment currency.
- The displayed frontend currency is controlled separately by `VITE_CURRENCY`.
- A paid booking cancellation does not automatically issue a Stripe refund in the current code.
- The implementation verifies the Checkout Session when the customer returns to My Bookings. It does not currently define a Stripe webhook endpoint for payment event processing.

---

## 📧 14. Email Notifications

QuickStay uses **Nodemailer** with the Brevo SMTP relay.

Configuration file:

```text
server/configs/nodemailer.js
```

The current SMTP configuration is:

| Setting | Value |
| --- | --- |
| SMTP host | `smtp-relay.brevo.com` |
| Port | `587` |
| Secure | `false` |
| Username | `SMTP_USER` |
| Password | `SMTP_PASSWORD` |

### ✉️ Booking Confirmation Email

When a booking is created, the backend attempts to send an email to the signed-in user's email address.

The email includes:

- Booking ID
- Hotel name
- Hotel address
- Check-in date
- Price per night
- Total booking amount

The sender is configured with:

```env
SENDER_EMAIL=your_verified_sender_email
```

The mail send operation logs an error if sending fails. Booking creation itself is not rolled back because of a mail-send failure.

### Required email variables

```env
SMTP_USER=your_brevo_smtp_login
SMTP_PASSWORD=your_brevo_smtp_key
SENDER_EMAIL=your_verified_sender_email
```

Use the SMTP credentials provided by your Brevo account. The sender address should be configured and verified with the email provider.

---

## ☁️ 15. Cloudinary Image Uploads

QuickStay uses Cloudinary to store hotel room images.

Configuration file:

```text
server/configs/cloudinary.js
```

The backend reads:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### How the upload works

1. The hotel owner selects room images in Add Room.
2. The frontend places images in a `FormData` object.
3. Axios sends the form to `POST /api/rooms/`.
4. Multer receives the files using the `images` field.
5. The backend uploads each file to Cloudinary.
6. Cloudinary returns a secure image URL.
7. The backend stores those URLs in the Room document.
8. The frontend uses the URLs to display room photos.

The current route accepts up to four images per room.

---

## 📮 16. Contact and Newsletter

### 📞 Contact Form

Frontend:

```text
client/src/pages/Contact.jsx
```

Backend:

```text
server/controllers/contactController.js
```

Endpoint:

```text
POST /api/contact
```

The form accepts:

- Name
- Email
- Subject
- Message

The backend checks that all fields are present, validates the email format, and requires a message of at least ten characters. It then saves the submission in MongoDB.

**Current behavior:** The contact form stores the message and responds that a reply can be sent by email. The current `contactController.js` does not itself send an email.

### 📰 Newsletter Subscription

Frontend:

```text
client/src/components/Newsletter.jsx
```

Backend:

```text
server/controllers/subscriberController.js
```

Endpoint:

```text
POST /api/subscribe
```

Request:

```json
{
  "email": "guest@example.com"
}
```

The backend:

1. Trims and lowercases the email.
2. Checks the email format.
3. Searches for an existing subscriber.
4. Avoids creating a duplicate.
5. Saves a new subscriber in MongoDB.

### 💬 Help Bot

Frontend file:

```text
client/src/components/HelpBot.jsx
```

The Help Bot runs in the browser. It checks keywords in a user's question and selects a predefined answer about booking, payment, cancellation, hotel ownership, or contact support. It does not call an AI API or backend endpoint.

---

## 🔌 17. API Documentation

All backend endpoints are mounted in:

```text
server/server.js
```

The backend runs on port `5000` by default.

Base URL for local development:

```text
http://localhost:5000
```

### 🔐 User APIs

Base path: `/api/user`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/user/sync` | Clerk identity required | Create the application user if missing. |
| `GET` | `/api/user` | Protected | Get current user role and recent searched cities. |
| `POST` | `/api/user/store-recent-search` | Protected | Save a recently searched city. |

### 🏨 Hotel APIs

Base path: `/api/hotels`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/hotels/` | Protected | Register a hotel for the current owner. |

### 🛏️ Room APIs

Base path: `/api/rooms`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/rooms/` | Protected | Create a room with up to four images. |
| `GET` | `/api/rooms/` | Public | Get rooms marked as available. |
| `GET` | `/api/rooms/owner` | Protected | Get rooms for the authenticated owner's hotel. |
| `POST` | `/api/rooms/toggle-availability` | Protected | Toggle a room's availability. |

For room creation, use `multipart/form-data` with these fields:

| Field | Type | Description |
| --- | --- | --- |
| `roomType` | Text | Room type. |
| `pricePerNight` | Text/Number | Nightly price. |
| `amenities` | Text | JSON-serialized array of selected amenities. |
| `images` | File | Image file; repeat the field for multiple images. Maximum four. |

### 📅 Booking APIs

Base path: `/api/bookings`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/bookings/check-availability` | Public | Check whether a room is free for the selected dates. |
| `POST` | `/api/bookings/book` | Protected | Create a booking. |
| `GET` | `/api/bookings/user` | Protected | Get the current customer's bookings. |
| `GET` | `/api/bookings/hotel` | Protected | Get bookings and summary data for the owner's hotel. |
| `POST` | `/api/bookings/stripe-payment` | Protected | Create a Stripe Checkout Session. |
| `POST` | `/api/bookings/verify-stripe` | Protected | Verify a Stripe Checkout Session and update the booking. |
| `POST` | `/api/bookings/cancel` | Protected | Cancel an eligible booking. |

### ✉️ Contact API

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | Public | Validate and save a contact message. |

### 📰 Newsletter API

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/subscribe` | Public | Save a newsletter email address. |

### 🪝 Clerk Webhook

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/clerk` | Svix signature verification | Receive Clerk user events. |

### 🩺 Root Health Check

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Returns `API is working`. |

### Example: Check Backend

```bash
curl http://localhost:5000/
```

Expected response:

```text
API is working
```

### Example: Fetch Available Rooms

```bash
curl http://localhost:5000/api/rooms
```

The response contains a `success` value and the available `rooms` array when the request succeeds.

Protected routes require a valid Clerk token in the Authorization header. The examples above show only the public endpoints.

---

## ⚙️ 18. Prerequisites

Before installing QuickStay, make sure you have:

| Tool / Account | Why you need it |
| --- | --- |
| 🟢 Node.js 20 or newer | Runs the client build tools and backend. The repository's Dockerfile uses Node 20. |
| 📦 npm | Installs project dependencies. |
| 🧰 Git | Clones the repository. |
| 🍃 MongoDB / MongoDB Atlas | Stores users, hotels, rooms, bookings, messages, and subscribers. |
| 🔐 Clerk account | Provides authentication and webhook configuration. |
| 🖼️ Cloudinary account | Stores uploaded room images. |
| 💳 Stripe account | Provides Checkout payment credentials. |
| 📧 Brevo account | Provides SMTP credentials for booking emails. |

You can start the frontend after installing its packages, but backend features that depend on external services need the relevant credentials configured.

---

## 🚀 19. Local Installation — Step by Step

The repository has two separate Node.js applications:

```text
QuickStay/
  |
  +---- client/   React + Vite frontend
  |
  +---- server/   Express backend
```

You must install and run both.

### Step 1 — Clone the Repository

Open PowerShell, Windows Terminal, or your preferred terminal.

```bash
git clone https://github.com/VikasKumar281/QuickStay.git
```

Move into the project directory:

```bash
cd QuickStay
```

This downloads the source code from GitHub.

### Step 2 — Understand the Two Applications

Open the project in VS Code:

```bash
code .
```

You will see two main folders:

- `client` — frontend.
- `server` — backend.

Do not install all packages from the root. Each application has its own `package.json` and lock file.

### Step 3 — Install Backend Dependencies

Open a terminal and move into the backend folder:

```bash
cd server
```

Install the backend packages:

```bash
npm install
```

This reads `server/package.json` and installs Express, Mongoose, Clerk, Stripe, Cloudinary, Nodemailer, Multer, and the other backend dependencies.

### Step 4 — Create the Backend Environment File

Inside the `server` folder, create a file named:

```text
.env
```

The path should be:

```text
QuickStay/server/.env
```

Add your backend environment variables. A complete list is provided in the next section.

Do not upload this file to GitHub.

### Step 5 — Configure MongoDB

1. Open [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Sign in or create an account.
3. Create a cluster.
4. Create a database user with a username and password.
5. Configure network access so your development machine can connect.
6. Copy the MongoDB connection string.
7. Add it to `server/.env`.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/
```

Replace the placeholders with your own connection details.

The current backend code selects this database name:

```text
hotel-booking
```

Make sure that the database user, password, cluster URL, and network access are correct.

### Step 6 — Configure Clerk Authentication

1. Open [Clerk Dashboard](https://dashboard.clerk.com/).
2. Create or select your application.
3. Enable the sign-in methods you want to use.
4. Open the API Keys section.
5. Copy the Publishable Key.
6. Copy the Secret Key.
7. Add the Publishable Key to `client/.env`.
8. Add the Secret Key to `server/.env`.

Frontend:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Backend:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
```

The backend also uses a Clerk webhook to synchronize users with MongoDB.

#### Configure the Clerk Webhook

1. Open the Clerk Dashboard.
2. Go to Webhooks.
3. Create an endpoint pointing to your backend.
4. For local testing, expose your backend through a secure public development tunnel.
5. Use this endpoint path:

```text
/api/clerk
```

6. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`
7. Copy the webhook signing secret.
8. Add it to `server/.env`:

```env
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret
```

The backend uses Svix to verify the webhook signature before processing the event.

The frontend also has a `/api/user/sync` fallback for creating a missing application user after sign-in.

### Step 7 — Configure Cloudinary

1. Open [Cloudinary](https://cloudinary.com/).
2. Create an account.
3. Open the Cloudinary Dashboard.
4. Copy the Cloud Name.
5. Copy the API Key.
6. Copy the API Secret.
7. Add all three values to `server/.env`.

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Cloudinary is used when a hotel owner uploads room photos.

### Step 8 — Configure Stripe

1. Open [Stripe Dashboard](https://dashboard.stripe.com/).
2. Create or select your Stripe account.
3. Use test mode while developing.
4. Open the Developers/API Keys section.
5. Copy the Secret Key.
6. Add it to `server/.env`.

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
```

The backend uses this key to create and retrieve Checkout Sessions.

Do not put the Stripe Secret Key in the frontend environment file.

### Step 9 — Configure Brevo SMTP

QuickStay uses Brevo's SMTP relay through Nodemailer.

1. Open [Brevo](https://www.brevo.com/).
2. Create or sign in to your account.
3. Open SMTP settings.
4. Get your SMTP login and SMTP key.
5. Verify the sender email address you intend to use.
6. Add the values to `server/.env`.

```env
SMTP_USER=your_brevo_smtp_login
SMTP_PASSWORD=your_brevo_smtp_key
SENDER_EMAIL=your_verified_sender_email
```

This configuration is used for the booking confirmation email.

### Step 10 — Create the Frontend Environment File

Open another terminal or return to the project root.

Move into the client folder:

```bash
cd ../client
```

Create:

```text
QuickStay/client/.env
```

Add:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=$
```

Explanation:

- `VITE_CLERK_PUBLISHABLE_KEY` — initializes Clerk in the React application.
- `VITE_BACKEND_URL` — tells Axios where the backend server is running.
- `VITE_CURRENCY` — controls the currency symbol shown in the frontend. The current default is `$`.

The backend's email amount prefix is separately controlled by `CURRENCY`.

### Step 11 — Check Your Folder Structure

Before starting the app, verify that your files look like this:

```text
QuickStay/
│
├── client/
│   ├── .env
│   ├── package.json
│   └── src/
│
└── server/
    ├── .env
    ├── package.json
    └── server.js
```

### Step 12 — Check Your Credentials

Make sure:

- MongoDB is reachable.
- Clerk Publishable Key is in `client/.env`.
- Clerk Secret Key is in `server/.env`.
- Clerk Webhook Secret is in `server/.env` if webhook synchronization is enabled.
- Cloudinary credentials are correct.
- Stripe Secret Key is correct.
- SMTP credentials and sender email are correct.
- Frontend backend URL points to port `5000`.

---

## 🔑 20. Environment Variables

The repository does not currently include a root `.env.example` file. Create the two environment files manually.

### 🖥️ Backend — `server/.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

SMTP_USER=your_brevo_smtp_login
SMTP_PASSWORD=your_brevo_smtp_key
SENDER_EMAIL=your_verified_sender_email

CURRENCY=$
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Backend port. Defaults to `5000` when not provided. |
| `MONGODB_URI` | MongoDB connection string. |
| `CLERK_SECRET_KEY` | Backend Clerk authentication key used by Clerk Express middleware. |
| `CLERK_WEBHOOK_SECRET` | Secret used to verify Clerk webhook signatures through Svix. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret. |
| `STRIPE_SECRET_KEY` | Stripe backend secret key. |
| `SMTP_USER` | Brevo SMTP username/login. |
| `SMTP_PASSWORD` | Brevo SMTP key/password. |
| `SENDER_EMAIL` | Verified email address used as the sender. |
| `CURRENCY` | Currency prefix inserted in booking confirmation email content. |

### 🌐 Frontend — `client/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000
VITE_CURRENCY=$
```

| Variable | Purpose |
| --- | --- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Public Clerk key used by the React application. |
| `VITE_BACKEND_URL` | Base URL for backend API requests. |
| `VITE_CURRENCY` | Currency symbol displayed in the user interface. |

### ⚠️ Important Environment Variable Rules

1. Do not commit either `.env` file.
2. Do not expose `CLERK_SECRET_KEY`, `STRIPE_SECRET_KEY`, SMTP credentials, or `CLOUDINARY_API_SECRET` in the frontend.
3. Vite exposes variables prefixed with `VITE_` to browser code. Only put values intended for browser use in these variables.
4. Restart the Vite development server after changing frontend environment variables.
5. Use separate development and production credentials where possible.

---

## ▶️ 21. Run the Application

You need two terminals: one for the backend and one for the frontend.

### Terminal 1 — Start the Backend

Open a terminal:

```bash
cd QuickStay/server
```

Install dependencies if you have not already:

```bash
npm install
```

Start the server in development mode:

```bash
npm run server
```

The script uses Nodemon, which automatically restarts Node.js when backend files change.

The default backend URL is:

```text
http://localhost:5000
```

You should see a message similar to:

```text
Server running on port 5000
```

### Terminal 2 — Start the Frontend

Open a second terminal:

```bash
cd QuickStay/client
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite is configured to use port `5173` by default.

Open:

```text
http://localhost:5173
```

### 🏗️ Create a Frontend Production Build

From the client folder:

```bash
npm run build
```

Vite creates the production output in:

```text
client/dist/
```

To preview the production build locally:

```bash
npm run preview
```

### ▶️ Start Backend Without Nodemon

From the server folder:

```bash
npm start
```

This runs:

```bash
node server.js
```

### 🧹 Run Frontend Linting

From the client folder:

```bash
npm run lint
```

---

## 🧪 22. Test the Main Workflows

Once both applications are running, test the features in the following order.

### ✅ Test 1 — Customer Authentication

1. Open `http://localhost:5173`.
2. Click Login.
3. Complete the Clerk sign-in process.
4. Check that the account/profile button appears.
5. Open My Bookings from the account menu.

### ✅ Test 2 — Hotel Registration

1. Sign in as a user who does not already own a hotel.
2. Click **List Your Hotel**.
3. Enter a hotel name.
4. Enter the contact number.
5. Enter the address.
6. Select the city.
7. Submit the form.
8. Confirm the success notification appears.
9. Confirm that the navbar now shows Dashboard.

### ✅ Test 3 — Add a Room

1. Open Dashboard.
2. Go to Add Room.
3. Select a room type.
4. Enter price per night.
5. Select amenities.
6. Upload at least one image.
7. Click Add Room.
8. Confirm that the room was created successfully.

### ✅ Test 4 — View Room Listings

1. Sign out of the owner account or use another customer account.
2. Open Hotels.
3. Confirm that available rooms are shown.
4. Check room photos, hotel name, city, price, and amenities.
5. Try the room type filters.
6. Try the price filters.
7. Try sorting by price.
8. Try searching by destination.

### ✅ Test 5 — Check Availability

1. Open a room.
2. Select a check-in date.
3. Select a later check-out date.
4. Select the number of guests.
5. Click Check Availability.
6. Confirm that the page displays an availability result.

### ✅ Test 6 — Create a Booking

1. Sign in as a customer.
2. Open an available room.
3. Select dates and guests.
4. Check availability.
5. Click Book Now after availability has been confirmed.
6. Confirm that the booking is created.

### ✅ Test 7 — Stripe Payment

1. Configure Stripe test credentials in the backend.
2. Start the booking flow.
3. Continue to Stripe Checkout.
4. Use a Stripe test payment method from Stripe's current test documentation.
5. Complete the checkout.
6. Confirm that Stripe redirects to My Bookings.
7. Confirm that the booking is marked Paid and Confirmed after the frontend calls the verification API.

### ✅ Test 8 — My Bookings

1. Open My Bookings.
2. Check the Upcoming section.
3. Check the Past section after a booking's check-out date has passed.
4. Check the payment status.
5. Try Pay Now on an eligible unpaid booking.
6. Try Cancel on an eligible future booking.

### ✅ Test 9 — Owner Dashboard

1. Sign in as the hotel owner.
2. Open Dashboard.
3. Check total bookings.
4. Check paid and awaiting-payment counts.
5. Review the booking table.
6. Open List Rooms.
7. Toggle a room's availability.
8. Confirm that the room status changes.

### ✅ Test 10 — Contact and Newsletter

1. Open Contact.
2. Fill out name, email, subject, and message.
3. Submit the form.
4. Check that a contact document is saved in MongoDB.
5. Open the Home page.
6. Enter an email in the newsletter section.
7. Subscribe.
8. Submit the same email again and confirm that a duplicate subscriber is not created.

---

## ☁️ 23. Deployment

The repository contains separate Vercel configuration files:

```text
client/vercel.json
server/vercel.json
```

The client and server are separate applications and should be configured as separate Vercel projects when using the supplied folder-level configurations.

### 🌐 A. Deploy the Frontend on Vercel

#### Step 1 — Push the latest code to GitHub

From your local repository:

```bash
git add .
git commit -m "Prepare QuickStay for deployment"
git push origin main
```

Do not commit `.env` files or secrets.

#### Step 2 — Create a Vercel Project

1. Open [Vercel](https://vercel.com/).
2. Sign in with GitHub.
3. Click Add New Project.
4. Import the QuickStay repository.
5. Set the Root Directory to:

```text
client
```

6. Use the Vite framework preset if Vercel does not select it automatically.

#### Step 3 — Configure Build Settings

The client package scripts define:

```bash
npm run build
```

The Vite production output directory is:

```text
dist
```

#### Step 4 — Add Frontend Environment Variables

Add these in Vercel Project Settings → Environment Variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=https://your-deployed-backend-domain
VITE_CURRENCY=$
```

Use the actual backend URL after deploying the server.

#### Step 5 — Deploy

Click Deploy and wait for the build to complete.

The frontend will be available at the Vercel domain assigned to the project.

The `client/vercel.json` rewrite sends frontend routes back to `/`, allowing React Router routes to load on refresh.

### ⚙️ B. Deploy the Backend on Vercel

#### Step 1 — Create a Second Vercel Project

1. Return to the Vercel dashboard.
2. Create another project.
3. Import the same QuickStay GitHub repository.
4. Set the Root Directory to:

```text
server
```

5. Review the server's supplied `vercel.json` configuration.

The server configuration uses `@vercel/node` and routes requests to `server.js`. The backend exports the Express app and avoids calling `app.listen()` when the `VERCEL` environment variable is present.

#### Step 2 — Configure Backend Environment Variables

Add all backend values from Section 20:

- `MONGODB_URI`
- `CLERK_SECRET_KEY`
- `CLERK_WEBHOOK_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SENDER_EMAIL`
- `CURRENCY`

Set `PORT` only when your deployment platform requires it. Vercel supplies its own runtime environment.

#### Step 3 — Deploy the Backend

Deploy the project and copy the resulting backend URL.

#### Step 4 — Connect the Frontend to the Backend

Return to the frontend Vercel project.

Update:

```env
VITE_BACKEND_URL=https://your-deployed-backend-domain
```

Redeploy the frontend after changing this build-time variable.

### 🔐 C. Update Clerk for Production

After both deployments:

1. Open the Clerk Dashboard.
2. Configure the production application/domain settings.
3. Add the deployed frontend domain to the allowed domains as required by Clerk.
4. Review the Clerk webhook.
5. Set the webhook URL to:

```text
https://your-deployed-backend-domain/api/clerk
```

6. Keep the `user.created`, `user.updated`, and `user.deleted` events enabled.
7. Confirm that the webhook signing secret matches `CLERK_WEBHOOK_SECRET` in the backend deployment.

### 🌍 D. Review Backend CORS

The current backend allows:

- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`
- `https://quickstay-one-inky.vercel.app`
- Other hostnames ending in `.vercel.app`

If you use a custom domain, update the backend CORS allow-list to include that exact origin.

### 💳 E. Review Stripe Redirect URLs

The current Stripe controller uses the incoming request origin to construct success and cancel URLs. If no origin header is present, it falls back to:

```text
https://quickstay-one-inky.vercel.app
```

When deploying to a different frontend domain, review this fallback in `server/controllers/bookingController.js`.

### 📧 F. Review Email Configuration

Add the Brevo SMTP environment variables to the backend deployment and confirm that the sender address is verified.

### ⚠️ Deployment Notes

- The repository includes Vercel configuration files, but successful deployment still depends on correct project Root Directory settings and environment variables.
- The frontend and backend are separate deployments; `VITE_BACKEND_URL` must point to the deployed backend.
- Clerk webhook configuration must use the deployed backend URL.
- MongoDB must allow connections from the hosting environment.
- Cloudinary, Stripe, and SMTP credentials must be configured in the backend environment.
- Verify the actual deployed frontend domain in backend CORS and Stripe redirect behavior.
- Check Vercel's current runtime, function, and plan limits before relying on a particular deployment setup.

---

## 🐳 24. Run the Backend with Docker

The repository contains:

```text
server/Dockerfile
```

The Dockerfile uses Node 20 Alpine, installs production dependencies, copies the backend code, exposes port 5000, and starts the server.

### Step 1 — Open the Server Directory

```bash
cd server
```

### Step 2 — Build the Docker Image

```bash
docker build -t quickstay-server .
```

The final dot means Docker should use the current `server` folder as the build context.

### Step 3 — Run the Container

Pass backend environment variables securely at runtime. One local-development option is to use an environment file:

```bash
docker run --env-file .env -p 5000:5000 quickstay-server
```

### Step 4 — Test the Backend

Open:

```text
http://localhost:5000/
```

Expected response:

```text
API is working
```

The MongoDB connection string must point to a database reachable from inside the container. `localhost` inside a container refers to the container itself, not automatically to the host computer.

---

## 🧰 25. Troubleshooting

### ❌ 1. Frontend Says Clerk Publishable Key Is Missing

**Possible reason:** `VITE_CLERK_PUBLISHABLE_KEY` is missing or misspelled.

**Solution:**

1. Open `client/.env`.
2. Check the variable name.
3. Add the correct Clerk Publishable Key.
4. Stop the Vite process.
5. Start it again using `npm run dev`.

### ❌ 2. Frontend Cannot Connect to Backend

**Possible reason:** `VITE_BACKEND_URL` is missing or points to the wrong port/domain.

**Solution:**

For local development:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Confirm the backend is running:

```text
http://localhost:5000/
```

Restart Vite after changing its environment file.

### ❌ 3. MongoDB Connection Failed

Check:

- `MONGODB_URI` is correct.
- MongoDB username and password are correct.
- Special characters in the password are URL-encoded.
- Your IP address is allowed by MongoDB Atlas network access.
- The cluster is running.
- The backend environment contains the variable.

### ❌ 4. User Is Not Authenticated

Check:

- The user completed Clerk sign-in.
- `VITE_CLERK_PUBLISHABLE_KEY` is correct.
- `CLERK_SECRET_KEY` is configured on the backend.
- The frontend sends the Clerk token in the Authorization header.
- The user's application record exists in MongoDB.
- User synchronization or the Clerk webhook is configured correctly.

### ❌ 5. Clerk Webhook Fails

Check:

- The webhook points to `/api/clerk`.
- The endpoint is reachable from the public internet.
- The event types are enabled.
- `CLERK_WEBHOOK_SECRET` matches the signing secret for that endpoint.
- Raw JSON request bodies are not parsed before the webhook route. The current server mounts the webhook route before `express.json()` for this reason.

### ❌ 6. Room Images Are Not Uploading

Check:

- Cloudinary credentials.
- The backend request is `multipart/form-data`.
- The file field name is exactly `images`.
- No more than four files are sent in one room creation request.
- The room form includes the required room type, price, and amenities.

### ❌ 7. Stripe Payment Is Not Working

Check:

- `STRIPE_SECRET_KEY` is present in the backend environment.
- The key belongs to the intended Stripe account and mode.
- The booking exists and belongs to the signed-in user.
- The booking is not already marked paid.
- The Checkout Session is created successfully.
- The browser returns with a valid `session_id`.
- The backend can retrieve the session from Stripe.

### ❌ 8. Booking Confirmation Email Is Not Received

Check:

- `SMTP_USER` is correct.
- `SMTP_PASSWORD` is the Brevo SMTP key.
- `SENDER_EMAIL` is verified with Brevo.
- The destination user's email is valid.
- The backend logs do not show an SMTP error.

The booking can still be created even when the email send operation fails.

### ❌ 9. Owner Dashboard Redirects to Home

Check:

- The user is signed in.
- Hotel registration completed successfully.
- The user's MongoDB role is `hotelOwner`.
- The frontend `isOwner` state is set after registration or user data is fetched.
- The hotel document is linked to the correct owner ID.

### ❌ 10. Vercel Refresh Shows a 404

For frontend routes, verify that:

- The Vercel project Root Directory is `client`.
- `client/vercel.json` is present.
- The rewrite configuration is deployed.
- The latest deployment completed successfully.

### ❌ 11. CORS Error After Deployment

Check:

- `VITE_BACKEND_URL` uses the backend's HTTPS URL.
- The deployed frontend origin is included in the backend allow-list.
- The backend has been redeployed after a CORS code change.
- Clerk token requests and credentials are sent as expected.

---

## 🔒 26. Security and Important Implementation Notes

Before using QuickStay with real customers, review the following points.

### 🔑 Keep Secrets Private

Never commit:

- MongoDB connection strings.
- Clerk Secret Key.
- Clerk webhook signing secret.
- Cloudinary API Secret.
- Stripe Secret Key.
- Brevo SMTP password/key.

Only use frontend environment variables for values intended to be available to the browser.

### 🧑‍💻 Verify Room Ownership

The current `toggleRoomAvailability` controller finds a room by ID and changes its availability. Although the route uses authentication middleware, the controller does not verify that the room belongs to the authenticated owner's hotel.

Add an ownership check before using this operation in a public production environment.

### 📅 Protect Booking Availability

The current availability flow checks for overlapping bookings and checks again during booking creation. For high-traffic production use, consider a stronger concurrency-safe reservation strategy so simultaneous requests cannot reserve the same room/date range.

### 💳 Refund Handling

The cancellation controller changes the booking status to `cancelled`. It does not automatically create a Stripe refund. A paid booking cancellation currently returns a message that payment is not refunded automatically.

### 📊 Dashboard Revenue Calculation

The current hotel booking controller calculates `totalRevenue` by summing the `totalPrice` of the hotel's booking records. It does not filter that sum to paid bookings only or exclude cancelled bookings. Treat it as a sum of booking amounts, not verified collected revenue, until the calculation is updated.

### 🧾 Payment Currency

Stripe Checkout currently uses USD (`usd`) in the backend. The frontend currency symbol and the email currency prefix are separate settings. Configure these values consistently before accepting real payments.

### 🖼️ File Upload Validation

The current room upload route limits the number of images to four. Before production, also enforce file size, file type, and other upload validation rules on the server.

### 🧑‍⚖️ User and Owner Access

Keep protected routes behind authentication and add resource ownership checks to every operation that reads or modifies owner-specific records. Do not rely only on hiding buttons in the React interface.

---

## 🚧 27. Future Improvements

Possible improvements for the project include:

- ✅ Add automated tests for user, hotel, room, and booking APIs.
- 🔐 Add stronger owner/resource authorization checks.
- 🧾 Add Stripe webhook processing for reliable asynchronous payment updates.
- 💸 Add a proper refund workflow for eligible cancellations.
- 📊 Calculate dashboard revenue from paid and non-cancelled bookings.
- 📅 Add concurrency-safe room reservations.
- 🖼️ Add upload size, MIME type, and image validation.
- 🔎 Add server-side pagination and filtering for large room lists.
- ⭐ Add a persistent hotel and room review system.
- 🗺️ Add map-based hotel discovery.
- 📧 Add automated email templates for cancellation and payment updates.
- 📬 Add a newsletter delivery/marketing integration.
- 💬 Connect the Help Bot to a real support backend if dynamic assistance is required.
- 📈 Add logging, monitoring, and error tracking.
- 📄 Add OpenAPI/Swagger API documentation.
- 🔄 Add a CI workflow for linting and build verification.

---

## 👨‍💻 28. Author

**Vikas Kumar**

- GitHub: [@VikasKumar281](https://github.com/VikasKumar281)
- Project: [QuickStay](https://github.com/VikasKumar281/QuickStay)

---

<p align="center">
  <strong>🏨 QuickStay</strong>
  <br />
  Find your stay. Book with confidence. Manage with ease.
</p>
