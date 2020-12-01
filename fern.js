const fernImage = new Image();
fernImage.src = './images/IronhackCanvasGame_plant.png';

class Fern extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = '#13ab48';
        this.width = 40;
        this.height = 40;
    }

    runLogic() {
        if (Math.random() < 0.002) {
            this.dy += 0.1;
        }
        if (Math.random() > 0.998) {
            this.dy -= 0.1;
        }
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        game.ctx.drawImage(fernImage, this.x, this.y, this.width, this.height);
    }
}