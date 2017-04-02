//Starting point of the app
var express =require('express');
var app =express();
var path =require('path');
var favicon = require('serve-favicon');
router =express.Router();
var bodyParser=require('body-parser');
var multer  = require('multer');
var Upload = multer({ dest: './uploads/'});
var mainRoute = require('./server/routes/mainRoute.js'); //for routing


//Use the requires
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //for website icon
app.use(bodyParser.json());//Read and parse the data sent from HTML form
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', mainRoute);// use this file for all your API calls
//This is for view handle bar
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//To set the view for client site
app.use(express.static(path.join(__dirname, 'public')));



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

module.exports = app;
