// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



let cols = 3;
let rows = 6;
let cellWidth;
let cellHeight;
let playerX;
let playerY;
let coins = [];
let gameStarted = false;
let obsArray = [];
let obstacle;
let stopDistance = 50;
let gameOver = false;
let gameWon = false;
let coinCount = 0;
let scoreCount = 0;
let level = 1;
let timeLeft;
let timerInterval;

let hardCodedGrid = [
  [1, 0, 1], 
  [0, 2, 0],
  [1, 0, 0],
  [0, 1, 2],
  [1, 0, 0],
  [0, 0, 1]
];




function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  randomize();
  calculateCoinCount();
}

function draw() {
  if (!gameStarted && !gameOver) {
    startScreen();
  }
  else if (gameOver) {
    gameOverScreen();
  }
  
  else if (gameWon) {
    LevelUpScreen();
  }

  else {
    drawGrid();
    displayPlayer();
    displayCoinsandObstacles();
    collisionCheck();
    displayScore();
    displayHighScore();
    displayTimer();
  }
  
}



function mousePressed() {
  if (!gameStarted && !gameOver) {
    gameStarted = true;
  }
  else if (gameOver) {
    resetGame();
  }
}



function startScreen() {
  background("lightblue");

  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("Game", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to start", width / 2, height / 2 + 10);
  text("Use the Left, Right, Up and Down arrow to naviagte. Shift and Arrows to jump.", width / 2, height / 2 + 40);
}

function gameOverScreen() {
  background("red");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to restart", width / 2, height / 2 + 10);
}

function levelUpScreen() {
  background("green");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text(`Level ${level} Complete!`, width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to continue", width / 2, height / 2);
  text("Good Luck!", width / 2, height / 2 + 40);
}


function displayScore() {
  fill(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text("Score: " + scoreCount, width - 10, 10);
}


function displayHighScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  let highScore = localStorage.getItem("highScore") || 0;
  text("High Score: " + highScore, 10, 10);
}


function displayTimer() {
  fill(255);
  textSize(20);
  textAlign(CENTER);
  text("Time Remaining: " + timeRemaining + "s", width / 2, 10);
}


function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      stroke("yellow"); 
      fill("grey"); 
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
}


function calculateCoinCount() {
  coinCount = 0;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (hardCodedGrid[y][x] === 1) {
        coinCount++;
      }
    }
  }
}

function randomize() {
  for (let i = 0; i < 3; i++) {
    let obsSet = false;
    for (let j = 0; j < 6; j++) {
      let x = floor(random(0, 3));
      if (x === 2) {
        if (obsSet === false) {
          obsSet = true;
          hardCodedGrid[j][i] = x;
        }
        else {
          hardCodedGrid[j][i] = floor(random(0, 2));
        }  
      }
      else {
        hardCodedGrid[j][i] = x;
      }

      console.log(hardCodedGrid[j][i]);
    }
  }
  hardCodedGrid[5][1] = 0;


  calculateCoinCount();
}




function displayPlayer() {
  fill("red");
  noStroke();
  circle(playerX + cellWidth / 2, playerY + cellHeight / 2, cellWidth * 0.2);
}



function displayCoinsandObstacles() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cellValue = hardCodedGrid[y][x];
      if (cellValue === 1) {
        fill("blue");
        noStroke();
        circle(x * cellWidth + cellWidth / 2, y * cellHeight + cellHeight / 2, cellWidth * 0.2);
      }
      else if (cellValue === 2) {
        fill("pink");
        noStroke();
        rect(x * cellWidth + cellWidth * 0.25, y * cellHeight + cellHeight * 0.25, cellWidth * 0.5, cellHeight * 0.5);
      }
    }
  }
}


function collisionCheck() {
  let playerCol = floor(playerX / cellWidth);
  let playerRow = floor(playerY / cellHeight);

  if (hardCodedGrid[playerRow][playerCol] === 1) {
    hardCodedGrid[playerRow][playerCol] = 0;
    scoreCount++;
    if (scoreCount === coinCount) {
      clearInterval(timerInterval);
      levelUpScreen();
    }
  }

  if (hardCodedGrid[playerRow][playerCol] === 2) {
    clearInterval(timerInterval);
    gameOver = true;
  }
}


function levelOne() {

}



function resetGame() {
  let highScore = localStorage.getItem("highScore") || 0;
  if (scoreCount > highScore) {
    localStorage.setItem("highScore", scoreCount);
  }


  gameOver = false;
  gameStarted = false;
  gameWon = false;
  playerX = cellWidth;
  playerY = height - cellHeight;
  scoreCount = 0;

  randomize();
}




function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (playerX - cellWidth >= 0) {
      playerX -= cellWidth;
    }
  }

  else if (keyCode === RIGHT_ARROW) {
    if (playerX + cellWidth < width) {
      playerX += cellWidth;
    }
  }


  else if (keyCode === UP_ARROW) {
    if (keyIsDown(SHIFT)) {
      if (playerY - 2 * cellHeight >= -cellHeight) {
        playerY -= 2 * cellHeight;
      }
    } 
    else {
      if (playerY - cellHeight >= -cellHeight) {
        playerY -= cellHeight;
      }
    }
  }


  else if (keyCode === DOWN_ARROW) {
    if (playerY + cellHeight < height) {
      playerY += cellHeight;
    }
  }
}