const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");

// Snake display
let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;

// Snake speed
let xvelocity=0;
let yvelocity=0;


function drawGame () {
    clearScreen();
}

function clearScreen() {
    ctx.fillStyle= '#303a2b';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

drawGame();

function drawGame() {
    let speed = 7;

    setTimeout(drawGame, 1000/speed);
}

function drawGame() {
    clearScreen();
    drawSnake();
}

function drawSnake() {
    ctx.fillStyle= '#ff99c9';
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize);
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {

    //Up
    if (event.keyCode==38){
        yvelocity=-1;
        xvelocity=0;
    }
    //Down
    if (event.keyCode==40){
        yvelocity=1;
        xvelocity=0;
    }

    //Left
    if (event.keyCode==37){
        yvelocity=0;
        xvelocity=-1;
    }

    //Right
    if (event.keyCode==39){
        yvelocity=0;
        xvelocity=1;
    }
}

function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}

function drawGame() {
    clearScreen();
    drawSnake();
    changeSnakePosition();
}

