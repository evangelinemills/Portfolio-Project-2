const scoreDisplay = document.getElementById("score");
const canvas = document.getElementById("game-area");
const newGame = document.getElementById("new-game");
const ctx = canvas.getContext("2d");

//var audio = new Audio('arcade.mp3');
//soundCheckbox = document.getElementById('sound');

class snakePart{
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}

let speed = 5;
let tileCount = 20;

let tileSize=canvas.clientWidth/tileCount-2;

let headX=10;
let headY=10;

// Snake Parts array
let snakeParts=[];
let tailLength = 2;

// Snake speed
let xvelocity=0;
let yvelocity=0;

// Draw Food
let foodX=5;
let foodY=5;

// Score
let score = 0;

let play = true;

function drawGame() {

    changeSnakePosition();

    let result = isGameOver();

    if(result) {
        return;
    }

    clearScreen();
    drawSnake();
    drawFood();

    checkCollision();
    startRefresh(false);
}

//function playSound() {
    if (soundCheckbox.checked) {
        audio.play();
    }
};

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

    else if(headX===tileCount) { //if hits right wall
        gameOver = true;
    }

    else if(headY<0) {//if hits top wall
        gameOver = true;
    }

    else if(headY===tileCount) {//if hits bottom wall
        gameOver = true;
    }

    //if hits own body

    for(let i=0; i<snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x===headX && part.y===headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        //SWAL
        swal.fire({
            title: 'Game Over!',
            width: 600,
            padding: '3em',
            color: '#a2c7e5',
            backdrop: `
              rgba(162,199,229,0.4)
              left top
              no-repeat
            `
          });

    }

    return gameOver;
}

function startRefresh(toggle) {
    if (play) {
        let bob = setTimeout(drawGame, 1000 / speed);
        if (toggle) {
            clearTimeout(bob);
        }
    }
}

function clearScreen() {
    ctx.fillStyle= '#303a2b';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

// Draw Snake Function
 function drawSnake() {

    ctx.fillStyle= '#ff99c9';

    for(let i=0;i<snakeParts.length;i++){

        let part = snakeParts[i];
         ctx.fillRect(part.x *tileCount, part.y *tileCount, tileSize, tileSize);
    }
   //increase snake length
   snakeParts.push(new snakePart(headX, headY));
   if(snakeParts.length>tailLength) {
        snakeParts.shift();
    } 
    ctx.fillStyle="#c1bddb";
    ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize);
}

// Snake position function
function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}

// Draw Food Function
function drawFood(){
    ctx.fillStyle="#58fcec";
    ctx.fillRect(foodX*tileCount, foodY*tileCount, tileSize, tileSize);
}

//detect collision
function checkCollision() {
    if(foodX==headX && foodY==headY) {
        foodX=Math.floor(Math.random()*tileCount);
        foodY=Math.floor(Math.random()*tileCount);
        tailLength++;
        increaseScore();
    }
}

// Score 
function increaseScore() {
    score++;
    scoreDisplay.innerHTML = score;
}

// Control snake
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

//game button control for phone
//UP
document.getElementById("U").addEventListener("click", function() {
    if(yvelocity==1)
    return;
    yvelocity=-1;
    xvelocity=0;
});
//Left
document.getElementById("L").addEventListener("click", function() {
    if(xvelocity==1)
    return;
    yvelocity=0;
    xvelocity=-1;
});
//RIGHT
document.getElementById("R").addEventListener("click", function(){
    if(xvelocity==-1)
    return;
    yvelocity=0;
    xvelocity=1;
});
//DOWN
document.getElementById("D").addEventListener("click", function() {
    if(yvelocity==-1)
    return;
    yvelocity=1;
    xvelocity=0;
});


function resetGame() {
    score = 0;
    scoreDisplay.innerHTML = score;
}

newGame.addEventListener('click', function bob() {
    speed = 5;
    tileCount = 20;

    tileSize = canvas.clientWidth/tileCount-2;

    headX = 10;
    headY = 10;

    snakeParts = [];
    tailLength = 2;

    xvelocity = 0;
    yvelocity = 0;

    foodX = 5;
    foodY = 5;

    score = 0;

    startRefresh(true);
    drawGame();
});

drawGame();

