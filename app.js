const boardElement = document.querySelector(".board");

const init = () => {
  for (let i = 0; i < 16; i++) {
    const newCell = document.createElement("div");
    newCell.className = "cell";
    newCell.innerHTML = "0";
    boardElement.appendChild(newCell);
  }
  
};

init();
