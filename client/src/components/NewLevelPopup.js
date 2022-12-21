/// NewLevelPopup.js

import {useState} from "react";

import makeAPIRequest from "../utils/makeAPIRequest";

// todo make popups into one fn

export default function NewLevelPopup(props) {

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");

    const changeName = (e) => {

        setName(e.target.value);
    }

    const attemptClosePopup = (e) => {

        e.target.className == "popup" && props.closePopup();
    }

    const attemptCreateLevel = async (e) => {

        e.preventDefault();

        const response = await makeAPIRequest("login", "POST", name);
    
        if (response && response.success) {

            /// ...
        } else {

            setStatus("error")
        }

        { /// delete this
            
        }
    }

    return (
        <div className="popup" onClick={attemptClosePopup}>
            <div className="popup-body">
                <h2 className="white centered">new level</h2>
                <form className="login" onSubmit={attemptCreateLevel}>
                    <label 
                        className="big thin white"
                        htmlFor="name">name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="big thin white"
                        value={name}
                        onChange={changeName} />
                    <button className="big">create</button>
                </form>
                <p className="status red">{status}</p>
            </div>
        </div>
    );
}