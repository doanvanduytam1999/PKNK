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
const passport = require('passport');
const mongoose = require('mongoose');


const viewsCustomerRoute = require('./routes/viewsCustomerRoute');
const viewsAdminRoute = require('./routes/viewsAdminRoute');
const AppError = require('././utils/appError');
const customerRouter = require('./routes/customerRouter');
const userAdminRouter = require('./routes/userAdminRouter');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./controllers/errorController');
require('./passport-setup');
require('./passport-fb');


function Kt(req, res, next) {

    if(req.user){
        next();
    }else{
        res.send("Không có ai đăng nhập hết!");
    }
}

const app = express();

// Middlewares 

//Set security HTTP Headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(mongoSanitize());


app.use(cookieParser());
app.use(
    session({
        secret: 'my secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(cors());
app.options('*', cors());
app.use(xss());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
//Routes
app.get('/', (req, res)=> res.send("Đang không đăng nhập!"));
app.get('/failed', (req, res)=> res.send("Đăng nhập thất bại!"));
app.get('/good', Kt ,(req, res)=>{
    console.log(req.user.displayName);
    res.send(`Chào mừng ${req.user.displayName}!`)
} );

app.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}));

app.get('/google/callback', passport.authenticate('google',{failureRedirect: '/failed', successRedirect: '/good'})
);

app.get('/logout',(req, res)=>{
    req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
);

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


/* app.use('/', viewsCustomerRoute);
app.use('/admin', viewsAdminRoute);
app.use('/api/v1/Customers', customerRouter);
app.use('/api/v1/Admins', userAdminRouter); */
//app.use('/api/v1/userAdmins', userAdminRouter);

//Catch 404 Erros and forward them to error handler
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
})

//Error handler function
app.use(() => {
    const error = app.get('env') === 'development' ? err : {};
    const status = error.status || 500;

    //res to client
    res.status(status).json({
        error: {
            Message: error.Message
        }
    })
})

//CSP
app.use(function (req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'none' https://apis.google.com");
    return next();
});

/* app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
}); */

app.use(cors());
app.options('*', cors());
//app.use(globalErrorHandler);








module.exports = app;