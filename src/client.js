var socket = new WebSocket("ws://localhost:3001");

socket.onmessage = function(event) {

  var incomingMessage = event.data;
  showMessage(incomingMessage);

};

document.forms.publish.onsubmit = function() {

  var outgoingMessage = this.message.value;
  socket.send(outgoingMessage);
  return false;

};

function showMessage(message) {

  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message));
  document.getElementById('subscribe').appendChild(messageElem);

}
