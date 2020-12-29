var express = require('express');
var cors = require('cors')

var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var orderRouter = require('./routes/orders')

var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', usersRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(cors({
  origin: "http://localhost:4200"
}))

app.listen(8080, function () {
  console.log("Server Started! at 8080")
})
module.exports = app;