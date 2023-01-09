/// EditObjectPopup.js

import {useState} from "react";

import {FieldType} from "../types/Field";

export default function EditObjectPopup(props) {

    const [info, setInfo] = useState({
        positionX: props.object.position.x,
        positionY: props.object.position.y,
        velocityX: props.object.velocity.x,
        velocityY: props.object.velocity.y,
        massCharge: props.object.charges[FieldType.Gravitational],
        electricCharge: props.object.charges[FieldType.Electric],
        fixed: props.object.fixed
    });

    const changeInfo = (e) => {

        console.log("test");
        if (e.target.type == "checkbox") {

            console.log("checked")
            console.log(info[e.target.name])
            setInfo(oldInfo => ({...(oldInfo), fixed: !oldInfo.fixed}));
        } else {

            setInfo(oldInfo => ({...(oldInfo), [e.target.name]: e.target.value}));
        }
    };

    const attemptClosePopup = (e) => {

        e.preventDefault();
        e.target.className === "popup" && props.closePopup();

        props.object.position.x = parseInt(info.positionX);
        props.object.position.y = parseInt(info.positionY);
        props.object.velocity.x = parseInt(info.velocityX);
        props.object.velocity.y = parseInt(info.velocityY);
        props.object.charges[FieldType.Gravitational] = parseInt(info.massCharge);
        props.object.charges[FieldType.Electric] = parseInt(info.electricCharge);
        props.object.fixed = info.fixed;
    };

    return (
        <div className="popup" onClick={attemptClosePopup}>
            <div className="popup-body">
                <h2 className="white centered">edit object</h2>
                <form className="general" onSubmit={attemptClosePopup}>
                    <label 
                        className="big thin white"
                        htmlFor="positionX">x</label>
                    <input
                        type="number"
                        name="positionX"
                        id="positionX"
                        className="big thin white"
                        value={info.positionX}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="positionX">y</label>
                    <input
                        type="number"
                        name="positionY"
                        id="positionY"
                        className="big thin white"
                        value={info.positionY}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="velocityX">v_x</label>
                    <input
                        type="number"
                        name="velocityX"
                        id="velocityX"
                        className="big thin white"
                        value={info.velocityX}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="velocityY">v_y</label>
                    <input
                        type="number"
                        name="velocityY"
                        id="velocityY"
                        className="big thin white"
                        value={info.velocityY}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="massCharge">mass charge</label>
                    <input
                        type="number"
                        name="massCharge"
                        id="massCharge"
                        className="big thin white"
                        value={info.massCharge}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="electricCharge">electric charge</label>
                    <input
                        type="number"
                        name="electricCharge"
                        id="electricCharge"
                        className="big thin white"
                        value={info.electricCharge}
                        onChange={changeInfo} />
                    <label 
                        className="big thin white"
                        htmlFor="fixed">fixed</label>
                    <input
                        type="checkbox"
                        name="fixed"
                        id="fixed"
                        className="big thin white"
                        checked={info.fixed}
                        onChange={changeInfo} />
                    <button className="big">done</button>
                </form>
            </div>
        </div>
    );
}