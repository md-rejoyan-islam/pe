import dotenv from "dotenv";
import app from "./app/index.js";
import connectDatabase from "./config/db.js";

// port configuration
dotenv.config();

const PORT = process.env.PORT || 5000;

// server listen
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// unhandled promise rejection error handler
process.on("unhandledRejection", async (error, promise) => {
  console.error(error.name);
});
