const canvas = document.getElementById("game-area");
const ctx = canvas.getContext("2d");

class snakePart {
    constructor(x, y){
        this.x=y;
        this.y=y;
    }
}


let speed = 7;
let tileCount = 20;

let tileSize=canvas.clientWidth/tileCount-2;

let headX=10;
let headY=10;

// Snake Parts
const snakeParts=[];
let tailLength = 2;

// Snake speed
let xvelocity=0;
let yvelocity=0;

// Draw Food
let foodX=5;
let foodY=5;

// Score
let score = 0;




function drawGame () {
    changeSnakePosition();
    
    let result = isGameOver();
    if(result) {
        return;
    }

    clearScreen();
    drawSnake();
    drawFood();

    chackCollision()
    drawScore();
    setTimeout(drawGame, 1000/speed);
}

//Game Over
function isGameOver() {
    let gameOver = false;
//check game commence
    if(yvelocity===0 && xvelocity===0) {
        return false;
    }

    if(headX<0) { //if hits left wall
        gameOver = true;
    }

    else if(headX === tileCount) { //if hits right wall
        gameOver = true;
    }

    else if(headY<0) {//if hits top wall
        gameOver = true;
    }

    else if(headY===tileCount) {//if hits bottom wall
        gameOver = true;
    }

    //if hits own body

    for(let i=0, i<snakeParts.length, i++){
        let part=snakeParts[i];
        if(part.x=== headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle="#c1bddb";
        ctx.font="60px 'Bangers'";
        ctx.fillText("Game Over!!", canvas.clientWidth/6.5, canvas.clientHeight/2)
    }

    return gameOver;
}

function clearScreen() {
    ctx.fillStyle= '#303a2b';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

drawGame();

function drawGame() {
    let speed = 7;

    
}

function drawGame() {
    clearScreen();
    drawSnake();
}
// Draw Snake Function
function drawSnake() {
    ctx.fillStyle= '#ff99c9';
    for(let i=0, i<snakeParts.length, i++){
        let part = snakeParts[i]
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize, tileSize)
    }
   //increase snake length
   snakeParts.push(new snakePart(headX, headY));
   if(snakeParts.length>tailLength) {
        snakeParts.shift();
    } 
    ctx.fillStyle="#c1bddb";
    ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize)
}


// snake position function
function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
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

