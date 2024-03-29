/// Simulator.js

import {useState} from "react";
import {useNavigate} from "react-router-dom";

import useUser from "../hooks/useUser";

import Header from "../components/Header";
import Board from "../components/Board";

import NewLevelPopup from "../components/NewLevelPopup";
import LoadLevelPopup from "../components/LoadLevelPopup";

const Popup = {
    None: 0,
    NewLevel: 1,
    LoadLevel: 2
}

export default function Simulator() {

    const user = useUser();
    const [popup, setPopup] = useState(Popup.None);
    const navigate = useNavigate();

    const newLevel = () => {

        setPopup(Popup.NewLevel);
    };

    const loadLevel = () => {

        setPopup(Popup.LoadLevel);
    };

    if (!user.isLoggedIn()) {

        navigate("/");
        return <></>;
    }

    return (
        <>
            <Header
                newLevel={newLevel}
                loadLevel={loadLevel} />
            <Board />
            {popup === Popup.NewLevel && <NewLevelPopup closePopup={() => setPopup(Popup.None)} />}
            {popup === Popup.LoadLevel && <LoadLevelPopup closePopup={() => setPopup(Popup.None)} />}
        </>
    );
}
