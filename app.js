var express = require('express');
var sassMiddleware = require('node-sass-middleware');
var logger = require('morgan');
var path = require('path');
var api = require('./api');
var app = express();

app.use(logger('dev'));

/** Setting sass preprocessor */
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/styles'),
    dest: path.join(__dirname, 'public/styles'),
    debug: true,
    force: true,
    prefix: '/styles'
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

/** Routing for main navigation links */
app.get('/:name', function(req, res) {
  res.sendfile(path.join(__dirname, 'public', 'new.html'));
});

/** Routing for secondary navigation links */
app.get('/:name1/:name2', function(req, res) {
  res.sendfile(path.join(__dirname, 'public', 'new.html'));
});

module.exports = app;