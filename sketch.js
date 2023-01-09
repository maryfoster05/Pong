let sound;
let roar;
let dragon;
let fireDragon;
let balls = [];
let scene = 0;
let paddle1, paddle2, aiPaddle;
let leftScore = 0;
let rightScore = 0;
let button1, button2, button3, button4;

function preload() {
  sound = loadSound("data/Hit Sound.wav");
  dragon = loadImage("data/Dragon.gif");
  roar = loadSound("data/Dragon Roar.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  onePlayerGame();
  twoPlayerGame();
  gameButtons();
}

function draw() {
  // console.log(getSceneName(scene));
  if (scene == 0) {
    homeScreen();
    startGame();
  }

  else if (scene == 0.5 || scene == 1) {
    inGame();
  }

  else if (scene == 1.5 || scene == 2) {
    endScreen();
    restartGame();
    backToHomeScreen();
  }
}

function gameButtons() {

  button1 = createButton("One Player (1)");
  button1.size(200, 100);
  button1.style("font-family", "Courier New");
  button1.style("font-size", "20px");

  button2 = createButton("Two Players (2)");
  button2.size(200, 100);
  button2.style("font-family", "Courier New");
  button2.style("font-size", "20px");

  button3 = createButton("Play Again (enter)");
  button3.size(200, 100);
  button3.style("font-family", "Courier New");
  button3.style("font-size", "20px");
  button3.style("display", "none");

  button4 = createButton("Main Menu (esc)");
  button4.size(200, 100);
  button4.style("font-family", "Courier New");
  button4.style("font-size", "20px");
  button4.style("display", "none");
}

function homeScreen() {

  background('black');

  button1.style('display', 'block');
  button1.position(width / 2 - 100, height / 3);
  button2.style('display', 'block');
  button2.position(width / 2 - 100, height / 3 + 100);

  textAlign(CENTER, CENTER);
  fill('white');
  textFont("Courier New");
  textSize(90);
  text('PONG', width / 2, 150);
  textSize(30);
  text('First to 5 Wins', width / 2, 200);
  text('Paddle on the left uses keys W and S', width / 2, height / 3 + 250);
  text('Paddle on the right uses the up and down key', width / 2, height / 3 + 300);
}

function startGame() {
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
}

function onePlayerGame() {
  balls = [];
  balls.push(new Ball());

  // aiPaddle is the automatic moving paddle on the left.
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

function inGame() {
  background('black');
  scoreBoard();
  movePaddles();
  checkScore();

  fireDragon.dragonOrgin();
  fireDragon.dragonHit();
  fireDragon.dragonMove();
  fireDragon.dragonWall();

  if (scene == 0.5) {
    for (const ball of balls) {
      ball.hitPaddleLeft(aiPaddle);
      ball.hitPaddleRight(paddle2);
      ball.updateBallPosition();
      ball.orgin();
      ball.checkEdges();
    }
    aiPaddle.startPosition();
    paddle2.startPosition();
  }

  else if (scene == 1) {
    for (const ball of balls) {
      ball.hitPaddleLeft(paddle1);
      ball.hitPaddleRight(paddle2);
      ball.updateBallPosition();
      ball.orgin();
      ball.checkEdges();
    }
    paddle1.startPosition();
    paddle2.startPosition();
  }
}

function movePaddles() {
  if (scene == 0.5) {
    aiPaddle.move();
    // this moves the paddles on the right in one player
    if (keyIsDown(UP_ARROW)) {
      paddle2.move(-10);
    }
    if (keyIsDown(DOWN_ARROW)) {
      paddle2.move(10);
    }
  }

  else if (scene == 1) {
    // this moves the paddles on the left; 87 == w & 83 == s
    if (keyIsDown(87)) {
      paddle1.move(-10);
    }
    if (keyIsDown(83)) {
      paddle1.move(10);
    }
    // this moves the paddles on the right in two player
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
  if (leftScore == 5) {
    scene++;
  }
  if (rightScore == 5) {
    scene++;
  }
}

function deleteBall(id) {
  // This function deletes the ball that spawns after 
  // hitting the dragon once the ball goes off the screen
  if (id > 0) {
    balls.splice(1, balls.length - 1);
  }
}

function endScreen() {
  if (leftScore == 5) {
    // left side end screen
    textAlign(CENTER);
    text("WIN", (width / 4), windowHeight / 4);
    button3.style('display', 'block');
    button3.position(width / 4 - 100, height / 3);
    button4.style('display', 'block');
    button4.position(width / 4 - 100, height / 3 + 100);
  }
  else if (rightScore == 5) {
    // right side end screnn
    textAlign(CENTER);
    text("WIN!", width - (width / 4), windowHeight / 4);
    button3.style('display', 'block');
    button3.position(width - (width / 3), height / 3);
    button4.style('display', 'block');
    button4.position(width - (width / 3), height / 3 + 100);
  }
}

function restartGame() {
  // This function automatically restarts the same player 
  // game that was just played
  if (keyCode === 13) {

    button3.style('display', 'none');
    button4.style('display', 'none');

    if (scene == 1.5) {
      // restarts one player game
      scene = 0.5;
      onePlayerGame();
      leftScore = 0;
      rightScore = 0;
      background('black');
    }

    else if (scene == 2) {
      // restarts two player game
      scene = 1;
      twoPlayerGame();
      leftScore = 0;
      rightScore = 0;
      background('black');
    }
  }
}

function backToHomeScreen() {
  if (keyCode === 27) { // esc key
    button3.style('display', 'none');
    button4.style('display', 'none');

    if (scene == 1.5 || scene == 2.0) {
      scene = 0;
      leftScore = 0;
      rightScore = 0;
      homeScreen();
      onePlayerGame();
      twoPlayerGame();
    }
  }
}
      
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  button.position(width / 2 - 100, height / 2 - 100);
}

function getSceneName(num) {
  if (num == 0){
    return "Home Screen";
  }
  else if (num == 0.5){
    return "Playing One Player Game"
  }

  else if (num == 1){
    return "Playing Two Player Game"
  }

  else if (num == 1.5){
    return "Automatically restarts one player game"
  }

  else if (num == 2.0){
    return "Automatically restarts two player game"
  }
}