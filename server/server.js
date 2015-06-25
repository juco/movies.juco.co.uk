var utils = require('./utils');
var express = require('express');
var app = express();
var port = process.env.port || 3000;

// Static assets
app.use('/vendor', express.static(__dirname + '/../vendor'));
app.use('/js', express.static(__dirname + '/../app/js'));
app.use('/views', express.static(__dirname + '/../app/views/'));

// App dist
app.use(express.static(__dirname + '/../dist/'));

// Root
app.get('/', function(req, res, next) {
  utils.sendFile(__dirname + '/../app/views/layout/index.html', res, next);
});

// ¯\(°_o)/¯
app.use('*', function(req, res, next) {
  console.error('Not found: ', req.baseUrl);
  res.status(404).send('Page not found');
});

app.listen(port);
console.log("App listening on port " + port + "...");
