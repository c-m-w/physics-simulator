/// Board.js

import {useState} from "react";

import Vector from "../types/Vector";
import useLevel from "../hooks/useLevel";
import {TICK_INTERVAL} from "../types/Constants";

import RenderEngine from "../drawing/RenderEngine";
import EditObjectPopup from "./EditObjectPopup";
import EditLevelPopup from "./EditLevelPopup";

const Popup = {
    None: 0,
    EditLevel: 1,
    EditObject: 2
}

export default function Board() {

    const level = useLevel();
    const [renderEngine, setRenderEngine] = useState(null);
    const [createdThread, setCreatedThread] = useState(false);
    const [origin, setOrigin] = useState(new Vector(0, 0, 0));
    const [playing, setPlaying] = useState(false);
    const [popup, setPopup] = useState(Popup.None);

    async function renderScene() {

        renderEngine.beginScene();
        await level.current().draw(renderEngine);
        setTimeout(renderScene, TICK_INTERVAL);

        const x = level.current().origin.x.toFixed(1);
        const y = level.current().origin.y.toFixed(1);

        if (x != origin.x
            || y != origin.y)
            (async () => {setOrigin(new Vector(x, y, 0))})();
    }

    if (renderEngine && !createdThread) {

        console.log(renderEngine);
        renderScene();
        setCreatedThread(true);
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
                draggable
                ref={e => e !== null && renderEngine === null && setRenderEngine(new RenderEngine(e))} />
            <span className="level-controls">
                <p id="position">({origin.x}, {origin.y}) m</p>
                <img className="clickable"
                    id="new-item"
                    src="/images/plus.png"
                    onClick={() => level.current().newObject()} />
                <img className="clickable"
                    id="edit-level"
                    src="/images/gear.png"
                    onClick={() => {
                        
                        if (level.current().selectedObject) {

                            setPopup(Popup.EditObject);
                        } else {
                            
                            setPopup(Popup.EditLevel);
                        }
                    }} />
                {playing ? 
                <img className="clickable"
                    id="play-level"
                    src="/images/stop.png"
                    onClick={() => {
                        level.current().stop();
                        setPlaying(false);
                    }} /> :
                <img className="clickable"
                    id="play-level"
                    src="/images/play.png"
                    onClick={() => {
                        level.current().play();
                        setPlaying(true);
                    }} /> }
            </span>
            {popup === Popup.EditLevel && <EditLevelPopup level={level.current()} closePopup={() => setPopup(Popup.None)} />}
            {popup === Popup.EditObject && <EditObjectPopup object={level.current().selectedObject} closePopup={() => setPopup(Popup.None)} />}
        </>
    )
}
