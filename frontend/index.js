const BG_COLOUR = '#231f20';
const SNAKE_COLOUR = '#c2c2c2';
const FOOD_COLOUR = '#e66916';

// $('.card-section').each(function(){
//   $(this).on('click', function(){
//     alert('here');
//   });
// });
$( ".card-section" ).click(function() {
    if ( $( this ).hasClass("ui-draggable-dragging") ) {

}
});

$('.card-section').draggable({
  cursor: "grabbing",
  containment: ".place",
  stack: ".card-section",
  snapTolerance: 20
});


$('.flags').sortable();


$('.card-section').on('touchmove', function(){
// $(this).css({"left"}) =
});
const socket = io('https://degrassi-mountie-63053.herokuapp.com/');
// var perk1val = document.getElementsByClassName('perk3');
// var perk2val = document.getElementsByClassName('perk4');
// // console.log(perk2val.value);
// socket.emit('perks', {
//        perk1: perk1val.value,
//        perk2s: perk2val.value
//    });
socket.on('init', handleInit);
socket.on('gameState', handleGameState);
socket.on('gameOver', handleGameOver);
socket.on('gameCode', handleGameCode);
socket.on('unknownCode', handleUnknownCode);
socket.on('tooManyPlayers', handleTooManyPlayers);
socket.on('gameCode1', handleGameCode1);


const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const newGameBtn = document.getElementById('newGameButton');
const joinGameBtn = document.getElementById('joinGameButton');
const gameCodeInput = document.getElementById('gameCodeInput');
const gameCodeDisplay = document.getElementById('gameCodeDisplay');

newGameBtn.addEventListener('click', newGame);
newGameBtn.addEventListener('click', joinGame1);
joinGameBtn.addEventListener('click', joinGame);

$(joinGameBtn).on('click', function(){
  // alert($(gameCodeInput).val());
  const varPerks = perk();
$(gameCodeDisplay).html($(gameCodeInput).val())
$('.perk1').append(varPerks[0]);

});

function newGame() {
  const varPerks = perk();
  socket.emit('newGame');
  // alert('ng');
  init();
}

function joinGame1(perkData1, perkData2){
  // socket.emit('newGame1');
    $.getJSON("perks.json",function(data){
        var randIn = Math.floor(Math.random() * (data.perks.length));
        var randIn2 = Math.floor(Math.random() * (data.perks.length));
        var perkData1 = (data.perks[randIn].card);
        var perkData2 = (data.perks[randIn2].card);
        var perks = [perkData1, perkData2];
perk(perks);
    });


}
function perk(perks) {
  console.log(perks);
return perks;
}

function getPerksData(perks2){
$('.perk1').append('perks2');
$('.perk2').append(perkData2);
}
function joinGame() {
  const code = gameCodeInput.value;
  socket.emit('joinGame', code);
  init();
}

let canvas, ctx;
let playerNumber;
let gameActive = false;

function init() {
  initialScreen.style.display = "none";
  gameScreen.style.display = "block";
  //
  // canvas = document.getElementById('canvas');
  // ctx = canvas.getContext('2d');
  //
  // canvas.width = canvas.height = 600;
  //
  // ctx.fillStyle = BG_COLOUR;
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  //
  // document.addEventListener('keydown', keydown);

  $.getJSON('flags.json', function(data) {
    console.log(data);
    var randInt = Math.floor(Math.random() * (data.flags.length));
    var randInt2 = Math.floor(Math.random() * (data.flags.length));
      var randInt3 = Math.floor(Math.random() * (data.flags.length));
        var randInt4 = Math.floor(Math.random() * (data.flags.length));
    $('.flags >.card-section:first-child').append(data.flags[randInt].card);
    $('.flags >.card-section:nth-child(2)').append(data.flags[randInt2].card);
    $('.flags >.card-section:nth-child(3)').append(data.flags[randInt3].card);
    $('.flags >.card-section:last-child').append(data.flags[randInt4].card);
    // $('.card-section>p:nth-child(3)').append(data.flags[randInt2].card);

  });

  // $.getJSON("perks.json",function(data){
  //     var randIn = Math.floor(Math.random() * (data.perks.length + 1));
  //     var randIn2 = Math.floor(Math.random() * (data.perks.length + 1));
  //     // getPerks(randIn, randIn2, data);
  //
  //
  //     console.log(data);
  //     // alert('heree1');
  //
  // });



  // $.getJSON('perks.json', function(data) {
  // console.log(data);
  //
  // });

  gameActive = true;
}



function paintGame(state) {

}

function handleInit(number) {
  playerNumber = number;
}

function handleGameState(gameState) {
  if (!gameActive) {
    return;
  }


  gameState = JSON.parse(gameState);
  requestAnimationFrame(() => paintGame(gameState));
}

function handleGameOver(data) {
  if (!gameActive) {
    return;
  }
  data = JSON.parse(data);

  gameActive = false;

  if (data.winner === playerNumber) {
    // alert('You Win!');
  } else {
    // alert('You Lose :(');
  }
}

function handleGameCode(gameCode) {
  gameCodeDisplay.innerText = gameCode;
}
function handleGameCode1(gameCode1){
$.getJSON("perks.json",function(data){
    var randIn = Math.floor(Math.random() * (data.perks.length));
    var randIn2 = Math.floor(Math.random() * (data.perks.length));
    $('body').append('perkData');
});
}
function handleUnknownCode() {
  reset();
  alert('Unknown Game Code');
}

function handleTooManyPlayers() {
  reset();
  alert('This game is already in progress');
}


function reset() {
  playerNumber = null;
  // $('.perk1, .perk2').html('');
  gameCodeInput.value = '';
  initialScreen.style.display = "block";
  gameScreen.style.display = "none";
}
