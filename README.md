# CodeAlpha E-Commerce Store

A full-stack e-commerce web application built with Node.js, Express, EJS, and MongoDB. The project includes user authentication, product management, shopping cart functionality, and a simple checkout flow backed by server-side sessions.

## Overview

This project was built as an e-commerce store experience where users can:

- Register and log in securely
- Browse available products
- Search products by title
- View detailed product pages
- Add products to a shopping cart
- Increase or decrease item quantities
- Checkout and generate orders
- Manage products they have uploaded

## Features

- Session-based authentication with persistent login sessions
- Password hashing using `bcryptjs`
- Product creation, editing, and deletion
- Product listing and single-product detail pages
- Search support for product titles
- Cart management with quantity updates
- Order creation from cart items
- Separate page for user-uploaded products
- MongoDB-backed session storage with `connect-mongo`

## Tech Stack

- `Node.js`
- `Express.js`
- `EJS`
- `MongoDB`
- `Mongoose`
- `express-session`
- `connect-mongo`
- `bcryptjs`
- `nodemon`

## Project Structure

```text
CodeAlpha_EcommerceStore/
|- app.js
|- config/
|  `- db.js
|- controllers/
|  |- authController.js
|  `- productController.js
|- middleware/
|  `- authMiddleware.js
|- models/
|  |- Cart.js
|  |- Order.js
|  |- Product.js
|  `- User.js
|- public/
|- routes/
|  |- authRoutes.js
|  `- productRoutes.js
`- views/
   |- partials/
   `- pages/
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/hammad308/CodeAlpha_EcommerceStore.git
cd CodeAlpha_EcommerceStore
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root and add:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=3000
```

4. Start the development server:

```bash
npm run dev
```

5. Open the app in your browser:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - starts the app with `nodemon`
- `npm start` - starts the app with Node.js

## Main Routes

- `/` - Home page
- `/register` - User registration
- `/login` - User login
- `/logout` - User logout
- `/products` - View all products
- `/products/:id` - View product details
- `/add-product` - Add a new product
- `/cart` - View shopping cart
- `/orders` - View placed orders
- `/user-uploads` - Manage uploaded products

## Environment Variables

The app uses the following environment variables:

- `MONGO_URI` - MongoDB connection string
- `SESSION_SECRET` - secret used to sign session data
- `PORT` - application port, optional if you want something other than `3000`

## Screenshots

- Home page
  
  <img width="1896" height="980" alt="image" src="https://github.com/user-attachments/assets/b496f72f-8997-4214-8e0c-fddafcdf0616" />

- Product listing page
  
  <img width="1869" height="986" alt="image" src="https://github.com/user-attachments/assets/13511c40-f27d-4e7e-97c0-1cf1c0a41c75" />

- Product details page
  
  <img width="1870" height="956" alt="image" src="https://github.com/user-attachments/assets/e8af245d-ace3-43b6-88ff-814a8b5e9998" />

- Cart page
  
  <img width="1828" height="977" alt="image" src="https://github.com/user-attachments/assets/460b0e33-7e65-44d8-a400-8efad4538b31" />

- Orders page
  
  <img width="1813" height="991" alt="image" src="https://github.com/user-attachments/assets/d1f2fe2f-5d0b-4fbf-a6cd-4fa9588bf400" />


## Future Improvements

- Add image upload support instead of manual image URLs
- Improve form validation and user-facing error messages
- Add product categories and filters
- Add admin and customer role separation
- Integrate an online payment gateway
- Add automated tests

## What I Learned

This project is a practical example of how to combine:

- Express routing and middleware
- EJS server-rendered views
- MongoDB schema design with Mongoose
- Session handling in a full-stack Node.js app
- Core e-commerce flows like cart management and checkout

## Author

Replace this section with your own details before publishing:

- Name: Muhammad Hammad Ali
- GitHub: `https://github.com/hammad308`
- LinkedIn: `https://linkedin.com/in/your-profile`

## License

This project is currently shared for learning and portfolio purposes.
