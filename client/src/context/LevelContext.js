/// UserContext.js

import {Component, createContext} from "react";
import Level from "../types/Level";

import makeAPIRequest from "../utils/makeAPIRequest";

const levelContext = createContext();

class LevelContextProvider extends Component {

    state = {
        id: -1,
        data: "",
        name: ""
    };
    level = null;

    create = async (name) => {

        const response = await makeAPIRequest("level", "POST", name);

        if (response && response.success) {

            this.load(response.id);
        }

        this.setState({id: 0, data: "", name: name});
        
        this.level = new Level(`
        {"objects":[{"x":-1.6700000000000013,"y":-0.5000000000000002,"z":0,"v_x":0,"v_y":0,"v_z":0,"massCharge":1,"electricCharge":0}],"fields":[{"type":0,"x":"-x","y":"0"}]}`);

        return {success: true};
    }

    load = async (id) => {

        const response = await makeAPIRequest(`level/{id}`, "GET");

        if (response && response.success) {

            this.state = {...response.data};
            this.level = new Level(this.state.data);
            return true;
        }

        return false;
    }

    save = async () => {

        if (null === this.level) {
            
            return;
        }

        this.state.data = this.level.toDataString();

        const response = await makeAPIRequest(`level/{this.state.id}`, "PUT", this.state);

        if (!response || !response.success) {

            /// todo error
        }

        console.log(this.level.toDataString());
    }

    getList = async () => {

        const response = await makeAPIRequest(`levels`, "GET");

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
