
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// https://www.dafont.com/ethnocentric.font (TITLE FONT)
// https://www.dafont.com/game-of-squids.font (GAME OVER FONT)



// global variables for the grid
let cols = 3;
let rows = 6;
let cellWidth;
let cellHeight;
let playerX;
let playerY;
let obstacle;
let stopDistance = 50;



// global variables for the high score, score and time left
let initialCoinCount = 0;
let scoreCount = 0;
let timeLeft;
let startTime = 0;
let overallCoinCount = 0;
let highScore;
let hardCodedGrid = [
  [1, 0, 1], 
  [0, 2, 0],
  [1, 0, 0],
  [0, 1, 2],
  [1, 0, 0],
  [0, 0, 1]
];


// global variables for images, fonts and sounds
let startScImg;
let rulesImg;
let titleFont;
let gameOverImg;
let gameOverFont;
let gameWonImg;
let playerImg1;
let coinImg;
let obsImg;
let soundEffect;
let exitImg;
let playerShape;
let playerImg2;
let playerImg3;



// game states
let gameOver = false;
let gameWon = false;
let gameStarted = false;
let level = 1;
let gameExit = false;




// loads all images, fonts and sounds
function preload() {
  startScImg = loadImage("startsc.gif");
  rulesImg = loadImage("rules.png");
  titleFont = loadFont("titleFont.otf");
  gameOverImg = loadImage("gameoverImg.jpg");
  gameOverFont = loadFont("gameOverfont.ttf");
  gameWonImg = loadImage("gamewonscreen.gif");
  playerImg1 = loadImage("player-Img.png");
  coinImg = loadImage("coinImg.png");
  obsImg = loadImage("obsImg.jpg");
  soundEffect = loadSound("coin-sound.mp3");
  exitImg = loadImage("exitImg.jpg");
  playerImg2 = loadImage("playerImg2.png");
  playerImg3 = loadImage("playerImg3.png");
}



// creates the canvas and cell dimensions
function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  randomize();

  playerImg1 = loadImage("player-Img.png");
  playerShape = playerImg1;

}


// resizes the window
function windowResized() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  randomize();

  playerImg1 = loadImage("player-Img.png");
  playerShape = playerImg1;
}



// where all the main functions are called
function draw() {
  if (gameExit) {
    exitGame();
    exitScreen();
    return;
  }

  if (!gameStarted) {
    startScreen();
  }

  else if (gameOver) {
    gameOverScreen();
  }
  
  else if (gameWon) {
    gameWonScreen();
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



// if the mouse is pressed...
function mousePressed() {
  if (!gameStarted && !gameOver) {
    gameStarted = true;
    startLevel();
  }
}



// creates the start screen
function startScreen() {
  image(startScImg, 0, 0, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(50);
  textSize(28);
  textFont(titleFont);
  text("LIFE AND RAID", width / 2, 50);
  textSize(20);
  text("Collect the coins and avoid the pink obstacles.", width / 2, 90);
  text("Click anywhere to start.", width / 2, 130);
  text("Use the Left, Right, Up and Down arrow to naviagte.", width / 2,  170);
  text("Shift and Arrows to jump.", width / 2, 210);
  text("Use the SPACE bar to change between the 3 player icons while playing.", width / 2, 250);
  text("3 Levels. Complete within the time limit", width / 2, 290);
  text("Once done playing press E (capitalized or not) to exit the game", width / 2, 330);
}



// creates the screen when the player loses
function gameOverScreen() {
  image(gameOverImg, 0, 0, windowWidth, windowHeight);
  textAlign(CENTER);
  textFont(gameOverFont);
  fill(255);
  textSize(28);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(24);
  text("Your score is: " + scoreCount, width / 2, height / 2 - 5);
  text("Refresh Screen to play again.", width / 2, height / 2 + 30);
}


// creates the screen when the player beats the game
function gameWonScreen() {
  image(gameWonImg, 0, 0, windowWidth, windowHeight);
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Game Won!", width / 2, height / 2 - 40);
  textSize(16);
  text("Your score is: " + scoreCount, width / 2, height / 2 - 5);
  text("Refresh Screen to play again.", width / 2, height / 2 + 20);
}


// displays the score for the current game on the top right
function displayScore() {
  fill(255);
  textSize(20);
  textAlign(RIGHT, TOP);
  text("Score: " + scoreCount, width - 10, 10);
}


// displays the high score on the top left
function displayHighScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  let highScore = localStorage.getItem("highScore") || 0;
  text("High Score: " + highScore, 10, 10);
}


// shows up once the player is done playing as many games as they want
function exitScreen() {
  image(exitImg, 0, 0, windowWidth, windowHeight);
  fill(255);
  textSize(24);
  text("Thank You For Playing!", width / 2, height / 2);
}


// shows the timer in the top middle
function displayTimer() {
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  timeRemaining = max(0, floor((timeLimit() - millis())/1000));
  text("Time Remaining: " + timeRemaining + "s", width / 2, 10);
  if (timeRemaining === 0 && scoreCount === overallCoinCount) {
    levelUp(); // collected all the coins so moves up a level
  }
  else if (timeRemaining === 0 && scoreCount < overallCoinCount) {
    gameOver = true; // ran out of time
  }
}


// sets the time limit
function timeLimit() {
  let baseTime = 45 * 1000;
  let levelReduction = (level - 1) * 15 * 1000;
  return startTime + baseTime - levelReduction;
}



// draws the grid
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


// randomly places the coins and obtacles
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
      if (hardCodedGrid[j][i] === 1) {
        initialCoinCount++;
      }
    }

  }
  overallCoinCount = overallCoinCount + initialCoinCount; // keeps a count of coins present for checking with scoreCount

  if (hardCodedGrid[5][1] === 1) {
    initialCoinCount -= 1;
    overallCoinCount -= 1; // if the coin appears on the player where the player always begiins, don't count it
  }
  hardCodedGrid[5][1] = 0; // makes sure there is no coin or obstacle where the player always starts


}



