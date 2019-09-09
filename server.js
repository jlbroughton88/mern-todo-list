const express = require("express")
const app = express();
const port = process.env.PORT || 5003;
const mongoose = require("mongoose")
const mongoURI = require("./config/keys")
const Todos = require("./routes/api/Todos")
const db = mongoURI

// Express BodyParser Middleware (BodyParser is now part of express)
// Allows me to use app.use()
app.use(express.json())

mongoose.connect(db, {useNewUrlParser: true})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// Use Routes
// Will give an error that says "app.use() requires a middleware function"
    // Routes file is empty and needs a router function
app.use("/api/todos", Todos)

app.listen(port, (req, res) => console.log(`Server listening on port ${port}`))

