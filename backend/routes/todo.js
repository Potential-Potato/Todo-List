const express = require("express");
const pool = require("../db/db");
const router = express.Router();

//get all todo
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC");
    res.json(result.rows);
  } catch (error) {
    console.log("error:", error);
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//post todo
router.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json({ todo: newTodo.rows[0], message: "Post todo sucessfully!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json({ message: "Todo was updated" });
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json({ message: "Todo was deleted" });
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
