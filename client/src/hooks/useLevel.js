/// useLevel.js

import {useContext} from "react";

import {levelContext} from "../context/LevelContext";

export default function useLevel() {

    const level = useContext(levelContext);
    
    return level;
}
