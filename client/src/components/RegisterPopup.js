/// RegisterPopup.js

import {useState} from "react";
import makeAPIRequest from "../utils/makeAPIRequest";

export default function RegisterPopup(props) {

    const [info, setInfo] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [status, setStatus] = useState("");

    const changeInfo = (e) => {

        setInfo(oldInfo => ({...(oldInfo), [e.target.name]: e.target.value}));
    }

    const attemptClosePopup = (e) => {

        e.target.className === "popup" && props.closePopup();
    }

    const attemptRegister = async (e) => {

        e.preventDefault();

        console.log(info);
        const response = await makeAPIRequest("register", "POST", info);
    
        if (response && response.success) {

            props.closePopup();
            /// todo success notification
        } else {

            setStatus(response.message);
        }
    }

    return (
        <div className="popup" onClick={attemptClosePopup}>
            <div className="popup-body">
                <h2 className="white centered">register</h2>
                <form className="register" onSubmit={attemptRegister}>
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
                    <input
                        type="password"
                        name="repeatPassword"
                        id="repeat-password"
                        className="big thin white"
                        value={info.repeatPassword}
                        onChange={changeInfo} />
                    <button className="big">register</button>
                </form>
                <p className="status red">{status}</p>
            </div>
        </div>
    );
}