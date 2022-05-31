import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "cakdol",
  port: 5432,
  database: "todolist",
});

// Get All Todo Lists
const getAllTodos = (req, res) => {
  pool.query(" SELECT * FROM todos ORDER BY todo_id ASC", (err, result) => {
    if (err) {
      return res.status(404).json({
        status: "failed",
        data: [],
      });
    }
    res.status(200).json({
      status: "success",
      data: result.rows,
    });
  });
};

// Get Single Todo
const GetSingleTodo = (req, res) => {
  const { todo_id } = req.params;
  pool.query(
    "SELECT * FROM todos WHERE todo_id=$1",
    [todo_id],
    (err, result) => {
      if (err) {
        return res.status(404).json({
          status: "not found",
          data: [],
        });
      }

      return res.status(200).json({
        status: "success",
        data: result.rows[0],
      });
    }
  );
};

// Create New Todo
const createTodo = (req, res) => {
  const { title, description } = req.body;
  pool.query(
    "INSERT INTO todos(title,description) VALUES ($1,$2)",
    [title, description],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          status: "failed",
          info: `Check your request again..`,
        });
      }
      return res.status(200).json({
        status: "success",
        info: `${title} added!`,
      });
    }
  );
};

// Delete Todo List
const deleteTodo = (req, res) => {
  const { todo_id } = req.params;
  pool.query("DELETE FROM todos WHERE todo_id=$1", [todo_id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "failed",
        info: `Check your request again..`,
      });
    }
    return res.status(200).json({
      status: "success",
      info: `todo with ${todo_id} deleted!`,
    });
  });
};

// Update Todo
const UpdateTodo = (req, res) => {
  const { todo_id } = req.params;
  const { title, description } = req.body;
  pool.query(
    "UPDATE todos SET title=($1), description=($2) WHERE todo_id=($3)",
    [title, description, todo_id],
    (err, result) => {
      if (err) {
        throw err;
      }
      return res.status(200).json({
        status: "success",
        info: "todo updated",
      });
    }
  );
};

export default {
  getAllTodos,
  createTodo,
  deleteTodo,
  GetSingleTodo,
  UpdateTodo,
};
