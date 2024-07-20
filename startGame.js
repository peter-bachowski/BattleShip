import Player from "./player.js";
import Ship from "./ship.js";

function startGame () { //drives the game once the start button is pressed
    const startBtn = document.querySelector('.startBtn');
    startBtn.addEventListener('click', () => {
        const player1 = new Player('real');
        const player2 = new Player('computer');

        const realPlayerSquares = document.querySelectorAll('#realPlayerBoard > *'); //selects all player squares in the DOM
        const computerPlayerSquares = document.querySelectorAll('#computerPlayerBoard > *'); //selects all computer squares in the DOM

        const shipArray = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)]; //creates a generic ship list of five ships of varying length

        player1.playerBoard.shipsList = shipArray;
        player2.playerBoard.shipsList = shipArray;

        player1.playerBoard.shipsList.forEach(ship => { //for each ship in the player list, check if coordinates are empty and place the ship there

            let coordinate = getLocation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)); //randomizes the initial position of the ship
        
            //player1.playerBoard.placeShipAt(ship, coordinate);

            setDirection(coordinate);

            function setDirection (coord) { 
                const possibleMoves = [
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                    [0, -1]
                ];
                const direction = possibleMoves[(Math.floor(Math.random()*4))];
                let valid = true;
                for (let i = 1; i < ship.length; i++) {
                    let newCoord = [coord[0] + direction[0], coord[1] + direction[1]];
                    if (newCoord[0] < 0 || newCoord[1] < 0 || newCoord[0] > 9 || newCoord[1] > 9 || player1.playerBoard.board[coord[0]][coord[1]].containsShip === true) {
                        let newCoordinate = getLocation(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)); //randomizes the initial position of the ship
                        setDirection(newCoordinate);
                        valid = false;
                        return;
                    }
                    coord = newCoord;
                }
                if (valid === true) {
                    let coord = coordinate;
                    player1.playerBoard.placeShipAt(ship, coordinate);
                    for (let i = 1; i < ship.length; i++) {
                        let newCoord = [coord[0] + direction[0], coord[1] + direction[1]];
                        player1.playerBoard.placeShipAt(ship, newCoord);    
                        coord = newCoord;
                    }    
                }
            }

            function getLocation (p1XCoord, p1YCoord) { //checks if the coordinates have a ship. If they do, the function generates new coordinates until it finds empty ones, then returns them. If it does not, it returns the coordinates
                if (player1.playerBoard.board[p1XCoord][p1YCoord].containsShip === true) {
                    let p1XCoord = Math.floor(Math.random() * 10);
                    let p1YCoord = Math.floor(Math.random() * 10);        
                    getLocation(p1XCoord, p1YCoord);
                    return;
                }
                return [p1XCoord, p1YCoord];
            }

        });

        console.log(player1.playerBoard.shipsList);

        loadShipsToBoard(player1);

        function loadShipsToBoard (player) {
            for (let j = 0; j < 10; j++) {
                for (let i = 0; i < 10; i++) {
                    if (player.playerBoard.board[i][j].containsShip === true) {
                        let selector = '#r' + (i+1) + '_' + (j+1);
                        let square = document.querySelector(selector);
                        square.style.backgroundColor = 'red';
                    }
                }
            }
        }

        // realPlayerSquares.forEach(element => {
        //     element.classList.add('active');

        // });

        computerPlayerSquares.forEach(element => {
            element.classList.add('active');
            element.addEventListener('click', () => {
                element.innerText = 'X';
            });
        });
    });
}

export default startGame;