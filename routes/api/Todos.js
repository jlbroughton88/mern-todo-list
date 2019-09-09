const express = require("express");
const router = express.Router();

// Todo Model
const Todo = require("../../models/Todo")

// @route GET /api/todos
// @route Get All Todos
// @access Public
// put "/" because Todos in server.js is already pointing to ./api/Todos
    // Already in that route at this point, use "/"
router.get("/", (req, res) => {
    Todo.find()
    .sort({ date: -1 })
    .then(Todo => res.json(Todo))
})

// @route Post /api/todos
// @route Post a todo
// @access Public
router.post("/", (req, res) => {
    // Creating in memory
    const newTodo = new Todo({
        task: req.body.task,
        from: req.body.from
    });

    // Saving to the database
    // then gives back the item its saving, we want to get the json from it
    newTodo.save()
    .then(todo => res.json(todo))
})

// @route Delete /api/todos/:id
// @route Delete a Todo
// @access Public
// if remove() is successful, send object notifying it is successful
router.delete("/:id", (req, res) => {
    Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({success: true}))
    ).catch(err => res.status(404).json({ success: false }))
})


module.exports = router;