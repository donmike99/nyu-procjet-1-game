let gamescreen;
let gamescreenWidth = 360;
let gamescreenHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = gamescreenWidth / 8;
let birdY = gamescreenHeight / 3;
let birdImg;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};

let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = gamescreenWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

let velocityX = -2;
let velocityY = 0;
let gravity = 0.3;

let gameOver = false;
let score = 0;
let gameOverImg;

window.onload = function () {
  gamescreen = document.getElementById("gamescreen");
  gamescreen.height = gamescreenHeight;
  gamescreen.width = gamescreenWidth;
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

  gameOverImg = new Image();
  gameOverImg.src = "assets/Sprites/gameover.png";

  requestAnimationFrame(update);
  setInterval(placePipes, 1500);
  document.addEventListener("keydown", moveBird);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, gamescreen.width, gamescreen.height);

  velocityY += gravity;

  bird.y = Math.max(bird.y + velocityY, 0);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  if (bird.y > gamescreen.height) {
    gameOver = true;
  }

  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 5, 45);

  if (gameOver) {
    context.drawImage(gameOverImg, 67, 80);
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 3 - Math.random() * (pipeHeight / 2);
  let openingSpace = gamescreen.height / 3;

  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + pipeHeight + openingSpace,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
    velocityY = -6;

    if (gameOver) {
      bird.y = birdY;
      pipeArray = [];
      score = 0;
      gameOver = false;
    }
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
