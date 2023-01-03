/// MainHeader.js

import useUser from "../hooks/useUser";

export default function MainHeader() {

    const user = useUser();

    const userText =
        <div className="user-text">
            {user.isLoggedIn() ? 
                <>
                    <span className="big thin light-blue">logged in as {user.get().email} </span>
                    <span className="thin red translucent clickable" onClick={() => user.logout()}>(logout)</span>
                </> :
                <p className="big thin light-blue">not logged in</p>
            }
        </div>;

    return (
        <>
            <header className="main">
                {userText}
                <h1 className="white centered">physics simulator</h1>
            </header>
        </>
    );
}
