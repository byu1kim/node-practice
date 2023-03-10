import bcyrpt from "bcrypt";
import User from "../models/User.js";

export const index = (req, res) => {
  res.render("index");
};

// GET Signup
export const signup = (req, res) => {
  res.render("signup", { message: "" });
};

// POST Signup : Plain
export const postSignup = async (req, res) => {
  const { username, password, password2 } = req.body;

  // Password match

  // Username verification

  // create User

  res.render("signup", { message: "Sined up!" }); //or redirect to login page
};

// GET Login
export const login = (req, res) => {
  res.render("login", { message: "" });
};

// POST Login
export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  // User verification

  // Password verification

  // Store login information to session

  res.render("login", { message: "Logged In" });
};

export const logout = (req, res) => {
  res.redirect("/");
};
export const profile = (req, res) => {
  res.render("profile");
};

/* request properties
httpVersionMajor
httpVersionMinor
httpVersion
complete
rawHeaders
rawTrailers
aborted
upgrade
url
method
statusCode
statusMessage
client
next
baseUrl
originalUrl
params
query
res 
route */
