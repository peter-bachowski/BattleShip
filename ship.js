class Ship {
    constructor (length, hits = 0, sunk = false) {
        if (length < 2 || length > 5) {
            alert("You must enter a length between 2 and 5.")
        }
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }


}

const ship1 = new Ship(6);
console.log(ship1);