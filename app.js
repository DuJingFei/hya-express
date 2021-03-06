var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));  //使用cookie中间件，传入签名123456进行加密
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('123456'));
app.use(session({
  secret: '123456',//与cookieParser中的一致
  resave: true,
  saveUninitialized:true
}));


app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var typeRouter = require('./routes/types');
var contactRouter = require('./routes/contact');
var service = require('./routes/service');


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', typeRouter);
app.use('/', contactRouter);
app.use('/', service);

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
