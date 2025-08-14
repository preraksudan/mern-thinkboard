import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

// Load env variables early
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse incoming JSON req.body
app.use(express.json());

// Rate limiter middleware
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  });
