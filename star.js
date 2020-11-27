class Star extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = 'white';
        this.width = 2;
        this.height = 2;
    }

    runLogic() {
        if (Math.random() < 0.01) {
            this.dy += 0.25;
        }
        if (Math.random() < 0.01) {
            this.dy -= 0.25;
        }
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        game.ctx.closePath();
        game.ctx.fill();
    }
}