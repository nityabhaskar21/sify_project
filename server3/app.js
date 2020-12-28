var express = require('express');
var path = require('path');
var cors = require('cors')

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders')

var app = express();
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
//app.use('/employees', usersRouter);
app.use(cors({
  origin: "http://localhost:4200"
}))

app.listen(6060, function () {
  console.log("Server Started! at 6060")
})
module.exports = app;