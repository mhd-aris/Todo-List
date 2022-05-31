import express from "express";
import { urlencoded } from "express";
import db from "./queries.js";
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    info: "Hello wordl!",
  });
});

app.get("/todos", db.getAllTodos);
app.get("/todos/:todo_id", db.GetSingleTodo);
app.post("/todos", db.createTodo);
app.patch("/todos/:todo_id", db.UpdateTodo);
app.delete("/todos/:todo_id", db.deleteTodo);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
