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
  onePlayerGame();
  twoPlayerGame();
  startGameButton();
  if (scene == 1.5 || scene == 2) {
    restartGameButtonLeft();
    restartGameButtonRight();
  }
}

function draw() {
  if (scene == 0) {
    homeScreen();
  }

  else if (scene == 0.5 || scene == 1) {
    background('black');
    scoreBoard();
    movePaddles();
    checkScore();

    for (const ball of balls) {
      ball.hitPaddleLeft(paddle1);
      ball.hitPaddleLeft(aiPaddle);
      ball.hitPaddleRight(paddle2);
      ball.updateBallPosition();
      ball.orgin();
      ball.checkEdges();
    }

    fireDragon.dragonOrgin();
    fireDragon.dragonHit();
    fireDragon.dragonMove();
    fireDragon.dragonWall();

    if (scene == 0.5) {
      aiPaddle.startPosition();
      paddle2.startPosition();
    }

    else if (scene == 1) {
      paddle1.startPosition();
      paddle2.startPosition();
    }
  }

  else if (scene == 1.5 || scene == 2) {

    if (leftScore == 3) {
      textAlign(CENTER);
      text("WIN", (width / 4), windowHeight / 4);
      restartGameButtonLeft();
    }
    else if (rightScore == 3) {
      textAlign(CENTER);
      text("WIN!", width - (width / 4), windowHeight / 4);
      restartGameButtonRight();
    }
  }
}

function keyPressed() { // this key pressed starts the game

  if (keyCode === 49) { //this starts the one player version of the game
    if (scene == 0) {
      button1.style('display', 'none');
      button2.style('display', 'none');
      scene += 0.5;
    }

    else if (scene == 0.5) {
      onePlayerGame();
      scene++;
    }
  }

  if (keyCode === 50) { // this starts the two player version of the game
    if (scene == 0) {
      button1.style('display', 'none');
      button2.style('display', 'none');
      scene++;
    }
    else if (scene == 1) {
      twoPlayerGame();
      scene++;
    }
  }
  if (keyCode === 13) { //this restarts the game after hitting enter
    if (scene == 1.5) {
      scene = 0.5;
      onePlayerGame();
      leftScore = 0;
      rightScore = 0;
      clear();
      // button.style('display', 'none');
      // button3.style('display', 'none');
      // button4.style('display', 'none');
      // button5.style('display', 'none');
      // button6.style('display', 'none');
    }
    else if (scene == 2) {
      scene = 1;
      twoPlayerGame();
      leftScore = 0;
      rightScore = 0;
      clear();
      // button.style('display', 'none');
      // button3.style('display', 'none');
      // button4.style('display', 'none');
      // button5.style('display', 'none');
      // button6.style('display', 'none');
    }
  }
  if (keyCode === 27) { //this if statement brings you back to the home screen
    if (scene == 1.5 || scene == 2) {
      scene = 0;
      clear();
      homeScreen();
      // button.style('display', 'none');
      // button3.style('display', 'none');
      // button4.style('display', 'none');
      // button5.style('display', 'none');
      // button6.style('display', 'none');
    }
  }
}

function homeScreen() {
  background('black');
  textSize(60);
  text("START GAME", width / 2, height / 2 + 100);
  // if (scene == 0) {
  //   startGameButton();
  // }

}

function startGameButton() {
  button1 = createButton("One Player (1)");
  button1.size(200, 100);
  button1.position(width / 2 - 100, height / 3);
  button1.style("font-family", "Bodoni");
  button1.style("font-size", "20px");

  button2 = createButton("Two Players (2)");
  button2.size(200, 100);
  button2.position(width / 2 - 100, height / 3 + 100);
  button2.style("font-family", "Bodoni");
  button2.style("font-size", "20px");
}

function restartGameButtonLeft() {
  button3 = createButton("Play Again (enter)");
  button3.size(200, 100);
  button3.position(width / 4 - 100, height / 3);
  button3.style("font-family", "Bodoni");
  button3.style("font-size", "20px");

  button4 = createButton("Main Menu (esc)");
  button4.size(200, 100);
  button4.position(width / 4 - 100, height / 3 + 100);
  button4.style("font-family", "Bodoni");
  button4.style("font-size", "20px");
}

function restartGameButtonRight() {
  button5 = createButton("Play Again (enter)");
  button5.size(200, 100);
  button5.position(width - (width / 3), height / 3);
  button5.style("font-family", "Bodoni");
  button5.style("font-size", "20px");

  button6 = createButton("Main Menu (esc)");
  button6.size(200, 100);
  button6.position(width - (width / 3), height / 3 + 100);
  button6.style("font-family", "Bodoni");
  button6.style("font-size", "20px");
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
    aiPaddle.move();
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
  aiPaddle = new AiPaddle(40, 20, 100);

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