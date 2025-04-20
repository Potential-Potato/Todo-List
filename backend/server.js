require("dotenv").config();

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    // process.env.NODE_ENV === "production"
    //   ? "https://todo-list-a4fs.onrender.com"
    //   : "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use((err, req, res, next) => {
  console.error("Error message:", err.message);
  console.error("Stack trace:", err.stack);
  res.status(500).json({ message: "Server error", error: err.message });
});

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
