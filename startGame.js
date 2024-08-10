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

        player1.playerBoard.shipsList = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)]; //creates a generic ship list of five ships of varying length
        player2.playerBoard.shipsList = [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)]; //creates a generic ship list of five ships of varying length

        player1.playerBoard.shipsList.forEach(ship => { //for each ship in the player list, check if coordinates are empty and place the ship there
            placeShipsAlgo(player1, ship);
        });

        player2.playerBoard.shipsList.forEach(ship => { //for each ship in the player list, check if coordinates are empty and place the ship there
            placeShipsAlgo(player2, ship);
        });

        loadShipsToBoard(player1);
        //loadShipsToBoard(player2);

        computerPlayerSquares.forEach(element => {
            element.classList.add('active');
            element.addEventListener('click', () => {
                element.innerText = 'X';
                let id = element.id;
                let coord = parseCoord(id); 
                player2.playerBoard.receiveAttack(coord);
                if (player2.playerBoard.board[coord[0]][coord[1]].containsShip === true) {
                    element.style.backgroundColor = 'red';
                }

                //computer will now choose a random point to hit for the real player

                setTimeout(() => {
                    const possibleMoves = [
                        [ 1, 0],
                        [ 0, 1],
                        [-1, 0],
                        [ 0,-1]
                    ]

                    if (p2PlyrSel[0] === undefined) {
                        coord = [Math.floor(Math.random()*4), Math.floor(Math.random()*4)];
                        p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    }
                    else {
                        let found = false;
                        for (let i = p2PlyrSel.length-1; i >= 0; i--) {
                            let square = p2PlyrSel[i];
                            if (square.ship !== null && square.containsShip === true && square.ship.sunk === false) {
                                const rightCoord = [square.position[0] + possibleMoves[0][0] - 1, square.position[1] + possibleMoves[0][1] - 1];
                                const upCoord = [square.position[0] + possibleMoves[1][0] - 1, square.position[1] + possibleMoves[1][1] - 1];
                                const leftCoord = [square.position[0] + possibleMoves[2][0] - 1, square.position[1] + possibleMoves[2][1] - 1];
                                const downCoord = [square.position[0] + possibleMoves[3][0] - 1, square.position[1] + possibleMoves[3][1] - 1];

                                function checkCoord (coord) {
                                    if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) {
                                        return undefined;
                                    }
                                    else {
                                        return player1.playerBoard.board[coord[0]][coord[1]];
                                    }
                                }

                                let rightCoordSquare = checkCoord(rightCoord);
                                let upCoordSquare = checkCoord(upCoord);
                                let leftCoordSquare = checkCoord(leftCoord);
                                let downCoordSquare = checkCoord(downCoord);

                                // if ((upCoordSquare === undefined || upCoordSquare.hit === true) && (rightCoordSquare === undefined || rightCoordSquare.hit === true) && (leftCoordSquare === undefined || leftCoordSquare.hit === true) && (downCoordSquare === undefined || downCoordSquare.hit === true)) {
                                //     continue;
                                // } 
                                if (square.ship.hits >= 2 && square.ship.sunk === false) { //selects a square in the same direction as the hits when there are at least two hits on a ship
                                    let direction;
                                    for (let j = i-1; j >= 0; j--) {
                                        if (p2PlyrSel[j].ship === square.ship) {
                                            direction = [square.position[0] - p2PlyrSel[j].position[0],square.position[1] - p2PlyrSel[j].position[1]];
                                            if (direction[0] > 1) {
                                                direction[0] = 1;
                                            }
                                            else if (direction[0] < -1) {
                                                direction[0] = -1;
                                            }
                                            else if (direction[1] > 1) {
                                                direction[1] = 1;
                                            }
                                            else if (direction[1] < -1) {
                                                direction[1] = -1;
                                            }
                                            coord = [square.position[0] + direction[0] - 1, square.position[1] + direction[1] - 1];
                                            if (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9 || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                                                direction = [parseInt(direction[0])*(-1), parseInt(direction[1])*(-1)];
                                                for (let k = 0; k <= j; k++) {
                                                    if (p2PlyrSel[k].ship === square.ship) {
                                                        coord = [p2PlyrSel[k].position[0] + direction[0] - 1, p2PlyrSel[k].position[1] + direction[1] - 1];
                                                        break;
                                                    }
                                                }
                                            }

                                            found = true;
                                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                                            break;    
                                        }
                                    }
                                    if (found === true) {break;} 
                                }
                                else { //selects a random adjacent square
                                    let direction = possibleMoves[Math.floor(Math.random()*4)];
                                    coord = [square.position[0] + direction[0] - 1, square.position[1] + direction[1] - 1];
                                    while (coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9 || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                                        let direction = possibleMoves[Math.floor(Math.random()*4)];
                                        coord = [square.position[0] + direction[0] - 1, square.position[1] + direction[1] - 1];    
                                    }
                                    p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                                    found = true;
                                    break;
                                }
                            }  
                        }
                        if (found === false) { //hit a random square
                            coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            while (player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                                coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            }
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