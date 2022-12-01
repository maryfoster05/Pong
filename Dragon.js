class Dragon extends Ball {

    constructor() {
        super();
        this.x = width / 2;
        this.y = height / 2;
        this.h = 150; //dragon.height;
        this.w = 150; //dragon.width;
        this.ySpeed = 1;
        this.lastDragonHit = 0;
    }

    dragonOrgin() {
        imageMode(CENTER);
        image(dragon, this.x, this.y, 150, 150);
    }


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
        for (const ball of balls) {
            if (ball.x > this.x &&
                ball.x < this.x + this.w &&
                ball.y > this.y &&
                ball.y < this.y + this.h

            ) {
                if (millis() - this.lastDragonHit > 10000) {
                    console.log (millis());
                    let b = new Ball();
                    balls.push(b);
                    b.backToOrgin();
                    this.lastDragonHit = millis();
                    console.log (this.lastDragonHit);
                }

            }
        }
    }
}