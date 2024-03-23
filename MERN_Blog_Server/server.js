import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI;

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcomme" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected :) ");
  })
  .catch((err) => {
    console.log(err);
  });
