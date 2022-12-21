/// Header.js

import useUser from "../hooks/useUser";
import useLevel from "../hooks/useLevel";

export default function Header() {

    const user = useUser();
    const level = useLevel();

    console.log(user);

    return (
        <>
            <header className="sub">
                <h2 className="white">physics simulator</h2>
                <div className="header-elements">
                    <button className="header-element light-blue thin">
                        new
                    </button>
                    <button className="header-element light-blue thin">
                        load
                    </button>
                    <p className="header-element light-blue thin">logged in as {user.email}</p>
                </div>
            </header>
        </>
    );
}