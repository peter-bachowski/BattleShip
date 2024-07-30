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

                                if (upCoord.hit === true && downCoord.hit === true && rightCoord.hit === true && leftCoord.hit === true) {
                                    continue;
                                }            
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
                        if (found === false) {
                            coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            while (player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                                coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                            }
                            p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                        }
                    }

                    // let prevSquare = p2PlyrSel[p2PlyrSel.length-1];
                    // let secPrevSquare = p2PlyrSel[p2PlyrSel.length-2];
                    // let thirdPrevSquare = p2PlyrSel[p2PlyrSel.length-3];
                    // let fourthPrevSquare = p2PlyrSel[p2PlyrSel.length-4];
                    // let fifthPrevSquare = p2PlyrSel[p2PlyrSel.length-5];

                    // if (prevSquare === undefined) { //if the computer hasn't had a turn yet, pick a random point and mark it in its selection array
                    //     coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //     p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    // }
                    // else if (prevSquare.containsShip === false) {
                    //     if (secPrevSquare === undefined || secPrevSquare.containsShip === false) {
                    //         if (fourthPrevSquare !== undefined && fourthPrevSquare.containsShip === true && fourthPrevSquare.ship.sunk === false) {
                    //             let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //             coord = fourthPrevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = fourthPrevSquare.position;
                    //                 coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1]; 
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else if (thirdPrevSquare !== undefined && thirdPrevSquare.containsShip === true && thirdPrevSquare.ship.sunk === false) {
                    //             let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //             coord = thirdPrevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = thirdPrevSquare.position;
                    //                 coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1]; 
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else {
                    //             coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //             while (player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);   
                    //         }
                    //     }
                    //     else if (secPrevSquare.containsShip === true && secPrevSquare.ship.sunk === false) {
                    //         if (thirdPrevSquare !== undefined && thirdPrevSquare.containsShip === false && fourthPrevSquare.containsShip === true && secPrevSquare.ship === fourthPrevSquare.ship) {
                    //             let direction = [fourthPrevSquare.position[0] - secPrevSquare.position[0], fourthPrevSquare.position[1] - secPrevSquare.position[1]];
                    //             coord = [fourthPrevSquare.position[0] + direction[0] - 1, fourthPrevSquare.position[1] + direction[1] - 1];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else if (fourthPrevSquare !== undefined && fourthPrevSquare.containsShip === true && thirdPrevSquare.containsShip === true && fourthPrevSquare.ship === secPrevSquare.ship) {
                    //             let direction = [fourthPrevSquare.position[0] - thirdPrevSquare.position[0], fourthPrevSquare.position[1] - thirdPrevSquare.position[1]];
                    //             for (let i = 0; i < p2PlyrSel.length; i++) {
                    //                 let square = p2PlyrSel[i];
                    //                 if (square.containsShip === true && square.ship.sunk === false) {
                    //                     coord = square.position;
                    //                     coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                                        
                    //                     break;
                    //                 }
                    //             }
                                
                    //             coord = [fourthPrevSquare.position[0] + direction[0] - 1, fourthPrevSquare.position[1] + direction[1] - 1];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else if (thirdPrevSquare !== undefined && thirdPrevSquare.containsShip === true && thirdPrevSquare.ship === secPrevSquare.ship) {
                    //             let direction = [thirdPrevSquare.position[0] - secPrevSquare.position[0], thirdPrevSquare.position[1] - secPrevSquare.position[1]];
                    //             coord = [thirdPrevSquare.position[0] + direction[0] - 1, thirdPrevSquare.position[1] + direction[1] - 1];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else {
                    //             let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //             coord = secPrevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
        
                    //             while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = secPrevSquare.position;
                    //                 coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);   
                    //         }
                    //     }
                    //     else {
                    //         coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //         while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //             coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //         }
                    //         p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //     }
                    // }
                    // else if (prevSquare.containsShip === true) {
                    //     if (prevSquare.ship.sunk === false) {
                    //         if (secPrevSquare === undefined) {
                    //             let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //             coord = prevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = prevSquare.position;
                    //                 coord = [coord[0] + direction[0], coord[1] + direction[1]];    
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //         }
                    //         else if (fifthPrevSquare !== undefined && fifthPrevSquare.containsShip === true && fourthPrevSquare.containsShip === false && thirdPrevSquare.containsShip === false && secPrevSquare.containsShip === false && prevSquare.ship === fifthPrevSquare.ship) {
                    //             let direction = [prevSquare.position[0] - fifthPrevSquare.position[0], prevSquare.position[1] - fifthPrevSquare.position[1]];
                    //             coord = [prevSquare.position[0] + direction[0], prevSquare[1] + direction[1]];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //         }
                    //         else if (fifthPrevSquare !== undefined && fifthPrevSquare.containsShip === true && fourthPrevSquare.containsShip === false && thirdPrevSquare.containsShip === true && secPrevSquare.containsShip === false && prevSquare.ship === fifthPrevSquare.ship) {
                    //             let direction = [fifthPrevSquare.position[0] - prevSquare.position[0], fifthPrevSquare.position[1] - prevSquare.position[1]];
                    //             coord = [prevSquare.position[0] + direction[0], prevSquare[1] + direction[1]];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //         }
                    //         else if (fourthPrevSquare !== undefined && fourthPrevSquare.containsShip === true && thirdPrevSquare.containsShip === false && secPrevSquare.containsShip === false && prevSquare.ship === fourthPrevSquare.ship) {
                    //             let direction = [prevSquare.position[0] - fourthPrevSquare.position[0], prevSquare.position[1] - fourthPrevSquare.position[1]];
                    //             coord = [prevSquare.position[0] + direction[0], prevSquare.position[1] + direction[1]];
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //         }
                    //         else if (thirdPrevSquare !== undefined && secPrevSquare.containsShip === false && thirdPrevSquare.containsShip === true && prevSquare.ship === thirdPrevSquare.ship) {
                    //             if (fourthPrevSquare !== undefined && fourthPrevSquare.containsShip === true && fourthPrevSquare.ship === prevSquare.ship) {
                    //                 let direction = [prevSquare.position[0] - fourthPrevSquare.position[0], prevSquare.position[1] - fourthPrevSquare.position[1]];
                    //                 coord = [prevSquare.position[0] + direction[0] - 1, prevSquare.position[1] + direction[1] - 1];
                    //                 p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //             }
                    //             else {
                    //                 let direction = [prevSquare.position[0] - thirdPrevSquare.position[0], prevSquare.position[1] - thirdPrevSquare.position[1]];
                    //                 coord = [prevSquare.position[0] + direction[0] - 1, prevSquare.position[1] + direction[1] - 1];
                    //                 if ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                     let direction = [thirdPrevSquare.position[0] - prevSquare.position[0], thirdPrevSquare.position[1] - prevSquare.position[1]];
                    //                     coord = [thirdPrevSquare.position[0] + direction[0], thirdPrevSquare.position[1] + direction[1]];
                    //                 }
                    //                 p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);    
                    //             }
                    //         }
                    //         else if (secPrevSquare.containsShip === true && prevSquare.ship === secPrevSquare.ship) {
                    //             let direction = [prevSquare.position[0]-secPrevSquare.position[0],prevSquare.position[1]-secPrevSquare.position[1]];
                    //             coord = prevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             if ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 for (let i = p2PlyrSel.length-1; i >= 0; i--) {
                    //                     if (p2PlyrSel[i].containsShip === true && p2PlyrSel[i-1].containsShip === true && p2PlyrSel[i].ship !== p2PlyrSel[i-1].ship) {
                    //                         coord = p2PlyrSel[i].position;
                    //                         coord = [coord[0] - direction[0] - 1, coord[1] - direction[1] - 1];   
                    //                         break;

                    //                     }
                    //                     else if (p2PlyrSel[i].containsShip === true && p2PlyrSel[i-1].containsShip === false) {
                    //                         coord = p2PlyrSel[i].position;
                    //                         coord = [coord[0] - direction[0] - 1, coord[1] - direction[1] - 1];   
                    //                         break;
                    //                     }
                    //                     else if (p2PlyrSel[i].containsShip === false) {
                    //                         if (p2PlyrSel[i-1].containsShip === false || p2PlyrSel[i-1].ship !== secPrevSquare.ship) {
                    //                             coord = p2PlyrSel[i+1].position;
                    //                             coord = [coord[0] - direction[0] - 1, coord[1] - direction[1] - 1];
                    //                             break;
                    //                         }
                    //                         else {
                    //                             coord = p2PlyrSel[i-1].position;
                    //                             coord = [coord[0] - direction[0] - 1, coord[1] - direction[1] - 1];   
                    //                             break;
                    //                         }
                    //                     }
                    //                 }
                    //             }
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //         else {
                    //             let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //             coord = prevSquare.position;
                    //             coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                 direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = prevSquare.position;
                    //                 coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //             }
    
                    //             p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //         }
                    //     }
                    //     else {
                    //         for (let i = p2PlyrSel.length - 1; i >= 0; i--) {
                    //             if (p2PlyrSel[i].ship.sunk === false) {
                    //                 let direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                 coord = p2PlyrSel[i].position;
                    //                 coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //                 while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                     direction = possibleMoves[Math.floor(Math.random()*4)];
                    //                     coord = prevSquare.position;
                    //                     coord = [coord[0] + direction[0] - 1, coord[1] + direction[1] - 1];
                    //                 }
                    //                 prevSquare = p2PlyrSel[i];
                    //                 break;
                    //             }
                    //             else {
                    //                 coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //                 while ((coord[0] < 0 || coord[0] > 9 || coord[1] < 0 || coord[1] > 9) || player1.playerBoard.board[coord[0]][coord[1]].hit === true) {
                    //                     coord = [Math.floor(Math.random()*10), Math.floor(Math.random()*10)];
                    //                 }
                    //                 break;
                    //             }
                    //         }
                    //         p2PlyrSel.push(player1.playerBoard.board[coord[0]][coord[1]]);
                    //     }
                    // }



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