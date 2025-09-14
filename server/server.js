import cors from "cors";
import "dotenv/config";
import express from "express";
import path from "path";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
// !Start
const app = express();
// !Variables
const __dirname = path.resolve();
// !Middlewares
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;
// !Routes
if (process.env.NODE_ENV !== "production") {
  app.get("/", (_, res) => {
    res.send("server is live | Chat App");
  });
}

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
// !Test
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
console.log(process.env.NODE_ENV);

// !Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
