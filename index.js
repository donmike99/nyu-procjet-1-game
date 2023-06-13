let gamescreen;
let gamescreenwidth = 360;
let gamescreenheight = 550;
let context;

let birdwidth =34;
let birdheight =24;
let birdx = birdheight/2;
let birdy = birdwidth/8;

let bird = {
    x: birdx,
    y: birdy,
    width: birdwidth,
    height: birdheight,
}

window.onload = function () {
  gamescreen = document.getElementById("gamescreen");
  gamescreen.width = gamescreenwidth;
  gamescreen.height = gamescreenheight;
  context = gamescreen.getcontext("2d");

  birdImg = new Image();
  birdImg.url = "./asset/sprites/yellowbird-midflap.png";
  birdImg.onload = function () {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
};

