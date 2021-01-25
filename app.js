const boardElement = document.querySelector(".board");

const randomPoint = () => {
  let boxNumber = Math.floor(Math.random() * 16);
  if (
    Array.from(boardElement.childNodes).every((cell) => cell.innerHTML !== "0")
  ) {
    // All cell filled
    console.log("all cells filled");
    return;
  }
  while (Array.from(boardElement.childNodes)[boxNumber].innerHTML !== "0") {
    boxNumber = Math.floor(Math.random() * 16);
  }

  Array.from(boardElement.childNodes)[boxNumber].innerHTML = "2";
};

const pointMoveHelper = (direction, row, col) => {
  if (direction === 38 || direction === 40) {
    return col * 4 + row;
  } else if (direction === 37 || direction === 39) {
    return row * 4 + col;
  }
};

const arrayMoveHelper = (direction, nonZeros) => {
  if (direction === 37 || direction === 38) {
    nonZeros.push(...Array.from({ length: 4 - nonZeros.length }, () => "0"));
  } else if (direction === 39 || direction === 40) {
    nonZeros.unshift(...Array.from({ length: 4 - nonZeros.length }, () => "0"));
  }
  return nonZeros;
};

const move = (direction) => {
  // direction 38,40,37,39 => T,B,L,R
  if (37 <= direction && direction <= 40) {
    for (let row = 0; row < 4; row++) {
      let nonZeros = [];
      for (let col = 0; col < 4; col++) {
        if (
          boardElement.childNodes[pointMoveHelper(direction, row, col)]
            .innerHTML !== "0"
        ) {
          nonZeros.push(
            boardElement.childNodes[pointMoveHelper(direction, row, col)]
              .innerHTML
          );
          // merge
        }
      }
      nonZeros = arrayMoveHelper(direction, nonZeros);
      for (let col = 0; col < 4; col++) {
        boardElement.childNodes[
          pointMoveHelper(direction, row, col)
        ].innerHTML = nonZeros[col];
      }
    }
  }
};

const mergeAdjacentSameBlock = (direction) => {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (boardElement.childNodes[pointMoveHelper(direction, row, col)] && boardElement.childNodes[pointMoveHelper(direction, row, col) + (direction === 38 || direction === 40) ? 4 : 1]) {
        if (
          boardElement.childNodes[pointMoveHelper(direction, row, col)]
            .innerHTML ===
          boardElement.childNodes[pointMoveHelper(direction, row, col) + (direction === 38 || direction === 40) ? 4 : 1]
            .innerHTML
        ) {
          boardElement.childNodes[
            pointMoveHelper(direction, row, col)
          ].innerHTML =
            `${parseInt(
              boardElement.childNodes[pointMoveHelper(direction, row, col)]
                .innerHTML
            ) * 2}`;
          boardElement.childNodes[
            pointMoveHelper(direction, row, col) + (direction === 38 || direction === 40) ? 4 : 1
          ].innerHTML = "0";
        }
      }
    }
  }
};

const keyUpEvent = (e) => {
  move(e.keyCode);
  mergeAdjacentSameBlock(e.keyCode);
  move(e.keyCode);
};

const init = () => {
  document.addEventListener("keyup", keyUpEvent);

  for (let i = 0; i < 16; i++) {
    const newCell = document.createElement("div");
    newCell.className = "cell";
    newCell.innerHTML = "0";
    boardElement.appendChild(newCell);
  }

  randomPoint();
  randomPoint();
};

init();
