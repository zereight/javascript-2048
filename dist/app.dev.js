"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var boardElement = document.querySelector(".board");
var colorDict = {
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
  2048: "#FF4770"
};

var colorChanger = function colorChanger(index) {
  boardElement.childNodes[index].style = "background-color:".concat(colorDict(boardElement.childNodes[index].innerHTML), ";");
};

var resultChecker = function resultChecker() {
  var isNothingOfZero = true;
  var isNothingSameWithNeighbor = true;

  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      colorChanger(row * 4 + col);
      if (boardElement.childNodes[row * 4 + col].innerHTML === "2048") return "Win";

      if (boardElement.childNodes[row * 4 + col].innerHTML === "0") {
        isNothingOfZero = false;
      }

      if (col > 0) {
        if (boardElement.childNodes[row * 4 + col].innerHTML === boardElement.childNodes[row * 4 + col - 1].innerHTML) {
          isNothingSameWithNeighbor = false;
        }
      }

      if (row > 0) {
        if (boardElement.childNodes[row * 4 + col].innerHTML === boardElement.childNodes[row * 4 + col - 4].innerHTML) {
          isNothingSameWithNeighbor = false;
        }
      }
    }
  }

  return isNothingOfZero && isNothingSameWithNeighbor ? "Lose" : "";
};

var randomPoint = function randomPoint() {
  var boxNumber = Math.floor(Math.random() * 16);

  if (Array.from(boardElement.childNodes).every(function (cell) {
    return cell.innerHTML !== "0";
  })) {
    // All cell filled
    console.log("all cells filled");
    return;
  }

  while (Array.from(boardElement.childNodes)[boxNumber].innerHTML !== "0") {
    boxNumber = Math.floor(Math.random() * 16);
  }

  Array.from(boardElement.childNodes)[boxNumber].innerHTML = "2";
};

var pointMoveHelper = function pointMoveHelper(direction, row, col) {
  if (direction === 38 || direction === 40) {
    return col * 4 + row;
  } else if (direction === 37 || direction === 39) {
    return row * 4 + col;
  }
};

var arrayMoveHelper = function arrayMoveHelper(direction, nonZeros) {
  if (direction === 37 || direction === 38) {
    nonZeros.push.apply(nonZeros, _toConsumableArray(Array.from({
      length: 4 - nonZeros.length
    }, function () {
      return "0";
    })));
  } else if (direction === 39 || direction === 40) {
    nonZeros.unshift.apply(nonZeros, _toConsumableArray(Array.from({
      length: 4 - nonZeros.length
    }, function () {
      return "0";
    })));
  }

  return nonZeros;
};

var move = function move(direction) {
  // direction 38,40,37,39 => T,B,L,R
  var isMoved = false;

  if (37 <= direction && direction <= 40) {
    for (var row = 0; row < 4; row++) {
      var nonZeros = [];

      for (var col = 0; col < 4; col++) {
        if (boardElement.childNodes[pointMoveHelper(direction, row, col)].innerHTML !== "0") {
          nonZeros.push(boardElement.childNodes[pointMoveHelper(direction, row, col)].innerHTML);
        }
      }

      nonZeros = mergeSameBlock(nonZeros, direction);
      nonZeros = arrayMoveHelper(direction, nonZeros);

      for (var _col = 0; _col < 4; _col++) {
        if (nonZeros[_col] !== boardElement.childNodes[pointMoveHelper(direction, row, _col)].innerHTML) {
          isMoved = true;
        }

        boardElement.childNodes[pointMoveHelper(direction, row, _col)].innerHTML = nonZeros[_col];
      }
    }

    var res = resultChecker();

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

var mergeSameBlock = function mergeSameBlock(nonZeros, direction) {
  if (direction === 37 || direction === 38) {
    for (var i = 0; i < nonZeros.length - 1; i++) {
      if (nonZeros[i] === nonZeros[i + 1]) {
        nonZeros[i] = "".concat(parseInt(nonZeros[i]) * 2);
        nonZeros[i + 1] = "0";
      }
    }
  } else if (direction === 39 || direction === 40) {
    for (var _i = nonZeros.length - 1; _i >= 0; _i--) {
      if (nonZeros[_i] === nonZeros[_i - 1]) {
        nonZeros[_i] = "".concat(parseInt(nonZeros[_i]) * 2);
        nonZeros[_i - 1] = "0";
      }
    }
  }

  return nonZeros.filter(function (elem) {
    return elem !== "0";
  });
};

var keyUpEvent = function keyUpEvent(e) {
  move(e.keyCode);
};

var init = function init() {
  document.addEventListener("keyup", keyUpEvent);

  for (var i = 0; i < 16; i++) {
    var newCell = document.createElement("div");
    newCell.className = "cell";
    newCell.innerHTML = "0";
    boardElement.appendChild(newCell);
  }

  randomPoint();
  randomPoint();
};

init();