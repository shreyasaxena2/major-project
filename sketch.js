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
let coinX;
let coinY;



function setup() {
  createCanvas(windowWidth, windowHeight);
  cellWidth = width / cols; // Width of each cell
  cellHeight = height / rows; // Height of each cell
  playerX = cellWidth; // Start in the middle column
  playerY = height - cellHeight; // Start in the bottom row


  for (let i = 0; i < 5; i++) { // Adjust the number of coins as needed
    coins.push({
      x: floor(random(cols)) * cellWidth,
      y: floor(random(rows)) * cellHeight,
      visible: true
    }
    );
  }

}

function draw() {
  drawGrid();
  displayPlayer();
  displayCoins();
  collisionCheck();
}

function drawGrid() {
  for (let x = 0; x < width; x += cellWidth) {
    for (let y = 0; y < height; y += cellHeight) {
      stroke("yellow"); 
      fill("grey"); 
      rect(x, y, cellWidth, cellHeight); // Draw a rectangle
    }
  }
}

function displayPlayer() {
  fill("red");
  noStroke();
  circle(playerX + cellWidth / 2, playerY + cellHeight / 2, cellWidth * 0.4);
}

function displayCoins() {
  for (let coin of coins) {
    if (coin.visible) {
      fill("blue");
      noStroke();
      circle(coin.x + cellWidth / 2, coin.y + cellHeight / 2, cellWidth * 0.4);
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
