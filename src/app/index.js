import cors from "cors";
import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import corsOptions from "../config/cors.js";
import { successResponse } from "../helper/responseHandler.js";
import errorHandler from "../middlewares/error-handler.js";
import feRouter from "../routes/fe.route.js";

// app initialization
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors configuration
app.use(cors(corsOptions));

// morgan setup
app.use(morgan("dev"));

// static files
app.use("/public", express.static("./public"));

// home route
app.get("/", (req, res) => {
  successResponse(res, {
    statusCode: 200,
    message: "Welcome to the  API",
  });
});

// health check route
app.get("/health", (req, res) => {
  successResponse(res, {
    statusCode: 200,
    message: "Server is up and running",
  });
});

// route setup
app.use("/api/v1/fe", feRouter);

// 404 page
app.use((_, __, next) => {
  next(createError(404, "Couldn't find this route."));
});

// error handler
app.use(errorHandler);

// export
export default app;
