/// UserContext.js

import {Component, createContext} from "react";

const levelContext = createContext();

class LevelContextProvider extends Component {

    state = {
        data: "",
        name: "",
        loaded: false
    }

    load = (name) => {
    }

    save = () => {
    }

    componentDidMount() {

        this.load();
    }

    render() {

        const {Provider} = levelContext;
        const {load, save, state} = this;

        return (
            <Provider
                value={{load, save, ...state}}>
                    {this.props.children}
            </Provider>
        );
    }
}

export {LevelContextProvider, levelContext};
