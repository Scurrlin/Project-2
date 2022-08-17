require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const commentsRouter = require('./routes/comments');
const songsRouter = require('./routes/songs');
// require the database file to establish the connection with the database file!
require('./config/database');
require('./config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,
  resave: false, 
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// this must be after the session middleware because it will use the session cookie
app.use(passport.initialize());
app.use(passport.session());
// this must be before our routes, because this will help identify 
// if the user is logged in or not

// Add this middleware BELOW passport middleware
app.use(function (req, res, next) {
  res.locals.user = req.user;
  // THIS WILL make a user variable availible in every single EJS templ
  next();
});

app.use('/', indexRouter);
app.use('/songs', songsRouter);
app.use('/', commentsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;