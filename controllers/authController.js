import User from "../models/User.js";
import passport from "passport";
import _userOps from "../data/userOps.js";

export const index = (req, res) => {
  res.cookie("a", "hoho");
  res.render("index", { message: "" });
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

  const newUser = new User({
    username,
  });

  // Verify username and Create user
  User.register(new User({ username }), password, (err, user) => {
    if (err) {
      return res.render("signup", {
        message: err,
      });
    }
    // Login
    passport.authenticate("local")(req, res, () => {
      return res.redirect("/secure");
    });
  });
};

// GET Login
export const login = (req, res) => {
  let message = req.query.message;
  res.render("login", { message });
};

// POST Login
export const postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login?message=Invalid login.",
  })(req, res, next);
};

// Logout
export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/login");
    }
  });
};

export const profile = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("profile", { message: "" });
  } else {
    res.redirect("/login?message=You must be logged in to view this page.");
  }
};

export const secure = (req, res) => {
  res.render("secure");
};

export const admin = async (req, res) => {
  const authorized = ["Admin"];
  if (req.isAuthenticated()) {
    const matchingRoles = req.roles?.filter((role) => authorized.includes(role));
    if (matchingRoles.length > 0) {
      return res.render("admin", { message: "" });
    } else {
      return res.redirect("/login?message=You must be a admin to access this area.");
    }
  } else {
    return res.redirect("/login?message=You must be a admin to access this area.");
  }
};

export const manager = async (req, res) => {
  const authorized = ["Admin", "Manager"];
  if (req.isAuthenticated()) {
    const matchingRoles = req.roles?.filter((role) => authorized.includes(role));
    if (matchingRoles.length > 0) {
      return res.render("manager", { message: "" });
    } else {
      return res.redirect("/login?message=You must be a manager or admin to access this area.");
    }
  } else {
    return res.redirect("/login?message=You must be a manager or admin to access this area.");
  }
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
