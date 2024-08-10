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
    const boardColumnLabelP1 = document.createElement('div');
    const boardRowLabelP1 = document.createElement('div');
    const boardColumnLabelP2 = document.createElement('div');
    const boardRowLabelP2 = document.createElement('div');
    const rowLabelAndBoardWrapperP1 = document.createElement('div');
    const colmnLabelAndBoardWrapperP1 = document.createElement('div');
    const rowLabelAndBoardWrapperP2 = document.createElement('div');
    const colmnLabelAndBoardWrapperP2 = document.createElement('div');


    playerBoard.classList.add('board');
    playerWrapper.classList.add('playerWrapper');

    opponentBoard.classList.add('board');
    opponentWrapper.classList.add('opponentWrapper');

    rowLabelAndBoardWrapperP1.classList.add('rowLabelAndBoardWrapperP1');
    colmnLabelAndBoardWrapperP1.classList.add('colmnLabelAndBoardWrapperP1');
    rowLabelAndBoardWrapperP2.classList.add('rowLabelAndBoardWrapperP2');
    colmnLabelAndBoardWrapperP2.classList.add('colmnLabelAndBoardWrapperP2');

    playerHeading.classList.add('heading');
    opponentHeading.classList.add('heading');

    boardColumnLabelP1.classList.add('boardColumnLabelP1');
    boardColumnLabelP2.classList.add('boardColumnLabelP2');
    boardRowLabelP1.classList.add('boardRowLabelP1');
    boardRowLabelP2.classList.add('boardRowLabelP2');

    playerHeading.innerText = 'Player One';
    opponentHeading.innerText = 'Player Two';

    playerBoard.id = 'realPlayerBoard';
    opponentBoard.id = 'computerPlayerBoard';

    boardContainer.appendChild(playerWrapper);
    boardContainer.appendChild(opponentWrapper);

    playerWrapper.appendChild(playerHeading);
    playerWrapper.appendChild(rowLabelAndBoardWrapperP1);

    rowLabelAndBoardWrapperP1.appendChild(boardRowLabelP1);
    rowLabelAndBoardWrapperP1.appendChild(colmnLabelAndBoardWrapperP1);

    colmnLabelAndBoardWrapperP1.appendChild(playerBoard);
    colmnLabelAndBoardWrapperP1.appendChild(boardColumnLabelP1);

    opponentWrapper.appendChild(opponentHeading);
    opponentWrapper.appendChild(rowLabelAndBoardWrapperP2);

    rowLabelAndBoardWrapperP2.appendChild(boardRowLabelP2);
    rowLabelAndBoardWrapperP2.appendChild(colmnLabelAndBoardWrapperP2);

    colmnLabelAndBoardWrapperP2.appendChild(opponentBoard);
    colmnLabelAndBoardWrapperP2.appendChild(boardColumnLabelP2);

    // opponentWrapper.appendChild(opponentHeading);
    // opponentWrapper.appendChild(opponentBoard);
    // opponentWrapper.appendChild(boardColumnLabelP2);
    // opponentWrapper.appendChild(boardRowLabelP2);

    //fills the player boards with square objects that will represent the game tiles
    //creates the UI
    
    populateBoard(playerBoard);
    populateBoard(opponentBoard);
    populateLabel();

    function populateBoard (board) { //populates the respective board with square elements that will represent the coordinates in the game
        for (let y = 10; y >= 1; y--) {
            for (let x = 1; x <= 10; x++) {
                const squareElement = document.createElement('div');
                squareElement.classList.add('square');
                squareElement.id = board.id.charAt(0) + x.toString() + "_" + y.toString(); //potential issues
                board.appendChild(squareElement);
            }
        }
    }

    function populateLabel () {
        for (let i = 1; i <= 10; i++) {
            let colmnLabel1 = document.createElement('div');
            let colmnLabel2 = document.createElement('div');

            let rowLabel1 = document.createElement('div');
            let rowLabel2 = document.createElement('div');

            colmnLabel1.classList.add('colmnLabel');
            rowLabel1.classList.add('rowLabel');
            colmnLabel2.classList.add('colmnLabel');
            rowLabel2.classList.add('rowLabel');

            colmnLabel1.innerText = i;
            colmnLabel2.innerText = i;
            rowLabel1.innerText = 11 - i;
            rowLabel2.innerText = 11 - i;

            boardColumnLabelP1.appendChild(colmnLabel1);
            boardColumnLabelP2.appendChild(colmnLabel2);
            boardRowLabelP1.appendChild(rowLabel1);
            boardRowLabelP2.appendChild(rowLabel2);
        }
    }
}