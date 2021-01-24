const boardElement = document.querySelector(".board");

const randomPoint = () => {
    let boxNumber = Math.floor(Math.random() * 16);
    if(Array.from(boardElement.childNodes).every(cell=>cell.innerHTML!=='0')){
        // All cell filled
        console.log('all cells filled');
        return;
    }
    while(Array.from(boardElement.childNodes)[boxNumber].innerHTML !== '0'){
        boxNumber = Math.floor(Math.random() * 16);
    }

    Array.from(boardElement.childNodes)[boxNumber].innerHTML = '2';
}

const init = () => {
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
