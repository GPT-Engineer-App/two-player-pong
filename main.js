const game = document.getElementById("game");
const paddle1 = document.getElementById("paddle1");
const paddle2 = document.getElementById("paddle2");
const ball = document.getElementById("ball");
const player1ScoreElement = document.getElementById("player1Score");
const player2ScoreElement = document.getElementById("player2Score");

const gameWidth = 800;
const gameHeight = 400;
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 15;

let paddle1Y = 160;
let paddle2Y = 160;
let ballX = 392.5;
let ballY = 192.5;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

function updatePaddle1() {
  paddle1.style.top = `${paddle1Y}px`;
}

function updatePaddle2() {
  paddle2.style.top = `${paddle2Y}px`;
}

function updateBall() {
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

function movePaddle1(event) {
  if (event.key === "w" && paddle1Y > 0) {
    paddle1Y -= 10;
  } else if (event.key === "s" && paddle1Y < gameHeight - paddleHeight) {
    paddle1Y += 10;
  }
  updatePaddle1();
}

function movePaddle2(event) {
  if (event.key === "ArrowUp" && paddle2Y > 0) {
    paddle2Y -= 10;
  } else if (event.key === "ArrowDown" && paddle2Y < gameHeight - paddleHeight) {
    paddle2Y += 10;
  }
  updatePaddle2();
}

function resetBall() {
  ballX = gameWidth / 2 - ballSize / 2;
  ballY = gameHeight / 2 - ballSize / 2;
  ballSpeedX = -ballSpeedX;
  updateBall();
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY <= 0 || ballY >= gameHeight - ballSize) {
    ballSpeedY = -ballSpeedY;
  }

  if ((ballX <= paddleWidth && ballY + ballSize >= paddle1Y && ballY <= paddle1Y + paddleHeight) || (ballX + ballSize >= gameWidth - paddleWidth && ballY + ballSize >= paddle2Y && ballY <= paddle2Y + paddleHeight)) {
    ballSpeedX = -ballSpeedX;
  }

  if (ballX <= 0) {
    player2Score++;
    player2ScoreElement.textContent = player2Score;
    resetBall();
  } else if (ballX >= gameWidth - ballSize) {
    player1Score++;
    player1ScoreElement.textContent = player1Score;
    resetBall();
  }

  updateBall();
  requestAnimationFrame(update);
}

document.addEventListener("keydown", movePaddle1);
document.addEventListener("keydown", movePaddle2);

requestAnimationFrame(update);
