/// Field.js

const FieldType = {
    Gravitational: 0,
    Electric: 1
}

class Field {

    type = FieldType.Gravitational;
    magnitude = 9.81;

    constructor(type, magntiude) {

        this.type = type;
        this.magntiude = magntiude;
    }
}

export {FieldType, Field};
