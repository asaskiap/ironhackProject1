const sunImg = new Image();
sunImg.src = './images/sunbeamNew.png';
class Sunbeam {
    constructor(width = 400, speed = 2) {
        this.x = game.canvas.width;
        this.height = game.canvas.height;
        this.width = width;
        this.speed = speed;
    }

    runLogic() {
        this.x -= this.speed;
    }

    draw() {
        game.ctx.drawImage(sunImg, this.x, 0, this.width, this.height);
        // game.ctx.fillStyle = 'rgba(255, 253, 143,0.3)';
        // game.ctx.fillRect(this.x, 0, this.width, this.height);
    }
}