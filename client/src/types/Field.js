/// Field.js

import {evaluate} from "mathjs";

import Vector from "./Vector";

const FieldType = {
    Gravitational: 0,
    Electric: 1
}

class Field {

    type = FieldType.Gravitational;
    x = "0";
    y = "0"

    constructor(type, x, y) {

        this.type = type;
        this.x = x;
        this.y = y;
    }

    evaluate(obj, t) {

        const scope = {
            x: obj.position.x,
            y: obj.position.y,
            v_x: obj.velocity.x,
            v_y: obj.velocity.y,
            t: t
        };

        return new Vector(evaluate(this.x, scope), evaluate(this.y, scope), 0);
    }
}

export {FieldType, Field};
