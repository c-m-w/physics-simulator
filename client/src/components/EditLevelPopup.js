/// EditObjectPopup.js

import {useState} from "react";

import {FieldType} from "../types/Field";

export default function EditObjectPopup(props) {

    console.log("props");
    console.log(props);

    const [info, setInfo] = useState({
        fields: props.level.fields
    });

    const changeInfo = (e) => {

        setInfo(oldInfo => ({...(oldInfo), [e.target.name]: e.target.value}));
    };

    const attemptClosePopup = () => {

        props.level.fields = info.fields;

        props.closePopup();
    };

    const newField = () => {

        setInfo(oldInfo => ({...oldInfo, fields: [...oldInfo.fields, {
                type: FieldType.Gravitational,
                x: "0",
                y: "0"
            }
        ]}));
    };

    const changeFieldData = (e, i) => {

        let fieldsCopy = structuredClone(info.fields);

        fieldsCopy[i][e.target.name] = e.target.value;

        setInfo(oldInfo => ({...oldInfo, fields: fieldsCopy}));
    }

    const fieldElements = info.fields.map((field, i) => {

        return (<div className="field">
            <p className="big thin white translucent">({i})</p>
            <div className="field-data">
                <label
                    className="big thin white"
                    htmlFor="type">type</label>
                <select
                    className="big thin white"
                    name="type"
                    value={field.type}
                    onChange={(e) => changeFieldData(e, i)}>
                    <option value={FieldType.Gravitational}>gravitational</option>
                    <option value={FieldType.Electric}>electric</option>
                </select>
                <label
                    className="big thin white"
                    htmlFor="x">x</label>
                <input
                    type="text"
                    name="x"
                    id="fieldX"
                    className="big thin white"
                    value={field.x}
                    onChange={(e) => changeFieldData(e, i)} />
                <label
                    className="big thin white"
                    htmlFor="y">y</label>
                <input
                    type="text"
                    name="y"
                    id="fieldY"
                    className="big thin white"
                    value={field.y}
                    onChange={(e) => changeFieldData(e, i)} />
            </div>
        </div>);
    })

    return (
        <div className="popup">
            <div className="popup-body">
                <h2 className="white centered">edit level</h2>
                <fieldset>
                    <legend>fields</legend>
                    {fieldElements}
                    <button
                        className="big" 
                        id="new-field"
                        onClick={newField}>+</button>
                </fieldset>
                <button className="big" onClick={attemptClosePopup}>done</button>
            </div>
        </div>
    );
}
