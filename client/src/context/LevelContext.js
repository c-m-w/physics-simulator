/// UserContext.js

import {Component, createContext} from "react";
import Level from "../types/Level";

import makeAPIRequest from "../utils/makeAPIRequest";

const levelContext = createContext();

class LevelContextProvider extends Component {

    state = {
        id: -1,
        data: "",
        name: "",
    };
    leve = null;

    create = async (name, email) => {

        const response = await makeAPIRequest("level", "POST", {name: name, email: email});

        if (response && response.success) {

            this.load(response.data.id);

        } else {

            // todo error
        }

        return response;
    }

    load = async (id) => {

        const response = await makeAPIRequest(`level/${id}`, "GET");

        if (response && response.success) {

            this.setState({...response.data});
            this.level = new Level(response.data.data);
        }

        return response;
    }

    save = async () => {

        if (null === this.level) {
            
            return;
        }

        this.state.data = this.level.toDataString();

        const response = await makeAPIRequest(`level/${this.state.id}`, "PUT", this.state);

        if (!response || !response.success) {

            /// todo error
        }

        console.log(this.level.toDataString());
    }

    getList = async (email) => {

        const response = await makeAPIRequest(`levels/${email}`, "GET");

        if (response && response.success) {

            return response.data;
        }
    }

    get = () => {

        return {...this.state};
    }

    current = () => {

        return this.level;
    }

    loaded = () => {

        return this.state.id !== -1;
    }

    componentDidMount() {

        //this.load(); what the fuck?
    }

    render() {

        const {Provider} = levelContext;
        const {create, load, save, get, current, loaded, state} = this;

        return (
            <Provider
                value={{create, load, save, get, current, loaded, ...state}}>
                    {this.props.children}
            </Provider>
        );
    }
}

export {LevelContextProvider, levelContext};
