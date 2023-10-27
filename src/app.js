import express from "express";

// create express app
const app = express();

app.get("/test", (req, res) => {
  res.send("Hello from the other side!");
});

export default app;
