import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

let gameboard1 = new Gameboard();
let ship1 = new Ship(2);

gameboard1.placeShipAt(ship1, [1,1], [2,1]);
gameboard1.receiveAttack([1,1]);
gameboard1.receiveAttack([3,1]);
console.log(gameboard1.isGameOver());