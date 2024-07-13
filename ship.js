class Ship {
    constructor (length) {
        if (length < 2 || length > 5) {
            alert("You must enter a length between 2 and 5.")
        }
        this.length = length;
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits += 1;
        if (this.hits >= this.length) {
            this.sunk = true;
        }
    }

    isSunk() {
        return this.sunk;
    }
}

export default Ship;