const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");

function drawGame () {
    clearScreen();
}

function clearScreen() {
    ctx.fillStyle= 'green';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

drawGame();

function drawGame() {
    let speed = 7;

    setTimeout(drawGame, 1000/speed);
}

let tileCount=20;
let tileSize=18;
let headX=10;
let headY=10;

function drawGame() {
    clearScreen();
    drawSnake();
}
function drawSnake() {
    ctx.fillStyle= 'pink';
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize);
}