# A&C Shopping Site - MERN Project 🛍️

Welcome to A&C Shopping Site, My MERN (MongoDB, Express.js, React.js, Node.js) project

## Project Structure 🏗️

The project is neatly organized into two main folders - `client` for the frontend and `server` for the backend. Follow the simple steps below to set up and run the application.

### Setup 🛠️

1. Install dependencies by running the following command in both the `client` and `server` folders:

   ```
   npm install
   ```

2. Create a `.env` file in the `server` folder with the following variables:

   ```
   MONGODB_URI=your_mongodb_url
   JWT_SECRET=your_jwt_secret
   MAIL_USER=your_email_address
   MAIL_PASS=your_email_password
   PORT=your_server_port
   ```

   Note: Replace placeholders with your actual MongoDB URL, JWT secret, email credentials, and server port.

### Running the Application 🚀

1. Move to the `client` folder and start the frontend:

   ```
   cd client
   npm start
   ```

   The frontend will be accessible at [http://localhost:3000](http://localhost:3000) by default.

2. Move to the `server` folder and start the backend using nodemon:

   ```
   cd server
   nodemon server.js
   ```

   The backend will be running at the specified port.

## Functionality 🎉

### Sign Up Page ✍️

The first page features a dynamic sign-up form with validation for each field. Upon successful submission, users are whisked away to the login page seamlessly. Any validation errors? No problem – clear messages guide you to the right inputs.

### Login Page 🔐

After signing up, users access the login page with a built-in forgot password functionality. Experience the convenience of nodemailer for OTP-based password reset. Reset your password hassle-free and get redirected back to the login or signup page.

### Product View Page 📦

Upon a successful login, dive into the captivating product view page. This page fetches real-time data from the [Fake Store API](https://fakestoreapi.com/products) and showcases product information on visually appealing cards. Enjoy the flexibility of adjusting quantities with intuitive increase and decrease buttons.

### Cart View Page 🛒

Love a product? Add it to your cart! The cart view page provides detailed information for each item.

### State and City Filtering 🌍

The sign-up form goes the extra mile with dynamic filtering. State names adjust based on the selected country, and city names dynamically filter based on the chosen state.

## Getting Started 🚀

Follow the setup and running instructions to embark on your shopping adventure. Don't forget to customize the `.env` file with your configurations.
