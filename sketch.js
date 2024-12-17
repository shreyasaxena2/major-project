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

let hardCodedGrid = [[1, 1, 1], 
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]];



function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols;
  cellHeight = height / rows;
  playerX = cellWidth;
  playerY = height - cellHeight;

  

  for (let i = 0; i < 5; i++) {
    let coin = {
      x: floor(random(cols)) * cellWidth,
      y: floor(random(rows)) * cellHeight,
      visible: true
    };
    coins.push(coin);
  }


  for (let x = 0; x < 3; x++) {
    createObstacles();
  }


}

function draw() {
  startScreen();
  if (gameStarted) {
    drawGrid();
    displayPlayer();
    displayCoins();
    collisionCheck();
    showObstacle();
  }
  
}


function mousePressed() {
  if (gameStarted === false) {
    gameStarted = true;
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

function drawGrid() {
  for (let x = 0; x < width; x += cellWidth) {
    for (let y = 0; y < height; y += cellHeight) {
      stroke("yellow"); 
      fill("grey"); 
      rect(x, y, cellWidth, cellHeight);
    }
  }
}

function displayPlayer() {
  fill("red");
  noStroke();
  circle(playerX + cellWidth / 2, playerY + cellHeight / 2, cellWidth * 0.2  );
}

function displayCoins() {
  for (let coin of coins) {
    if (coin.visible) {
      fill("blue");
      noStroke();
      circle(coin.x + cellWidth / 2, coin.y + cellHeight / 2, cellWidth * 0.2);
    }
  }
}


function collisionCheck() {
  for (let coin of coins) {
    if (coin.visible && playerX === coin.x && playerY === coin.y) {
      coin.visible = false;
    }
  }
}


function createObstacles() {
  obstacle = {
    x: random(0, width),
    y: random(0, height),
    width: 80,
    height: 80,
    speed: random(2, 5),
  },

  obsArray.push(obstacle);
}

function showObstacle() {
  for (obstacle of obsArray) {
    noStroke();
    fill("pink");
    rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  }
}


function moveObstacles() {
  for (let obstacle of obsArray) {
    obstacle.y += obstacle.speed;

    if (obstacle.y > height - stopDistance - obstacle.width) {
      obstacle.y = -obstacle.width;
      obstacle.x = random(0, width);
    }
  }
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
