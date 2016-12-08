var querystring = require("querystring");
var fs = require("fs");

function start(response, postData) {
  console.log("Request handler 'start' was called");

  fs.readFile("./src/welcome.html", function(err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, {'Content-Type': "text/html"});
      response.write(data);
    }
    response.end();
  });
}

function chat(response, postData) {
  console.log("Request handler 'chat' was called");

  fs.readFile("./src/chat.html", function(err, data) {
    if (err) {
      response.writeHead(404);
      response.write("Not Found!");
    } else {
      response.writeHead(200, {'Content-Type': "text/html"});
      response.write(data);
    }
    response.end();
  });
}

exports.start = start;
exports.chat = chat;
