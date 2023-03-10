import bcyrpt from "bcrypt";
import User from "../models/User.js";
import passport from "passport";
import RequestService from "../services/RequestService.js";

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
  if (password !== password2) {
    return res.render("signup", { message: "Password no match" });
  }

  // Username verification

  // create User
  let reqInfo = RequestService.reqHelper(req);
  console.log(reqInfo);
  const newUser = new User({
    username,
  }); // Uses passport to register the user. // Pass in user object without password // and password as next parameter.
  User.register(new User(newUser), password, (err, account) => {
    // Show registration form with errors if fail.
    if (err) {
      return res.render("signup", {
        message: err,
      });
    }
    return res.render("signup", { message: "Success to Sign up!" });
    // User registered so authenticate and redirect to secure // area.
    // passport.authenticate("local")(req, res, () => {
    //   return res.render("signup", { message: "Success to Sign up!" });
    // });
  });
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
