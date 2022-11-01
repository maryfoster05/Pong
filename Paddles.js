class Paddles {

    constructor(x, w, h){
        this.x = x
        this.y = height/2;
        this.w = w;
        this.h = h;
        

    }

    display(){
        this.moveLeftPaddle();
    }
    
    startPosition () {
        fill (255);
        rect (this.x, this.y, this.w, this.h);

    }

    moveLeftPaddle () {
        if (keyCode === UP_ARROW) {
            this.y += 10;
          } 
        else if (keyCode === DOWN_ARROW) {
            this. y -= 10;
          } 
    }
}