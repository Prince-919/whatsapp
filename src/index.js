import app from "./app.js";

// ENV variables
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}...`);
});
