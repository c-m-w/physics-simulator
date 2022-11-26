/// UserContext.js

import {Component, createContext} from "react";

const userContext = createContext();

class UserContextProvider extends Component {

    state = {
        email: "",
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
        const {credentials, set, logout, isLoggedIn} = this;

        return (
            <Provider
                value={{...credentials, set, logout, isLoggedIn}}>
                    {this.props.children}
            </Provider>
        );
    }
}

export {UserContextProvider, userContext};
