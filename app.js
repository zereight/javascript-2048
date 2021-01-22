document.addEventListener("DOMContentLoaded", () => {
    const gridDisplay = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const result = document.getElementById("results");
    const width = 4;
    
    let squares  = [];

    function createBoard(){
        for(let i=0;i<width**2;i++){
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        console.log(squares);
    }

    createBoard();
});