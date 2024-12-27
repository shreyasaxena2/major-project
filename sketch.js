// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// https://creatorset.com/products/subway-surfers-jake-running
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.reddit.com
// %2Fr%2Fnycrail%2Fcomments%2Fw4xnxt%2Fsomething_that_resembles_an_r160143_in_subway%2F&psig=AOvVaw3ETeDZRs9vKP8O6k6Sg0B2&ust=173282445
// 9999000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCLjZ18Ko_YkDFQAAAAAdAAAAABAE

// https://editor.p5js.org/gargivanshika/sketches/532yOD6La

let cols = 3; // Number of columns
let rows = 6; // Number of rows
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
}

function draw() {
  if (gameWon) {
    gameWonScreen();
  }
  if (gameOver) {
    endScreen();
  }
  else if (!gameStarted) {
    startScreen();
  }

  else {
    drawGrid();
    displayPlayer();
    displayCoinsandObstacles();
    collisionCheck();
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
  text("Subway Surfers", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to start", width / 2, height / 2 + 10);
  text("Use the Left, Right, Up and Down arrow to naviagte", width / 2, height / 2 + 40);
}

function endScreen() {
  background("red");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to restart", width / 2, height / 2 + 10);
}

function gameWonScreen() {
  background("green");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Congratulations!", width / 2, height / 2 - 40);
  textSize(16);
  text("You've collected all coins!", width / 2, height / 2);
  text("Click anywhere to restart", width / 2, height / 2 + 40);
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
    hardCodedGrid[playerRow][playerCol] = 0; // removes coin to say collected
  }

  if(hardCodedGrid[playerRow][playerCol] === 2) {
    gameOver = true;
  }
}




function resetGame() {
  gameOver = false;
  gameStarted = false;
  gameWon = false;
  playerX = cellWidth;
  playerY = height - cellHeight;

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
    if (playerY - cellHeight >= -cellHeight) {
      playerY -= cellHeight;
    }
  }
  else if (keyCode === DOWN_ARROW) {
    if (playerY + cellHeight < height) {
      playerY += cellHeight;
    }
  }
}

function keepHighScore() {
  
}

function highScoreScreen() {

}