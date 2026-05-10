import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

configDotenv();
connectToDb();

app.listen(process.env.PORT, () => {
  console.log(`app is listening on PORT ${process.env.PORT}`);
});
