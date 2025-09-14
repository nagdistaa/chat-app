import express from "express";
import { send } from "../controllers/message.controller.js";
const messageRouter = express.Router();
// !GET
// !POST
messageRouter.post("/send", send);

// !PUT
// !DELETE

export default messageRouter;
