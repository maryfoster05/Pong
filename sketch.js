
let sound;
let dragon;
let paddle1;
let paddle2;
let ball;
let leftScore = 0;
let rigthScore = 0;


function preload() {
 sound = loadSound("data/Hit Sound.wav");
 dragon = loadImage("data/Dragon.gif") 
 
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    ball = new Ball();
    paddle1 =  new Paddle(40, 20, 100);
    paddle2 =  new Paddle (width - 40, 20, 100);
    ball.backToOrgin();
    
  }
  
  function draw() {
    background('black');

    textSize(40);
    text(leftScore, width/4, 100);

    textSize(40);
    text(rigthScore, width - (width/4), 100);

    for (let i = 0; i < windowHeight; i++){
      rect (width/2, 50 * i, 10, 20);
    }


    ball.hitPaddleLeft(paddle1);
    ball.hitPaddleRight(paddle2);

    paddle1.startPosition();
    paddle2.startPosition();

    ball.updateBallPosition();
    ball.orgin();
    ball.checkEdges();
    
    
    
    // fireDragon();

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


  function fireDragon(){
    image (dragon, width/2, random(height));
  }

  