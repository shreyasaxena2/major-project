// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// https://www.dafont.com/ethnocentric.font (TITLE FONT)
// https://www.dafont.com/game-of-squids.font (GAME OVER FONT)



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
let titleFont;
let gameOverImg;
let gameOverFont;
let gameWonImg;
let playerImg;
let coinImg;
let obsImg;
let soundEffect;
let highScore;
let exitImg;

// game states
let gameOver = false;
let gameWon = false;
let gameStarted = false;
let level = 1;
let gameExit = false;

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
  titleFont = loadFont("titleFont.otf");
  gameOverImg = loadImage("gameoverImg.jpg");
  gameOverFont = loadFont("gameOverfont.ttf");
  gameWonImg = loadImage("gamewonscreen.gif");
  playerImg = loadImage("player-Img.png");
  coinImg = loadImage("coinImg.png");
  obsImg = loadImage("obsImg.jpg");
  soundEffect = loadSound("coin-sound.mp3");
  exitImg = loadImage("exitImg.jpg");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  randomize();
  // calculateCoinCount();

  console.log("setup");
  // localStorage.setItem("highScore", 0);
  // highScore = 0;

}


function draw() {
  if (!gameStarted) {
    startScreen();
  }
  else if (gameOver) {
    gameOverScreen();
  }
  
  else if (gameWon) {
    gameWonScreen();
  }
  else if (gameExit) {
    exitGame();
    exitScreen();
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
}



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
  text("3 Levels. Complete within the time limit", width / 2, 250);
}


function gameOverScreen() {
  image(gameOverImg, 0, 0, windowWidth, windowHeight);
  // background("red");
  textAlign(CENTER);
  textFont(gameOverFont);
  fill(255);
  textSize(28);
  text("Game Over!", width / 2, height / 2 - 40);
  textSize(24);
  text("Your score is: " + scoreCount, width / 2, height / 2 - 5);
  text("Refresh Screen to play again.", width / 2, height / 2 + 30);
}




function gameWonScreen() {
  image(gameWonImg, 0, 0, windowWidth, windowHeight);
  // background("blue");
  textAlign(CENTER);
  fill(255);
  textSize(24);
  text("Game Won!", width / 2, height / 2 - 40);
  textSize(16);
  text("Your score is: " + scoreCount, width / 2, height / 2 - 5);
  text("Refresh Screen to play again.", width / 2, height / 2 + 20);
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
  console.log(' display high score from cache ', localStorage.getItem("highScore"));
  let highScore = localStorage.getItem("highScore") || 0;
  text("High Score: " + highScore, 10, 10);
}

function exitScreen() {
  image(exitImg, 0, 0, windowWidth, windowHeight);
  fill(255);
  textSize(24);
  text("Thank You For Playing!", width / 2, height / 2);
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
  overallCoinCount = overallCoinCount + initialCoinCount;

  if (hardCodedGrid[5][1] === 1) {
    initialCoinCount -= 1;
    overallCoinCount -= 1;
  }
  hardCodedGrid[5][1] = 0;


}




function displayPlayer() {
  // fill("red");
  // noStroke();
  // circle(playerX + cellWidth / 2, playerY + cellHeight / 2, cellWidth * 0.2);

  image(playerImg, playerX + cellWidth/ 2.25, playerY + cellHeight / 4, cellWidth/8, cellHeight/2);
}



function displayCoinsandObstacles() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cellValue = hardCodedGrid[y][x];
      if (cellValue === 1) {
        // fill("blue");
        noStroke();
        image(coinImg, x * cellWidth + cellWidth / 2 - 75, y * cellHeight + cellHeight / 2, cellWidth * 0.2, cellHeight * 0.5);
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
    soundEffect.play();

    if (scoreCount === overallCoinCount) {
      levelUp();
    }
  }
  else if (hardCodedGrid[playerRow][playerCol] === 2) {
    // game over as result of loss
    gameOver = true;
    resetGame();
  }
}


function startLevel() {
  startTime = millis();
}


function levelUp() {
  if (level === 3) {
    gameWon = true;
    resetGame();
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
  //console.log('game reset called');
  let highScore = localStorage.getItem("highScore") || 0;
  if (scoreCount > highScore) {
    localStorage.setItem("highScore", scoreCount);
  }
}


function exitGame() {
  localStorage.removeItem("highScore");
}




function keyPressed() {

  // if ((key === "e" || key === "E") && (gameOver || gameWon)) {
  //   gameExit = true;
  //   return;
  // }


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
