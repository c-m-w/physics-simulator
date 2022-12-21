/// Simulator.js

import useUser from "../hooks/useUser";

import Header from "../components/Header";
import Board from "../components/Board";

export default function Simulator() {

    const user = useUser();

    return (
        <>
            <Header />
            <Board />
        </>
    );
}
