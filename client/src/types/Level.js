/// Level.js

import Vector from "./Vector";
import {Field, FieldType} from "./Field";
import Object from "./Object";
import {OBJECT_SIZE} from "./Constants";

import timeSinceEpoch from "../utils/timeSinceEpoch";

export default class Level {

    objects = [];
    positionsCopy = [];
    velocitiesCopy = [];
    fields = [];
    origin = new Vector(0, 0, 0);
    zoomFactor = 100; // pixels / m

    playing = false;
    startTime = 0;
    registeredEvents = false;
    selectedObject = null;
    dragStart = new Vector(0, 0, 0);
    dragObject = null;

    constructor(dataString) {

        const data = JSON.parse(dataString);

        for (const obj of data["objects"])
            this.objects.unshift(new Object(new Vector(obj["x"], obj["y"], obj["z"]),
                                 new Vector(obj["v_x"], obj["v_y"], obj["v_z"]),
                                 obj["massCharge"], obj["electricCharge"]));

        for (const field of data["fields"])
            this.fields.unshift(new Field(field["type"], field["x"], field["y"]));
    }

    toDataString() {

        return JSON.stringify({objects: this.objects.map(o => {
            return {x: o.position.x, y: o.position.y, z: o.position.z,
                v_x: o.velocity.x, v_y: o.velocity.y, v_z: o.velocity.z,
                massCharge: o.charges[FieldType.Gravitational],
                electricCharge: o.charges[FieldType.Electric]}
        }),
        fields: this.fields.map(f => {
            return {type: f.type, x: f.x, y: f.y}
        })});
    }

    isPlaying() {

        return this.playing;
    }

    play() {

        this.positionsCopy = [];
        this.velocitiesCopy = []

        for (const obj of this.objects) {

            this.positionsCopy.push(new Vector(obj.position.x, obj.position.y, obj.position.z));
            this.velocitiesCopy.push(new Vector(obj.velocity.x, obj.velocity.y, obj.velocity.z));
        }

        this.playing = true;
        this.startTime = timeSinceEpoch();
    }

    stop() {

        for (const i in this.objects) {

            this.objects[i].position = this.positionsCopy[i];
            this.objects[i].velocity = this.velocitiesCopy[i];
        }

        this.playing = false;
    }

    registerEvents(renderEngine) {

        console.log("registered events");
        renderEngine.getCanvas().addEventListener("dragstart", e => {

            this.dragStart.x = e.clientX;
            this.dragStart.y = e.clientY;
            this.dragObject = this.findObject(renderEngine, this.dragStart);
        });
        renderEngine.getCanvas().addEventListener("dragover", e => {
            
            const screenDelta = new Vector(
                e.clientX - this.dragStart.x,
                e.clientY - this.dragStart.y,
                0
            );
            const delta = new Vector(
                screenDelta.x / this.zoomFactor,
                screenDelta.y / this.zoomFactor,
                0
            );

            let resetDelta = true;

            if (!this.dragObject) {

                this.origin.x += delta.x;
                this.origin.y += delta.y;
            } else {

                if (e.shiftKey) {

                    this.dragObject.velocity.x = -delta.x;
                    this.dragObject.velocity.y = -delta.y;
                    resetDelta = false;
                } else {

                    this.dragObject.position.x += delta.x;
                    this.dragObject.position.y += delta.y;
                }
            }

            if (resetDelta) {

                this.dragStart.x = e.clientX;
                this.dragStart.y = e.clientY;
            }
        });
        renderEngine.getCanvas().addEventListener("click", e => {

            this.selectedObject = this.findObject(renderEngine, new Vector(e.clientX, e.clientY, 0));
        });

        this.registeredEvents = true;
    }

    findObject(renderEngine, screenPos) {

        if (this.isPlaying()) {

            return null;
        }

        const size = renderEngine.getCanvasSize();
        const pos = new Vector(
            (screenPos.x - size.x / 2) / this.zoomFactor - this.origin.x,
            (screenPos.y - size.y / 2) / this.zoomFactor - this.origin.y,
            0
        );

        for (const obj of this.objects) {

            const dist = new Vector(
                obj.position.x - pos.x,
                obj.position.y - pos.y,
                obj.position.z - pos.z
            );

            if (dist.length() <= OBJECT_SIZE) {

                return obj;
            }
        }

        return null;
    }

    serialize() {

        return JSON.stringify({objects: this.objects, fields: this.fields});
    }

    newObject() {

        if (this.isPlaying()) {

            return;
        }

        this.objects.unshift(new Object(new Vector(0, 0, 0), new Vector(0, 0, 0), 0, 0));
    }

    async drawBackground(renderEngine) {

        const vertices = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
        const colors = [
            0.106, 0.133, 0.200, 1.0,
            0.106, 0.133, 0.200, 1.0,
            0.192, 0.243, 0.365, 1.0,
            0.192, 0.243, 0.365, 1.0
        ];

        renderEngine.draw(vertices, colors, 4, false);
    }

    async drawAxes(renderEngine) {

        const size = renderEngine.getCanvasSize();
        const rel = new Vector(this.origin.x * this.zoomFactor + size.x / 2,
                               this.origin.y * this.zoomFactor + size.y / 2,
                               0);
        const ratio = [
            (rel.x * 2.0 - size.x) / size.x,
            (size.y - 2.0 * rel.y) / size.y
        ];

        const colors = [
            0.439, 0.439, 0.439, 1.0,
            0.439, 0.439, 0.439, 1.0
        ];
        const vertical = [
            ratio[0], 1.0,
            ratio[0], -1.0
        ];
        const horizontal = [
            -1.0, ratio[1],
            1.0, ratio[1]
        ];

        renderEngine.draw(vertical, colors, 2, true);
        renderEngine.draw(horizontal, colors, 2, true);
    }

    async draw(renderEngine) {

        if (!this.registeredEvents)
            this.registerEvents(renderEngine);

        if (this.isPlaying()) {

            const runningTime = (timeSinceEpoch() - this.startTime) / 1000.0;

            for (const object of this.objects) {

                object.updatePosition();

                for (const o of this.objects) {

                    if (o !== object) {

                        object.interact(o);
                    }
                }

                for (const f of this.fields) {

                    object.feel(f, runningTime);
                }
            }
        }

        await this.drawBackground(renderEngine);
        await this.drawAxes(renderEngine);

        for (const object of this.objects)
            await object.draw(renderEngine, this.origin, this.zoomFactor, this.selectedObject === object);
    }
}
