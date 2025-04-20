if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-list-a4fs.onrender.com", // replace with your actual Render static site URL
];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
