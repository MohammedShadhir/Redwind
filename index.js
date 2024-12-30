require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

// Importing routes
const brandRoutes = require("./routes/brandRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stocksRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderItemRoutes = require("./routes/orderItemRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const authRoutes = require("./routes/authRoutes");

// Create the app instance
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Database connection
connectDB();

// Base API routes
const apiRoutes = [
  { path: "/api/brands", handler: brandRoutes },
  { path: "/api/products", handler: productRoutes },
  { path: "/api/stocks", handler: stockRoutes },
  { path: "/api/reviews", handler: reviewRoutes },
  { path: "/api/users", handler: userRoutes },
  { path: "/api/category", handler: categoryRoutes },
  { path: "/api/orders", handler: orderRoutes },
  { path: "/api/orderitems", handler: orderItemRoutes },
  { path: "/api/wishlist", handler: wishlistRoutes },
  { path: "/api/auth", handler: authRoutes },
];

// Dynamically load routes
apiRoutes.forEach(({ path, handler }) => app.use(path, handler));

// Server Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
