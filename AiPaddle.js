class AiPaddle extends Paddle{

    constructor(x,w,h){
        super(x,w,h);
    }

    move() {
       this.y = balls[0].y;
    }       
}