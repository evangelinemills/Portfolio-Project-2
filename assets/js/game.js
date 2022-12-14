const scoreDisplay = document.getElementById("score");
const canvas = document.getElementById("game-area");
const newGame = document.getElementById("new-game");
const soundCheckbox = document.getElementById("sound");
const audioPlayer = document.getElementById("music");
const ctx = canvas.getContext("2d");

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 5;
let tileCount = 20;

let tileSize = canvas.clientWidth / tileCount-2;

let headX = 10;
let headY = 10;

// Snake Parts array
let snakeParts = [];
let tailLength = 2;

// Snake speed
let xvelocity = 0;
let yvelocity = 0;

// Draw Food
let foodX = 5;
let foodY = 5;

// Score
let score = 0;

let play = true;

/**
 * This function loads and runs the game
 * by drawing the snake and food
 * and checking for collisions
 */
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

// Adds sound to toggle button in menu section
soundCheckbox.addEventListener('click', () => {
    if (soundCheckbox.checked) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }  
})

/**
 * Checks for collison with walls or own body
 * @returns Game Over
 */
function isGameOver() {
    let gameOver = false;
//check game commence
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    } else if (yvelocity === 0 && xvelocity === 0) {
        return false;
    }
    //if hits own body
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }
    
    // Sweet Alert pop-up when Game-Over
    if(gameOver) {
        //SWAL
        swal.fire({
            title: 'Game Over! Click "New Game" to play again!',
            width: 600,
            padding: '3em',
            color: '#a2c7e5',
            backdrop: `
              rgba(162,199,229,0.4)
              left top
              no-repeat
            `
          });
        
        // Stops music when Game Over  
        audioPlayer.pause();
    }
    return gameOver;
}

/**
 * Controls speed of snake
 * @param {boolean} toggle 
 */
function startRefresh(toggle) {
    if (play) {
        let reset = setTimeout(drawGame, 1000 / speed);
        if (toggle) {
            clearTimeout(reset);
        }
    }
}

/**
 * Initial layout of canvas screen for game start and 
 * new-game
 */
function clearScreen() {
    ctx.fillStyle= '#303a2b';
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

/**
 * A for loop that draws the snake body
 * and controls the extension in length when eats food
 */
 function drawSnake() {

    ctx.fillStyle= '#ff99c9';

    for(let i = 0; i < snakeParts.length; i++){

        let part = snakeParts[i];
         ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
   //increase snake length
   snakeParts.push(new snakePart(headX, headY));
   if(snakeParts.length > tailLength) {
        snakeParts.shift();
    } 
    ctx.fillStyle = "#c1bddb";
    ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize);
}

/**
 * Controls the direction of movement of the snake
 */
function changeSnakePosition() {
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}

/**
 * Creates the food on the canvas
 * for the snake to eat
 */
function drawFood(){
    ctx.fillStyle = "#58fcec";
    ctx.fillRect(foodX*tileCount, foodY*tileCount, tileSize, tileSize);
}

/**
 * Checks when snake eats food and
 * Increases tail length x1 and 
 * Increases score x1
 */
function checkCollision() {
    if(foodX == headX && foodY == headY) {
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        increaseScore();
    }
}

/**
 * Gets HTML element in the manu bar and prints the score
 * as the snake eats food it increments by 1 point
 */
function increaseScore() {
    score++;
    scoreDisplay.innerHTML = score;
}

// Control snake with keypad controls
document.body.addEventListener('keydown', keyDown);

/**
 * Keypad arrow controls
 * @param {*} event 
 * @returns Up, Down, Left, Right
 */
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

//Game button control for phone
//UP
document.getElementById("U").addEventListener("click", function() {
    if(yvelocity == 1)
    return;
    yvelocity = -1;
    xvelocity = 0;
});
//Left
document.getElementById("L").addEventListener("click", function() {
    if(xvelocity == 1)
    return;
    yvelocity = 0;
    xvelocity = -1;
});
//RIGHT
document.getElementById("R").addEventListener("click", function() {
    if(xvelocity == -1)
    return;
    yvelocity = 0;
    xvelocity = 1;
});
//DOWN
document.getElementById("D").addEventListener("click", function() {
    if(yvelocity == -1)
    return;
    yvelocity = 1;
    xvelocity = 0;
});

// Redefines the variables for when Game Over
// Do not change or game speed alters on New Game.
newGame.addEventListener('click', function reset() {
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

