function loadShipsToBoard (player) {
    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 10; i++) {
            if (player.playerBoard.board[i][j].containsShip === true) {
                let selector;
                if (player.playerType === 'real') {
                    selector = '#r' + (i+1) + '_' + (j+1);
                }
                else if (player.playerType === 'computer') {
                    selector = '#c' + (i+1) + '_' + (j+1);
                }
                let square = document.querySelector(selector);
                    square.style.backgroundColor = 'red';
            }
        }
    }
}

export default loadShipsToBoard;