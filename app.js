var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var LoginRouter =require ('./routes/login')
var cors=require('cors');
var app = express();
//var port = normalizePort('4200');

app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:3000'],
  credentials:true
}));

app.get('/',(req,res)=>{
  res.send('hello');
})


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/LWM', { useNewUrlParser: true });
//mongoose.connect('mongodb://user:pw@host1.com:27017/lunch', { useNewUrlParser: true })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', LoginRouter);
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

app.listen(3001,()=>{
  console.log('works');
})

// http.createServer(function (req, res) {
//   res.write('Hello World!'); //write a response to the client
//   res.end(); //end the response
// }).listen(8080);

module.exports = app;
