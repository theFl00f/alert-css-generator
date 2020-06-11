var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var alertsRouter = require('./routes/alerts');

var app = express();

//mongoose setup

var Mongoose = require('mongoose');
var url = 'mongodb://username:passw0rd@ds239009.mlab.com:39009/heroku_szr6bxv6'

Mongoose.connect(url, { useNewUrlParser: true })

var db = Mongoose.connection

db.once('open', _ => {
  console.log('database connected: ', url)
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/', alertsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(3000, () => {
  console.log('listening at port 3000')
})

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
