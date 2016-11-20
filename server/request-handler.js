var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};
var messages = [
  { 
    username: 'Paige', 
    message: 'hello world',
    objectId: 0
  }
];
var idCounter = 0;


var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (request.method === 'OPTIONS') {

    var statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(null);

  } else if (request.url === '/classes/messages/?order=-createdAt' || request.url === '/classes/messages' || request.url === '/classes/messages/') {

    if (request.method === 'GET') {
      var statusCode = 200;
      response.writeHead(statusCode, headers);  
      response.end(JSON.stringify({results: messages}));

    } else if (request.method === 'POST') {

      request.on('data', function(message) {
        message = JSON.parse(message);
        idCounter++; 
        message.objectId = idCounter;
        messages.unshift(message);
      });

      request.on('end', function() {
        var statusCode = 201;
        response.writeHead(statusCode, headers);
        response.end();
      });
    }

  } else {

    var statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(null);
  }

};

module.exports.requestHandler = requestHandler;

