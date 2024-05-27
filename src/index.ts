import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", router());

// Start Server
const PORT = process.env.SERVER_PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} 🚀`);
});
