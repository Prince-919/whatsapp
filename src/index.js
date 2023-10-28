import mongoose from "mongoose";
import app from "./app.js";
import logger from "./config/logger.config.js";

// ENV variables
const PORT = process.env.PORT || 8000;
const { DATABASE_URL } = process.env;

// exit on mongodb error
mongoose.connection.on("error", (err) => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(1);
});

// debug in mode
if (process.env.NODE_ENV !== "production") {
  mongoose.set("debug", true);
}

// Mongo connection
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB.");
  });

let server = app.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}...`);
});

const errorHandle = () => {
  if (server) {
    logger.info("Server closed.");
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  errorHandle();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("uncaughtException", unexpectedErrorHandler);

// SIGTERM
process.on("SIGTERM", () => {
  if (server) {
    if (server) {
      logger.info("Server closed.");
      process.exit(1);
    }
  }
});
