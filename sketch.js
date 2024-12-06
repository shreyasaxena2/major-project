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

let train,trainImage;
let leftBoundary,rightBoundary;
let sound;
let road;

function preload() {
  road = loadImage("roadImg.png");
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
  image(road, 0, 0, width, height);
}


function moveTrain() {

}

//Variables for image files.
let flower1;
let flower2;
let flower3;
let water;

//y coordinate for all images
let flowerY = 200;

function preload() {
  // Load the image files.
  flower1 = loadImage("flower-1.png");
  flower2 = loadImage("flower-2.png");
  flower3 = loadImage("flower-3.png");
  water = loadImage("Water.gif");
}

function setup() {
  // Set a 400x400 px canvas.
  createCanvas(400,400);

  // Position images using
  // center coordinates.
  imageMode(CENTER);

  // Resize the flower images.
  flower1.resize(100, 100);
  flower2.resize(100, 100);
  flower3.resize(100, 100);
}

function draw() {
  background(255);

  // Draw the static flower images as one row.
  image(flower1, 100, flowerY);
  image(flower2, 200, flowerY);
  image(flower3, 300, flowerY);
}