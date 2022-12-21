/// Header.js

import useUser from "../hooks/useUser";
import useLevel from "../hooks/useLevel";

export default function Header(props) {

    const user = useUser();
    const level = useLevel();

    console.log(user);

    return (
        <header className="sub">
            <h2 className="white">physics simulator</h2>
            <div className="header-elements">
                <button 
                    className="header-element light-blue thin"
                    onClick={props.newLevel}>
                    new
                </button>
                <button 
                    className="header-element light-blue thin"
                    onClick={props.loadLevel}>
                    load
                </button>
                <p className="header-element light-blue thin">logged in as {user.email}</p>
            </div>
        </header>
    );
}