var http = require('http');
var url = require('url');
var requestHandler = require('./request-handler.js');

url.port = 3000;

url.ip = '127.0.0.1';

var server = http.createServer(requestHandler.requestHandler);
console.log('Listening on http://' + url.ip + ':' + url.port);
server.listen(url.port, url.ip);





// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.