// displays the player
function displayPlayer() {
  if (playerShape === playerImg1) {
    image(playerImg1, playerX + cellWidth/ 2.25, playerY + cellHeight / 4, cellWidth/8, cellHeight/2); // player option 1
  }
  else if (playerShape === playerImg2) {
    image(playerImg2, playerX + cellWidth/ 2.5, playerY + cellHeight / 10, cellWidth/4, cellHeight); // player option 2
  }
  else if (playerShape === playerImg3) {
    image(playerImg3, playerX + cellWidth/ 2.5, playerY + cellHeight / 10, cellWidth/4, cellHeight); // player option 3
  }
  
}



// displays the coins and obstacles in the places decided by the randomize() function
function displayCoinsandObstacles() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cellValue = hardCodedGrid[y][x];
      if (cellValue === 1) { // coin placed
        noStroke();
        image(coinImg, x * cellWidth + cellWidth / 2 - 75, y * cellHeight + cellHeight / 2 - 25, cellWidth * 0.2, cellHeight * 0.5);
      }
      else if (cellValue === 2) { // obstacle placed
        fill("pink");
        noStroke();
        rect(x * cellWidth + cellWidth * 0.25, y * cellHeight + cellHeight * 0.25, cellWidth * 0.5, cellHeight * 0.5);
      }
    }
  }
}


// checks to see if the player is collecting the coins or running into obstacles
function collisionCheck() {
  let playerCol = floor(playerX / cellWidth);
  let playerRow = floor(playerY / cellHeight);
  
  if (hardCodedGrid[playerRow][playerCol] === 1) { // where the player is, there is a coin
    
    hardCodedGrid[playerRow][playerCol] = 0; // collects the coin
    scoreCount++; // score increases
    soundEffect.play();

    if (scoreCount === overallCoinCount) {
      levelUp(); // if all coins are collected the player levels up
    }
  }
  else if (hardCodedGrid[playerRow][playerCol] === 2) { // player position = obstacle position
    // game over as result of loss
    gameOver = true;
    resetGame();
  }
}


// keeps a count of time
function startLevel() {
  startTime = millis();
}



// checks when to level up and what happens then
function levelUp() {
  if (level === 3) { // last level completed
    gameWon = true;
    resetGame();
    return;
  }
  level++; // level increases
  playerX = cellWidth;
  playerY = height - cellHeight;
  randomize(); // grid randomizes

  startLevel();
}


// each time the game ends, it helps decide the high score
function resetGame() {
  let highScore = localStorage.getItem("highScore") || 0;
  if (scoreCount > highScore) {
    localStorage.setItem("highScore", scoreCount);
  }
}


function exitGame() {
  localStorage.removeItem("highScore");
}




function keyPressed() {

  if ((key === "e" || key === "E") && (gameOver || gameWon)) {
    gameExit = true;
    return;
  }

  if (key === " ") {
    if (playerShape === playerImg1) {
      playerShape = playerImg2;
    }
    else if (playerShape === playerImg2) {
      playerShape = playerImg3;
    }
    else if (playerShape === playerImg3) {
      playerShape = playerImg1;
    }
  }


  if (keyIsDown(SHIFT)) {
    if (keyCode === UP_ARROW && playerY - 2 * cellHeight >= 0) {
      playerY -= 2 * cellHeight;
    } 
    else if (keyCode === DOWN_ARROW && playerY + 2 * cellHeight < height) {
      playerY += 2 * cellHeight;
    } 
    else if (keyCode === LEFT_ARROW && playerX - 2 * cellWidth >= 0) {
      playerX -= 2 * cellWidth;
    } 
    else if (keyCode === RIGHT_ARROW && playerX + 2 * cellWidth < width) {
      playerX += 2 * cellWidth;
    }
  } 
  else {
    if (keyCode === LEFT_ARROW && playerX - cellWidth >= 0) {
      playerX -= cellWidth;
    } 
    else if (keyCode === RIGHT_ARROW && playerX + cellWidth < width) {
      playerX += cellWidth;
    } 
    else if (keyCode === UP_ARROW && playerY - cellHeight >= 0) {
      playerY -= cellHeight;
    } 
    else if (keyCode === DOWN_ARROW && playerY + cellHeight < height) {
      playerY += cellHeight;
    }
  }



}
