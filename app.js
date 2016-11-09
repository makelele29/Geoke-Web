var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose     = require('mongoose');
var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);
app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// connect to our database
var uristring =process.env.MONGOHQ_URL || 'mongodb://localhost:27017/database';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;
mongoose.Promise = global.Promise
mongoose.connect(uristring);
mongoose.connection.on('error', function() {
  console.info('Mongodb server no esta activado. sudo service mongod start');
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(theport, function() {
  console.log('Express server listening on port ' + theport);
});

module.exports = app;
