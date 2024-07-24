import findRandPosition from "./findRandPosition.js";

function placeShipsAlgo (player, ship) {
    const possibleMoves = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
    ];
    let origin = findRandPosition(player, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)); //randomizes the initial position of the ship
    let coord = origin;
    let direction = possibleMoves[(Math.floor(Math.random()*4))];
    let valid = false;

    while (valid === false) {
        for (let i = 1; i < ship.length; i++) {
            let newCoord = [coord[0] + direction[0], coord[1] + direction[1]];
            if (newCoord[0] < 0 || newCoord[1] < 0 || newCoord[0] > 9 || newCoord[1] > 9 || player.playerBoard.board[newCoord[0]][newCoord[1]].containsShip === true) {
                origin = findRandPosition(player, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
                coord = origin;
                direction = possibleMoves[(Math.floor(Math.random()*4))];
                valid = false;
                break;
            }
            coord = newCoord;
            valid = true;
        }
    }

    coord = origin;
    player.playerBoard.placeShipAt(ship, origin);
    for (let i = 1; i < ship.length; i++) {
        let newCoord = [coord[0] + direction[0], coord[1] + direction[1]];
        player.playerBoard.placeShipAt(ship, newCoord);    
        coord = newCoord;
    }
}

export default placeShipsAlgo;