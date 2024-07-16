import Player from "./player.js";
import Ship from "./ship.js";

function startGame () {
    const startBtn = document.querySelector('.startBtn');
    startBtn.addEventListener('click', () => {
        const player1 = new Player('real');
        const player2 = new Player('computer');

        const realPlayerSquares = document.querySelectorAll('#realPlayerBoard > *');
        const computerPlayerSquares = document.querySelectorAll('#computerPlayerBoard > *');

        const shipArray = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)];

        player1.playerBoard.shipsList = shipArray;
        player2.playerBoard.shipsList = shipArray;

        realPlayerSquares.forEach(element => {
            element.classList.add('active');

        });

        computerPlayerSquares.forEach(element => {
            element.classList.add('active');
            element.addEventListener('click', () => {
                element.innerText = 'X';
            });
        });
    });
}

export default startGame;