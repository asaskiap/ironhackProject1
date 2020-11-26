class Sunglasses extends Item {
    constructor(x, y, dx, dy = 0.001) {
        super(x, y, dx, (dy = 0.001));
        this.color = '#42f5ef';
    }

    runLogic() {
        if (Math.random() < 0.002) {
            this.dy += 0.2;
        }
        if (Math.random() > 0.998) {
            this.dy -= 0.4;
        }
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, 15, 5);
    }
}