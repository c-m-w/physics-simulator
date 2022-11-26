/// useUser.js

import {useContext} from "react";

import {userContext} from "../context/UserContext";

export default function useUser() {

    const user = useContext(userContext);

    return user;
}
