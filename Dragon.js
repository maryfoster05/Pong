class Dragon extends Ball{
    
    constructor(){
        super();
        this.x = width / 2;
        this.y = height / 2;
        this.h = dragon.height;
        this.w = dragon.width;
        this.ySpeed = 1;

    }

    dragonOrgin(){
        imageMode(CENTER);
        image (dragon, this.x, this.y, 150, 150);
    }

    dragonWall(){
        if (this.y  == height || this.y == 0) {
            this.ySpeed *= -1;
          }
    }

    dragonMove(){
        this.y += this.ySpeed
    }

    dragonHit(){
        if (this.x == Ball.x){
            console.log("hit");x
            push (new Ball());
        }
    }
}