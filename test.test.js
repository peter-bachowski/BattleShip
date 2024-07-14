import Ship from './ship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';

const ship1 = new Ship(2);
const gameboard1 = new Gameboard();
const player1 = new Player('real');
const player2 = new Player('computer');
//const player3 = new Player('player');
gameboard1.placeShipAt(ship1,[1,1],[2,1]);
gameboard1.receiveAttack([1,1]);
gameboard1.receiveAttack([3,1]);

test('instantiating a new ship of length 2 gives length 2', () => {
  const ship1 = new Ship(2);
  expect(ship1.length).toBe(2);
});

test('if ship length is out of bounds', () => {
  expect(() => {
    const ship1 = new Ship(1);
  }).toThrow('alert');
  expect(() => {
    const ship1 = new Ship(6);
  }).toThrow('alert');
});

test('when ship gets hit add 1 to hits', () => {
  const ship1 = new Ship(2);
  ship1.hit();
  expect(ship1.hits).toBe(1);
});

test('if ship is sunk or not sunk', () => {
  const ship1 = new Ship(2);
  ship1.hit();
  expect(ship1.isSunk()).toBe(false);
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});

test('a gameboard square should contain an object', () => {
  expect(gameboard1.board[0][0]).not.toBeUndefined();
  expect(gameboard1.board[9][9]).not.toBeUndefined();
});

test('place a ship at a specific coordinate', () => {
  expect(gameboard1.board[1][1].containsShip).toBe(true);
  expect(gameboard1.board[2][1].containsShip).toBe(true);
});

test('an attack hits a ship and sends hit function to ship', () => {
  expect(gameboard1.board[1][1].hit).toBe(true);
  expect(ship1.hits).toBe(1);
});

test('if receiveAttack function records a miss', () => {
  expect(gameboard1.board[3][1].hit).toBe(true);
});

test('missing a ship does not end the game', () => {
  expect(ship1.sunk).toBe(false);
});

test('if sinking all ships ends the game', () => {
  gameboard1.receiveAttack([2,1]);
  expect(gameboard1.isGameOver()).toBe(true);
});

test('return real if the player type is real, and computer if the player is a computer', () => {
  expect(player1.playerType).toBe('real');
  expect(player2.playerType).toBe('computer');
});

test('errors if player type is neither real nor computer', () => {
  expect( () => {
    new Player('player');
  }).toThrow('alert');
});

test('player class contains a gameboard', () => {
  expect(player1.playerBoard).not.toBeUndefined();
});