import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
const authRouter = express.Router();
// !GET
// !POST
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
// !PUT
// !DELETE
export default authRouter;
