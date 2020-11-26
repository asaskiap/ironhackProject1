class Sunbeam {
    constructor(width, speed = 2) {
        this.x = game.canvas.width;
        this.height = game.canvas.height;
        this.width = width;
        this.speed = speed;
    }

    runLogic() {
        this.x -= this.speed;
    }

    draw() {
        //vary width

        game.ctx.fillStyle = 'rgba(255, 253, 143,0.3)';
        game.ctx.fillRect(this.x, 0, this.width, this.height);
    }
}