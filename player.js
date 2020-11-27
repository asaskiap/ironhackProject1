class Player {
    constructor(game, x, y, h, w, dx = 2, dy = 2) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.height = h;
        this.width = w;
        this.dx = dx;
        this.dy = dy;
        this.stars = 0;
        this.bulletStars = [];
        this.muffins = 0;
        this.fish = 0;
        this.distanceToHome = 5000;
    }

    shoot() {
        if (this.stars > 0) {
            const bullet = new BulletStar(
                this.x + this.height / 2,
                this.y + this.width / 2
            );
            this.bulletStars.push(bullet);
            this.stars--;
        }
    }
    collectFish() {
        console.log('interaction');
        this.fish++;
        const fishCtr = document.getElementById('fish');
        fishCtr.innerHTML += '&#128031';
    }

    collectStars() {
        this.stars++;
        if (this.stars % 5 === 0) {
            this.addSpeed();
        }
    }

    collectMuffins() {
        this.muffins++;
    }

    fern() {
        this.fernctr = 200;
        this.fern_x = this.x;
        this.fern_y = this.y;
        this.fernDist = this.distanceToHome;
    }

    pillow() {
        this.pillowctr = 200;
        this.distanceToHome += this.x;
        this.pillowDist = this.distanceToHome;
    }

    sunbeam() {
        this.sunbeamctr = 100;
        this.sunbeamy = this.y;
    }

    jump() {
        if (this.muffins > 2) {
            this.x += 250;
            this.distanceToHome -= 250;
            this.muffins -= 3;
        }
    }

    runLogic() {
        // Muffins
        const muffins = document.getElementById('muffins');
        muffins.innerHTML = `&#129473: ${this.muffins}`;
        if (this.muffins > 2) {
            const bolt = document.getElementById('bolt');
            bolt.innerHTML = `&#9889`;
        } else {
            bolt.innerHTML = ``;
        }

        //stars
        const stars = document.getElementById('stars');
        stars.innerHTML = `&#10032: ${this.stars}`;

        // reset msg
        const msg = document.getElementById('msg');
        msg.innerHTML = ``;

        //collision detection
        if (this.x > this.game.canvas.width - this.width) {
            this.x = this.game.canvas.width - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > this.game.canvas.height - this.height) {
            this.y = this.game.canvas.height - this.height;
        }
        if (this.y < 0) {
            this.y = 0;
        }

        // logic for interaction with fern, pillow, sunbeam
        if (this.fernctr > 0) {
            this.x = this.fern_x;
            this.y = this.fern_y;

            this.distanceToHome = this.fernDist;
            this.fernctr--;
            const msg = document.getElementById('msg');
            msg.innerHTML = `FERN SNACKING ATTACK`;
        }
        if (this.pillowctr > 0) {
            this.x = 0;
            this.y = 0;
            this.distanceToHome = this.pillowDist;
            this.pillowctr--;
            const msg = document.getElementById('msg');
            msg.innerHTML = `NAP ATTACK`;
        }
        if (this.sunbeamctr > 0) {
            this.x = this.x - 2;
            this.distanceToHome += 2;
            this.y = this.sunbeamy;
            this.sunbeamctr--;
            const msg = document.getElementById('msg');
            msg.innerHTML = `SUN BEAM DRAG`;
        }

        if (this.speedctr > 0) {
            const msg = document.getElementById('msg');
            msg.innerHTML = `ADDED SPEED`;
            this.speedctr--;
        }
    }

    addSpeed() {
        this.dx += 1;
        this.dy += 1;
        this.speedctr = 100;
    }

    draw(x, y) {
        game.ctx.fillStyle = 'lightgrey';
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}