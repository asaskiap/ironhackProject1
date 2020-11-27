class Octopus extends Item {
    constructor(x, y, dx, dy) {
        super(x, y, dx, dy);
        this.color = 'coral';
        this.width = 200;
        this.height = 300;
    }

    draw() {
        game.ctx.fillStyle = this.color;
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}