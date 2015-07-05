var utils = require('./utils');
var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var port = process.env.port || 3000;

// Static assets
app.use(express.static(__dirname + '/../public'));
app.use('/vendor', express.static(__dirname + '/../vendor'));
app.use('/js', express.static(__dirname + '/../app/js'));
app.use('/views', express.static(__dirname + '/../app/views/'));

// Favicon
app.use(favicon(__dirname + '/../public/img/favicon.ico'));

// App dist
app.use(express.static(__dirname + '/../dist/'));

// Fake API
app.use('/api', express.static(__dirname + '/../api/'));

// Root
app.get('/*', function(req, res, next) {
  utils.sendFile(__dirname + '/../app/views/layout/index.html', res, next);
});

app.use('/favicon.ico', function(req, res, next) {

});

// ¯\(°_o)/¯
app.use('*', function(req, res, next) {
  console.error('Not found: ', req.baseUrl);
  res.status(404).send('Page not found');
});

app.listen(port);
console.log("App listening on port " + port + "...");
