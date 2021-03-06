const boardElement = document.querySelector(".board");

const colorDict = {
  2: "#D5C920",
  4: "#BBB128",
  6: "#999237",
  8: "#7B773A",
  16: "#5FDC28",
  32: "#62B63D",
  64: "#598844",
  128: "#18D9AB",
  256: "#37AB90",
  512: "#3E8B79",
  1024: "#1C35D5",
  2048: "#FF4770",
};

const colorChanger = () => {
  for(let i=0; i<16; i++){
    boardElement.childNodes[i].style = `background-color:${colorDict[
      boardElement.childNodes[i].innerHTML
    ]};`;
  }
  
};

const resultChecker = () => {
  let isNothingOfZero = true;
  let isNothingSameWithNeighbor = true;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      colorChanger();
      if (boardElement.childNodes[row * 4 + col].innerHTML === "2048")
        return "Win";
      if (boardElement.childNodes[row * 4 + col].innerHTML === "0") {
        isNothingOfZero = false;
      }
      if (col > 0) {
        if (
          boardElement.childNodes[row * 4 + col].innerHTML ===
          boardElement.childNodes[row * 4 + col - 1].innerHTML
        ) {
          isNothingSameWithNeighbor = false;
        }
      }
      if (row > 0) {
        if (
          boardElement.childNodes[row * 4 + col].innerHTML ===
          boardElement.childNodes[row * 4 + col - 4].innerHTML
        ) {
          isNothingSameWithNeighbor = false;
        }
      }
    }
  }

  return isNothingOfZero && isNothingSameWithNeighbor ? "Lose" : "";
};

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
  let isMoved = false;
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
        }
      }

      nonZeros = mergeSameBlock(nonZeros, direction);
      nonZeros = arrayMoveHelper(direction, nonZeros);

      for (let col = 0; col < 4; col++) {
        if (
          nonZeros[col] !==
          boardElement.childNodes[pointMoveHelper(direction, row, col)]
            .innerHTML
        ) {
          isMoved = true;
        }
        boardElement.childNodes[
          pointMoveHelper(direction, row, col)
        ].innerHTML = nonZeros[col];
      }
    }

    let res = resultChecker();

    if (res === "Win") {
      alert("Win");
    } else if (res === "Lose") {
      alert("Lose");
    } else {
      if (isMoved) {
        randomPoint();
      }
    }
  }
};

const mergeSameBlock = (nonZeros, direction) => {
  if (direction === 37 || direction === 38) {
    for (let i = 0; i < nonZeros.length - 1; i++) {
      if (nonZeros[i] === nonZeros[i + 1]) {
        nonZeros[i] = `${parseInt(nonZeros[i]) * 2}`;
        nonZeros[i + 1] = "0";
      }
    }
  } else if (direction === 39 || direction === 40) {
    for (let i = nonZeros.length - 1; i >= 0; i--) {
      if (nonZeros[i] === nonZeros[i - 1]) {
        nonZeros[i] = `${parseInt(nonZeros[i]) * 2}`;
        nonZeros[i - 1] = "0";
      }
    }
  }
  return nonZeros.filter((elem) => elem !== "0");
};

const keyUpEvent = (e) => {
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
  colorChanger();
};

init();
