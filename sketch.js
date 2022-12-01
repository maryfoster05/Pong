let sound;
let dragon;
let scene;
let button;
let fireDragon;
let paddle1;
let paddle2;
let leftScore = 0;
let rigthScore = 0;
let balls = [];

function preload() {
  sound = loadSound("data/Hit Sound.wav");
  dragon = loadImage("data/Dragon.gif");

}

function setup() {
  textSize(40);
  createCanvas(windowWidth, windowHeight);
  scene = 0;

  buttonSetup();

  balls.push(new Ball());

  // paddle1 is the paddle on the left.
  paddle1 = new Paddle(40, 20, 100);

  // paddle2 is the paddle on the right.
  paddle2 = new Paddle(width - 40, 20, 100);

  fireDragon = new Dragon();

  for (const ball of balls) {
    ball.backToOrgin();
  }

}

function draw() {
  if (scene == 1) {
    background('black');
    scoreBoard();
    movePaddles();

    for (const ball of balls) {
      ball.hitPaddleLeft(paddle1);
      ball.hitPaddleRight(paddle2);
      ball.updateBallPosition();
      ball.orgin();
      ball.checkEdges();
    }

    paddle1.startPosition();
    paddle2.startPosition();

    fireDragon.dragonOrgin();
    fireDragon.dragonHit();
    fireDragon.dragonMove();
    fireDragon.dragonWall();
  }
}

function buttonSetup() {
  background('blue')
  button = createButton('click me to start the game');
  button.position(width / 2, height / 2);
  button.mousePressed(scene = 1);
  clear();
  scene = 1;


}


function movePaddles() {
  // this moves the paddles on the left 87 == w & 83 == s
  if (keyIsDown(87)) {
    paddle1.move(-10);
  }
  if (keyIsDown(83)) {
    paddle1.move(10);
  }

  // this moves the paddles on the right
  if (keyIsDown(UP_ARROW)) {
    paddle2.move(-10);
  }
  if (keyIsDown(DOWN_ARROW)) {
    paddle2.move(10);
  }
}

function scoreBoard() {
  textSize(40);
  text(leftScore, width / 4, 100);

  textSize(40);
  text(rigthScore, width - (width / 4), 100);

  for (let i = 0; i < windowHeight; i++) { //this for loop creates the dashed line
    rect(width / 2, 50 * i, 10, 20);
  }
}
