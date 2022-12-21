/// Header.js

import useLevel from "../hooks/useLevel";

export default function Header() {

    const level = useLevel();

    return (
        <>
            <header className="sub">
                <h2 className="white">physics simulator</h2>
            </header>
        </>
    );
}