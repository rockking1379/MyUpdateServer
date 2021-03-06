var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var fs = require('fs');
var multer = require('multer');
var routes = require('./routes/index');
var users = require('./routes/users');
var products = require('./routes/products');
var files = require('./routes/files');
var github = require('./routes/github');

var app = express();
var sPathMiddle = stormpath.init(app, {
  apiKeyFile:'./data/stormpath/apiKey-3DAP3U05ID7J5G0JPIAOUV1WY.properties',
  application:'https://api.stormpath.com/v1/applications/4LGCOIWnltQX6wx8wHROu3',
  secretKey:'just_a_simple_test_string_for_using_this',
  expandCustomData:true,
  enableForgotPassword:false});
app.use(sPathMiddle);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(logger(':remote-addr [:date[web]] :method :url HTTP/:http-version :status :response-time ms - :res[content-length]', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest:'./uploads'}));

app.use('/', routes);
app.use('/users', users);
app.use('/products', products);
app.use('/files', files);
app.use('/github', github);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
