const express = require('express');
const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const flash = require('connect-flash');
var session = require('express-session');
const xss = require('xss-clean');


const viewsCustomerRoute = require('./routes/viewsCustomerRoute');
const viewsAdminRoute = require('./routes/viewsAdminRoute');



const app = express();

// Middlewares 

    //Set security HTTP Headers
app.use(helmet());

    // Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(mongoSanitize());

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
    })
);
app.use(flash());
app.use(cors());
app.options('*', cors());
app.use(xss());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', viewsCustomerRoute);
app.use('/admin', viewsAdminRoute);

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