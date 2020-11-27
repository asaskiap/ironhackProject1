class Octopus extends Item {
    constructor(x, y, dx, dy) {
        super(x, y, dx, dy);
        this.color = 'coral';
        this.width = 100;
        this.height = 300;
        this.life = 100;
    }

    hit() {
        this.life -= 5;
        console.log('hit' + this.life);
    }

    interactionDetection() {
        if (this.y < 0 || this.y > game.canvas.height) {
            this.dy *= -1;
        }
    }

    runLogic() {
        this.interactionDetection();
        this.y += this.dy;
    }
    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}