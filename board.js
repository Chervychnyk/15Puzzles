const { shuffle, chunk, areArraysEqual, isSolvable } = require("./utils");

const EMPTY_SLOT_VALUE = 0;

const SOLVED_BOARD = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, EMPTY_SLOT_VALUE],
];

class Board {
  constructor() {
    this.emptySlot = [3, 3];
    this.table = this.initTable();
  }

  initTable() {
    const initialItems = Array.from({ length: 15 }, (_, i) => i + 1);

    const shuffledItems = shuffle(initialItems);

    if (isSolvable(shuffledItems)) {
      return this.initTable();
    } else {
      return chunk([...shuffledItems, EMPTY_SLOT_VALUE], 4);
    }
  }

  moveCell(num) {
    const position = this.findPosition(num);

    if (this.canMoveCell(position)) {
      const [row, cell] = position;
      const [emptySlotRow, emptySlotCell] = this.emptySlot;

      this.table[emptySlotRow][emptySlotCell] = num;
      this.table[row][cell] = EMPTY_SLOT_VALUE;

      this.emptySlot = position;
    } else {
      console.error("You cannot move this cell");
    }
  }

  toString() {
    console.log("------------");
    this.table.forEach((row) => {
      const formattedRow = row
        .map((num) => {
          if (num == EMPTY_SLOT_VALUE) return "  ";

          return num < 10 ? " " + num : num;
        })
        .join("|");

      console.log("|" + formattedRow + "|");
      console.log("------------");
    });
  }

  isSolved() {
    return areArraysEqual(this.table, SOLVED_BOARD);
  }

  findPosition(num) {
    let position;

    this.table.forEach((row, rowIndex) => {
      const cellIndex = row.findIndex((cell) => cell === num);

      if (cellIndex > -1) {
        position = [rowIndex, cellIndex];

        return;
      }
    });

    return position;
  }

  canMoveCell(from) {
    const [fromRow, fromCell] = from;
    const [emptySlotRow, emptySlotCell] = this.emptySlot;

    if (fromRow == emptySlotRow) {
      return fromCell == emptySlotCell - 1 || fromCell == emptySlotCell + 1;
    } else if (fromCell == emptySlotCell) {
      return fromRow == emptySlotRow - 1 || fromRow == emptySlotRow + 1;
    } else {
      return false;
    }
  }
}

module.exports = Board;
