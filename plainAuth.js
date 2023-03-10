/* APP.JS */
import session from "express-session";
import MongoStore from "connect-mongo";

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

const localsMiddleware = (req, res, next) => {
  // view 에서 res.locals.aa는 aa로만 접근 가능
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user;
  console.log(req.session);
  next();
};

app.use(localsMiddleware);

/* MODEL */
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

/* CONTROLLER */
import bcyrpt from "bcrypt";
import User from "../models/User.js";

export const signup = (req, res) => {
  res.render("signup", { message: "" });
};

export const postSignup = async (req, res) => {
  const { username, password, password2 } = req.body;

  // Password match
  if (password !== password2) {
    return res.status(400).render("signup", { message: "Password does not match" });
  }

  // Unique username
  const exists = await User.exists({ username: username });
  //const exists = await User.exists({ $or: [{username}, {email}]})
  // exists return id if exists, if not it returns null

  if (exists) {
    return res.status(400).render("signup", { message: "User already exsits" });
  }

  // create User
  await User.create({ username, password });
  res.render("signup", { message: "Sined up!" }); //or redirect to login page
};

export const login = (req, res) => {
  res.render("login", { message: "" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;

  // User verification
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).render("login", { message: "User does not exists" });
  }

  // Password verification
  const passwordMatch = await bcyrpt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).render("login", { message: "Password does not match" });
  }

  // Store login information to session
  req.session.login = true;
  req.session.user = user;

  res.render("login", { message: "Logged In" });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
