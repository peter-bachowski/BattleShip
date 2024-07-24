function findRandPosition (player, p1XCoord, p1YCoord) { //checks if the coordinates have a ship. If they do, the function generates new coordinates until it finds empty ones, then returns them. If it does not, it returns the coordinates
    while (player.playerBoard.board[p1XCoord][p1YCoord].containsShip === true) {
        p1XCoord = Math.floor(Math.random() * 10);
        p1YCoord = Math.floor(Math.random() * 10);        
    }

    return [p1XCoord, p1YCoord];

}

export default findRandPosition;