const readline = require("readline");
const Board = require("./board");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const board = new Board();

const makeTurn = () => {
  console.log(board.toString());

  rl.question("Pick number to move: ", function (numInput) {
    const num = Number(numInput);

    if (!isNaN(num) && num > 0 && num < 16) {
      board.moveCell(num);
    } else {
      console.error("Invalid number provided. Think twice and try again.");
    }

    if (board.isSolved()) {
      console.log("Congratulations. You've finished this game");
      rl.close();
    } else {
      makeTurn();
    }
  });
};

makeTurn()
