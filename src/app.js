import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";

// dotEnv config
dotenv.config();

// create express app
const app = express();

//Morgan
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
// helmet
app.use(helmet());

// Parse req json
app.use(express.json());

// Parse req body
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(mongoSanitize());

// Enable cookie parser
app.use(cookieParser());

// gzip compression
app.use(compression());

// file upload
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// cors
app.use(cors());

app.get("/test", (req, res) => {
  res.send(req.body);
});

export default app;
