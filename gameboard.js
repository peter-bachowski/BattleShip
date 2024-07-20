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

    placeShipAt (ship, coord) {
        //this.shipsList.push(ship);

        let coordX = coord[0];
        let coordY = coord[1];

        this.board[coordX][coordY].ship = ship;
        this.board[coordX][coordY].containsShip = true;
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