const c = document.getElementById("gameBoard");
const ctx = c.getContext("2d");
const player1 = document.querySelector("#playerOneScore");
const player2 = document.querySelector("#playerTwoScore");
const resetButton = document.querySelector("#resetBtn");
let running = false;
let p1Score = 0;
let p2Score = 0;
//objects creation
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddle = {
  x: 10,
  y: c.height / 2 - paddleHeight / 2,
};
let rightPaddle = {
  x: c.width - 20,
  y: c.height / 2 - paddleHeight / 2,
};
let ball = {
  x: c.width / 2,
  y: c.height / 2,
  size: 10,
  speedX: 1,
  speedY:1,
};

//functions
resetButton.addEventListener("click", startGame);
startGame();
function startGame() {
  running = true;
  p1Score = 0;
  p2Score = 0;
  player1.textContent = p1Score;
  player2.textContent = p2Score;
  resetBall()
}

function clearGame() {
  ctx.clearRect(0, 0, c.width, c.height);
}

function drawRect(x, y, width, heigth, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, heigth);
}

function drawBall() {
  drawRect(ball.x, ball.y, ball.size, ball.size, "white");
}

function draw() {
  ctx.clearRect(0, 0, c.width, c.height);
  drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, "skyblue");
  drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, "skyblue");
  drawBall();
}
function resetBall() {
  ball.x = c.width / 2;
  ball.y = c.height / 2;

  const baseSpeed = 1;
  ball.speedX *= baseSpeed * (Math.random() > 0.5 ? 1 : -1);
  ball.speedY = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
}

function update() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;
  if (ball.y <= 0 || ball.y + ball.size >= c.height) {
    ball.speedY *= -1;
  }
  if (
    ball.x <= leftPaddle.x + paddleWidth &&
    ball.y >= leftPaddle.y &&
    ball.y <= leftPaddle.y + paddleHeight
  ) {
    ball.speedX *= -1;
  }
  if (
    ball.x + ball.size >= rightPaddle.x &&
    ball.y >= rightPaddle.y &&
    ball.y <= rightPaddle.y + paddleHeight
  ) {
    ball.speedX *= -1;
  }
}

document.addEventListener("keydown", movePaddle);
function movePaddle(e) {
  const speed = 20;
  if (e.key === "w" && leftPaddle.y - speed >= 0) {
    leftPaddle.y -= speed;
  }
  if (e.key === "s" && leftPaddle.y + speed <= c.height - paddleHeight) {
    leftPaddle.y += speed;
  }
  if (e.keyCode == 38 && rightPaddle.y - speed >= 0) {
    rightPaddle.y -= speed;
  }
  if (e.keyCode == 40 && rightPaddle.y + speed <= c.height - paddleHeight) {
    rightPaddle.y += speed;
  }
}
//here
function checkGameOver() {
  if (ball.x >= c.width) {
    p1Score = Number(player1.textContent) + 1;
    player1.textContent = p1Score;
    resetBall();
  }
  if (ball.x <= 0) {
    p2Score = Number(player2.textContent) + 1;
    player2.textContent = p2Score;
    resetBall();
  }
  if (p1Score >= 5) {
    displayGameOver("Player 1 Won !!");
  }
  if (p2Score >= 5) {
    displayGameOver("Player 2 Won !!");
  }
}
//here
function displayGameOver(winner) {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "White";
  ctx.textAlign = "center";
  ctx.fillText(winner, c.width / 2, c.height / 2);
  running = false;
  player1.textContent = 0;
  player2.textContent = 0;
}
function scoredPlayer(py) {
  ctx.font = "50px MV Boli";
  ctx.fillStyle = "White";
  ctx.textAlign = "center";
  ctx.fillText(`${py} Has Scored`, c.width / 2, c.height / 2);
}
//here
function gameTick() {
  if (running) {
    update();
    draw();
    checkGameOver();
    requestAnimationFrame(gameTick);
  }
}
requestAnimationFrame(gameTick);
