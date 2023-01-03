/// Board.js

import {useState} from "react";

import useLevel from "../hooks/useLevel";
import loadImage from "../utils/loadImage";
import timeSinceEpoch from "../utils/timeSinceEpoch";

import RenderEngine from "../drawing/RenderEngine";

export default function Board() {

    const level = useLevel();
    const [renderEngine, setRenderEngine] = useState(null);
    let y = 0;

    async function renderScene() {
        
        //const vertices = [0.1, 0.1, -0.1, 0.1, 0.1, -0.1, -0.1, -0.1];
        const f1 = (1 + Math.sin(timeSinceEpoch() / 1500)) / 2;
        const f2 = (1 + Math.cos(timeSinceEpoch() / 1500)) / 2
        const vertices = [f1, f1, -f2, f2, f1, -f1, -f2, -f2];
        const textureCoordinates = [1.0, 1.0, 0, 1.0, 1.0, 0, 0, 0];
        const colors = [
            1.0,
            1.0,
            1.0,
            1.0, // white
            1.0,
            0.0,
            0.0,
            1.0, // red
            0.0,
            1.0,
            0.0,
            1.0, // green
            1.0,
            1.0,
            1.0,
            0.5, // white
        ];

        const image = await loadImage("/images/ball_0.png");

        renderEngine.beginScene();
        //renderEngine.draw(vertices, colors, 4, false);
        renderEngine.drawTextured(vertices, textureCoordinates, 4, image);
        setTimeout(renderScene, 25);
    }

    if (renderEngine)
    {
        console.log(renderEngine);
        renderScene();
    }

    if (!level.loaded()) {

        return (
            <div className="empty-level">
                <h2 className="thin light-blue absolute-centered">
                    load or create a level to begin...
                </h2>
            </div>
        );
    }

    return (
        <>
            <canvas 
                id="board" 
                ref={e => e !== null && renderEngine === null && setRenderEngine(new RenderEngine(e))} />
            <span className="level-controls">
                <p id="position">(0, 0) m</p>
                <img className="clickable"
                    id="new-item"
                    src="/images/plus.png"
                    onClick={() => level.current().newObject()} />
                <img className="clickable"
                    id="edit-level"
                    src="/images/gear.png" />
            </span>
        </>
    )
}
