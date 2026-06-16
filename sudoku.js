const easyPuzzle = [
  [5, 3, 0, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 0],
  [8, 5, 9, 7, 6, 1, 0, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 0, 2, 8, 7],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 0],
];

const mediumPuzzle = [
  [5, 3, 0, 0, 7, 0, 9, 1, 2],
  [6, 0, 0, 1, 9, 5, 3, 4, 0],
  [0, 9, 8, 3, 0, 2, 5, 6, 0],
  [8, 5, 9, 0, 6, 1, 0, 2, 3],
  [4, 0, 6, 8, 5, 0, 7, 9, 1],
  [7, 1, 0, 9, 2, 4, 8, 0, 6],
  [9, 6, 1, 0, 3, 0, 2, 8, 7],
  [2, 0, 7, 4, 1, 9, 0, 3, 5],
  [3, 4, 5, 2, 0, 6, 1, 7, 0],
];

const hardPuzzle = [
  [0, 0, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 0, 0, 0, 4, 0],
  [0, 9, 0, 0, 0, 2, 5, 0, 0],
  [8, 0, 0, 0, 6, 0, 0, 2, 0],
  [0, 0, 6, 0, 0, 0, 7, 0, 0],
  [0, 1, 0, 0, 2, 0, 0, 0, 6],
  [0, 0, 1, 5, 0, 0, 0, 8, 0],
  [0, 8, 0, 0, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 0, 6, 0, 7, 0],
];

const easySolution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const mediumSolution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 4, 3, 7, 2, 8, 5],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const hardSolution = [
  [1, 2, 3, 4, 7, 5, 6, 9, 8],
  [6, 5, 8, 1, 9, 3, 2, 4, 7],
  [4, 9, 7, 6, 8, 2, 5, 3, 1],
  [8, 3, 4, 5, 6, 7, 9, 2, 1],
  [2, 4, 6, 3, 1, 9, 7, 8, 5],
  [7, 1, 9, 8, 2, 4, 3, 5, 6],
  [9, 7, 1, 5, 4, 6, 8, 8, 3],
  [3, 8, 2, 7, 1, 9, 4, 6, 5],
  [5, 6, 4, 9, 3, 6, 1, 7, 2],
];

let currentPuzzle = easyPuzzle;

// Current solution being used
let currentSolution = easySolution;

const board = document.getElementById("board");

function buildBoard() {
  board.innerHTML = "";

  lives = 3;
  document.getElementById("life1").textContent = "❤️";
  document.getElementById("life2").textContent = "❤️";
  document.getElementById("life3").textContent = "❤️";

  selectedCell = null;
  gameOver = false;
  document.getElementById("popup").classList.remove("show");

  for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
    let box = document.createElement("div");
    box.classList.add("box");

    let boxRow = Math.floor(boxIndex / 3);
    let boxCol = boxIndex % 3;

    for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");

      let cellRow = Math.floor(cellIndex / 3);
      let cellCol = cellIndex % 3;

      let row = boxRow * 3 + cellRow;
      let col = boxCol * 3 + cellCol;

      let value = currentPuzzle[row][col];

      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add("given");
      }

      cell.dataset.row = row;
      cell.dataset.col = col;

      box.appendChild(cell);
    }

    board.appendChild(box);
  }
  attachCellListeners();
}

let selectedCell = null;
let lives = 3;
let gameOver = false;

buildBoard();

function attachCellListeners() {
  const allCells = document.querySelectorAll(".cell");
  allCells.forEach(function (cell) {
    cell.addEventListener("click", function () {
      if (selectedCell) {
        selectedCell.classList.remove("selected");
      }

      cell.classList.add("selected");
      selectedCell = cell;

      highlightSameNumbers(cell);
    });
  });
}

