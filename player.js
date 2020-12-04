//Images
const catFrontal = new Image();
catFrontal.src = './images/IronhackCanvasGame_kittyFrontNew.png';
const catLeft = new Image();
catLeft.src = './images/IronhackCanvasGame_kittyLeft.png';
const catRight = new Image();
catRight.src = './images/IronhackCanvasGame_kittyRight.png';
const catBack = new Image();
catBack.src = './images/IronhackCanvasGame_kittyBack.png';
const eatFern = new Image();
eatFern.src = './images/IronhackCanvasGame_kittyFern.png';
const inBox = new Image();
inBox.src = './images/IronhackCanvasGame_catInBox.png';
const catSleeping = new Image();
catSleeping.src = './images/kittySleeping.png';

//Audio
const nom = new Audio('./sounds/eating muffin.mp3');
const fernSound = new Audio('./sounds/chewing plant.mp3');
const purr = new Audio('./sounds/sun beam purring.mp3');
const starSound = new Audio('./sounds/Bubbles5.wav');
const fishSound = new Audio('./sounds/BellShort1.wav');
const boxSound = new Audio('./sounds/cat in a box.mp3');

//code
class Player {
    constructor(game, x, y, h, w, dx = 1, dy = 1) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.height = h;
        this.width = w;
        this.dx = dx;
        this.dy = dy;
        this.stars = 0;
        this.bulletStars = [];
        this.sunbeamctr = 0;
        this.muffins = 0;
        this.fish = 0;
        this.img = catFrontal;
        this.fishDisplay = document.getElementById('fishDisplay');
        this.mute = false;
        // mute button
        const mute = document.getElementById('mute');
        mute.addEventListener('click', () => {
            if (!this.mute) {
                this.mute = true;
                mute.innerHTML = 'UNMUTE';
            } else {
                this.mute = false;
                mute.innerHTML = 'MUTE SOUNDS';
            }
        });
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
        if (!this.mute) {
            fishSound.play();
        }

        this.fish++;
        if (this.fish === 1) {
            this.fishDisplay.src = 'images/fishCounter_1.png';
        }
        if (this.fish === 2) {
            this.fishDisplay.src = 'images/fishCounter_2.png';
        }
        if (this.fish === 3) {
            this.fishDisplay.src = 'images/fishCounter_3.png';
        }

        // const fishCtr = document.getElementById('fish');
        // fishCtr.innerHTML += '&#128031';
    }

    collectStars() {
        if (!this.mute) {
            starSound.play();
        }

        this.stars++;
        if (this.stars % 5 === 0) {
            this.addSpeed();
        }
    }

    collectMuffins() {
        this.muffins++;
        if (!this.mute) {
            nom.play();
        }
    }

    fern() {
        if (!this.mute) {
            fernSound.play();
        }

        this.fernctr = 200;
        this.fern_x = this.x;
        this.fern_y = this.y;
    }

    pillow() {
        if (!this.mute) {
            boxSound.play();
        }

        this.pillowctr = 200;
    }

    sunbeam() {
        if (!this.mute) {
            purr.play();
        }

        this.sunbeamctr = 100;
        this.sunbeamy = this.y;
    }

    jump() {
        // you can't jump if you are already in a sunbeam
        console.log(this.sunbeamctr, this.muffins);
        if (this.sunbeamctr < 1 && this.muffins > 2) {
            this.x += 350;
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
            this.img = eatFern;
            this.x = this.fern_x;
            this.y = this.fern_y;

            this.fernctr--;
            const msg = document.getElementById('msg');
            msg.innerHTML = `FERN SNACKING ATTACK`;
        }
        if (this.pillowctr > 0) {
            this.img = inBox;
            this.x = 0;
            this.y = 0;
            this.pillowctr--;
            const msg = document.getElementById('msg');
            msg.innerHTML = `NAP ATTACK`;
        }
        if (this.sunbeamctr > 0) {
            this.img = catSleeping;
            this.x = this.x - 2;
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
        this.dx += 0.5;
        this.dy += 0.5;
        this.speedctr = 100;
    }

    draw(x, y) {
        // game.ctx.fillStyle = 'lightgrey';
        // game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}