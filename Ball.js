let ballID = 0;

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.r = 12;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.id = ballID++;
    }

    hitPaddleLeft(paddle1) {
        if (
            this.y - this.r < paddle1.y + paddle1.h / 2 &&
            this.y + this.r > paddle1.y - paddle1.h / 2 &&
            this.x - this.r < paddle1.x + paddle1.w / 2) {

            if (this.x > paddle1.x) {
                let diff = this.y - (paddle1.y - paddle1.h / 2);
                let rad = radians(45);
                let angle = map(diff, 0, paddle1.h, -rad, rad);
                this.xSpeed = 7 * Math.cos(angle);
                this.ySpeed = 7 * Math.sin(angle);
                this.x = paddle1.x + paddle1.w / 2 + this.r;
            }
        }
    }

    hitPaddleRight(paddle2) {
        if (
            this.y - this.r < paddle2.y + paddle2.h / 2 &&
            this.y + this.r > paddle2.y - paddle2.h / 2 &&
            this.x + this.r > paddle2.x - paddle2.w / 2) {

            if (this.x < paddle2.x) {
                let diff = this.y - (paddle2.y - paddle2.h / 2);
                let angle = map(diff, 0, paddle2.h, radians(225), radians(135));
                this.xSpeed = 7 * Math.cos(angle);
                this.ySpeed = 7 * Math.sin(angle);
                this.x = paddle2.x - paddle2.w / 2 - this.r;
            }
        }
    }

    updateBallPosition() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    backToOrgin() {
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.xSpeed = 5 * Math.cos(angle);
        this.ySpeed = 5 * Math.sin(angle);

        if (random(1) < 0.5) {
            this.xSpeed *= -1;
        }
    }

    checkEdges() {
        if (this.y < 0 || this.y > height) {
            this.ySpeed *= -1;
        }

        if (this.x - this.r > width) {
            this.backToOrgin();
            sound.play();
            leftScore++;
            deleteBall(this.id);
        }

        if (this.x - this.r < 0) {
            this.backToOrgin();
            sound.play();
            rightScore++;
            deleteBall(this.id);
        }
    }

    orgin() {
        fill(255);
        ellipse(this.x, this.y, this.r * 2);
    }
}