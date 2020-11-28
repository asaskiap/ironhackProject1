//collect at least 3 spacefish --> then last boss appears: guards the wormhole that will take you home
// kill last boss to get access to wormhole before time runs out
// avoid ferns and pillows and sunbeams
// collect stars, muffins and fish

// # TODAY
// wormhole*
// game over and start screen*
// player movement
// tweak times and probabilities

const canvas = document.querySelector('canvas');
const game = new Game(canvas);

const play = document.getElementById('startGame');
const playAgain = document.getElementById('restart');

const preGameScreen = document.getElementById('preGame');
const playGame = document.getElementById('gamePlay');
const gameOver = document.getElementById('gameOver');

play.addEventListener('click', () => {
    preGameScreen.style.display = 'none';
    playGame.style.display = 'initial';
    game.loop();
});

playAgain.addEventListener('click', () => {
    gameOver.style.display = 'none';
    playGame.style.display = 'initial';
    game.reset();
    game.loop();
});