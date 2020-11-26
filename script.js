//stars give you speed
// muffins give you power to defeat enemies or jump over sunbeam
// enemies appear occasionally and shoot/have tentacles and can kill you with 3 interactions
// you can kill them by shooting muffins
// a precious space fish must be collected and brought home (rare appearance)

const canvas = document.querySelector('canvas');

const game = new Game(canvas);

game.loop();