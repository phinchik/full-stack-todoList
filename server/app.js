const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./models/todo");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://todo:jendon_02@ds115768.mlab.com:15768/todo",
  () => {
    console.log("connected to mlab");
  }
);

app.post("/todo", (req, res) => {
  const todoValue = req.body.value;

  Todo.create({
    text: todoValue
  }).then(() => {
    Todo.find({}).then(todos => {
      res.send(todos);
    });
  });
});

app.get("/todo", (req, res) => {
  Todo.find({}).then(todos => {
    res.send(todos);
  });
});

app.delete("/todo", (req, res) => {
  const todoId = req.body.value;
  const completedTodos = req.body.completedTodos;

  if (todoId) {
    Todo.findByIdAndDelete({
      _id: todoId
    })
      .then(todo => {
        res.send(todo._id);
      })
      .catch(err => console.log(err));
  } else {
    Todo.deleteMany({ _id: { $in: completedTodos } })
      .then(todos => {
        res.send(todos);
      })
      .catch(err => console.log(err));
  }
});

app.put("/todo", (req, res) => {
  const todoValue = req.body.value;
  const todoId = req.body.id;
  const completed = req.body.completed;

  if (todoValue) {
    Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { text: todoValue, completed: false } },
      { new: true }
    )
      .then(todo => {
        res.send(todo);
      })
      .catch(err => console.log(err));
  } else {
    Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { completed: !completed } },
      { new: true }
    )
      .then(todo => {
        res.send(todo);
      })
      .catch(err => console.log(err));
  }
});

app.listen("5000", () => {
  console.log("the express is running on port 5000");
});
