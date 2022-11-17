let scene = 0;

let sound;
let dragon;
let fireDragon;
let paddle1;
let paddle2;
// let ball;
let leftScore = 0;
let rigthScore = 0;
let balls = [];

function preload() {
 sound = loadSound("data/Hit Sound.wav");
 dragon = loadImage("data/Dragon.gif"); 
 
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    // ball = new Ball();
    balls.push(new Ball())

    // paddle1 is the paddle on the left.
    paddle1 =  new Paddle(40, 20, 100);

    // paddle2 is the paddle on the right.
    paddle2 =  new Paddle (width - 40, 20, 100);

    fireDragon = new Dragon();

    for (const ball in balls) {
      ball.backToOrgin();
    }
    
  }
  
  function draw() {
    background('black');
    score();
    movePaddles();
    
    ball.hitPaddleLeft(paddle1);
    ball.hitPaddleRight(paddle2);
    ball.updateBallPosition();
    ball.orgin();
    ball.checkEdges();

    paddle1.startPosition();
    paddle2.startPosition();

    fireDragon.dragonOrgin();
    fireDragon.dragonHit();
    fireDragon.dragonMove();
    fireDragon.dragonWall();
  }

  function movePaddles(){
    // this moves the paddles on the left 87 == w & 83 == s
    if (keyIsDown(87) ) {
      paddle1.move(-10);
    }
    if (keyIsDown(83)) {
      paddle1.move(10);
      }
      
      // this moves the paddles on the right
    if (keyIsDown(UP_ARROW)){
      paddle2.move(-10);
    }
    if (keyIsDown(DOWN_ARROW)){
      paddle2.move(10);
    }
  }

  function score(){
    textSize(40);
    text(leftScore, width/4, 100);

    textSize(40);
    text(rigthScore, width - (width/4), 100);

    for (let i = 0; i < windowHeight; i++){
      rect (width/2, 50 * i, 10, 20);
    }
  }
