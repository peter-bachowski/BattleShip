export default addBaseElements;

function addBaseElements () {
    const container = document.createElement('div');
    const header = document.createElement('div');
    const mainBody = document.createElement('div');
    const boardContainer = document.createElement('div');
    const footer = document.createElement('div');
    const startBtn = document.createElement('button');

    container.classList.add('container');
    header.classList.add('header');
    mainBody.classList.add('mainBody');
    boardContainer.classList.add('boardContainer');
    footer.classList.add('footer');
    startBtn.classList.add('startBtn');
    
    document.body.appendChild(container);
    container.appendChild(header);
    container.appendChild(mainBody);
    mainBody.appendChild(startBtn);
    mainBody.appendChild(boardContainer);
    container.appendChild(footer);

    header.innerText = 'BattleShip!';
    footer.innerText = 'Copyright © Peter Bachowski 2024'
    startBtn.innerText = 'Start Game!';
}