/// UserContext.js

import {Component, createContext} from "react";

const userContext = createContext();

class UserContextProvider extends Component {

    state = {
        email: "t@t.t",
        password: ""
    }

    load = () => {

        const creds = localStorage.getItem("credentials");

        creds && this.setState(JSON.parse(creds));
    }

    set = (creds) => {

        this.setState(creds);
        localStorage.setItem("credentials", JSON.stringify(creds));
    }

    get = () => {

        return {...this.state};
    }

    logout = () => {

        this.setState({
            email: "",
            password: ""
        });
        localStorage.removeItem("credentials");
    }

    isLoggedIn = () => {

        return this.state.email && this.state.password;
    }

    componentDidMount() {

        this.load();
    }

    render() {

        const {Provider} = userContext;
        const {state, set, get, logout, isLoggedIn} = this;

        return (
            <Provider
                value={{...state, set, get, logout, isLoggedIn}}>
                    {this.props.children}
            </Provider>
        );
    }
}

export {UserContextProvider, userContext};
