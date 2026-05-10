import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Instagram");
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

export default app;
