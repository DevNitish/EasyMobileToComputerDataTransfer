//Starting point of the app
var express =require('express');
var app =express();
var path =require('path');
var favicon = require('serve-favicon');
var router =express.Router();
var bodyParser=require('body-parser');
var multer  = require('multer');
var Upload = multer({ dest: './uploads/'});
var os = require('os');
var ifaces = os.networkInterfaces();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      console.log("the body==",file)
      var filename = file.originalname;
        cb(null, filename);
  }
})
//can be used to store files onserver side 
var Upload =multer({ storage:storage });
router.post('/testPost', Upload.single('file'), function(req, res,next) {
       console.log(req.body) // this contains all text data
    console.log("my fileu",req.file) // this is always an empty array
//
});
	
'use strict';

var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});


//Use the requires
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //for website icon
app.use(bodyParser.json());//Read and parse the data sent from HTML form
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',router);
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
