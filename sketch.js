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

let coingroup;
let traingroup;
let path,pathImage;
let jake1;
let jake2;
let jake3;
let jake4;
let jake5;
let coin;
let coinArray;
let 
let train,trainImage;
let leftBoundary,rightBoundary;
let sound;
let ROAD = 1;
let YELLOW_LINE = 0;
let rows;
let cols;


let hardcodedGrid = [
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
];


function preload() {
  jake1 = loadImage("jake1.png");
  jake2 = loadImage("jake2.png");
  jake3 = loadImage("jake3.png");
  jake4 = loadImage("jake4.png");
  jake5 = loadImage("jake5.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  drawGrid();
}


function drawGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      if (hardcodedGrid[y][x] === ROAD) {
        fill("black");
      }

      else {
        fill("yellow");
      }
    }
  }
}