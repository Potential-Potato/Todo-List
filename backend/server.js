if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://todo-list-a4fs.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  })
);

app.use("/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});
