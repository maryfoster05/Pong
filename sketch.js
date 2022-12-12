let sound;
let dragon;
let scene = 0;
let player = 0;
let button;
let fireDragon;
let paddle1;
let paddle2;
let aiPaddle;
let leftScore = 0;
let rightScore = 0;


function preload() {
  sound = loadSound("data/Hit Sound.wav");
  dragon = loadImage("data/Dragon.gif");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(scene);

  makeButton();
  onePlayerGame();
  twoPlayerGame();
}

function draw() {
  if (scene == 0) {
    background('purple');
  }

  else if (scene == 0.5 || scene == 1) {
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
    aiPaddle.startPosition();

    fireDragon.dragonOrgin();
    fireDragon.dragonHit();
    fireDragon.dragonMove();
    fireDragon.dragonWall();

    checkScore();
  }

  else if (scene == 2) {
    background('maroon');
    textAlign(CENTER);
    text("Game Over!!", windowWidth / 2, windowHeight / 3);
    text("Hit Enter to Play Again", windowWidth / 2, windowHeight / 2);
    if (leftScore == 3) {
      text("Player One Won!!", windowWidth / 2, windowHeight / 2.5);
    }
    else if (rightScore == 3) {
      text("Player Two Won!!", windowWidth / 2, windowHeight / 2.5);
    }
  }
}

function keyPressed() { // this key pressed starts the game
  if (keyCode === 13) {

    if (scene == 0) {
      button.style('display', 'none');
      button.style('display', 'none');
      scene++;
    }

    else if (scene == 1) {
      twoPlayerGame();
      scene++;
    }
    else if (scene == 2) {
      scene = 1;
      twoPlayerGame();
      leftScore = 0;
      rightScore = 0;
    }
  }

  else if (keyCode === 79) {
    if (scene == 0) {
      button.style('display', 'none');
      button.style('display', 'none');
      scene += 0.5;
    }

    else if (scene == 1.5) {
      onePlayerGame();
      scene += 0.5;
    }
  }
}

function makeButton() {
  button = createButton("Hit 'O' to Start Single Player Game!");
  button.size(200, 200);
  button.position(width / 2 - 100, height - 600);
  console.log(width, height);
  button.style("font-family", "Bodoni");
  button.style("font-size", "30px");


  button = createButton("Hit Enter to Start Two Player Game!");
  button.size(200, 200);
  button.position(width / 2 - 100, height / 2 + 50);
  console.log(width, height);
  button.style("font-family", "Bodoni");
  button.style("font-size", "30px");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(width / 2 - 100, height / 2 - 100);
}

function movePaddles() {
  // this moves the paddles on the left; 87 == w & 83 == s
  if (scene == 0.5) {
    if (keyIsDown(UP_ARROW)) {
      paddle2.move(-10);
    }
    if (keyIsDown(DOWN_ARROW)) {
      paddle2.move(10);
    }

    paddle1.move(AiPaddle.move());

  }

  else if (scene == 1) {
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
  if (id > 0) {
    balls.splice(1, balls.length);
  }
}

function onePlayerGame() {
  balls = [];
  balls.push(new Ball());

  // paddle1 is the automatic moving paddle on the left.
  paddle1 = new AiPaddle(40, 20, 100);

  // paddle2 is the paddle on the right.
  paddle2 = new Paddle(width - 40, 20, 100);

  fireDragon = new Dragon();

  for (const ball of balls) {
    ball.backToOrgin();
  }
}

function twoPlayerGame() {
  balls = [];
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