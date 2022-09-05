const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");


let speed = 7;

let tileCount=canvas.clientWidth/tileCount-2;
let tileSize=18;

let headX=10;
let headY=10;

// Snake Parts

// Snake speed
let xvelocity=0;
let yvelocity=0;

// Draw Food
let foodX=5;
let foodY=5;

// Score
let score = 0;




function drawGame () {
    clearScreen();
    drawSnake();
    drawFood();
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
// Draw Snake Function
function drawSnake() {
    ctx.fillStyle= '#ff99c9';
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize,tileSize);
}

// Draw Food Function
function drawFood(){
    ctx.fillStyle="#58fcec";
    ctx.fillRect(foodX*tileCount, foodY*tileCount, tileSize, tileSize)
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event) {

    //Up
    if (event.keyCode==38){
        if(yvelocity==1)
        return;
        yvelocity=-1;
        xvelocity=0;
    }
    //Down
    if (event.keyCode==40){
        if(yvelocity==-1)
        return;
        yvelocity=1;
        xvelocity=0;
    }

    //Left
    if (event.keyCode==37){
        if(xvelocity==1)
        return;
        yvelocity=0;
        xvelocity=-1;
    }

    //Right
    if (event.keyCode==39){
        if(xvelocity==-1)
        return;
        yvelocity=0;
        xvelocity=1;
    }
}

drawGame();

