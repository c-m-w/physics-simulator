/// Board.js

import {useState} from "react";

import useLevel from "../hooks/useLevel";

export default function Board() {

    const level = useLevel();
    const [boardElement, setBoardElement] = useState(null);
    let y = 0;

    if (boardElement !== null) {

        const gl = boardElement.getContext("experimental-webgl");

        console.log(gl);
    }

    console.log(level);

    if (!level.loaded) {

        return (
            <div className="empty-level">
                <h2 className="thin light-blue absolute-centered">
                    load or create a level to begin...
                </h2>
            </div>
        )
    }

    return (
        <canvas 
            id="board" 
            ref={e => e !== null && boardElement === null && setBoardElement(e)} />
    )
}