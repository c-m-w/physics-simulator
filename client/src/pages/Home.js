/// Home.js

import {useState} from "react";

import useUser from "../hooks/useUser";

import MainHeader from "../components/MainHeader";
import LoginPopup from "../components/LoginPopup";
import RegisterPopup from "../components/RegisterPopup";

const Popup = {
    None: 0,
    Login: 1,
    Register: 2
}

export default function Home() {

    const [popup, setPopup] = useState(Popup.None);
    const user = useUser();

    return (
        <>
            <MainHeader />
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
    )
}