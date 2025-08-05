# QuickStay

## Frontend =>
- Create your react project using Vite package
  - Command => npm create vite@latest .

- Install the Dependencies
  - Use the Command => npm install .

- Install  react-router-dom in the project
  - Command => npm react-router-dom .

- Create the Navigation bar using prebuiltUI .
 
- Use Clerk for Authentication =>
  - Install Clerk package in project using command => npm install @clerk/clerk-react.

  - Set your clerk api key using .env file .

- Upload the Project on Github using the commands =>
  - git init
  - git add client
  - git commit -m "first commit"
  - git branch -M main
  - git remote add origin your gitub repo link
  - git push -u origin main

- Created the Hero Component and set the background image of home page .

- Created Featured Destination Section in Home page .

- Created Exclusive Offers Section in Home page .

- Created Users Testimonial Section in Home page
  - I use prebuiltUI's Testimonial Section code .

- Created Newsletter Subscription section .


- Created Footer Section .

- Created Hotel Rooms Page .

- Created Room Details Page .

- Created My Bookings Page .

- Created Admin Dashboard =>
  - Created Dashboard Page .
  - Created Add Room Page .
  - Created List Room Page .


## Backend =>

- Create a server folder
  - create a server.js file
  - create package.json file using the command => npm init -y .

  - Install these packages =>
    - npm i express dotenv cors mongoose cloudinary multer svix .

  - Install nodemon => npm i --save-dev nodemon 
    - nodemon automatically restarts your Node.js app whenever you make changes to the code.

    - For latest version of nodemon use command => npm install -D nodemon@latest .

  - Connect mongoDB database.
  
  - Install clerk package => npm install @ clerk/express.
  
  - Create a Svix instance with clerk webhook secret.

  - Setup Clerk authentication in Backend.

  - Create API for users.

  - Created the API for Hotels =>
    - Create the API for add the rooms in hotel and get the list of rooms.
    
    - Connected the Cloudinary where we store the images.

    - Created an API to fetch all rooms.

    - Created an API to get all rooms for a specific hotel

- Created Booking API

- Now we will connect the Backend to Frontend

- Install 2 packages 'axios' and 'react-hot-toast' => npm i axios react-hot-toast

- Created 'List Your Hotel' button on Navbar 

 

