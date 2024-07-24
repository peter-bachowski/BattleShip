import addBaseElements from "./addBaseElements.js";
import addBoardElements from "./addBoardElements.js";
import startGame from "./startGame.js";
import Player from "./player.js";


addBaseElements();
addBoardElements();
const player1 = new Player('real');
const player2 = new Player('computer');
startGame(player1, player2);