/// MainHeader.js

import {useState} from "react";

import useUser from "../hooks/useUser";

import LoginPopup from "./LoginPopup";
import RegisterPopup from "./RegisterPopup";

const Popup = {
    None: 0,
    Login: 1,
    Register: 2
}

export default function MainHeader() {

    const [popup, setPopup] = useState(Popup.None);
    const user = useUser();

    const userText =
        <div className="user-text">
            {user.isLoggedIn() ? 
                <>
                    <p className="big thin light-blue">logged in as a</p>
                    <p className="big thin red" onClick={() => user.logout()}>logout</p>
                </> :
                <p className="big thin light-blue">not logged in</p>
            }
        </div>;

    return (
        <>
            <header>
                {userText}
                <h1 className="white centered">physics simulator</h1>
            </header>
            <div className="actions">
                <button id="enter">enter</button>
                <button 
                    disabled={user.isLoggedIn()}
                    onClick={() => setPopup(Popup.Login)} 
                    id="login-popup">login</button>
                <button disabled={user.isLoggedIn()}
                    onClick={() => setPopup(Popup.Register)} 
                    id="register-popup">register</button>
            </div>
            {popup == Popup.Login && <LoginPopup closePopup={() => setPopup(Popup.None)} />}
            {popup == Popup.Register && <RegisterPopup closePopup={() => setPopup(Popup.None)} />}
        </>
    );
}
