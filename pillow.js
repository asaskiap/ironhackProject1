class Pillow extends Item {
    constructor(x, y, dx, dy = 0) {
        super(x, y, dx, (dy = 0));
        this.color = '#ab183f';
    }

    runLogic() {
        if (Math.random() < 0.01) {
            this.dy += 0.2;
        }
        if (Math.random() < 0.01) {
            this.dy -= 0.05;
        }
        this.x -= this.dx;
        this.y += this.dy;
    }

    interactionDetection(player) {
        return super.interactionDetection(player);
    }

    draw() {
        super.draw();
    }
}