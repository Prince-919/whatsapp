import app from "./app.js";
import logger from "./config/logger.config.js";

// ENV variables
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger.info(`Server is listening on ${PORT}...`);
});
