
let sound;
let dragon;
let paddle = [];

function preload() {
 sound = loadSound("data/Hit Sound.wav");
 dragon = loadImage("data/Dragon.gif") 
 
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    p1 = paddle.push(new Paddles(20, 20, 100));
    p2 = paddle.push(new Paddles(width - 40, 20, 100));


    
  }
  
  function draw() {
    background('black');
    // fireDragon();
    Paddles.
  
    

    
  }

  function mousePressed() {
    sound.play();
    
    

  }


  function fireDragon(){
    image (dragon, width/2, random(height));
  }