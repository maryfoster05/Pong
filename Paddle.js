class Paddle {
    constructor(x, w, h) {
        this.x = x;
        this.y = height / 2;
        this.w = w;
        this.h = h;
    }

    startPosition() {
        fill(255);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    move(position) {
        this.y += position;
    }
}

