export default addBoardElements;

function addBoardElements () {

    //creates player boards for the real player and computer

    const boardContainer = document.querySelector('.boardContainer');
    const playerBoard = document.createElement('div');
    const opponentBoard = document.createElement('div');
    const playerWrapper = document.createElement('div');
    const opponentWrapper = document.createElement('div');
    const playerHeading = document.createElement('div');
    const opponentHeading = document.createElement('div');
     
    playerBoard.classList.add('board');
    playerWrapper.classList.add('playerWrapper');

    opponentBoard.classList.add('board');
    opponentWrapper.classList.add('playerWrapper');

    playerHeading.classList.add('heading');
    opponentHeading.classList.add('heading');

    playerHeading.innerText = 'Player One';
    opponentHeading.innerText = 'Player Two';

    playerBoard.id = 'realPlayerBoard';
    opponentBoard.id = 'computerPlayerBoard';

    boardContainer.appendChild(playerWrapper);
    boardContainer.appendChild(opponentWrapper);

    playerWrapper.appendChild(playerHeading);
    playerWrapper.appendChild(playerBoard);

    opponentWrapper.appendChild(opponentHeading);
    opponentWrapper.appendChild(opponentBoard);

    //fills the player boards with square objects that will represent the game tiles
    //creates the UI
    
    popBoard(playerBoard);
    popBoard(opponentBoard);

    function popBoard (board) { //populates the respective board with square elements that will represent the coordinates in the game
        for (let y = 10; y >= 1; y--) {
            for (let x = 1; x <= 10; x++) {
                const squareElement = document.createElement('div');
                squareElement.classList.add('square');
                squareElement.id = board.id.charAt(0) + x.toString() + "," + y.toString(); //potential issues
                board.appendChild(squareElement);
            }
        }
    }
}