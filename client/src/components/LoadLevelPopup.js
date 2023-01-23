/// LoadLevelPopup.js

import {useState, useEffect} from "react";

import useUser from "../hooks/useUser";
import useLevel from "../hooks/useLevel";

import makeAPIRequest from "../utils/makeAPIRequest";

// todo make popups into one fn

export default function LoadLevelPopup(props) {

    const [level, setLevel] = useState(0);
    const [levels, setLevels] = useState([]);
    const [status, setStatus] = useState("");
    const user = useUser();
    const currentLevel = useLevel();

    const changeSelectedLevel = (e) => {

        setLevel(e.target.value);
    }

    const attemptClosePopup = (e) => {

        e.target.className === "popup" && props.closePopup();
    }

    const attemptLoadLevel = async (e) => {

        e.preventDefault();

        if (-1 === level) {
            
            return;
        }

        const response = await currentLevel.load(levels[level].id);
    
        if (response && response.success) {

            props.closePopup();
            console.log("close popup");
            /// todo success notification
        } else {

            setStatus(response.message);
        }
    }

    useEffect((() => {(async () => {

        const response = await makeAPIRequest(`levels/${user.email}`, "GET");

        if (response && response.success) {

            setLevels(response.data);
        }
    })();}), []);

    const levelElements = levels.map((l, i) => {

        return <option value={i}>{l.name}</option>;
    });

    return (
        <div className="popup" onClick={attemptClosePopup}>
            <div className="popup-body">
                <h2 className="white centered">load level</h2>
                <form className="general" onSubmit={attemptLoadLevel}>
                    <label
                        className="big thin white"
                        htmlFor="level">level</label>
                    <select
                        className="big thin white"
                        name="type"
                        value={level}
                        onChange={(e) => changeSelectedLevel(e)}
                        disabled={levels.length === 0}>
                        {levelElements}
                    </select>
                    <button
                        className="big"
                        disabled={levels.length === 0 || level >= levels.length}>load</button>
                </form>
                <p className="status red">{status}</p>
            </div>
        </div>
    );
}
