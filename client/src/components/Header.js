/// Header.js

import useUser from "../hooks/useUser";
import useLevel from "../hooks/useLevel";

export default function Header(props) {

    const user = useUser();
    const level = useLevel();

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
                {
                    level.loaded() &&
                    <button
                        className="header-element light-blue thin"
                        onClick={level.save()}>
                        save "{level.get().name}"
                    </button>
                }
                <div className="header-element">
                    <p>
                        <span className="big thin light-blue">logged in as {user.get().email} </span>
                        <span className="thin red translucent clickable" onClick={() => user.logout()}>(logout)</span>
                    </p>
                </div>
            </div>
        </header>
    );
}
