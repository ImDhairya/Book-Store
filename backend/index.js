import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import {PORT} from "./config.js";
import {log} from "console";

const app = express();
app.use(express.json()); // Corrected here
app.use(cors());
dotenv.config();
import bookRoutes from "./routes/bookRoutes.js";
import {Book} from "./models/bookModels.js";

mongoose
  .connect(process.env.URL)
  .then(console.log("Mongoose is now connected"))
  .catch((error) => {
    console.log(error);
  });

app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to homepage");
});

app.listen(4000, () => {
  console.log("Listening to 4000");
});
