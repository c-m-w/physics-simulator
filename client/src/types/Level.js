/// Level.js

import Vector from "./Vector";
import { Field } from "./Field";

export default class Level {

    objects = []
    fields = []

    constructor(dataString) {

        const data = JSON.parse(dataString);

        for (const obj of data["objects"])
            this.objects.unshift(new Object(new Vector(obj["x"], obj["y"], obj["z"]), obj["massCharge"], obj["electricCharge"]));

        for (const field of data["fields"])
            this.fields.unshift(new Field(field["type"], field["magnitude"]));
    }

    serialize() {

        return JSON.stringify({objects: this.objects, fields: this.fields});
    }

    newObject() {

        this.objects.unshift(new Object(new Vector(0, 0, 0), 1, 1));
    }

    async draw() {

        for (const object of this.objects)
            await object.draw();
    }
}
