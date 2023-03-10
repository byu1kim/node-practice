import "dotenv/config";
import express from "express";
import authRouter from "./routers/authRouter.js";
import mongoose from "mongoose";

import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/User.js";

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

app.use(
  session({
    secret: "a long time ago in a galaxy far far away",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate())); //passport + passport-local
passport.serializeUser(User.serializeUser()); //passport + mongoose
passport.deserializeUser(User.deserializeUser()); //passport + mongoose

app.set("views", process.cwd() + "/views");
app.set("view engine", "ejs");

// Router
app.use(authRouter);

// App Listening
app.listen(port, () => {
  console.log(`✅ App listening on port : ${port}`);
});
