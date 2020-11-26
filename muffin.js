class Muffin extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = 'coral';
    }

    runLogic() {
        super.runLogic();
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.beginPath();
        game.ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        game.ctx.closePath();
        game.ctx.fill();
    }
}