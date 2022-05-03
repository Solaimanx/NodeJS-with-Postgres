const express = require("express");
const PORT = 3000;
const app = express();
app.use(express.json());
const pool = require("./db");

// Routes

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    console.log(error);
  }
});

// get a todo

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// create a todo

app.post("/todos", async (req, res) => {
  const { description } = req.body;

  try {
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) returning *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params; /// WHERE
  const { description } = req.body; /// SET

  try {
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );


    res.json("Todo update successfully");
  } catch (error) {
    console.log(error);
  }
});


// delete a todo

app.delete('/todos/:id', async (req , res)=>{
    const { id  }  = req.params

    try{
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])

        res.json("Todo was successfully deleted")
    }catch(error){
        console.log(error)
    }

})



app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});
