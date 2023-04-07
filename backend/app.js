const express = require('express');
const ErrorHandler = require('./Middleware/error');

const app = express();
app.use(express.json());

// Importing routes
const userRoutes = require('./Routes/userRoutes')


// using middlewares

app.use("/api/v1",userRoutes);

app.use(ErrorHandler);
module.exports = app;