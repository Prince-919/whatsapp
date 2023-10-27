import dotenv from "dotenv";
import app from "./app.js";
// dotEnv config
dotenv.config();

// ENV variables
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});