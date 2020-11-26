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
        this.muffins = 0;
        this.sunglasses = 0;
        this.sunglassctr = 0;
        this.energy = 100;
        this.energyClock = setInterval(() => {
            this.energy--;
        }, 1000);
        this.distanceToHome = 10000;
    }

    collectStars() {
        this.stars++;
        this.energy += 10;
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
        if (this.sunglasses > 0) {
            this.sunglassctr = 100;
            this.sunglasses--;
        }
        this.sunbeamctr = 100;
        this.sunbeamy = this.y;
    }

    runLogic() {
        //  energy
        const energyClock = document.getElementById('energy');
        if (this.energy < 0) {
            energyClock.innerHTML = `GAME OVER !!`;
        } else {
            energyClock.innerHTML = `ENERGY: ${this.energy}`;
        }

        // Muffins
        const muffins = document.getElementById('muffins');
        muffins.innerHTML = `MUFFIN COUNT: ${this.muffins}`;

        //stars
        const stars = document.getElementById('stars');
        stars.innerHTML = `STAR COUNT: ${this.stars}`;

        //sunglasses
        const sunglass = document.getElementById('sunglasses');
        sunglass.innerHTML = `SUNGLASSES: ${this.sunglasses}`;

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
            if (this.sunglassctr > 0) {
                this.sunglassctr--;
            } else {
                this.x = this.x - 2;
                this.distanceToHome += 2;
                this.y = this.sunbeamy;
                this.sunbeamctr--;
                const msg = document.getElementById('msg');
                msg.innerHTML = `SUN BEAM DRAG`;
            }
        }

        if (this.speedctr > 0) {
            const msg = document.getElementById('msg');
            msg.innerHTML = `ADDED SPEED`;
            this.speedctr--;
        }
    }

    addSpeed() {
        this.dx += 2;
        this.dy += 2;
        this.speedctr = 100;
    }

    draw(x, y) {
        game.ctx.fillStyle = 'lightgrey';
        game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}