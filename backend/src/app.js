import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello Instagram");
});

app.use("/api/auth", authRouter);
app.use("/api/post", upload.single("image"), postRouter);

export default app;
