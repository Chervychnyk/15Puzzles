const { shuffle, chunk, areArraysEqual } = require("./utils");

const EMPTY_SLOT_VALUE = 0;

const SOLVED_BOARD = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, EMPTY_SLOT_VALUE],
];

class Board {
  constructor() {
    const initialItems = Array.from({ length: 15 }, (_, i) => i + 1);

    const shuffledItems = shuffle(initialItems);

    this.emptySlot = [3, 3];
    this.table = chunk([...shuffledItems, EMPTY_SLOT_VALUE], 4);
  }

  moveCell(num) {
    const position = this.findPosition(num);

    if (this.canMoveCell(position)) {
      const [row, cell] = position;
      const [emptySlotRow, emptySlotCell] = this.emptySlot;

      if (row == emptySlotRow) {
        this.swapBetweenCells(num, row, cell, emptySlotCell);
      } else {
        this.swapBetweenRows(num, cell, row, emptySlotRow);
      }

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

  swapBetweenCells(num, row, fromCell, toCell) {
    const rowToChange = this.table[row];

    const updatedRow =
      fromCell > toCell
        ? [
            ...rowToChange.slice(0, toCell),
            num,
            EMPTY_SLOT_VALUE,
            ...rowToChange.slice(fromCell + 1),
          ]
        : [
            ...rowToChange.slice(0, fromCell),
            EMPTY_SLOT_VALUE,
            num,
            ...rowToChange.slice(toCell + 1),
          ];

    this.table = [
      ...this.table.slice(0, row),
      updatedRow,
      ...this.table.slice(row + 1),
    ];
  }

  swapBetweenRows(num, cell, fromRow, toRow) {
    if (fromRow > toRow) {
      this.table = [
        ...this.table.slice(0, toRow),
        [
          ...this.table[toRow].slice(0, cell),
          num,
          ...this.table[toRow].slice(cell + 1),
        ],
        [
          ...this.table[fromRow].slice(0, cell),
          EMPTY_SLOT_VALUE,
          ...this.table[fromRow].slice(cell + 1),
        ],
        ...this.table.slice(fromRow + 1),
      ];
    } else {
      this.table = [
        ...this.table.slice(0, fromRow),
        [
          ...this.table[fromRow].slice(0, cell),
          EMPTY_SLOT_VALUE,
          ...this.table[fromRow].slice(cell + 1),
        ],
        [
          ...this.table[toRow].slice(0, cell),
          num,
          ...this.table[toRow].slice(cell + 1),
        ],
        ...this.table.slice(toRow + 1),
      ];
    }
  }
}

module.exports = Board;
