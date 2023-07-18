// Create web server
// 1. Create a web server
// 2. Create a router object
// 3. Register a handler for the root path
// 4. Register a handler for the /comments path
// 5. Register a handler for the /hello path
// 6. Start listening for requests

var http = require('http');
var url = require('url');
var comments = require('./comments.js');

// 1. Create a web server
var server = http.createServer();

// 2. Create a router object
var router = {
  '/': function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Welcome to the homepage!\n');
  },
  '/comments': function(req, res) {
    switch (req.method) {
      case 'POST':
        comments.create(req, res);
        break;
      case 'GET':
        comments.list(req, res);
        break;
      default:
        res.writeHead(405);
        res.end(http.STATUS_CODES[405] + '\n');
    }
  },
  '/hello': function(req, res) {
    var name = url.parse(req.url, true).query.name;
    if (name) {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello ' + name + '\n');
    } else {
      res.writeHead(400);
      res.end(http.STATUS_CODES[400] + '\n');
    }
  }
};

// 3. Register a handler for the root path
// 4. Register a handler for the /comments path
// 5. Register a handler for the /hello path
server.on('request', function(req, res) {
  var pathname = url.parse(req.url).pathname;
  if (router[pathname]) {
    router[pathname](req, res);
  } else {
    res.writeHead(404);
    res.end(http.STATUS_CODES[404] + '\n');
  }
});

// 6. Start listening for requests
server.listen(3000);