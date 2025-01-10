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
let obsArray = [];
let obstacle;
let stopDistance = 50;
let initialCoinCount = 0;
let scoreCount = 0;
let timeLeft;
let startTime = 0;
let overallCoinCount = 0;
let startScImg;
let rulesImg;

// game states
let gameOver = false;
let gameWon = false;
let gameStarted = false;
let level = 1;

let hardCodedGrid = [
  [1, 0, 1], 
  [0, 2, 0],
  [1, 0, 0],
  [0, 1, 2],
  [1, 0, 0],
  [0, 0, 1]
];


function preload() {
  startScImg = loadImage("startsc.gif");
  rulesImg = loadImage("rules.png");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  randomize();
  // calculateCoinCount();
}

function draw() {
  if (!gameStarted) {
    startScreen();
  }
  else if (gameOver) {
    gameOverScreen();
  }
  
  else if (gameWon) {
    levelUpScreen();
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
    startLevel();
  }
  else if (gameOver) {
    resetGame();
  }
}



function startScreen() {
  image(startScImg, 0, 0, windowWidth, windowHeight);
  image(rulesImg, 0, 0, width - 10, 10);

  textAlign(CENTER);
  fill(0);
  textSize(24);
  text("LIFE AND RAID", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to start.", width / 2, height / 2 + 10);
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


function gameWonScreen() {
  background("blue");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Game Won!", width / 2, height / 2 - 40);
  textSize(16);
  text("Click anywhere to restart", width / 2, height / 2 + 10);
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
  // console.log(' cache ', localStorage.getItem("highScore"));
  let highScore = localStorage.getItem("highScore") || 0;
  text("High Score: " + highScore, 10, 10);
}


function displayTimer() {
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  //console.log(' time limit is ', timeLimit());
  // console.log(' time milis is ', millis());
  timeRemaining = max(0, floor((timeLimit() - millis())/1000));
  text("Time Remaining: " + timeRemaining + "s", width / 2, 10);
  //text("Time Remaining: " + timeRemaining, width / 2, 10);
  //console.log(' time remaining ', timeRemaining);
  if (timeRemaining === 0 && scoreCount === overallCoinCount) {
    //gameOver = true;
    levelUp();
  }
  else if (timeRemaining === 0 && scoreCount < overallCoinCount) {
    gameOver = true;
  }
}


function timeLimit() {
  let baseTime = 45 * 1000;
  //console.log('vele ', level);
  let levelReduction = (level - 1) * 15 * 1000;
  return startTime + baseTime - levelReduction;
}



function drawGrid() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      strokeWeight(4);
      stroke("#FF00FF"); 
      fill("#A020F0"); 
      rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
}


// function calculateCoinCount() {
//   coinCount = 0;
//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       if (hardCodedGrid[y][x] === 1) {
//         coinCount++;
//       }
//     }
//   }
// }

function randomize() {
  initialCoinCount = 0;
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
      //console.log(hardCodedGrid[j][i]);
      if (hardCodedGrid[j][i] === 1) {
        initialCoinCount++;
      }
    }

  }
  //console.log(' initial coin count ', initialCoinCount)
  overallCoinCount = overallCoinCount + initialCoinCount;

  if (hardCodedGrid[5][1] === 1) {
    //console.log(' hey i am counted above')
    initialCoinCount -= 1;
    overallCoinCount -= 1;
  }
  hardCodedGrid[5][1] = 0;


  //calculateCoinCount();
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
    // console.log('score count ', scoreCount);
    // console.log(' overall coin count ', overallCoinCount);

    if (scoreCount === overallCoinCount) {
      levelUp();
    }
  }
  else if (hardCodedGrid[playerRow][playerCol] === 2) {
    gameOver = true;
  }
}


function startLevel() {
  //startTime = 0;
  startTime = millis();
}


function levelUp() {
  levelUpScreen();
  if (level === 3) {
    gameWon = true;
    return;
  }
  level++;
  playerX = cellWidth;
  playerY = height - cellHeight;
  randomize();
  //calculateCoinCount();
  startLevel();
}



function resetGame() {
  //let highScore = localStorage.getItem("highScore") || 0;
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
  calculateCoinCount();
}

//TODO: CHeck when you hit the wall on up/down/left/right
function keyPressed() {
  if (keyIsDown(SHIFT)) {
    if (keyCode === UP_ARROW && playerY - 2 * cellHeight >= 0) {
      // console.log('double up arrow');
      playerY -= 2 * cellHeight;
    } 
    else if (keyCode === DOWN_ARROW && playerY + 2 * cellHeight < height) {
      // console.log('double down arrow');
      playerY += 2 * cellHeight;
    } 
    else if (keyCode === LEFT_ARROW && playerX - 2 * cellWidth >= 0) {
      // console.log('double left arrow');
      playerX -= 2 * cellWidth;
    } 
    else if (keyCode === RIGHT_ARROW && playerX + 2 * cellWidth < width) {
      // console.log('double right arrow');
      playerX += 2 * cellWidth;
    }
  } 
  else {
    if (keyCode === LEFT_ARROW && playerX - cellWidth >= 0) {
      // console.log('left arrow');
      playerX -= cellWidth;
    } 
    else if (keyCode === RIGHT_ARROW && playerX + cellWidth < width) {
      // console.log('right arrow');
      playerX += cellWidth;
    } 
    else if (keyCode === UP_ARROW && playerY - cellHeight >= 0) {
      // console.log('up arrow');
      playerY -= cellHeight;
    } 
    else if (keyCode === DOWN_ARROW && playerY + cellHeight < height) {
      // console.log('down arrow');
      playerY += cellHeight;
    }
  }
}