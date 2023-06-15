let gamescreen;
let gamescreenWidth = 360;
let gamescreenHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = birdWidth * 1;
let birdY = birdHeight * 5;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipewidth = 64;
let pipeheight = 512;
let pipeX = gamescreenWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;
let placePipes;

let velocityX = -2;

window.onload = function () {
  gamescreen = document.getElementById("gamescreen");
  gamescreen.width = gamescreenWidth;
  gamescreen.height = gamescreenHeight;
  context = gamescreen.getContext("2d");

  birdImg = new Image();
  birdImg.src = "./assets/sprites/yellowbird-midflap.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
  topPipeImg = new Image();
  topPipeImg.src = "./assets/sprites/pipe-red.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./assets/sprites/pipe-green.png";

  setInterval(placePipes, 1500);

  requestAnimationFrame(update);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, birdWidth, birdHeight);

  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
  }

  function placePipes() {
    let topPipeImg = {
      img: topPipeImg,
      x: pipeX,
      y: pipeY,
      width: pipeWidth,
      height: pipeHeight,
      passed: false,
    };
    pipeArray.push(topPipe);
  }
}
