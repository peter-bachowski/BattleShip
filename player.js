import Gameboard from "./gameboard.js";

class Player {
    constructor (playerType) {
        if (playerType === 'real' || playerType === 'computer') {
            this.playerType = playerType;
        }
        else { alert('Please choose the correct player type: real or computer');}
    
        this.playerBoard = new Gameboard();
    }
}

export default Player;