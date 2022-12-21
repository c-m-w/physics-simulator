/// Simulator.js

import {useState} from "react";

import useUser from "../hooks/useUser";

import Header from "../components/Header";
import Board from "../components/Board";

import NewLevelPopup from "../components/NewLevelPopup";

const Popup = {
    None: 0,
    NewLevel: 1,
    LoadLevel: 2
}

export default function Simulator() {

    const user = useUser();
    const [popup, setPopup] = useState(Popup.None);

    const newLevel = () => {

        setPopup(Popup.NewLevel);
    };

    const loadLevel = () => {

        setPopup(Popup.LoadLevel);
    };

    return (
        <>
            <Header
                newLevel={newLevel}
                loadLevel={loadLevel} />
            <Board />
            {popup === Popup.NewLevel && <NewLevelPopup closePopup={() => setPopup(Popup.None)} />}
            {popup === Popup.LoadLevel && <NewLevelPopup closePopup={() => setPopup(Popup.None)} />}
        </>
    );
}
