import app from "./app.js";
import logger from "./config/logger.config.js";

// ENV variables
const PORT = process.env.PORT || 8000;

let server = app.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}...`);
  console.log("process id", process.pid);
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
