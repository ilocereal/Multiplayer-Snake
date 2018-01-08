let game = new Phaser.Game(950, 700 , Phaser.AUTO, "phaser", {
    preload: preload,
    create: create
});

socket = io();

let canvasWidth;
let canvasHeight;

let self;

let foodCounter;
let foods = [];
let players = [];
let potions = [];

let upgrades = {};
let enemies = [];
let timers = [];

let minimap;

let keyPresses = {
    keys: []
};

let init_nick = false;

let speedUpgrade;
let imgSpeedUpgrade;
let speedStatText;
let minSizeValue;
let maxSizeValue;
let score;
let size;


let chatBox;
let chatInput;

let ping;
let player;
function preload(){
    game.time.advancedTiming = true;
    game.load.image('player','../Media/meme.jpg');
    game.load.image('background','../Media/debug-grid.png');
    game.load.image('food', '../Media/food.png');
}

function create(){
    game.add.tileSprite(0, 0, 1920, 1920, 'background');
    //player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    game.world.setBounds(0, 0, 1920, 1920);

    //this.game.world.scale.setTo(0.5, 0.5);

}


$(function(){
    chatBox = $('#chatbox');
    chatInput = $('#chat-input');
    speedUpgrade = $('#speed-upgrade');
    imgSpeedUpgrade =  $('#img-speed-upgrade');
    speedStatText = $('#speed-stat-text');
    minSizeValue = $('#min-size-stat-text');
    maxSizeValue = $('#max-size-stat-text');
    score = $('#score-stat-text');
    size = $('#size-stat-text');

    chatInput.keydown(function(e){
        console.log(e.keyCode);
        if (e.keyCode === 13) {
            if (chatInput.text() === ""){
                console.log('returning focus');
                chatInput.html("");
                chatInput.blur();
                return;
            }

            let message = chatInput.text();
            console.log(message);
            chatInput.html("");

            // TODO: handle cases where user has custom name
            let pack = {
                msg: message,
                player : player.id,
                nick: player.nick,
                user: true
            };

            // we do handling server side
            // TODO: do we really want to do this for every single keypress though?
            ping = Date.now();

            events.emitNewMessage(pack);

        }
        else if (e.keyCode === 27){

            chatInput.html("");
            chatInput.blur();
        }
    });

});


setInterval(()=>{
    game.world.scale.setTo();
}, 100);


$(document).keydown((event)=>{
    handler.keyDownEvent(event);
});

$(document).keyup((event)=>{
    console.log('keyup');
    handler.keyUpEvent(event);
});