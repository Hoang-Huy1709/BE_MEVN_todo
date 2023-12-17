const express = require('express');
const connectDB = require('./db');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');


const app = express()
const port = 3000
connectDB()


// Handle CORS + middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // If using .fetch and not axios
    res.header("Access-Control-Allow-Headers", "Authorization,auth-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
})

//handle receive json from client
app.use(bodyParser.json())

//Create path to img file
app.use('/assets', express.static(path.join(__dirname, 'assets')));

//Routers config
const todoRouter = require('./routes/todoRoutes')
app.use('/todos',todoRouter)
const userRouter = require('./routes/userRoutes')
app.use('/users',userRouter)
const blogRouter = require('./routes/blogsRoutes')
app.use('/blogs',blogRouter)

app.get('/', (req, res) => {
    res.send('Hello The Hulk ')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})