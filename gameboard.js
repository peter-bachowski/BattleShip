class Gameboard {
    constructor () {
        this.board = new Array(10); 
        for (let i = 0; i < 10; i++) { //creates a two dimensional array that represents the board
            this.board[i] = new Array(10);
            for (let j = 0; j < 10; j++) { //populates each square with an object with trackers
                const squareObj = {
                    ship: null,
                    position: [i+1,j+1],
                    containsShip: false,
                    hit: false
                }

                this.board[i][j] = squareObj;
            }
        }
        this.shipsList = [];
    }

    placeShipAt (ship, coord1, coord2) {
        this.shipsList.push(ship);

        let initX = coord1[0];
        let initY = coord1[1];

        let finalX = coord2[0];
        let finalY = coord2[1];

        this.board[initX][initY].ship = ship;
        this.board[initX][initY].containsShip = true;

        this.board[finalX][finalY].ship = ship;
        this.board[finalX][finalY].containsShip = true;
    }

    receiveAttack (coord1) {
        const square = this.board[coord1[0]][coord1[1]];
        square.hit = true;
        if (square.containsShip === true) {
            square.ship.hit();
        }
        this.isGameOver();
    }

    isGameOver () {
        for (let i = 0; i < this.shipsList.length; i++) {
            if (this.shipsList[i].sunk === false) {
                return false;
            }
        }
        return true;
    }
}

export default Gameboard;