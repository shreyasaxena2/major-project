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
let coin,coinImage;
let train,trainImage;
let leftBoundary,rightBoundary;
let sound;
let road;

function preload() {
  road = loadImage("roadImg.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(road, 0, 0, width, height);
}
