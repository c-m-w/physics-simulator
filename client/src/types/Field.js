/// Field.js

import {evaluate} from "mathjs";

const FieldType = {
    Gravitational: 0,
    Electric: 1
}

class Field {

    type = FieldType.Gravitational;
    expression = "1"

    constructor(type, expression) {

        this.type = type;
        this.expression = expression;
    }

    evaluate(obj) {

        const scope = {
            x: obj.position.x,
            y: obj.position.y,
            v_x: obj.velocity.x,
            v_y: obj.velocity.y
        };

        return evaluate(this.expression, scope);
    }
}

export {FieldType, Field};
