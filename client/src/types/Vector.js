/// Vector.js

export default class Vector {

    x = 0;
    y = 0;
    z = 0;
    
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    length() {

        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    cos() {

        return this.x / this.length();
    }

    sin() {

        return this.y / this.length();
    }

    tan() {

        return this.y / this.x;
    }
}
