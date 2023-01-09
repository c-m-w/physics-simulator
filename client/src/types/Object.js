/// Object.js

import Vector from "./Vector";

import {MAX_TYPES, OBJECT_SIZE, TICK_INTERVAL, G, EPSILON_0} from "./Constants";
import {Field, FieldType} from "./Field";
import randomInteger from "../utils/randomInteger";
import getObjectImage from "../utils/getObjectImage";

export default class Object {

    position = new Vector();
    velocity = new Vector();
    charges = [0, 0];
    fixed = false;
    type = 0;
    image = null;
    imageSelected = null;

    constructor(position, velocity, massCharge, electricCharge, fixed, type = -1) {

        this.position = position;
        this.velocity = velocity;
        this.charges[FieldType.Gravitational] = massCharge;
        this.charges[FieldType.Electric] = electricCharge;
        this.fixed = fixed;

        if (type === -1) {

            this.type = randomInteger(0, MAX_TYPES);
        }

        (async () => {
            this.image = await getObjectImage(this.type, false);
            this.imageSelected = await getObjectImage(this.type, true);
        })();

        console.log("image")
        console.log(this.image);
    }

    updatePosition() {

        if (this.fixed)
            return;

        this.position.x += this.velocity.x * TICK_INTERVAL / 1000;
        this.position.y += this.velocity.y * TICK_INTERVAL / 1000;
    }

    interact(other) {

        const rel = new Vector(
            other.position.x - this.position.x,
            other.position.y - this.position.y,
            other.position.z - this.position.z
        );
        
        const dist = rel.length();

        const F_g = G * this.charges[FieldType.Gravitational] * other.charges[FieldType.Gravitational] / Math.pow(dist, 2);
        const F_e = EPSILON_0 * this.charges[FieldType.Electric] * other.charges[FieldType.Electric] / Math.pow(dist, 2);

        if (this.charges[FieldType.Gravitational] === 0) {

            return;
        }

        const a = (F_g - F_e) / this.charges[FieldType.Gravitational];

        this.velocity.x += a * rel.cos() * TICK_INTERVAL / 1000;
        this.velocity.y += a * rel.sin() * TICK_INTERVAL / 1000;

        console.log("a");
        console.log(a);
        console.log("this charge");
        console.log(this.charges[FieldType.Electric]);
        console.log("other charge");
        console.log(other.charges[FieldType.Electric]);
    }

    async draw(renderEngine, origin, zoomFactor, selected) {

        if (!this.image || !this.imageSelected) {

            return;
        }

        const size = renderEngine.getCanvasSize();
        const rel = new Vector((this.position.x + origin.x) * zoomFactor + size.x / 2,
                               (this.position.y + origin.y) * zoomFactor + size.y / 2,
                               0);
        const vel = new Vector((this.position.x + origin.x + this.velocity.x) * zoomFactor + size.x / 2,
                               (this.position.y + origin.y + this.velocity.y) * zoomFactor + size.y / 2,
                               0);
        
        const radius = OBJECT_SIZE * zoomFactor;

        const pixels = [
            new Vector(rel.x + radius, rel.y + radius, 0),
            new Vector(rel.x - radius, rel.y + radius, 0),
            new Vector(rel.x + radius, rel.y - radius, 0),
            new Vector(rel.x - radius, rel.y - radius, 0)
        ];
        const linePixels = [
            new Vector(vel.x, vel.y, 0),
            new Vector(rel.x, rel.y, 0)
        ];
        const colors = [
            0.878, 0.878, 0.878, 1.0,
            0.878, 0.878, 0.878, 1.0
        ];

        const vertices = renderEngine.pixelsToVertices(pixels);
        const line = renderEngine.pixelsToVertices(linePixels);
        
        const uv = [1.0, 1.0, 0, 1.0, 1.0, 0, 0, 0];

        renderEngine.drawTextured(vertices, uv, 4, selected ? this.imageSelected : this.image);
        renderEngine.draw(line, colors, 2, true);
    }
}
