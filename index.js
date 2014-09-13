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
   console.log('a user connected');  
   io.sockets.on('sound', function(msg){
      console.log('message: ' + msg);
      try {
      midiOut.sendMessage(help.noteOn(msg.note, msg.velocity));
    } catch(error) {
      console.log(error);
    }
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});




