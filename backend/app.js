require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

const connectDB = require('./config/dbConfig')
connectDB()

// here
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json({ limit: '50mb' }))
app.use(cors())


const indexRoute = require('./routes')
app.use(indexRoute)

// notfound error
const notFound = (req, res, next) =>
{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
app.use(notFound);


// errorMiddleware
const errorHandler = (err, req, res, next) =>
{
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
app.use(errorHandler);



app.listen(process.env.PORT, () =>
{
    console.log(`app is listening on port ${process.env.PORT}`,);
})