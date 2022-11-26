/// LoginPopup.js

import {useState} from "react";

import makeAPIRequest from "../utils/makeAPIRequest";

// todo make popups into one fn

export default function LoginPopup(props) {

    const [info, setInfo] = useState({
        email: "",
        password: ""
    });
    const [status, setStatus] = useState("");

    const changeInfo = (e) => {

        setInfo(oldInfo => ({...(oldInfo), [e.target.name]: e.target.value}));
    }

    const attemptClosePopup = (e) => {

        e.target.className == "popup" && props.closePopup();
    }

    const attemptLogin = async (e) => {

        e.preventDefault();

        const response = await makeAPIRequest("login", "POST", info);
    
        if (response && response.success) {

            /// ...
        } else {

            setStatus("error")
        }
    }

    return (
        <div className="popup" onClick={attemptClosePopup}>
            <div className="popup-body">
                <h2 className="white centered">login</h2>
                <form className="login" onSubmit={attemptLogin}>
                    <label 
                        className="big thin white"
                        htmlFor="email">email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="big thin white"
                        value={info.email}
                        onChange={changeInfo} />
                    <label
                        className="big thin white" 
                        htmlFor="password">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="big thin white"
                        value={info.password}
                        onChange={changeInfo} />
                    <button className="big">login</button>
                </form>
                <p className="status red">{status}</p>
            </div>
        </div>
    );
}