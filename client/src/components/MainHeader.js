/// MainHeader.js

import useUser from "../hooks/useUser";

export default function MainHeader() {

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
            <header className="main">
                {userText}
                <h1 className="white centered">physics simulator</h1>
            </header>
        </>
    );
}
