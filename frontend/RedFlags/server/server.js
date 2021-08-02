const io = require('socket.io')();
const { initGame } = require('./game');
const { FRAME_RATE } = require('./constants');
const { makeid } = require('./utils');

const state = {};
const clientRooms = {};

io.on('connection', client => {
      // client.on('newGame1', handleNewGame1);
  client.on('newGame', handleNewGame);
  client.on('joinGame', handleJoinGame);
});

  function handleJoinGame(roomName) {

    const room = io.sockets.adapter.rooms[roomName];

    let allUsers;
    if (room) {
      allUsers = room.sockets;
    }

    let numClients = 0;
    if (allUsers) {
      numClients = Object.keys(allUsers).length;
    }

    if (numClients === 0) {
      client.emit('unknownCode');
      return;
    } else if (numClients > 9) {
      client.emit('tooManyPlayers');
      return;
    }

    clientRooms[client.id] = roomName;

    client.join(roomName);
    client.number = 2;
    client.emit('init', 2);

    startGameInterval(roomName);
  }

  function handleNewGame() {
    var length = 6;
    let roomName = makeid(length);
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName);

    state[roomName] = initGame();

    client.join(roomName);
    client.number = 1;
    client.emit('init', 1);

  }
  // function handleNewGame1(){
  //   var roomName1 = 'happy';
  //   client.emit('gameCode1', roomName1);
  // //   $.getJSON("perks.json",function(data){
  // //       var randIn = Math.floor(Math.random() * (data.perks.length + 1));
  // //       var randIn2 = Math.floor(Math.random() * (data.perks.length + 1));
  // // var perks = [randIn, randIn2];
  // //
  // //   });
  //
  // }






function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room)
    .emit('gameState', JSON.stringify(gameState));
}

// function displayPerks(room, getPerks){
//   io.sockets.in(room).emit('init', getPerks)
// }

function emitGameOver(room, winner) {
  io.sockets.in(room)
    .emit('gameOver', JSON.stringify({ winner }));
}


io.listen(process.env.PORT || 3000);