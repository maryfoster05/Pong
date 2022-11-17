class Dragon extends Ball {

    constructor() {
        super();
        this.x = width / 2;
        this.y = height / 2;
        this.h = dragon.height;
        this.w = dragon.width;
        this.ySpeed = 1;

    }

    dragonOrgin() {
        imageMode(CENTER);
        image(dragon, this.x, this.y, 150, 150);
    }

    // test
    dragonWall() {
        if (this.y > height) {
            this.y = height;
            this.ySpeed *= -1;
        }
        else if (this.y < 0) {
            this.y = 0;
            this.ySpeed *= -1;
        }
    }

    dragonMove() {
        this.y += this.ySpeed
        this.dragonWall();
    }

    dragonHit() {
        if (ball.x > this.x && 
            ball.x < this.x + this.w &&
            ball.y > this.y &&
            ball.y < this.y + this.h
            
            ) {
            console.log("hit");
            // push(new Ball());
        }
    }
}