var mongoose = require("mongoose");
const Schema = mongoose.Schema

const TodoSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    }
})

module.exports = Todo = mongoose.model("todo", TodoSchema)