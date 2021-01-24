document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const result = document.getElementById("results");
  const width = 4;

  let squares = [];

  function createBoard() {
    for (let i = 0; i < width ** 2; i++) {
      const square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generateRandomNumber();
    generateRandomNumber();
  }

  createBoard();

  function generateRandomNumber() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
    } else {
      generateRandomNumber();
    }
  }

  function moveRight() {
    for (let i = 0; i < width ** 2; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter((num) => num !== "0");
        let missing = 4 - filteredRow.length;
        let zeros = Array.from({ length: missing }, () => 0);
        let newRow = zeros.concat(filteredRow);

        for (let j = 0; j < 4; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < width ** 2; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [totalOne, totalTwo, totalThree, totalFour];

        let filteredRow = row.filter((num) => num !== "0");
        let missing = 4 - filteredRow.length;
        let zeros = Array.from({ length: missing }, () => 0);
        let newRow = filteredRow.concat(zeros);

        for (let j = 0; j < 4; j++) {
          squares[i + j].innerHTML = newRow[j];
        }
      }
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combineTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combineTotal;
        squares[i + 1].innerHTML = 0;
      }
    }
    checkForWin();
  }
  function combineColumn() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combineTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combineTotal;
        squares[i + width].innerHTML = 0;
      }
    }
    checkForWin();
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        totalOne,
        totalTwo,
        totalThree,
        totalFour
      ];
      let filteredColumn = column.filter(num=>num!=='0');
      let missing = 4 - filteredColumn.length;
      let zeros = Array.from({length: missing}, ()=>0);
      let newColumn = filteredColumn.concat(zeros);

      square[i].innerHTML = newColumn[0];
      square[i+width].innerHTML = newColumn[1];
      square[i+width*2].innerHTML = newColumn[2];
      square[i+width*3].innerHTML = newColumn[3];
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        totalOne,
        totalTwo,
        totalThree,
        totalFour
      ];
      let filteredColumn = column.filter(num=>num!=='0');
      let missing = 4 - filteredColumn.length;
      let zeros = Array.from({length: missing}, ()=>0);
      let newColumn = zeros.concat(filteredColumn);

      square[i].innerHTML = newColumn[0];
      square[i+width].innerHTML = newColumn[1];
      square[i+width*2].innerHTML = newColumn[2];
      square[i+width*3].innerHTML = newColumn[3];
    }
  }

  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    }else if (e.keyCode === 38) {
        keyUp();
      }else if (e.keyCode === 40) {
        keyDown();
      }
  }

  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateRandomNumber();
  }
  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateRandomNumber();
  }
  function keyDown() {
    moveDown();
    combineRow();
    moveDown();
    generateRandomNumber();
  }
  function keyUp() {
    moveUp();
    combineRow();
    moveUp();
    generateRandomNumber();
  }

  function checkForWin() {
      for(let i = 0; i < squares.length; i++){
          if(squares[i].innerHTML == 2048){
              let combineTotal = parseInt(squares[i].innerHTML)
          }
      }
  }
});
