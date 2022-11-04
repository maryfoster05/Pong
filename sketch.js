
let sound;
let dragon;
let paddle1;
let paddle2;
let ball;

function preload() {
 sound = loadSound("data/Hit Sound.wav");
 dragon = loadImage("data/Dragon.gif") 
 
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    ball = new Ball();
    paddle1 =  new Paddle(40, 20, 100);
    paddle2 =  new Paddle (width - 40, 20, 100);
    
  }
  
  function draw() {
    background('black');

    ball.hitPaddleLeft(paddle1);
    ball.hitPaddleRight(paddle2);

    paddle1.startPosition();
    paddle2.startPosition();

    ball.updateBallPosition();
    ball.checkEdges();
    ball.orgin();
    
    
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

  // function mousePressed() {
  //   sound.play();
    
  // }


  function fireDragon(){
    image (dragon, width/2, random(height));
  }