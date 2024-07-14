export default addBoardElements;

function addBoardElements () {
    const boardContainer = document.querySelector('.boardContainer');
    const playerBoardContainer = document.createElement('div');
    const opponentBoardContainer = document.createElement('div');

    playerBoardContainer.classList.add('playerBoardContainer');
    opponentBoardContainer.classList.add('opponentBoardContainer');

    boardContainer.appendChild(playerBoardContainer);
    boardContainer.appendChild(opponentBoardContainer);
}