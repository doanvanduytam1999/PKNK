const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');



const app = express();

// Middlewares 
    //Set security HTTP Headers
//app.use(helmet());
    // Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
//Routes
app.get('/', (req, res, next) =>{
    return res.status(200).render('./khachhang/index',{});
})
//Catch 404 Erros and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})
//Error handler function
app.use(() => {
    const error = app.get('env') === 'development' ? err: {};
    const status = error.status || 500;

    //res to client
    res.status(status).json({
        error: {
            Message: error.Message
        }
    })
}) 

module.exports = app;