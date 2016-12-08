var querystring = require("querystring");

function start(response, postData) {
  console.log("Request handler 'start' was called");
  var content = "empty";

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    'Enter your nickname'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="1" cols="30"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();

  return content;
}

function upload(response, postData) {
  console.log("Request handler 'upload' was called");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Your nickname: " + querystring.parse(postData).text);
  response.end();
}

exports.start = start;
exports.upload = upload;
