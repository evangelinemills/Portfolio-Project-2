const canvas = document.getElementById(game-area);
const ctx = canvas.getContext("2d");

function drawGame () {
    clearScreen();
}

function clearScreen() {
    ctx.fillStyle= "#303a2b"
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

drawGame();

function drawGame() {
    let speed = 7;

    setTimeout(drawGame, 1000/speed);
}
