var http = require("http");
var url = require("url");
var Static = require("node-static");
var WebSocketServer = require("ws").Server;

var localhost = '127.0.0.1';
var hostname = '192.168.1.210';
var webSocketServerPort = 3001;
var staticServerPort = 3000;

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}`);
  });
  console.log("Server has started");
}

function startWS() {

  var clients = {};

  var wss = new WebSocketServer({server: "ws:" + hostname, port: webSocketServerPort});
  wss.on('connection', function(ws) {
    console.log
    // TODO ID func;
    // TODO add to online listeners
    var id = Math.random();
    clients[id] = ws;
    console.log("Connected: " + id);

    ws.on('message', function(message) {
      console.log("New message: " + message);

      for (var key in clients) {
        clients[key].send(message);
      }
    });

    // TODO remove from online listeners
    ws.on('close', function() {
      console.log("Connection for " + id + " closed");
      delete clients[id];
    });

  });

  var staticServer = new Static.Server('./src', { indexFile: "welcome.html" });
  http.createServer(function(request, response) {
    //staticServer.serveFile('/welcome.html', 200, {}, request, response);
    //staticServer.serveFile('/chat.html', 200, {}, request, response);
    staticServer.serve(request,response);
  }).listen(staticServerPort);

  console.log("Server created on port: " + staticServerPort);
}

exports.start = start;
exports.startWS = startWS;
