class Muffin extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = 'coral';
        this.width = 4;
        this.height = 4;
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
        game.ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        game.ctx.closePath();
        game.ctx.fill();
    }
}