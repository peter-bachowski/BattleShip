import Player from "./player.js";
import Ship from "./ship.js";
import loadShipsToBoard from "./loadShipsToBoard.js";
import placeShipsAlgo from "./placeShipsAlgo.js";

function startGame (player1, player2) { //drives the game once the start button is pressed
    const startBtn = document.querySelector('.startBtn');
    const p2PlyrSel = [];
    startBtn.addEventListener('click', () => {

        const realPlayerSquares = document.querySelectorAll('#realPlayerBoard > *'); //selects all player squares in the DOM
        const computerPlayerSquares = document.querySelectorAll('#computerPlayerBoard > *'); //selects all computer squares in the DOM

        const shipArray = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)]; //creates a generic ship list of five ships of varying length

        player1.playerBoard.shipsList = shipArray;
        player2.playerBoard.shipsList = shipArray;

        player1.playerBoard.shipsList.forEach(ship => { //for each ship in the player list, check if coordinates are empty and place the ship there
            placeShipsAlgo(player1, ship);
        });

        player2.playerBoard.shipsList.forEach(ship => { //for each ship in the player list, check if coordinates are empty and place the ship there
            placeShipsAlgo(player2, ship);
        });

        loadShipsToBoard(player1);
        loadShipsToBoard(player2);

        computerPlayerSquares.forEach(element => {
            element.classList.add('active');
            element.addEventListener('click', () => {
                element.innerText = 'X';
                let id = element.id;
                let coord = parseCoord(id); 
                player2.playerBoard.receiveAttack(coord);


                //computer will now choose a random point to hit for the real player

                setTimeout(() => {
                    const possibleMoves = [
                        [ 1, 0],
                        [ 0, 1],
                        [-1, 0],
                        [ 0,-1]
                    ]
                    let prevSquare = p2PlyrSel[p2PlyrSel.length-1];
                    let secPrevSquare = p2PlyrSel[p2PlyrSel.length-2];
                    let thirdPrevSquare = p2PlyrSel[p2PlyrSel.length-3];
                    let fourthPrevSquare = p2PlyrSel[p2PlyrSel.length-4];
                    if (prevSquare === undefined) { //if the computer hasn't had a turn yet, pick a random point and mark it in its selection array
                        coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                        p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    }
                    else if (prevSquare.containsShip === false) {
                        if (secPrevSquare === undefined || secPrevSquare.containsShip === false) {
                            coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            while (player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                                coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            }
                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                        }
                        else if (secPrevSquare.containsShip === true && secPrevSquare.ship.sunk === false) {
                            let direction = possibleMoves[Math.floor(Math.random()*4)];
                            coord = secPrevSquare.position;
                            coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
    
                            while (player1.playerBoard.board[coord[0]][coord[1]].hit === true && (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9)) {
                                coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            }
                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                        }
                        else {
                            coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                        }
                    }
                    else if (prevSquare.containsShip === true) {
                        if (prevSquare.ship.sunk === false) {
                            if (secPrevSquare.containsShip === undefined || secPrevSquare.containsShip === true) {
                                let direction = [prevSquare.position[0]-secPrevSquare.position[0],prevSquare.position[1]-secPrevSquare.position[1]];
                                coord = prevSquare.position;
                                coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                                p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                            }
                            else {
                                let direction = possibleMoves[Math.floor(Math.random()*4)];
                                coord = prevSquare.position;
                                coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                                while (player1.playerBoard.board[coord[0]][coord[1]].hit === true && (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9)) {
                                    direction = possibleMoves[Math.floor(Math.random()*4)];
                                    coord = prevSquare.position;
                                    coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                                    }
    
                                p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                            }
                        }
                        else {
                            coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                        }
                    }



                    player1.playerBoard.receiveAttack(coord);
                    for (let i = 0; i < realPlayerSquares.length; i++) {
                        let square = realPlayerSquares[i];
                        let id = parseCoord(square.id);
                        if (id[0] === coord[0] && id[1] === coord[1]) {
                            square.innerText = 'X';
                            break;
                        }
                    }
                }, 500);
                
                function parseCoord (id) {
                    let xCoord; 
                    let yCoord;
                    if (id[2] === ',') {
                        xCoord = id[1] - 1;
                    }
                    else {
                        xCoord = parseInt(id.slice(1,3)) - 1;
                    }
                    for (let i = 0; i < id.length; i++) {
                        if (id[i] === '_') {
                            yCoord = parseInt(id.slice(i+1, id.length))-1;
                            break;
                        }
                    }
                    return [xCoord, yCoord];
                }
            });
        });
    });

}

export default startGame;