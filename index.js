var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var midi = require('midi');
var help = require('midi-help');

midiOut = new midi.output();
midiOut.openVirtualPort('cool-port');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.sockets.on('connection', function(socket){
  console.log('Connected');
  socket.on('sound', function(msg){
    msg = JSON.parse(msg);
    try {
      midiOut.sendMessage([144, msg.note, msg.velocity]);
    } catch(error) {
      console.log(error);
    }
  });
});

http.listen(3000, function(){
  console.log('listening on port 3000');
});
