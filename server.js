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

// Get our API routes
const auth = require('./server/routes/auth')(passport);
const post = require('./server/routes/post')(passport);
const phone = require('./server/routes/phone')(passport);
// Set our api routes
app.use(post);
app.use(phone);
app.use(auth);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8089';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
