const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'dev';
const config = require('./server.config')[env];


const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');

mongoose.connect(config.mongoUrl);

const passport = require('passport');
app.use(passport.initialize());

var initPassport = require('./server/passport/init');
initPassport(passport);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use(function (req, res, next) {
  var start = Date.now();
  res.on('finish', function () {
    var duration = Date.now() - start;
    console.log(req.url, duration)
  });
  next();
});

// Get our API routes
const auth = require('./server/routes/auth')(passport);
const contactApi = require('./server/routes/contact')(passport);
const post = require('./server/routes/post')(passport);
const phone = require('./server/routes/phone')(passport);
const stripe = require('./server/routes/stripe')(passport);
const analytics = require('./server/routes/analytics')(passport);


// Set our api routes
app.use(post);
app.use(phone);
app.use(stripe);
app.use(auth);
app.use(analytics);
app.use(contactApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

if (env == 'production') {
  var Rollbar = require("rollbar");
  var rollbar = new Rollbar({
    accessToken: config.rollbar_key,
    handleUncaughtExceptions: true,
    handleUnhandledRejections: true
  });
  app.use(rollbar.errorHandler());
}

const port = process.env.PORT || '8089';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
