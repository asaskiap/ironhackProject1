//finish game (last boss appearance and killing)
// winning screen
// rework UI
// make sure game over and start screen work
// find soundtrack
// sound mute button
// clean up sleeping cat animation

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