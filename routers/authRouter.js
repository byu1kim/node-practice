import express from "express";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/", authController.index);

authRouter.get("/login", authController.login);
authRouter.post("/login", authController.postLogin);

authRouter.get("/signup", authController.signup);
authRouter.post("/signup", authController.postSignup);

authRouter.get("/logout", authController.logout);
authRouter.get("/profile", authController.profile);
authRouter.get("/secure", authController.secure);
authRouter.get("/admin", authController.admin);
authRouter.get("/manager", authController.manager);
export default authRouter;
