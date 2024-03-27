import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

dotenv.config();

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI;

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcomme" });
});

app.use("/user", router);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected :) ");
    app.listen(PORT, () => {
      console.log(`Listening port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
