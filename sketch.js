let sound;
let dragon;
let scene = 0;
let button;
let fireDragon;
let paddle1;
let paddle2;
let leftScore = 0;
let rightScore = 0;
let balls = [];

function preload() {
  sound = loadSound("data/Hit Sound.wav");
  dragon = loadImage("data/Dragon.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(scene);

  makeButton();

  if (scene == 1 || scene == 3); {
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
}

function draw() {
  if (scene == 0) {
    background('pink');
  }

  if (scene == 1 || scene == 3) {
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

    checkScore();
  }

  if (scene == 2) {
    background('pink');
    text("Game Over!!", width / 2,  height / 2,);
    text("Hit enter to play again",  width / 2, height / 3,);
  }

}

function keyPressed() { // this key pressed starts the game
  if (keyCode === 13) {
    scene++;
    if (scene == 1) {
      button.style('display', 'none');
    }
    if (scene == 3) {
      // create a function that resets the game somehow.
    }
    console.log(scene);
  }
}

function makeButton() {
  button = createButton("Hit Enter to Start!");
  button.size(200, 200);
  button.position(350, 300);
  button.style("font-family", "Bodoni");
  button.style("font-size", "48px");
}

function movePaddles() {
  // this moves the paddles on the left; 87 == w & 83 == s
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
  text(rightScore, width - (width / 4), 100);

  for (let i = 0; i < windowHeight; i++) { //this for loop creates the dashed line
    rect(width / 2, 50 * i, 10, 20);
  }
}

function checkScore() {
  if (leftScore == 3) {
    scene++;
  }

  if (rightScore == 3) {
    scene++;
  }
}

function deleteBall(id) {
  if (this.id > 0) {
    console.log (balls);
    balls.splice(1, balls.length3);
  }
}