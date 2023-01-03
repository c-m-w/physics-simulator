/// Object.js

import Vector from "./Vector";

import {FieldType} from "./Field";
import randomInteger from "../utils/randomInteger";

const MAX_TYPES = 1;

export default class Object {

    position = Vector();
    charges = [0, 0];
    type = 0;

    constructor(position, massCharge, electricCharge, type = -1) {

        this.position = position;
        this.charges[FieldType.Gravitational] = massCharge;
        this.charges[FieldType.Electric] = electricCharge;

        if (type === -1) {

            this.type = randomInteger(0, MAX_TYPES);
        }
    }

    async draw() {

        
    }
}