function highlightSameNumbers(selectedCell) {
  document.querySelectorAll(".cell").forEach(function (c) {
    c.classList.remove("same-number", "highlight-row-col");
  });

  let selectedRow = selectedCell.dataset.row;
  let selectedCol = selectedCell.dataset.col;
  let number = selectedCell.textContent;

  document.querySelectorAll(".cell").forEach(function (c) {
    if (c === selectedCell) return;

    let cellRow = c.dataset.row;
    let cellCol = c.dataset.col;

    if (cellRow === selectedRow || cellCol === selectedCol) {
      c.classList.add("highlight-row-col");
    }

    if (number && c.textContent === number) {
      c.classList.add("same-number");
    }
  });
}

function updateLives() {
  let life1 = document.getElementById("life1");
  let life2 = document.getElementById("life2");
  let life3 = document.getElementById("life3");

  if (lives <= 2) life3.textContent = "🖤";
  if (lives <= 1) life2.textContent = "🖤";
  if (lives <= 0) life1.textContent = "🖤";

  if (lives <= 0) {
    gameOver = true;
    setTimeout(function () {
      showPopup("lose");
    }, 300);
  }
}

function checkWin() {
  const allCells = document.querySelectorAll(".cell");

  for (let cell of allCells) {
    if (!cell.classList.contains("given") && !cell.classList.contains("correct")) {
      return;
    }
  }

  gameOver = true;
  setTimeout(function () {
    showPopup("win");
  }, 300);
}

function showPopup(type) {
  let emoji = document.getElementById("popup-emoji");
  let title = document.getElementById("popup-title");
  let message = document.getElementById("popup-message");
  let overlay = document.getElementById("popup");

  if (type === "win") {
    emoji.textContent = "🎉";
    title.textContent = "Congratulations!";
    message.textContent = "You've won the game!";
  }

  if (type === "lose") {
    emoji.textContent = "💔";
    title.textContent = "Game Over!";
    message.textContent = "You've lost all your lives!";
  }

  overlay.classList.add("show");
}

document.addEventListener("keydown", function (e) {
  if (!selectedCell) return;
  if (gameOver) return;

  if (selectedCell.classList.contains("given")) return;
  if (selectedCell.classList.contains("correct")) return;

  if (e.key === "Backspace" || e.key === "Delete") {
    selectedCell.textContent = "";
    selectedCell.classList.remove("correct", "wrong");
    return;
  }

  if (e.key >= "1" && e.key <= "9") {
    selectedCell.textContent = e.key;

    let row = parseInt(selectedCell.dataset.row);
    let col = parseInt(selectedCell.dataset.col);

    if (parseInt(e.key) === currentSolution[row][col]) {
      selectedCell.classList.remove("wrong");
      selectedCell.classList.add("correct");
      checkWin();
    } else {
      selectedCell.classList.remove("correct");
      selectedCell.classList.add("wrong");

      lives--;
      updateLives();
    }
  }
});

document.getElementById("easy").addEventListener("click", function () {
  currentPuzzle = easyPuzzle;
  currentSolution = easySolution;
  setActiveButton("easy");
  buildBoard();
});

document.getElementById("medium").addEventListener("click", function () {
  currentPuzzle = mediumPuzzle;
  currentSolution = mediumSolution;
  setActiveButton("medium");
  buildBoard();
});

document.getElementById("hard").addEventListener("click", function () {
  currentPuzzle = hardPuzzle;
  currentSolution = hardSolution;
  setActiveButton("hard");
  buildBoard();
});

document.getElementById("restart").addEventListener("click", function () {
  buildBoard();
});

function setActiveButton(id) {
  document.querySelectorAll(".diff-btn").forEach(function (btn) {
    btn.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

document.getElementById("popup-restart").addEventListener("click", function () {
  document.getElementById("popup").classList.remove("show");
  buildBoard();
});

document.addEventListener("click", function (e) {
  // If clicked element is not inside the board
  if (!e.target.classList.contains("cell") && !e.target.closest(".box")) {
    if (selectedCell) {
      selectedCell.classList.remove("selected");
      selectedCell = null;
    }

    document.querySelectorAll(".cell").forEach(function (c) {
      c.classList.remove("highlight-row-col", "same-number");
    });
  }
});
