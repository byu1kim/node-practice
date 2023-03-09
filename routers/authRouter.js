import express from "express";
import * as authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/", authController.index);

authRouter.get("/login", authController.login);
authRouter.post("/login");

authRouter.get("/signup", authController.signup);
authRouter.post("/signup");

authRouter.get("/profile", authController.profile);

export default authRouter;
