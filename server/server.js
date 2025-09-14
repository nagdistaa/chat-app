import cors from "cors";
import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
// !Start
const app = express();
// !Variables

// !Middlewares
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5001;
// !Routes
app.get("/", (_, res) => {
  res.send("server is live | Chat App");
});
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// !Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
