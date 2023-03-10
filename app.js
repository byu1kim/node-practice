import "dotenv/config";
import express from "express";
import authRouter from "./routers/authRouter.js";
import mongoose from "mongoose";
import session from "express-session";

const app = express();
const port = process.env.PORT || 8000;

// DB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "❌ MongoDB connection error:"));
db.once("open", async function () {
  console.log(`✅ DB Connected`);
});

// Middlewares

app.use(express.urlencoded({ extended: true })); // add req.body

app.set("views", process.cwd() + "/views");
app.set("view engine", "ejs");

// Router
app.use(authRouter);

// App Listening
app.listen(port, () => {
  console.log(`✅ App listening on port : ${port}`);
});
